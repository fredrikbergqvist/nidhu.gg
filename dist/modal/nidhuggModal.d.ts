interface INidhuggModal extends HTMLElement {
	open: () => void;
	showModal: () => void;
	close: () => void;
}

interface Window {
	NidhuggModal: INidhuggModal;
}
interface HTMLElementTagNameMap {
	"nidhugg-modal": INidhuggModal;
}
