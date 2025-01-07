/**
 * Custom web component for creating a modal dialog
 * @module
 */

/**
 * @class NidhuggModal
 * @extends HTMLElement
 * @description Custom web component for creating a modal dialog
 * @example
 * <nidhugg-modal>
 *   <h2 slot="header">Modal Header</h2>
 *   <p slot="content">Modal Content</p>
 *   <button slot="footer">Close</button>
 * </nidhugg-modal>
 *
 * @public
 * @method open - Opens the modal dialog
 * @method showModal - Opens the modal dialog
 * @method close - Closes the modal dialog
 * @property heading - The heading text for the modal dialog
 * @property open - Whether the modal dialog is open
 *
 */
class NidhuggModal extends HTMLElement {
	static observedAttributes = ["open", "heading"];
	static {
		customElements.define("nidhugg-modal", this);
	}
	closeEvent: CustomEvent;
	cancelEvent: CustomEvent;
	openEvent: CustomEvent;
	#modalOpenClass = "nidhugg-modal-open";
	#dialogClass = "nidhugg-modal__dialog";
	#headerClass = "nidhugg-modal__header";
	#headingClass = "nidhugg-modal__heading";
	#closeBtnClass = "nidhugg-modal__close-btn";
	#mainClass = "nidhugg-modal__main";
	#noHeadingClass = this.#headingClass + "--no-heading";

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
		return this.querySelector(`dialog.${this.#dialogClass}`);
	}

	open() {
		this.showModal();
	}

	showModal() {
		const dialog = this.Dialog;
		if (dialog) {
			dialog.showModal();
			document.body.classList.add(this.#modalOpenClass);
			this.dispatchEvent(this.openEvent);
		}
	}

	close() {
		const dialog = this.Dialog;
		if (dialog) {
			dialog.style.opacity = "0";
			dialog.style.transform = "scale(0)";
			setTimeout(() => {
				dialog.close();
				document.body.classList.remove(this.#modalOpenClass);
				dialog.style.opacity = "";
				dialog.style.transform = "";
			}, 300);
		}
	}

	populateElements() {
		const headingText = this.getAttribute("heading");
		const content = this.childNodes;
		const dialogElement = document.createElement("dialog");
		dialogElement.classList.add(this.#dialogClass);
		const headingEl = document.createElement("h2");
		headingEl.classList.add(this.#headingClass);
		headingEl.textContent = headingText || "";
		const header = document.createElement("header");
		header.classList.add(this.#headerClass);
		header.innerHTML = `
			<form formmethod="dialog">
				<button class="${this.#closeBtnClass}" type="submit" title="Close modal" autofocus>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18 6a1 1 0 0 0-1.414 0L12 10.586 7.414 6A1 1 0 0 0 6 6a1 1 0 0 0 0 1.414L10.586 12 6 16.586A1 1 0 0 0 6 18a1 1 0 0 0 1.414 0L12 13.414 16.586 18A1 1 0 0 0 18 18a1 1 0 0 0 0-1.414L13.414 12 18 7.414A1 1 0 0 0 18 6Z"/></svg>
				</button>
			</form>`;
		if (headingText) {
			header.appendChild(headingEl);
		} else {
			header.classList.add(this.#noHeadingClass);
		}
		const main = document.createElement("main");
		main.classList.add(this.#mainClass);
		const childNodes = Array.from(content);
		main.append(...childNodes);

		dialogElement.appendChild(header);
		dialogElement.appendChild(main);

		this.appendChild(dialogElement);
		if (this.hasAttribute("open")) {
			this.showModal();
		}
	}

	connectedCallback() {
		this.populateElements();

		const dialogEl = this.Dialog;
		dialogEl?.addEventListener("cancel", (event) => {
			event.preventDefault();
			this.close();
			this.dispatchEvent(this.cancelEvent);
		});
		dialogEl?.addEventListener("close", (event) => {
			event.preventDefault();
			this.close();
			this.dispatchEvent(this.closeEvent);
		});
		dialogEl?.addEventListener("mousedown", (event) => {
			event.preventDefault();
			if (event.target === dialogEl) {
				this.close();
			}
		});
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (name === "open") {
			if (this.hasAttribute("open")) {
				return this.showModal();
			}
		}
	}
}
