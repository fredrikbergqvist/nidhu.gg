"use strict";
/**
 * Custom web component for creating a modal dialog for an image
 * @module
 */
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _NidhuggImageModal_instances, _a, _NidhuggImageModal_modalId, _NidhuggImageModal_dialogClass, _NidhuggImageModal_figureClass, _NidhuggImageModal_modalImageClass, _NidhuggImageModal_captionClass, _NidhuggImageModal_modalOpenClass, _NidhuggImageModal_renderImage, _NidhuggImageModal_populateElements;
/**
 * @class NidhuggImageModal
 * @extends HTMLElement
 * @public
 * @method open - Opens the modal dialog
 * @method showModal - Displays the modal dialog
 * @method close - Closes the modal dialog
 */
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
