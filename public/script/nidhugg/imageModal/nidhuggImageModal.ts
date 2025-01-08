/**
 * Custom web component for creating a modal dialog for an image
 * @module
 */

/**
 * @class NidhuggImageModal
 * @extends HTMLElement
 * @public
 * @method open - Opens the modal dialog
 * @method showModal - Displays the modal dialog
 * @method close - Closes the modal dialog
 */
class NidhuggImageModal extends HTMLElement {
	static observedAttributes = [];
	static {
		customElements.define("nidhugg-image-modal", this);
	}
	closeEvent: CustomEvent;
	cancelEvent: CustomEvent;
	openEvent: CustomEvent;

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

	get Dialog(): HTMLDialogElement | null {
		return document.getElementById(this.#modalId) as HTMLDialogElement;
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
		images.forEach((img) => {
			img.addEventListener("click", () => {
				this.#renderImage(img);
				this.showModal();
			});
		});
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (name === "open") {
			if (this.hasAttribute("open")) {
				return this.Dialog?.showModal();
			}
		}
	}

	#renderImage(img: HTMLImageElement) {
		const figure = document.createElement("figure");
		figure.classList.add(this.#figureClass);

		const dialogImg = document.createElement("img");
		dialogImg.setAttribute("alt", img.getAttribute("alt") || "");
		dialogImg.setAttribute("height", img.getAttribute("height") || "");
		dialogImg.setAttribute("width", img.getAttribute("width") || "");
		dialogImg.setAttribute("src", img.getAttribute("src") || "");
		dialogImg.classList.add(this.#modalImageClass);
		figure.appendChild(dialogImg);

		const caption = document.createElement("figcaption");
		if (img.dataset.caption) {
			caption.innerHTML = img.dataset.caption;
			figure.appendChild(caption);
		}
		const oldFigure = this.Dialog?.querySelector(`.${this.#figureClass}`);
		if (oldFigure) {
			return this.Dialog?.replaceChild(figure, oldFigure);
		}
		this.Dialog?.appendChild(figure);
	}

	#populateElements() {
		if (this.Dialog) {
			return;
		}
		const imageDialogEl = document.createElement("dialog");
		imageDialogEl.classList.add(this.#dialogClass);
		imageDialogEl.id = this.#modalId;
		imageDialogEl.innerHTML = ``;

		document.body.appendChild(imageDialogEl);
	}
}
