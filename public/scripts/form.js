$(() => {
	const form = $("form");

	form.on("submit", (event) => {
		form.addClass("was-validated");

		if (!form[0].checkValidity()) {
			event.preventDefault();
			event.stopPropagation();
		}
	});
});
