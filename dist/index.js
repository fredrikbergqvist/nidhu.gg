"use strict";

var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _NidhuggBackToTop_instances, _a, _NidhuggBackToTop_anchorId, _NidhuggBackToTop_anchorClass, _NidhuggBackToTop_scrollToId, _NidhuggBackToTop_supportsScrollAnimation, _NidhuggBackToTop_handleScrollSupport, _NidhuggBackToTop_createElement;

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

"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _TextCountTracker_instances, _a, _TextCountTracker_InputEl_get, _TextCountTracker_CharacterCount_get, _TextCountTracker_CharacterCountElement_get, _TextCountTracker_MaxLength_get, _TextCountTracker_UpdateCount;

class TextCountTracker extends HTMLElement {
    constructor() {
        super();
        _TextCountTracker_instances.add(this);
    }
    populateElements() {
        const divElement = document.createElement("div");
        divElement.id = "characterCount";
        divElement.classList.add("nidhugg-character-count");
        divElement.textContent = `${__classPrivateFieldGet(this, _TextCountTracker_instances, "a", _TextCountTracker_CharacterCount_get)}${__classPrivateFieldGet(this, _TextCountTracker_instances, "a", _TextCountTracker_MaxLength_get) ? "/" + __classPrivateFieldGet(this, _TextCountTracker_instances, "a", _TextCountTracker_MaxLength_get) : ""} characters`;
        this.append(divElement);
        if (__classPrivateFieldGet(this, _TextCountTracker_instances, "a", _TextCountTracker_InputEl_get)) {
            __classPrivateFieldGet(this, _TextCountTracker_instances, "a", _TextCountTracker_InputEl_get).addEventListener("input", __classPrivateFieldGet(this, _TextCountTracker_instances, "m", _TextCountTracker_UpdateCount).bind(this));
        }
    }
    connectedCallback() {
        this.populateElements();
    }
}
_a = TextCountTracker, _TextCountTracker_instances = new WeakSet(), _TextCountTracker_InputEl_get = function _TextCountTracker_InputEl_get() {
    const textArea = this.querySelector("textarea");
    if (textArea) {
        return textArea;
    }
    const inputElement = this.querySelector("input");
    if (inputElement) {
        return inputElement;
    }
    console.warn("No input or textarea element found to track text count");
}, _TextCountTracker_CharacterCount_get = function _TextCountTracker_CharacterCount_get() {
    if (!__classPrivateFieldGet(this, _TextCountTracker_instances, "a", _TextCountTracker_InputEl_get)) {
        return 0;
    }
    return __classPrivateFieldGet(this, _TextCountTracker_instances, "a", _TextCountTracker_InputEl_get).value.length;
}, _TextCountTracker_CharacterCountElement_get = function _TextCountTracker_CharacterCountElement_get() {
    return this.querySelector("#characterCount");
}, _TextCountTracker_MaxLength_get = function _TextCountTracker_MaxLength_get() {
    return this.getAttribute("maxlength");
}, _TextCountTracker_UpdateCount = function _TextCountTracker_UpdateCount() {
    if (!__classPrivateFieldGet(this, _TextCountTracker_instances, "a", _TextCountTracker_CharacterCountElement_get)) {
        return;
    }
    __classPrivateFieldGet(this, _TextCountTracker_instances, "a", _TextCountTracker_CharacterCountElement_get).textContent = `${__classPrivateFieldGet(this, _TextCountTracker_instances, "a", _TextCountTracker_CharacterCount_get)}${__classPrivateFieldGet(this, _TextCountTracker_instances, "a", _TextCountTracker_MaxLength_get) ? "/" + __classPrivateFieldGet(this, _TextCountTracker_instances, "a", _TextCountTracker_MaxLength_get) : ""} characters`;
};
(() => {
    customElements.define("nidhugg-character-count", _a);
})();
TextCountTracker.observedAttributes = ["maxlength"];
export default TextCountTracker;

"use strict";

var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _NidhuggImageModal_instances, _a, _NidhuggImageModal_modalId, _NidhuggImageModal_dialogClass, _NidhuggImageModal_figureClass, _NidhuggImageModal_modalImageClass, _NidhuggImageModal_captionClass, _NidhuggImageModal_modalOpenClass, _NidhuggImageModal_renderImage, _NidhuggImageModal_populateElements;

