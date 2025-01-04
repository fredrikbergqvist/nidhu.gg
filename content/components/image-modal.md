---
title: Image modal
description: Wrap around one or more images to open in modal.
image: ../public/img/components/modal.png
date: 2025-01-03
---

Wrap around one or more images to open in modal.

## Examples

**Using one image**

Horizontal image

<nidhugg-image-modal>
	<img eleventy:ignore src="/img/components/imageModal/dog.webp" alt="A labradoodle playing on snow" data-caption="Happy dog" loading="lazy" width="2250" height="1500">
</nidhugg-image-modal>

Standing image

<nidhugg-image-modal>
	<img eleventy:ignore src="/img/components/imageModal/puppy.webp" alt="An adorable puppy" loading="lazy" width="1500" height="1159" data-vertical="true">
</nidhugg-image-modal>


**Using multiple images**

<nidhugg-image-modal>
	<img eleventy:ignore src="/img/components/imageModal/roses.webp" alt="A picture filled with blossoming, red roses" data-caption="Look at all those pretty roses" loading="lazy" width="2250" height="1500">
	<img eleventy:ignore src="/img/components/imageModal/balloon.jpg" alt="A balloon floating over water on a clear starry night" loading="lazy" width="1929" height="1307">
</nidhugg-image-modal>

## Basic usage

1. Include the script in your HTML file by importing the `modal.js` file.
	- _Note:_ The js file is not minified, so ideally you should minify it and add it to your bundle before using it in
		production.
2. Add the `nidhugg-image-modal`-tag to your HTML file.
3. Put your img-tags inside the element.

```html
<nidhugg-image-modal>
	<img src="roses.webp" alt="A picture filled with blossoming, red roses" data-caption="Look at all those pretty roses" loading="lazy" width="2250" height="1500">
	<img src="balloon.jpg" alt="A balloon floating over water on a clear starry night" loading="lazy" width="1929" height="1307">
</nidhugg-image-modal>
```

## Elements

The component will append a modal element with id `nidhugg-image-modal` to the body when loaded. If more than one `<nidhugg-image-modal>`-tag is used, the dialog element will still only be appended once.

## Styling

The image modal uses light DOM, so you can style the modal as you would normally style any element using CSS.

The modal has some classes that you can use:

```css
#nidhugg-image-modal{
	/* This is the dialog elements ID */
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
