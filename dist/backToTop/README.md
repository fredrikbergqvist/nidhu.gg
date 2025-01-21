# Nidhugg Modal

A basic web component for creating image modals.

Online documentation here: [https://nidhu.gg/components/back-to-top/](https://nidhu.gg/components/back-to-top/)

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

### CDN:

- [https://cdn.jsdelivr.net/gh/fredrikbergqvist/nidhu.gg/dist/backToTop/nidhuggBackToTop.css](https://cdn.jsdelivr.net/gh/fredrikbergqvist/nidhu.gg/dist/backToTop/nidhuggBackToTop.css)
- [https://cdn.jsdelivr.net/gh/fredrikbergqvist/nidhu.gg/dist/backToTop/nidhuggBackToTop.js](https://cdn.jsdelivr.net/gh/fredrikbergqvist/nidhu.gg/dist/backToTop/nidhuggBackToTop.js)

## Basic usage

1. Include the script in your HTML file by importing the `node_modules/@nidhugg/web-components/dist/backToTop/nidhuggBackToTop.js`-file from node modules.
	- _Note:_ The js file is not minified, so ideally you should minify it and add it to your bundle before using it in
		production.
	- _Note:_ If you want to use all components from the package, you can import the `node_modules/@nidhugg/web-components/dist/index.js`-file instead.
2. Add the `node_modules/@nidhugg/web-components/dist/index.css`-file to your HTML file.
3. Add the `nidhugg-back-to-top`-tag to your HTML file.
4. Put your img-tags inside the element.

```html

<html lang="en">
<head>
	<title>My page</title>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/fredrikbergqvist/nidhu.gg/dist/backToTop/nidhuggBackToTop.css" />
	<script src="https://cdn.jsdelivr.net/gh/fredrikbergqvist/nidhu.gg/dist/backToTop/nidhuggBackToTop.js" defer></script>
</head>
<body>
<nidhugg-back-to-top>
	<div style="height:400vh">
		<p>Lots of great content...</p>
	</div>
</nidhugg-back-to-top>
</body>
</html>
```

### GitHub:

[https://github.com/fredrikbergqvist/nidhu.gg](https://github.com/fredrikbergqvist/nidhu.gg)
