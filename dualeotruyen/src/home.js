function execute(url, page) {
    if (!page) page = '1';
    let requestUrl = url;
    // Giả định cấu trúc phân trang nếu qua trang 2 (VBook tự truyền tham số page)
    if (page !== '1') {
        requestUrl = url + "?page=" + page;
    }

    let response = Engine.newRequest().url(requestUrl).get();
    if (response.ok) {
        let doc = response.html();
        let list = [];
        
        // Bốc tách chính xác theo class truyện của dualeotruyenbs.com
        let elements = doc.select(".box_list .li_truyen"); 
        
        for (let i = 0; i < elements.size(); i++) {
            let element = elements.get(i);
            
            // Lấy thẻ <a> đầu tiên chứa thông tin truyện chính
            let storyA = element.select("a").first();
            let name = storyA.select(".name").text();
            let link = storyA.attr("href");
            
            // Web sử dụng lazyload với thuộc tính data-src thay vì src thường
            let imgElement = storyA.select("img");
            let cover = imgElement.attr("data-src") || imgElement.attr("src");
            
            // Lấy thông tin chương mới nhất làm phần mô tả ngắn gọn
            let description = element.select(".update .chap_name").text() + " - " + element.select(".update .time").text();

            if (name && link) {
                list.push({
                    name: name + "",
                    link: link + "",
                    cover: cover + "",
                    description: description + ""
                });
            }
        }

        // Tạo số trang tiếp theo để VBook hiểu và tải tiếp khi cuộn xuống
        let next = parseInt(page, 10) + 1;
        return Response.success(list, next + "");
    }
    return Response.error("Không thể kết nối tới Dưa Leo Truyện");
}
