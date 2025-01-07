# Nidhugg Web Components

A collection of no-dependency, drop-in web components.

## How do I use it?

### Installation

The package can be found here: [https://jsr.io/@nidhugg/web-components](https://jsr.io/@nidhugg/web-components) and the code is hosted here:
[https://github.com/fredrikbergqvist/nidhu.gg](https://github.com/fredrikbergqvist/nidhu.gg)

### npm:

```bash
npx jsr add @nidhugg/web-components
```

### Yarn:

```bash
yarn dlx jsr add @nidhugg/web-components
```

## Basic usage

1. Include the script in your HTML file by importing the `node_modules/@nidhugg/web-components/dist/index.js`-file from node modules.
	- _Note:_ The js file is not minified, so ideally you should minify it and add it to your bundle before using it in
		production, you can also use the minified version `node_modules/@nidhugg/web-components/dist/index.min.js`.
2. Add the `node_modules/@nidhugg/web-components/dist/bundle.css`-file to your HTML file. This file also has a minified version
	 `node_modules/@nidhugg/web-components/dist/bundle.min.css`.
3. Add one of the web components to your HTML file. In the example `<nidhugg-image-modal>` is used.

```html

<html lang="en">
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

### By CDN

You can get the latest version of the components and styles by including the following script and stylesheet in the `<head>` of your HTML file.

```html

<html lang="en">
<head>
	<title>My page</title>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/fredrikbergqvist/nidhu.gg/dist/bundle.min.css" />
	<script src="https://cdn.jsdelivr.net/gh/fredrikbergqvist/nidhu.gg/dist/index.min.js" defer></script>
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

## Styling

The components make use of the following CSS variables for easy customization:

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

## Online documentation

Have a look at the [documentation](https://nidhu.gg) for more information.