class NidhuggImageModal extends HTMLElement {
    constructor() {
        super();
        _NidhuggImageModal_instances.add(this);
        _NidhuggImageModal_modalId.set(this, "nidhugg-image-modal");
        _NidhuggImageModal_dialogClass.set(this, `${__classPrivateFieldGet(this, _NidhuggImageModal_modalId, "f")}__dialog`);
        _NidhuggImageModal_figureClass.set(this, `${__classPrivateFieldGet(this, _NidhuggImageModal_modalId, "f")}__figure`);
        _NidhuggImageModal_modalImageClass.set(this, `${__classPrivateFieldGet(this, _NidhuggImageModal_modalId, "f")}__img`);
        _NidhuggImageModal_captionClass.set(this, `${__classPrivateFieldGet(this, _NidhuggImageModal_modalId, "f")}__caption`);
        _NidhuggImageModal_modalOpenClass.set(this, "nidhugg-modal-open");
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
        return document.getElementById(__classPrivateFieldGet(this, _NidhuggImageModal_modalId, "f"));
    }
    open() {
        this.showModal();
    }
    showModal() {
        const dialog = this.Dialog;
        if (dialog) {
            dialog.showModal();
            document.body.classList.add(__classPrivateFieldGet(this, _NidhuggImageModal_modalOpenClass, "f"));
        }
    }
    close() {
        const dialog = this.Dialog;
        if (dialog) {
            dialog.style.opacity = "0";
            dialog.style.transform = "scale(0)";
            setTimeout(() => {
                document.body.classList.remove(__classPrivateFieldGet(this, _NidhuggImageModal_modalOpenClass, "f"));
                dialog.style.opacity = "";
                dialog.style.transform = "";
                dialog.close();
            }, 200);
        }
    }
    connectedCallback() {
        __classPrivateFieldGet(this, _NidhuggImageModal_instances, "m", _NidhuggImageModal_populateElements).call(this);
        const dialogEl = this.Dialog;
        dialogEl === null || dialogEl === void 0 ? void 0 : dialogEl.addEventListener("cancel", (event) => {
            event.preventDefault();
            this.close();
        });
        dialogEl === null || dialogEl === void 0 ? void 0 : dialogEl.addEventListener("close", (event) => {
            event.preventDefault();
            this.close();
        });
        dialogEl === null || dialogEl === void 0 ? void 0 : dialogEl.addEventListener("mousedown", (event) => {
            event.preventDefault();
            if (event.target === dialogEl) {
                this.close();
            }
        });
        const images = this.querySelectorAll("img");
        images.forEach((img) => {
            img.addEventListener("click", () => {
                __classPrivateFieldGet(this, _NidhuggImageModal_instances, "m", _NidhuggImageModal_renderImage).call(this, img);
                this.showModal();
            });
        });
    }
    attributeChangedCallback(name, oldValue, newValue) {
        var _b;
        if (name === "open") {
            if (this.hasAttribute("open")) {
                return (_b = this.Dialog) === null || _b === void 0 ? void 0 : _b.showModal();
            }
        }
    }
}
_a = NidhuggImageModal, _NidhuggImageModal_modalId = new WeakMap(), _NidhuggImageModal_dialogClass = new WeakMap(), _NidhuggImageModal_figureClass = new WeakMap(), _NidhuggImageModal_modalImageClass = new WeakMap(), _NidhuggImageModal_captionClass = new WeakMap(), _NidhuggImageModal_modalOpenClass = new WeakMap(), _NidhuggImageModal_instances = new WeakSet(), _NidhuggImageModal_renderImage = function _NidhuggImageModal_renderImage(img) {
    var _b, _c, _d;
    const figure = document.createElement("figure");
    figure.classList.add(__classPrivateFieldGet(this, _NidhuggImageModal_figureClass, "f"));
    const dialogImg = document.createElement("img");
    dialogImg.setAttribute("alt", img.getAttribute("alt") || "");
    dialogImg.setAttribute("height", img.getAttribute("height") || "");
    dialogImg.setAttribute("width", img.getAttribute("width") || "");
    dialogImg.setAttribute("src", img.getAttribute("src") || "");
    dialogImg.classList.add(__classPrivateFieldGet(this, _NidhuggImageModal_modalImageClass, "f"));
    figure.appendChild(dialogImg);
    const caption = document.createElement("figcaption");
    if (img.dataset.caption) {
        caption.innerHTML = img.dataset.caption;
        figure.appendChild(caption);
    }
    const oldFigure = (_b = this.Dialog) === null || _b === void 0 ? void 0 : _b.querySelector(`.${__classPrivateFieldGet(this, _NidhuggImageModal_figureClass, "f")}`);
    if (oldFigure) {
        return (_c = this.Dialog) === null || _c === void 0 ? void 0 : _c.replaceChild(figure, oldFigure);
    }
    (_d = this.Dialog) === null || _d === void 0 ? void 0 : _d.appendChild(figure);
}, _NidhuggImageModal_populateElements = function _NidhuggImageModal_populateElements() {
    if (this.Dialog) {
        return;
    }
    const imageDialogEl = document.createElement("dialog");
    imageDialogEl.classList.add(__classPrivateFieldGet(this, _NidhuggImageModal_dialogClass, "f"));
    imageDialogEl.id = __classPrivateFieldGet(this, _NidhuggImageModal_modalId, "f");
    imageDialogEl.innerHTML = ``;
    document.body.appendChild(imageDialogEl);
};
NidhuggImageModal.observedAttributes = [];
(() => {
    customElements.define("nidhugg-image-modal", _a);
})();

