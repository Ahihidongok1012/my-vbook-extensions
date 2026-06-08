function execute(url) {
    let response = Engine.newRequest().url(url).get();
    if (response.ok) {
        let doc = response.html();
        
        // Bóc tách tiêu đề truyện, tác giả và ảnh bìa trong trang chi tiết
        let name = doc.select("h1.title, .story-title, .box_title h2").text();
        let author = doc.select(".author, .info_story a[href*=tac-gia]").text() || "Đang cập nhật";
        
        let imgElement = doc.select(".box_info_story img, .img img").first();
        let cover = "";
        if (imgElement) {
            cover = imgElement.attr("data-src") || imgElement.attr("src");
        }
        
        let description = doc.select(".box_summary, .summary-content, .content_view").html();
        let ongoing = doc.select(".status, .info_story").text().indexOf("Hoàn thành") === -1;

        return Response.success({
            name: name + "",
            author: author + "",
            cover: cover + "",
            description: description + "",
            detail: url + "", // Gửi tiếp URL này qua file toc.js để bóc danh sách chương
            ongoing: ongoing
        });
    }
    return Response.error("Không thể tải thông tin chi tiết");
}
