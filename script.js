function hexToRGB(hex) {
	let sanitizedHex = hex.replace(/^#/, '');
	let r = parseInt(sanitizedHex.substring(0, 2), 16);
	let g = parseInt(sanitizedHex.substring(2, 4), 16);
	let b = parseInt(sanitizedHex.substring(4, 6), 16);
	return { r: r, g: g, b: b };
}
function blendColors(color1, color2, midpoints) {
	let steps = midpoints + 1;
	let step = {
		r: (color2.r - color1.r) / steps,
		g: (color2.g - color1.g) / steps,
		b: (color2.b - color1.b) / steps,
	};
	let blendedColors = [];
	blendedColors.push(color1);
	for (let i = 0; i < steps; i++) {
		let blendedColor = {
			r: Math.round(color1.r + step.r * (i + 1)),
			g: Math.round(color1.g + step.g * (i + 1)),
			b: Math.round(color1.b + step.b * (i + 1)),
		};
		blendedColors.push(blendedColor);
	}
	blendedColors.push(color2);
	return blendedColors;
}
function drawPalette(event) {
	event.preventDefault();
	let color1Input = document.getElementById('input0');
	let color2Input = document.getElementById('input1');
	let stepsSelect = document.getElementById('steps');
	let color1 = hexToRGB(color1Input.value);
	let color2 = hexToRGB(color2Input.value);
	let midpoints = parseInt(stepsSelect.value);
	if (validateHex(color1Input.value) && validateHex(color2Input.value)) {
		let blendedColors = blendColors(color1, color2, midpoints);
		for (let i = 0; i <= (midpoints+1); i++) {
			let paletteInput = document.getElementById("pal".concat(i));
			let paletteColor = document.getElementById("p".concat(i));
			let blendedColor = blendedColors[i];
			let hexColor = rgbToHex(blendedColor.r, blendedColor.g, blendedColor.b);
			paletteInput.value = hexColor;
			paletteColor.style.backgroundColor = hexColor;
			// Clear previous content of the palette div
			paletteColor.innerHTML = '';
			// Create a color preview square
			let colorPreview = document.createElement('div');
			colorPreview.className = 'color-preview';
			colorPreview.style.backgroundColor = hexColor;
			// Append the color preview to the palette div
			paletteColor.appendChild(colorPreview);
		}
	}
	else {
		alert('Please enter valid hex color values.');
	}
}
function validateHex(hex) {
	let regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
	return regex.test(hex);
}
function rgbToHex(r, g, b) {
	let componentToHex = function (c) {
		let hex = c.toString(16);
		return hex.length === 1 ? '0' + hex : hex;
	};
	return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}