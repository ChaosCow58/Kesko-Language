$(() => {
	$(".deleteBtn").on("click", function () {
		const wordId = $(this).closest(".card-header").find(".wordId").text();
		swal.fire({
			allowOutsideClick: true,
			allowEscapeKey: true,
			title: "Delete Word",
			text: "This action cannot be undone.",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Delete",
			cancelButtonText: "Cancel",
			customClass: {
				confirmButton: "delete-confirm",
				cancelButton: "delete-cancel",
			},
		}).then((willDelete) => {
			if (willDelete.isConfirmed) {
				$.ajax({
					url: `/post/deleteWord`,
					type: "POST",
					data: { id: wordId },
					success: (response) => {
						if (response.success) {
							location.reload();
						}
					},
				});
			}
		});
	});

	$(".updateBtn").on("click", function () {
		const wordId = $(this).closest(".card-header").find(".wordId").text();
		$.ajax({
			url: `/post/getUpdate`,
			type: "POST",
			data: { id: wordId },
			success: (response) => {
				$("body").html(response);
			}
		});
	});
});
