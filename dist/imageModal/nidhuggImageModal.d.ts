interface INidhuggImageModal extends HTMLElement {
	open: () => void;
	showModal: () => void;
	close: () => void;
}

interface Window {
	NidhuggImageModal: INidhuggImageModal;
}
interface HTMLElementTagNameMap {
	"nidhugg-image-modal": INidhuggImageModal;
}
