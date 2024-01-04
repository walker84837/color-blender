
/**
 * hex_to_rgb: Converts a hexadecimal color string to an RGB object.
 *
 * @param {string} hex - The hexadecimal color string.
 * @returns {object} - An object representing the RGB values.
 */
function hex_to_rgb(hex)
{
	const sanitized_hex = hex.replace(/^#/, '');
	const r = parseInt(sanitized_hex.substring(0, 2), 16);
	const g = parseInt(sanitized_hex.substring(2, 4), 16);
	const b = parseInt(sanitized_hex.substring(4, 6), 16);
	return { r, g, b };
}

/**
 * blend_colors: Blends two colors together by a specified number of midpoints.
 *
 * @param {object} first_color - The first color in RGB format.
 * @param {object} second_color - The second color in RGB format.
 * @param {number} midpoints - The number of midpoints between the two colors.
 * @returns {object[]} - An array of objects representing the blended colors.
 */
function blend_colors(first_color, second_color, midpoints)
{
	const steps = midpoints + 1;
	const step = {
		r: (second_color.r - first_color.r) / steps,
		g: (second_color.g - first_color.g) / steps,
		b: (second_color.b - first_color.b) / steps,
	};
	const blended_colors = [];

	blended_colors.push(first_color);
	for (let i = 0; i < steps; i++) {
		const blended_color = {
			r: Math.round(first_color.r + step.r * (i + 1)),
			g: Math.round(first_color.g + step.g * (i + 1)),
			b: Math.round(first_color.b + step.b * (i + 1)),
		};

		blended_colors.push(blended_color);
	}

	blended_colors.push(second_color);
	return blended_colors;
}

/**
 * draw_palette: Draws a palette of blended colors between two input colors.
 *
 * @param {object} event - The DOM event object.
 */
function draw_palette(event)
{
	event.preventDefault();

	const first = document.getElementById('input0');
	const second = document.getElementById('input1');
	const steps_input = document.getElementById('steps');

	const first_color = hex_to_rgb(first.value);
	const second_color = hex_to_rgb(second.value);

	const midpoints = parseInt(steps_input.value);

	if (validate_hex(first.value) && validate_hex(second.value)) {
		const blended_colors = blend_colors(first_color, second_color, midpoints);

		for (let i = 0; i <= midpoints + 1; i++) {
			const palette_input = document.getElementById(`pal${i}`);
			const palette_color = document.getElementById(`p${i}`);

			const blended_color = blended_colors[i];
			const hex_color = rgb_to_hex(blended_color.r, blended_color.g, blended_color.b);

			palette_input.value = hex_color;
			palette_color.style.backgroundColor = hex_color;

			// Clear previous content of the palette div
			palette_color.innerHTML = '';

			// Create a color preview square
			const color_preview = document.createElement('div');
			color_preview.className = 'color-preview';
			color_preview.style.backgroundColor = hex_color;

			// Append the color preview to the palette div
			palette_color.appendChild(color_preview);
		}
	} else {
		alert('Please enter valid hex color values.');
	}
}

/**
 * validate_hex: Validates a hexadecimal color string.
 *
 * @param {string} hex - The hexadecimal color string.
 * @returns {boolean} - True if the string is a valid hexadecimal color.
 */
function validate_hex(hex)
{
	const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
	return regex.test(hex);
}

/**
 * rgb_to_hex: Converts RGB values to a hexadecimal color string.
 *
 * @param {number} r - The red channel value.
 * @param {number} g - The green channel value.
 * @param {number} b - The blue channel value.
 * @returns {string} - A string representing the hexadecimal color.
 */
function rgb_to_hex(r, g, b)
{
	const clamp = (num) => {
		const MAX_RGB = 255;
		const MIN_RGB = 0;
		return Math.min(Math.max(num, MIN_RGB), MAX_RGB);
	};

	const red = clamp(r);
	const green = clamp(g);
	const blue = clamp(b);

	const component_to_hex = (c) => {
		const hex = c.toString(16);
		return hex.length === 1 ? '0' + hex : hex;
	};

	return '#' + component_to_hex(red) + component_to_hex(green) + component_to_hex(blue);
}
