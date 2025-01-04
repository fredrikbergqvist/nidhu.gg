# Nidhugg Modal

A basic web component for creating image modals.

Online documentation here: [https://nidhu.gg/components/image-modal/](https://nidhu.gg/components/image-modal/)

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

1. Include the script in your HTML file by importing the `node_modules/@nidhugg/web-components/dist/imageModal/nidhuggImageModal.js`-file from node modules.
	- _Note:_ The js file is not minified, so ideally you should minify it and add it to your bundle before using it in
		production.
	- _Note:_ If you want to use all components from the package, you can import the `node_modules/@nidhugg/web-components/dist/index.js`-file instead.
2. Add the `node_modules/@nidhugg/web-components/dist/imageModal/nidhuggImageModal.css`-file to your HTML file.
3. Add the `nidhugg-image-modal`-tag to your HTML file.
4. Put your img-tags inside the element.

```html

<nidhugg-image-modal>
	<img src="roses.webp" alt="A picture filled with blossoming, red roses" data-caption="Look at all those pretty roses" loading="lazy" width="2250" height="1500">
	<img src="balloon.jpg" alt="A balloon floating over water on a clear starry night" loading="lazy" width="1929" height="1307">
</nidhugg-image-modal>
```
