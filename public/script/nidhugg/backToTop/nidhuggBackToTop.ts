/**
 * Custom web component for adding a "back to top" button
 * @module
 */

/**
 * @class NidhuggBackToTop
 * @extends HTMLElement
 * @public
 * @property scroll-id - Optional ID of the element to scroll to
 */
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
