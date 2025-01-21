/**
 * Adds a text count to the input or textarea element
 * @module
 */
/**
 * @class NidhuggCharacterCount
 * @extends HTMLElement
 * @description Adds a text count to the input or textarea element
 *
 * @public
 * @property maxlength - Max length allowed for the input
 *
 */
class NidhuggTextCountTracker extends HTMLElement {
	static {
		customElements.define("nidhugg-character-count", this);
	}
	static observedAttributes = ["maxlength"];

	constructor() {
		super();
	}

	get #InputEl() {
		const textArea = this.querySelector("textarea");
		if (textArea) {
			return textArea;
		}
		const inputElement = this.querySelector("input");
		if (inputElement) {
			return inputElement;
		}
		console.warn("No input or textarea element found to track text count");
	}

	get #CharacterCount() {
		if (!this.#InputEl) {
			return 0;
		}
		return this.#InputEl.value.length;
	}

	get #CharacterCountElement() {
		return this.querySelector("#characterCount");
	}

	get #MaxLength() {
		return this.getAttribute("maxlength");
	}

	populateElements() {
		const divElement = document.createElement("div");
		divElement.id = "characterCount";
		divElement.classList.add("nidhugg-character-count");
		divElement.textContent = `${this.#CharacterCount}${this.#MaxLength ? "/" + this.#MaxLength : ""} characters`;
		this.append(divElement);
		if (this.#InputEl) {
			this.#InputEl.addEventListener("input", this.#UpdateCount.bind(this));
		}
	}

	connectedCallback() {
		this.populateElements();
	}

	#UpdateCount() {
		if (!this.#CharacterCountElement) {
			return;
		}
		this.#CharacterCountElement.textContent = `${this.#CharacterCount}${this.#MaxLength ? "/" + this.#MaxLength : ""} characters`;
	}
}
