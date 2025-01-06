---
title: Back-to-top button
description: Wrap around the main part of your page to add a back-to-top button.
image: ../public/img/components/back-to-top.png
date: 2025-01-05
---

Wrap around the main part of your page to add a back-to-top button.

## How to use

Install the package or use the CDN, then add the files to the head of your HTML file.

Wrap the main content portion of your page in the `<nidhugg-back-to-top>` tag.

By default, the browser will scroll up to the start of the `<nidhugg-back-to-top>` tag when clicked.

If you wish to use a different ID to link to, you can add the `scroll-to` attribute to the `<nidhugg-back-to-top>` tag like this:
`<nidhugg-back-to-top scroll-to="someId">`

### Example

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

### Live example

Scroll down on this page to see the back-to-top button in action.

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

- [https://cdn.jsdelivr.net/gh/fredrikbergqvist/nidhu.gg/dist/backToTop/nidhuggBackToTop.css](https://cdn.jsdelivr.net/gh/fredrikbergqvist/nidhu.gg/dist/backToTop/nidhuggBackToTop.css)
- [https://cdn.jsdelivr.net/gh/fredrikbergqvist/nidhu.gg/dist/backToTop/nidhuggBackToTop.js](https://cdn.jsdelivr.net/gh/fredrikbergqvist/nidhu.gg/dist/backToTop/nidhuggBackToTop.js)

## Styling

There is not a lot to style, but if you want to tweak the default colors, you can do so by overriding the following CSS variables:

```css
:root {
	--nidhugg-base-content: #fefefe; /*Used for the background and text color*/
	--nidhugg-base-500: #0f1216; /*Fill color in the SVG up arrow*/
}
```

If you prefer to style the button itself, you can do so by targeting the `nidhugg-back-to-top` tag, or these CSS classes.

```css
nidhugg-back-to-top,
#nidhugg-back-to-top,
.nidhugg-back-to-top_anchor {
	/*These all target the same element*/

	&.nidhugg-scroll-animation {
		/*
		  This class is added if the browser supports CSS Scroll animation
		  https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline
		*/
	}
}
```
