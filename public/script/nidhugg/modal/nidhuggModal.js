"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _NidhuggModal_modalOpenClass, _NidhuggModal_dialogClass, _NidhuggModal_headerClass, _NidhuggModal_headingClass, _NidhuggModal_closeBtnClass, _NidhuggModal_mainClass, _NidhuggModal_noHeadingClass;
/**
 * @class NidhuggModal
 * @extends HTMLElement
 * @description Custom element for creating a modal dialog
 * @example
 * <nidhugg-modal>
 *   <h2 slot="header">Modal Header</h2>
 *   <p slot="content">Modal Content</p>
 *   <button slot="footer">Close</button>
 * </nidhugg-modal>
 *
 * @public
 * @method open - Opens the modal dialog
 * @method showModal - Displays the modal dialog
 * @method close - Closes the modal dialog
 * @property string heading - The heading text for the modal dialog
 * @property boolean open - Whether the modal dialog is open
 *
 */
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
				<button class="${__classPrivateFieldGet(this, _NidhuggModal_closeBtnClass, "f")}" type="submit" title="Close modal" autofocus>x</button>
			</form>`;
        if (headingText) {
            header.appendChild(headingEl);
        }
        else {
            header.classList.add(__classPrivateFieldGet(this, _NidhuggModal_noHeadingClass, "f"));
        }
        const main = document.createElement("main");
        main.classList.add(__classPrivateFieldGet(this, _NidhuggModal_mainClass, "f"));
        main.append(...content);
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
