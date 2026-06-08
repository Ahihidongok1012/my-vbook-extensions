function execute(url) {
    let response = Engine.newRequest().url(url).get();
    if (response.ok) {
        let doc = response.html();
        let list = [];
        
        // Tìm các thẻ <a> liên kết chương nằm trong danh sách chương của web
        let elements = doc.select(".list_chapter a, .box_list_chapter a, .update a");
        
        for (let i = 0; i < elements.size(); i++) {
            let element = elements.get(i);
            let name = element.select(".chap_name, text").text() || element.text();
            let link = element.attr("href");

            if (link && link.indexOf("chapter") !== -1) {
                list.push({
                    name: name + "",
                    link: link + ""
                });
            }
        }
        
        // Sắp xếp lại danh sách chương từ chương 1 trở đi nếu web hiển thị chương mới nhất lên đầu
        if (list.length > 0) {
            list.reverse();
        }

        return Response.success(list);
    }
    return Response.error("Không thể tải mục lục chương");
}
