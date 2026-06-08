function execute(url) {
    let response = Engine.newRequest().url(url).get();
    if (response.ok) {
        let doc = response.html();
        
        // Chọn vùng chứa nội dung của chương truyện
        let contentElement = doc.select(".chapter_content, .content_view, .box_chap_content");
        
        // Loại bỏ sạch các thẻ script, tag quảng cáo ẩn hoặc box chat tránh làm rối giao diện đọc
        contentElement.select("script, style, .box_chat, .ad-container, .member_control, iframe").remove();
        
        let content = contentElement.html();

        if (content) {
            return Response.success(content + "");
        }
    }
    return Response.error("Không thể tải nội dung chương này");
}
