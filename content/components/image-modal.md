---
title: Image modal •
pageTitle: Image modal
description: Wrap around one or more images to open in modal.
image: ../public/img/components/image-modal.webp
date: 2025-01-03
---

Wrap around one or more images to open in modal.

## Live examples

<div class="side-by-side">
	<div>
		<p>Horizontal image</p>
		<nidhugg-image-modal>
			<img eleventy:ignore src="/img/components/imageModal/dog.webp" alt="A labradoodle playing on snow" data-caption="Happy dog" loading="lazy" width="2250" height="1500">
		</nidhugg-image-modal>
	</div>
	<div>
		<p>Standing image</p>
		<nidhugg-image-modal>
			<img eleventy:ignore src="/img/components/imageModal/puppy.webp" alt="An adorable puppy" loading="lazy" width="1500" height="1159" data-vertical="true" data-caption="An adorable puppy" >
		</nidhugg-image-modal>
	</div>
	<div>
	<p>Using multiple images</p>
	<nidhugg-image-modal>
		<img eleventy:ignore src="/img/components/imageModal/roses.webp" alt="A picture filled with blossoming, red roses" data-caption="Look at all those pretty roses" loading="lazy" width="2250" height="1500">
		<img eleventy:ignore src="/img/components/imageModal/balloon.jpg" alt="A balloon floating over water on a clear starry night" loading="lazy" width="1929" height="1307">
	</nidhugg-image-modal>
	</div>
</div>

## How to use

1. Include the script in your HTML file by importing the `node_modules/@nidhugg/web-components/dist/imageModal/nidhuggImageModal.js`-file.
	- _Note:_ The js file is not minified, so ideally you should minify it and add it to your bundle before using it in
		production.
	- _Note:_ If you want to use all components from the package, you can import the `node_modules/@nidhugg/web-components/dist/index.js`-file instead.
2. Add the `node_modules/@nidhugg/web-components/dist/imageModal/nidhuggImageModal.css`-file to your HTML file.
3. Add the `nidhugg-image-modal`-tag to your HTML file.
4. Put your img-tags inside the element.

```html

<nidhugg-image-modal>
	<img
		src="roses.webp"
		alt="A picture filled with blossoming, red roses"
		data-caption="Look at all those pretty roses"
		loading="lazy"
		width="2250"
		height="1500"
	/>
	<img src="balloon.jpg" alt="A balloon floating over water on a clear starry night" loading="lazy" width="1929" height="1307" />
</nidhugg-image-modal>
```

### Use via CDN

You can get the latest version of the component and styles by including the following script and stylesheet in the `<head>` of your HTML file.

```html

<html lang="en">
<head>
	<title>My page</title>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/fredrikbergqvist/nidhu.gg/dist/imageModal/nidhuggImageModal.css" />
	<script src="https://cdn.jsdelivr.net/gh/fredrikbergqvist/nidhu.gg/dist/imageModal/nidhuggImageModal.js" defer></script>
</head>
<body>
<nidhugg-image-modal>
	<img
		src="roses.webp"
		alt="A picture filled with blossoming, red roses"
		data-caption="Look at all those pretty roses"
		loading="lazy"
		width="2250"
		height="1500"
	/>
	<img src="balloon.jpg" alt="A balloon floating over water on a clear starry night" loading="lazy" width="1929" height="1307" />
</nidhugg-image-modal>
</body>
</html>
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

## Elements

The component will append a modal element with id `nidhugg-image-modal` to the body when loaded. If more than one `<nidhugg-image-modal>`-tag is used, the
dialog element will still only be appended once.

## Styling

The image modal uses light DOM, so you can style the modal as you would normally style any element using CSS.

The modal has some classes that you can use:

```css
#nidhugg-image-modal {
	/* This is the dialog element ID */
}

.nidhugg-image-modal__dialog {
	/* This is the class of the dialog element */
}

.nidhugg-image-modal__figure {
	/* This is the figure element that wraps around the image */
}

.nidhugg-image-modal__img {
	/* This is the image element in the dialog */
}

.nidhugg-image-modal__img.vertical {
	/* When the data-vertical attribute is set on an image, this class is added */
}
```

If you do not want to style the component yourself, you can use the default styling by including the
`node_modules/@nidhugg/web-components/dist/imageModal/nidhuggImageModal.css` file in your project or look at it for inspiration.

Or insert a bundled version of all CSS files by including the `node_modules/@nidhugg/web-components/dist/index.css` file.

### Global styles and variables

Add `node_modules/@nidhugg/web-components/dist/nidhugg.css` to your page to get the default styling of the modal (and all other components).

The modal will add the `nidhugg-modal-open`-class to the body when it is open. This class is also included in the `nidhugg.css` file, with these styles:

```css
.nidhugg-modal-open {
	overflow: hidden;
	filter: blur(2px);
	height: 100vh;
	width: 100vw;
}
```

#### CSS Custom variables

The modal can be styled using CSS custom variables. The following variables are used in the default styling:

```css
:root {
	--nidhugg-base-100: #2a303c;
	--nidhugg-base-content: #fefefe;
	--nidhugg-rounded: 0.5rem;
}
```
