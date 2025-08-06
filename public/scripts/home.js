$(() => {
    $(".nav-link").on("click", function (e) {
        e.preventDefault();
        const section = $(this).data("page");
        $("#sectionLoader").attr("src", `/partials/${section}`);
    });
})