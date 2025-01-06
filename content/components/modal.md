---
title: Modal •
pageTitle: Modal
description: A basic web component for creating modals.
image: ../public/img/components/modal.webp
date: 2024-12-10
---

A basic web component for creating modals.

## Live Example

<div class="side-by-side">
	<div>
		<button class="btn" onclick="document.getElementById('modal-1').showModal()">Open Modal</button>
		<nidhugg-modal id="modal-1">
			<p>
				Legrasse had one point in advance of Professor Webb, for several among his mongrel prisoners had repeated to him what older
				celebrants had told them the words meant. This text, as given, ran something like this:
			</p>
		</nidhugg-modal>
	</div>
	<div>
		<button class="btn" onclick="document.getElementById('modal-2').showModal()">Open Modal with header</button>
		<nidhugg-modal id="modal-2" heading="My header">
			<p>
				Legrasse had one point in advance of Professor Webb, for several among his mongrel prisoners had repeated to him what older
				celebrants had told them the words meant. This text, as given, ran something like this:
			</p>
			<p>
				Legrasse had one point in advance of Professor Webb, for several among his mongrel prisoners had repeated to him what older
				celebrants had told them the words meant. This text, as given, ran something like this:
			</p>
		</nidhugg-modal>
	</div>
</div>

## How to use

1. Include the script in your HTML file or bundle by importing the `node_modules/@nidhugg/web-components/dist/modal/nidhuggModal.js`-file.
	- _Note:_ The js file is not minified, so ideally you should minify it and add it to your bundle before using it in
		production.
	- _Note:_ If you want to use all components from the package, you can import the `node_modules/@nidhugg/web-components/dist/index.js`-file instead.
2. Add the `nidhugg-modal` element to your HTML file and place the content of the modal inside the tag.
3. Add a button or other element that triggers the `showModal()`-method on the modal element.

```html

<button class="btn" onclick="document.getElementById('modal-1').showModal()">Open Modal</button>

<nidhugg-modal id="modal-1">
	<p>
		Legrasse had one point in advance of Professor Webb, for several among his mongrel prisoners had repeated to him what older celebrants had told them the
		words meant. This text, as given, ran something like this:
	</p>
</nidhugg-modal>
```

If you want the modal to have a header, you can add the `heading`-attribute to the modal element.

```html

<nidhugg-modal id="modal-1" heading="My heading"> ...</nidhugg-modal>
```

## Features

- No shadow DOM
- Close when pressing the escape key
- Closes when clicking outside the modal
- Can be opened via JavaScript
- Emit events when opened, closed, or canceled
- Default styling available

## Installation

The package can be found here: [https://jsr.io/@nidhugg/web-components](https://jsr.io/@nidhugg/web-components), and the code is hosted here:
[https://github.com/fredrikbergqvist/nidhu.gg](https://github.com/fredrikbergqvist/nidhu.gg)

### npm:

```bash
npx jsr add @nidhugg/web-components
```

### Yarn:

```bash
yarn dlx jsr add @nidhugg/web-components
```

### CDN:

- [https://cdn.jsdelivr.net/gh/fredrikbergqvist/nidhu.gg/dist/modal/nidhuggModal.css](https://cdn.jsdelivr.net/gh/fredrikbergqvist/nidhu.gg/dist/modal/nidhuggModal.css)
- [https://cdn.jsdelivr.net/gh/fredrikbergqvist/nidhu.gg/dist/modal/nidhuggModal.js](https://cdn.jsdelivr.net/gh/fredrikbergqvist/nidhu.gg/dist/modal/nidhuggModal.js)

## Styling

The modal is all light DOM so you can style it as usual with CSS.

```css
.nidhugg-modal__dialog {
	/* The dialog element */
}
```

### CSS Custom variables

The modal can be styled using CSS custom variables. The following variables are available:

```css
:root {
	--nidhugg-base-100: #2a303c;
	--nidhugg-base-200: #242933;
	--nidhugg-base-300: #20252e;
	--nidhugg-base-400: #1c212b;
	--nidhugg-base-500: #0f1216;
	--nidhugg-base-content: #fefefe;
	--nidhugg-neutral: #1c212b;
	--nidhugg-neutral-content: #b2ccd6;
	--nidhugg-rounded: 0.5rem;
}
```

The modal will also add the `nidhugg-modal-open`-class to the body when it is open.

```css
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

<nidhugg-modal id="modal-1" open> ...</nidhugg-modal>
```

- `heading`: Adds a heading to the top of the modal.

```html

<nidhugg-modal id="modal-1" heading="My heading"> ...</nidhugg-modal>
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
