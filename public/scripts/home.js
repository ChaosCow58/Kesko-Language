$(() => {
    $(".nav-link").on("click", function (e) {
        e.preventDefault();
        const section = $(this).data("page");
        const group = $(this).data("group");

        $("#sectionLoader").attr("src", `/partials/${section}`);

        if (group && group !== "") {
            $("#sectionLoader").attr("src", `/partials/word?group=${group}`);
        }
    });
})