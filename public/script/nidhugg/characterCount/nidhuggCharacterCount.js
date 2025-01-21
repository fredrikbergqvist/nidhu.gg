"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _NidhuggTextCountTracker_instances, _a, _NidhuggTextCountTracker_InputEl_get, _NidhuggTextCountTracker_CharacterCount_get, _NidhuggTextCountTracker_CharacterCountElement_get, _NidhuggTextCountTracker_MaxLength_get, _NidhuggTextCountTracker_UpdateCount;
/**
 * Adds a text count to the input or textarea element
 * @module
 */
/**
 * @class NidhuggCharacterCount
 * @extends HTMLElement
 * @description Adds a text count to the input or textarea element
 *
 * @public
 * @property maxlength - Max length allowed for the input
 *
 */
class NidhuggTextCountTracker extends HTMLElement {
    constructor() {
        super();
        _NidhuggTextCountTracker_instances.add(this);
    }
    populateElements() {
        const divElement = document.createElement("div");
        divElement.id = "characterCount";
        divElement.classList.add("nidhugg-character-count");
        divElement.textContent = `${__classPrivateFieldGet(this, _NidhuggTextCountTracker_instances, "a", _NidhuggTextCountTracker_CharacterCount_get)}${__classPrivateFieldGet(this, _NidhuggTextCountTracker_instances, "a", _NidhuggTextCountTracker_MaxLength_get) ? "/" + __classPrivateFieldGet(this, _NidhuggTextCountTracker_instances, "a", _NidhuggTextCountTracker_MaxLength_get) : ""} characters`;
        this.append(divElement);
        if (__classPrivateFieldGet(this, _NidhuggTextCountTracker_instances, "a", _NidhuggTextCountTracker_InputEl_get)) {
            __classPrivateFieldGet(this, _NidhuggTextCountTracker_instances, "a", _NidhuggTextCountTracker_InputEl_get).addEventListener("input", __classPrivateFieldGet(this, _NidhuggTextCountTracker_instances, "m", _NidhuggTextCountTracker_UpdateCount).bind(this));
        }
    }
    connectedCallback() {
        this.populateElements();
    }
}
_a = NidhuggTextCountTracker, _NidhuggTextCountTracker_instances = new WeakSet(), _NidhuggTextCountTracker_InputEl_get = function _NidhuggTextCountTracker_InputEl_get() {
    const textArea = this.querySelector("textarea");
    if (textArea) {
        return textArea;
    }
    const inputElement = this.querySelector("input");
    if (inputElement) {
        return inputElement;
    }
    console.warn("No input or textarea element found to track text count");
}, _NidhuggTextCountTracker_CharacterCount_get = function _NidhuggTextCountTracker_CharacterCount_get() {
    if (!__classPrivateFieldGet(this, _NidhuggTextCountTracker_instances, "a", _NidhuggTextCountTracker_InputEl_get)) {
        return 0;
    }
    return __classPrivateFieldGet(this, _NidhuggTextCountTracker_instances, "a", _NidhuggTextCountTracker_InputEl_get).value.length;
}, _NidhuggTextCountTracker_CharacterCountElement_get = function _NidhuggTextCountTracker_CharacterCountElement_get() {
    return this.querySelector("#characterCount");
}, _NidhuggTextCountTracker_MaxLength_get = function _NidhuggTextCountTracker_MaxLength_get() {
    return this.getAttribute("maxlength");
}, _NidhuggTextCountTracker_UpdateCount = function _NidhuggTextCountTracker_UpdateCount() {
    if (!__classPrivateFieldGet(this, _NidhuggTextCountTracker_instances, "a", _NidhuggTextCountTracker_CharacterCountElement_get)) {
        return;
    }
    __classPrivateFieldGet(this, _NidhuggTextCountTracker_instances, "a", _NidhuggTextCountTracker_CharacterCountElement_get).textContent = `${__classPrivateFieldGet(this, _NidhuggTextCountTracker_instances, "a", _NidhuggTextCountTracker_CharacterCount_get)}${__classPrivateFieldGet(this, _NidhuggTextCountTracker_instances, "a", _NidhuggTextCountTracker_MaxLength_get) ? "/" + __classPrivateFieldGet(this, _NidhuggTextCountTracker_instances, "a", _NidhuggTextCountTracker_MaxLength_get) : ""} characters`;
};
(() => {
    customElements.define("nidhugg-character-count", _a);
})();
NidhuggTextCountTracker.observedAttributes = ["maxlength"];
