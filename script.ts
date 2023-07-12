interface RGBColor {
	r: number;
	g: number;
	b: number;
}

function hexToRGB(hex: string): RGBColor {
	const sanitizedHex = hex.replace(/^#/, '');
	const r = parseInt(sanitizedHex.substring(0, 2), 16);
	const g = parseInt(sanitizedHex.substring(2, 4), 16);
	const b = parseInt(sanitizedHex.substring(4, 6), 16);
	return { r, g, b };
}

function blendColors(color1: RGBColor, color2: RGBColor, midpoints: number): RGBColor[] {
	const steps = midpoints + 1;
	const step: RGBColor = {
		r: (color2.r - color1.r) / steps,
		g: (color2.g - color1.g) / steps,
		b: (color2.b - color1.b) / steps,
	};

	const blendedColors: RGBColor[] = [];
	for (let i = 0; i < steps; i++) {
		const blendedColor: RGBColor = {
		r: Math.round(color1.r + step.r * (i + 1)),
		g: Math.round(color1.g + step.g * (i + 1)),
		b: Math.round(color1.b + step.b * (i + 1)),
		};
		blendedColors.push(blendedColor);
	}

	blendedColors.push(color2); // Include the second color as the last item

	return blendedColors;
}

function drawPalette(event: Event) {
	event.preventDefault();
	const color1Input = document.getElementById('input0') as HTMLInputElement;
	const color2Input = document.getElementById('input1') as HTMLInputElement;
	const stepsSelect = document.getElementById('steps') as HTMLSelectElement;

	const color1 = hexToRGB(color1Input.value);
	const color2 = hexToRGB(color2Input.value);
	const midpoints = parseInt(stepsSelect.value);

	if (validateHex(color1Input.value) && validateHex(color2Input.value)) {
		const blendedColors = blendColors(color1, color2, midpoints);

		for (let i = 0; i <= midpoints+1; i++) {
			const paletteInput = document.getElementById(`pal${i}`) as HTMLInputElement;
			const paletteColor = document.getElementById(`p${i}`) as HTMLDivElement;
			const blendedColor = blendedColors[i];
			const hexColor = rgbToHex(blendedColor.r, blendedColor.g, blendedColor.b);
			paletteInput.value = hexColor;
			paletteColor.style.backgroundColor = hexColor;

			// Clear previous content of the palette div
			paletteColor.innerHTML = '';

			// Create a color preview square
			const colorPreview = document.createElement('div');
			colorPreview.className = 'color-preview';
			colorPreview.style.backgroundColor = hexColor;

			// Append the color preview to the palette div
			paletteColor.appendChild(colorPreview);
		}
	} else {
		alert('Please enter valid hex color values.');
	}
}

function validateHex(hex: string): boolean {
	const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
	return regex.test(hex);
}

function rgbToHex(r: number, g: number, b: number): string {
	const componentToHex = (c: number) => {
		const hex = c.toString(16);
		return hex.length === 1 ? '0' + hex : hex;
	};

	return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
