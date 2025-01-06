"use strict";
/**
 * Custom web component for adding a "back to top" button
 * @module
 */
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _NidhuggBackToTop_instances, _a, _NidhuggBackToTop_anchorId, _NidhuggBackToTop_anchorClass, _NidhuggBackToTop_scrollToId, _NidhuggBackToTop_supportsScrollAnimation, _NidhuggBackToTop_handleScrollSupport, _NidhuggBackToTop_createElement;
/**
 * @class NidhuggBackToTop
 * @extends HTMLElement
 * @public
 * @property scroll-id - Optional ID of the element to scroll to
 */
class NidhuggBackToTop extends HTMLElement {
    constructor() {
        super();
        _NidhuggBackToTop_instances.add(this);
        _NidhuggBackToTop_anchorId.set(this, "nidhugg-back-to-top");
        _NidhuggBackToTop_anchorClass.set(this, "nidhugg-back-to-top__anchor");
        _NidhuggBackToTop_scrollToId.set(this, "nidhugg-scroll-to");
        _NidhuggBackToTop_supportsScrollAnimation.set(this, CSS.supports("animation-timeline: scroll()"));
    }
    connectedCallback() {
        if (document.getElementById(__classPrivateFieldGet(this, _NidhuggBackToTop_anchorId, "f"))) {
            return;
        }
        document.body.appendChild(__classPrivateFieldGet(this, _NidhuggBackToTop_instances, "m", _NidhuggBackToTop_createElement).call(this));
        __classPrivateFieldGet(this, _NidhuggBackToTop_instances, "m", _NidhuggBackToTop_handleScrollSupport).call(this);
    }
}
_a = NidhuggBackToTop, _NidhuggBackToTop_anchorId = new WeakMap(), _NidhuggBackToTop_anchorClass = new WeakMap(), _NidhuggBackToTop_scrollToId = new WeakMap(), _NidhuggBackToTop_supportsScrollAnimation = new WeakMap(), _NidhuggBackToTop_instances = new WeakSet(), _NidhuggBackToTop_handleScrollSupport = function _NidhuggBackToTop_handleScrollSupport() {
    if (!__classPrivateFieldGet(this, _NidhuggBackToTop_supportsScrollAnimation, "f")) {
        const topScrollEl = document.getElementById(__classPrivateFieldGet(this, _NidhuggBackToTop_scrollToId, "f"));
        const anchor = document.getElementById(__classPrivateFieldGet(this, _NidhuggBackToTop_anchorId, "f"));
        if (!topScrollEl || !anchor) {
            return;
        }
        const browserHeight = window.innerHeight;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    anchor.style.opacity = "1";
                }
                else {
                    anchor.style.opacity = "0";
                }
            });
        }, {
            root: null,
            rootMargin: `${browserHeight}px`,
            threshold: 1,
        });
        observer.observe(topScrollEl);
    }
}, _NidhuggBackToTop_createElement = function _NidhuggBackToTop_createElement() {
    if (!this.getAttribute("scroll-to") || !__classPrivateFieldGet(this, _NidhuggBackToTop_supportsScrollAnimation, "f")) {
        const scrollToEl = document.createElement("span");
        scrollToEl.id = __classPrivateFieldGet(this, _NidhuggBackToTop_scrollToId, "f");
        this.prepend(scrollToEl);
    }
    const scrollToId = this.getAttribute("scroll-to") || __classPrivateFieldGet(this, _NidhuggBackToTop_scrollToId, "f");
    const anchorEl = document.createElement("a");
    anchorEl.innerHTML = `
			<figure>
				<svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24"><path d="M23.71,16.29,15.54,8.12a5,5,0,0,0-7.08,0L.29,16.29a1,1,0,0,0,1.42,1.42L9.88,9.54a3,3,0,0,1,4.24,0l8.17,8.17a1,1,0,0,0,1.42,0A1,1,0,0,0,23.71,16.29Z"/></svg>
				<figcaption>Back to top</figcaption>
			</figure>`;
    anchorEl.href = `#${scrollToId}`;
    anchorEl.id = __classPrivateFieldGet(this, _NidhuggBackToTop_anchorId, "f");
    anchorEl.classList.add(__classPrivateFieldGet(this, _NidhuggBackToTop_anchorClass, "f"));
    if (__classPrivateFieldGet(this, _NidhuggBackToTop_supportsScrollAnimation, "f")) {
        anchorEl.classList.add("nidhugg-back-to-top__anchor--scroll-animation");
    }
    return anchorEl;
};
NidhuggBackToTop.observedAttributes = ["scroll-id"];
(() => {
    customElements.define("nidhugg-back-to-top", _a);
})();
