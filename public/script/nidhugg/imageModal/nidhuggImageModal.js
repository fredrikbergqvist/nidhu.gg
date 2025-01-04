/**
 * @class NidhuggImageModal
 * @module
 * @extends HTMLElement
 *
 * @public
 *
 */
class NidhuggImageModal extends HTMLElement {
	static observedAttributes = [];
	static {
		customElements.define("nidhugg-image-modal", this);
	}
	#modalId = "nidhugg-image-modal";
	#dialogClass = `${this.#modalId}__dialog`;
	#figureClass = `${this.#modalId}__figure`;
	#modalImageClass = `${this.#modalId}__img`;
	#captionClass = `${this.#modalId}__caption`;
	#modalOpenClass = "nidhugg-modal-open";

	constructor() {
		super();
		this.close = this.close.bind(this);
		this.closeEvent = new CustomEvent("close", {
			bubbles: true,
			cancelable: false,
			composed: true,
		});
		this.cancelEvent = new CustomEvent("cancel", {
			bubbles: true,
			cancelable: false,
			composed: true,
		});
		this.openEvent = new CustomEvent("open", {
			bubbles: true,
			cancelable: false,
			composed: true,
		});
	}

	get Dialog() {
		return document.getElementById(this.#modalId);
	}

	open() {
		this.showModal();
	}

	showModal() {
		const dialog = this.Dialog;
		if (dialog) {
			dialog.showModal();
			document.body.classList.add(this.#modalOpenClass);
		}
	}

	close() {
		const dialog = this.Dialog;
		if (dialog) {
			dialog.style.opacity = "0";
			dialog.style.transform = "scale(0)";
			setTimeout(() => {
				document.body.classList.remove(this.#modalOpenClass);
				dialog.style.opacity = "";
				dialog.style.transform = "";
				dialog.close();
			}, 200);
		}
	}

	#populateElements() {
		if (this.Dialog) {
			return;
		}
		const imageDialogEl = document.createElement("dialog");
		imageDialogEl.classList.add(this.#dialogClass);
		imageDialogEl.id = this.#modalId;
		imageDialogEl.innerHTML = `
			<figure class="${this.#figureClass}">
				<img class="${this.#modalImageClass}" src="#" alt="" />
				<figcaption class="${this.#captionClass}"></figcaption>
			</figure>`;

		document.body.appendChild(imageDialogEl);
	}

	connectedCallback() {
		this.#populateElements();

		const dialogEl = this.Dialog;
		dialogEl?.addEventListener("cancel", (event) => {
			event.preventDefault();
			this.close();
		});
		dialogEl?.addEventListener("close", (event) => {
			event.preventDefault();
			this.close();
		});
		dialogEl?.addEventListener("mousedown", (event) => {
			event.preventDefault();
			if (event.target === dialogEl) {
				this.close();
			}
		});

		const images = this.querySelectorAll("img");
		images.forEach(img => {
			img.addEventListener("click", () => {
				const dialogImg = this.Dialog.querySelector(`.${this.#modalImageClass}`);
				const dialogCaption = this.Dialog.querySelector(`.${this.#captionClass}`);
				if (dialogImg) {
					dialogImg.setAttribute("alt", img.getAttribute("alt"));
					dialogImg.setAttribute("height", img.getAttribute("height"));
					dialogImg.setAttribute("width", img.getAttribute("width"));
					dialogImg.setAttribute("src", img.getAttribute("src"));
					if (img.dataset.vertical) {
						dialogImg.classList.add("vertical");
					}
					dialogCaption.innerHTML = "";
					if (img.dataset.caption) {
						dialogCaption.innerHTML = img.dataset.caption;
					}
				}
				this.showModal();
			});
		});
	}

	attributeChangedCallback(name, oldValue, newValue) {

	}
}
