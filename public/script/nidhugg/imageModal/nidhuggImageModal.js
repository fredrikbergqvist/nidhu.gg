/**
 * @class NidhuggImageModal
 * @extends HTMLElement
 *
 * @public
 *
 */
class NidhuggImageModal extends HTMLElement {
	static observedAttributes = [""];
	static {
		customElements.define("nidhugg-image-modal", this);
	}

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
		return this.querySelector("dialog");
	}

	open() {
		this.showModal();
	}

	showModal() {
		const dialog = this.Dialog;
		if (dialog) {
			dialog.showModal();
			document.body.classList.add("nidhugg-modal-open");
		}
	}

	close() {
		const dialog = this.Dialog;
		if (dialog) {
			dialog.style.opacity = "0";
			dialog.style.transform = "scale(0)";
			setTimeout(() => {
				dialog.close();
				document.body.classList.remove("nidhugg-modal-open");
				dialog.style.opacity = "";
				dialog.style.transform = "";
			}, 300);
		}
	}

	populateElements() {
		const imageDialogEl = document.createElement("dialog");
		imageDialogEl.classList.add("nidhugg-image_modal__dialog")
		imageDialogEl.innerHTML = `
			<figure class="nidhugg-image_modal__main">
				<img class="nidhugg-image_modal__img" src="#" alt="" />
				<figcaption></figcaption>
			</figure>`;

		this.appendChild(imageDialogEl);
	}

	connectedCallback() {
		this.populateElements();

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

		const images = this.querySelectorAll("img:not(.nidhugg-image_modal__img)")
		images.forEach(img => {
			img.classList.add("nidhugg-image-modal__image")
			img.addEventListener("click", () => {
				const dialogImg = this.querySelector("dialog figure img");
				const dialogCaption = this.querySelector("dialog figure figcaption");
				if(dialogImg){
					dialogImg.setAttribute("alt", img.getAttribute("alt")) ;
					dialogImg.setAttribute("height", img.getAttribute("height")) ;
					dialogImg.setAttribute("width", img.getAttribute("width")) ;
					dialogImg.setAttribute("src", img.getAttribute("src")) ;
					dialogCaption.innerHTML = "";
					if(img.dataset.caption){
						dialogCaption.innerHTML = img.dataset.caption;
					}
				}
				this.showModal();
			})
		})
	}

	attributeChangedCallback(name, oldValue, newValue) {

	}
}
