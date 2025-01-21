# Nidhugg Modal

A basic web component for creating modals.

Online documentation here: [https://nidhu.gg/components/modal/](https://nidhu.gg/components/modal/)

## Installation

The package can be found here: https://jsr.io/@nidhugg/web-components

### npm:

```bash
npx jsr add @nidhugg/web-components
```

### Yarn:

```bash
yarn dlx jsr add @nidhugg/web-components
```

### GitHub:

[https://github.com/fredrikbergqvist/nidhu.gg](https://github.com/fredrikbergqvist/nidhu.gg)

## Basic usage

1. Include the script in your HTML file by importing the `node_modules/@nidhugg/web-components/dist/imageModal/nidhuggModal.js`-file from node modules.
   - _Note:_ The js file is not minified, so ideally you should minify it and add it to your bundle before using it in
     production.
   - _Note:_ If you want to use all components from the package, you can import the `node_modules/@nidhugg/web-components/dist/index.js`-file instead.
2. Add the `modal` element to your HTML file.
3. Add content to the modal using the `header`, `content`, and `footer` slots.

```html
<nidhugg-modal id="modal-1">
	<h2 slot="header">Hello World</h2>
	<p slot="content">This is a test of the Nidhugg Modal</p>
	<button slot="footer" onclick="document.getElementById('modal-1').close()">Close</button>
</nidhugg-modal>
```

## Styling

### CSS Custom variables

The modal can be styled using CSS custom variables. The following variables are available:

```css
:root {
	--nidhugg-base-100: #2a303c;
	--nidhugg-base-200: #242933;
	--nidhugg-base-300: #20252e;
	--nidhugg-base-content: #fefefe;
	--nidhugg-neutral: #1c212b;
	--nidhugg-neutral-content: #fefefe;
	--nidhugg-rounded: 0.5rem;
}
```

Slot content will be styled by the stylesheet on the website.

The modal will also add the `nidhugg-modal-open`-class to the body when it is open.

```css
/* Example: */
.nidhugg-modal-open {
	overflow: hidden;
	filter: blur(2px);
	height: 100vh;
	width: 100vw;
}
```

## Attributes

- `open`: Opens the modal when the attribute is present.

```html
<nidhugg-modal id="modal-1" open>
	<h2 slot="header">Hello World</h2>
	<p slot="content">This is a test of the Nidhugg Modal</p>
	<button slot="footer" onclick="document.getElementById('modal-1').close()">Close</button>
</nidhugg-modal>
```

## Methods

The modal has three methods, two inherited from the Modal element:

- `showModal()`: Opens the modal
- `close()`: Closes the modal

I also added a `open()`-method that can be used to open the modal.

```javascript
//Open, no difference between the methods
document.getElementById("modal-1").open();
document.getElementById("modal-1").showModal();

//Close
document.getElementById("modal-1").close();
```

## Events

### open

The `open`-event is fired when the modal is opened.

```javascript
document.getElementById("modal-1").addEventListener("open", () => {
	console.log("Modal opened");
});
```

### close

The `close`-event is fired when the modal is closed.

```javascript
document.getElementById("modal-1").addEventListener("close", () => {
	console.log("Modal closed");
});
```

### cancel

The `cancel`-event is fired when the modal is closed by pressing the escape key. It is followed by the `close`-event.

```javascript
document.getElementById("modal-1").addEventListener("cancel", () => {
	console.log("Modal canceled");
});
```
