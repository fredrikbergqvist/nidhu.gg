---
title: Input character counter •
pageTitle: Character counter
description: Wrap around the main part of your page to add a back-to-top button.
image: ../public/img/components/character-count.webp
date: 2025-01-21
---

Wrap around a textarea or input to add a character counter below it.

### Live example

<nidhugg-character-count maxlength="50">
	<textarea>Lorem ipsum dolor sit amet...</textarea>
</nidhugg-character-count>

## How to use

Install the package or use the CDN, then add the files to the head of your HTML file.

Wrap the `<nidhugg-char-count>` tag around a `textarea` or `input`.

You can also add a maxlength attribute to the tag to set the maximum number of characters allowed.
`<nidhugg-char-count maxlength="50">`

### Example

```html

<nidhugg-char-count maxlength="50">
	<textarea>Lorem ipsum dolor sit amet...</textarea>
	</nidhugg-character-count>
```

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

- [https://cdn.jsdelivr.net/gh/fredrikbergqvist/nidhu.gg/dist/backToTop/nidhuggCharacterCount.css](https://cdn.jsdelivr.net/gh/fredrikbergqvist/nidhu.gg/dist/backToTop/nidhuggBackToTop.css)
- [https://cdn.jsdelivr.net/gh/fredrikbergqvist/nidhu.gg/dist/backToTop/nidhuggCharacterCount.js](https://cdn.jsdelivr.net/gh/fredrikbergqvist/nidhu.gg/dist/backToTop/nidhuggBackToTop.js)

## Styling

The counter element has a class that can be targeted `nidhugg-character-counter`

```css
.nidhugg-character-counter {
	/** Custom styles **/
}
```
