$(() => {
	$("#verbConjugations").hide();

	const testWordInput = (word) => {
		const cleanedWord = word.replace(/[^a-zA-Z]|[cC]/g, "");

		if (cleanedWord !== word) {
			$("#wordInput").val(cleanedWord);
			return true;
		}

		return false;
	};

	let verbTypes = [];

	const updateGroupInput = () => {
		const word = $("#wordInput").val();

		if (testWordInput(word)) return;

		if ($("#isVerbInput").prop("checked")) {
			$("#groupInput").val("Verb");

			$("#verbConjugations").show();
			$("#wordForms").hide();

			$(".typeSelect").each(function (i, el) {
				verbTypes.push(el.value);

				$(el).val("verb");
				$(el).addClass("fake-disabled");
			});

		} else {
			$("#groupInput").val(word.charAt(0).toUpperCase());

			$("#verbConjugations").hide();
			$("#wordForms").show();

			$(".typeSelect").each(function (i, el) {
				$(el).val(verbTypes[i]);
				$(el).removeClass("fake-disabled");
			});

			verbTypes = [];
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
				<div class="type-item mb-2">
					<div class="d-flex justify-content-between align-items-center mb-2">
						<label class="form-label">Type</label>
						<button type="button" class="deleteDefinition btn btn-danger bi bi-trash" title="Remove Definition"></button>
					</div>
					<select class="typeSelect form-select ${$("#isVerbInput").prop("checked") ? "fake-disabled" : ""}" name="definitions[type][]" required>
						<option value="">Choose Type</option>
						<option value="noun">Noun</option>
						<option ${$("#isVerbInput").prop("checked") ? "selected" : ""} value="verb">Verb</option>
						<option value="adjective">Adjective</option>
						<option value="adverb">Adverb</option>
						<option value="preposition">Preposition</option>
						<option value="conjunction">Conjunction</option>
						<option value="interjection">Interjection</option>
						<option value="pronoun">Pronoun</option>
						<option value="article">Article</option>
					</select>
				</div>
				<div class="definition-item mb-2">
					<label class="form-label">Definition</label>
					<textarea class="form-control" name="definitions[definition][]" required></textarea>
				</div>
				<div class="example-item mb-2">
					<label class="form-label">Example</label>
					<textarea class="form-control" name="definitions[example][]" required></textarea>
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
                <input type="text" class="form-control" name="synonyms[]">
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
                <input type="text" class="form-control" name="antonyms[]">
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
                <input type="text" class="form-control" name="tags[]">
            </div>
        `;

		$("#tags").append(tagHtml);
	});

	$("#tags").on("click", ".deleteTag", function () {
		$(this).closest(".tag-item").remove();
	});
});
