$(() => {
    $(".nav-link").on("click", function (e) {
        e.preventDefault();
        const section = $(this).data("page");
        const group = $(this).data("group");

        $("#sectionLoader").attr("src", `/partials/${section}${group ? `?group=${group}` : ""}`);
    });
})