"use strict";

var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _NidhuggModal_modalOpenClass, _NidhuggModal_dialogClass, _NidhuggModal_headerClass, _NidhuggModal_headingClass, _NidhuggModal_closeBtnClass, _NidhuggModal_mainClass, _NidhuggModal_noHeadingClass;

class NidhuggModal extends HTMLElement {
    constructor() {
        super();
        _NidhuggModal_modalOpenClass.set(this, "nidhugg-modal-open");
        _NidhuggModal_dialogClass.set(this, "nidhugg-modal__dialog");
        _NidhuggModal_headerClass.set(this, "nidhugg-modal__header");
        _NidhuggModal_headingClass.set(this, "nidhugg-modal__heading");
        _NidhuggModal_closeBtnClass.set(this, "nidhugg-modal__close-btn");
        _NidhuggModal_mainClass.set(this, "nidhugg-modal__main");
        _NidhuggModal_noHeadingClass.set(this, __classPrivateFieldGet(this, _NidhuggModal_headingClass, "f") + "--no-heading");
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
        return this.querySelector(`dialog.${__classPrivateFieldGet(this, _NidhuggModal_dialogClass, "f")}`);
    }
    open() {
        this.showModal();
    }
    showModal() {
        const dialog = this.Dialog;
        if (dialog) {
            dialog.showModal();
            document.body.classList.add(__classPrivateFieldGet(this, _NidhuggModal_modalOpenClass, "f"));
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
                dialog.removeAttribute("open");
                document.body.classList.remove(__classPrivateFieldGet(this, _NidhuggModal_modalOpenClass, "f"));
                dialog.style.opacity = "";
                dialog.style.transform = "";
            }, 300);
        }
    }
    populateElements() {
        const headingText = this.getAttribute("heading");
        const content = this.childNodes;
        const dialogElement = document.createElement("dialog");
        dialogElement.classList.add(__classPrivateFieldGet(this, _NidhuggModal_dialogClass, "f"));
        const headingEl = document.createElement("h2");
        headingEl.classList.add(__classPrivateFieldGet(this, _NidhuggModal_headingClass, "f"));
        headingEl.textContent = headingText || "";
        const header = document.createElement("header");
        header.classList.add(__classPrivateFieldGet(this, _NidhuggModal_headerClass, "f"));
        header.innerHTML = `
			<form formmethod="dialog">
				<button class="${__classPrivateFieldGet(this, _NidhuggModal_closeBtnClass, "f")}" type="submit" title="Close modal" autofocus>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M18 6a1 1 0 0 0-1.414 0L12 10.586 7.414 6A1 1 0 0 0 6 6a1 1 0 0 0 0 1.414L10.586 12 6 16.586A1 1 0 0 0 6 18a1 1 0 0 0 1.414 0L12 13.414 16.586 18A1 1 0 0 0 18 18a1 1 0 0 0 0-1.414L13.414 12 18 7.414A1 1 0 0 0 18 6Z"/></svg>
				</button>
			</form>`;
        if (headingText) {
            header.appendChild(headingEl);
        }
        else {
            header.classList.add(__classPrivateFieldGet(this, _NidhuggModal_noHeadingClass, "f"));
        }
        const main = document.createElement("main");
        main.classList.add(__classPrivateFieldGet(this, _NidhuggModal_mainClass, "f"));
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
        dialogEl === null || dialogEl === void 0 ? void 0 : dialogEl.addEventListener("cancel", (event) => {
            event.preventDefault();
            this.close();
            this.dispatchEvent(this.cancelEvent);
        });
        dialogEl === null || dialogEl === void 0 ? void 0 : dialogEl.addEventListener("close", (event) => {
            event.preventDefault();
            this.close();
            this.dispatchEvent(this.closeEvent);
        });
        dialogEl === null || dialogEl === void 0 ? void 0 : dialogEl.addEventListener("mousedown", (event) => {
            event.preventDefault();
            if (event.target === dialogEl) {
                this.close();
            }
        });
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "open") {
            if (this.hasAttribute("open")) {
                return this.showModal();
            }
        }
    }
}
_a = NidhuggModal, _NidhuggModal_modalOpenClass = new WeakMap(), _NidhuggModal_dialogClass = new WeakMap(), _NidhuggModal_headerClass = new WeakMap(), _NidhuggModal_headingClass = new WeakMap(), _NidhuggModal_closeBtnClass = new WeakMap(), _NidhuggModal_mainClass = new WeakMap(), _NidhuggModal_noHeadingClass = new WeakMap();
NidhuggModal.observedAttributes = ["open", "heading"];
(() => {
    customElements.define("nidhugg-modal", _a);
})();

