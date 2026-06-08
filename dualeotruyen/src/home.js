function execute() {
    return Response.success([
        { title: "Tất cả",       input: "https://dualeotruyenbs.com/",                script: 'gen.js' },
        { title: "Mới cập nhật", input: "https://dualeotruyenbs.com/?orderby=latest", script: 'gen.js' }
    ]);
}
