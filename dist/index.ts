


class NidhuggBackToTop extends HTMLElement {
	static observedAttributes = ["scroll-id"];
	#anchorId = "nidhugg-back-to-top";
	static {
		customElements.define("nidhugg-back-to-top", this);
	}
	#anchorClass = "nidhugg-back-to-top__anchor";
	#scrollToId = "nidhugg-scroll-to";
	#supportsScrollAnimation = CSS.supports("animation-timeline: scroll()");

	constructor() {
		super();
	}

	connectedCallback() {
		if (document.getElementById(this.#anchorId)) {
			return;
		}

		document.body.appendChild(this.#createElement());
		this.#handleScrollSupport();
	}

	#handleScrollSupport() {
		if (!this.#supportsScrollAnimation) {
			const topScrollEl = document.getElementById(this.#scrollToId);
			const anchor = document.getElementById(this.#anchorId);
			if (!topScrollEl || !anchor) {
				return;
			}
			const browserHeight = window.innerHeight;
			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (!entry.isIntersecting) {
							anchor.style.opacity = "1";
						} else {
							anchor.style.opacity = "0";
						}
					});
				},
				{
					root: null,
					rootMargin: `${browserHeight}px`,
					threshold: 1,
				}
			);

			observer.observe(topScrollEl);
		}
	}

	#createElement() {
		if (!this.getAttribute("scroll-to") || !this.#supportsScrollAnimation) {
			const scrollToEl = document.createElement("span");
			scrollToEl.id = this.#scrollToId;
			this.prepend(scrollToEl);
		}

		const scrollToId = this.getAttribute("scroll-to") || this.#scrollToId;
		const anchorEl = document.createElement("a");
		anchorEl.innerHTML = `
			<figure>
				<svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24"><path d="M23.71,16.29,15.54,8.12a5,5,0,0,0-7.08,0L.29,16.29a1,1,0,0,0,1.42,1.42L9.88,9.54a3,3,0,0,1,4.24,0l8.17,8.17a1,1,0,0,0,1.42,0A1,1,0,0,0,23.71,16.29Z"/></svg>
				<figcaption>Back to top</figcaption>
			</figure>`;

		anchorEl.href = `#${scrollToId}`;
		anchorEl.id = this.#anchorId;
		anchorEl.classList.add(this.#anchorClass);
		if (this.#supportsScrollAnimation) {
			anchorEl.classList.add("nidhugg-back-to-top__anchor--scroll-animation");
		}
		return anchorEl;
	}
}




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
				const dialogImg = this.Dialog?.querySelector(`.${this.#modalImageClass}`);
				if (dialogImg) {
					dialogImg.setAttribute("alt", img.getAttribute("alt") || "");
					dialogImg.setAttribute("height", img.getAttribute("height") || "");
					dialogImg.setAttribute("width", img.getAttribute("width") || "");
					dialogImg.setAttribute("src", img.getAttribute("src") || "");
					if (img.dataset.vertical) {
						dialogImg.classList.add("vertical");
					}
				}
				const dialogCaption = this.Dialog?.querySelector(`.${this.#captionClass}`);
				if (dialogCaption) {
					dialogCaption.innerHTML = "";
					if (img.dataset.caption) {
						dialogCaption.innerHTML = img.dataset.caption;
					}
				}

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
}




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

