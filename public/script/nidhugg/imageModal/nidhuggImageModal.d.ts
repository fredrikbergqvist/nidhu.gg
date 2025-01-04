interface INidhuggImageModal extends HTMLElement {
	open: () => void;
	showModal: () => void;
	close: () => void;
}

interface Window {
	NidhuggImageModal: INidhuggImageModal; // if you register your element in global scope
}
interface HTMLElementTagNameMap {
	"nidhugg-image-modal": INidhuggImageModal | null;
}
