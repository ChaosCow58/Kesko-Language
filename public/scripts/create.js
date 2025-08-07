$(() => {
	const testWordInput = (word) => {
		const cleanedWord = word.replace(/[^a-zA-Z]|[cC]/g, "");

		if (cleanedWord !== word) {
			$("#wordInput").val(cleanedWord);
			return true;
		}

		return false;
	};

	let previousType = "";

	const updateGroupInput = () => {
		const word = $("#wordInput").val();

		if (testWordInput(word)) return;

		if ($("#isVerbInput").prop("checked")) {
			if ($("#typeInput").val() !== "verb") {
				previousType = $("#typeInput").val();
			}

			$("#groupInput").val("Verb");
			$("#typeInput").val("verb");
		} else {
			$("#typeInput").val(previousType);
			$("#groupInput").val(word.charAt(0).toUpperCase());
		}
	};

	// Trigger when checkbox changes
	$("#isVerbInput").on("change", updateGroupInput);

	// Trigger when word input changes
	$("#wordInput").on("input", updateGroupInput);

	$("#addDefinition").on("click", () => {
		const definitionHtml = `
        <div class="definition-wrapper">
            <hr>
            <div class="definition-item mb-2">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <label class="form-label">Definition</label>
                    <button type="button" class="deleteDefinition btn btn-danger bi bi-trash" tooltip="Remove Definition"></button>
                </div>
            <input type="text" class="form-control" name="definition" required>
            </div>
                <div class="example-item mb-2">
                        <label class="form-label">Example</label>
                        <input type="text" class="form-control" name="example" required>
                    </div>
                </div>
            </div>
        `;
		$("#definitions").append(definitionHtml);
	});

	$("#definitions").on("click", ".deleteDefinition", function () {
		$(this).closest(".definition-wrapper").remove();
	});

	$("#addSynonym").on("click", () => {
		const synonymHtml = `
            <div class="synonym-item mb-2">
                <hr>
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <label class="form-label">Synonym</label>
                    <button type="button" class="deleteSynonym btn btn-danger bi bi-trash" tooltip="Remove Synonym"></button>
                </div>
                <input type="text" class="form-control" name="synonym">
            </div>
        `;
		$("#synonyms").append(synonymHtml);
	});

	$("#synonyms").on("click", ".deleteSynonym", function () {
		$(this).closest(".synonym-item").remove();
	});

	$("#addAntonym").on("click", () => {
		const antonymHtml = `
            <div class="antonym-item mb-2">
                <hr>
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <label class="form-label">Antonym</label>
                    <button type="button" class="deleteAntonym btn btn-danger bi bi-trash" tooltip="Remove Antonym"></button>
                </div>
                <input type="text" class="form-control" name="antonym">
            </div>
        `;
		$("#antonyms").append(antonymHtml);
	});

	$("#antonyms").on("click", ".deleteAntonym", function () {
		$(this).closest(".antonym-item").remove();
	});

	$("#addTag").on("click", () => {
		const tagHtml = `
            <div class="tag-item mb-2">
                <hr>
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <label class="form-label">Tag</label>
                    <button type="button" class="deleteTag btn btn-danger bi bi-trash" tooltip="Remove Tag"></button>
                </div>
                <input type="text" class="form-control" name="tag">
            </div>
        `;

		$("#tags").append(tagHtml);
	});

	$("#tags").on("click", ".deleteTag", function () {
		$(this).closest(".tag-item").remove();
	});
});
