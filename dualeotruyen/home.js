function execute(url, page) {
    page = page || "1";

    let requestUrl = url;
    if (page !== "1") {
        requestUrl = url + "page/" + page + "/";
    }

    let response = Engine.newRequest()
        .url(requestUrl)
        .get();

    if (!response.ok) {
        return Response.error("Không thể kết nối tới trang");
    }

    let doc = response.html();
    let list = [];

    // Selector thường dùng trên các site DualeoTruyen
    let items = doc.select(".page-item-detail, .c-tabs-item, .row.c-tabs-item");

    for (let i = 0; i < items.size(); i++) {
        let item = items.get(i);

        let a = item.select("h3 a, .post-title a").first();
        if (!a) continue;

        let img = item.select("img").first();

        let name = a.text().trim();
        let link = a.attr("href");

        let cover = "";
        if (img) {
            cover = img.hasAttr("data-src")
                ? img.attr("data-src")
                : img.attr("src");
        }

        let description = item.select(".post-content_item, .summary-content").text();

        list.push({
            name: name,
            link: link,
            cover: cover,
            description: description
        });
    }

    // Kiểm tra trang tiếp theo
    let hasNext =
        doc.select(".pagination .next").size() > 0 ||
        doc.select(".nav-links .next").size() > 0 ||
        doc.select("a.nextpostslink").size() > 0;

    return Response.success(
        list,
        hasNext ? (parseInt(page) + 1).toString() : null
    );
}
