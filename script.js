document.addEventListener('DOMContentLoaded', () => {
    const colorInputs = document.querySelectorAll('.input-field');
    const stepsSelect = document.getElementById('steps');
    const blendBtn = document.getElementById('blendBtn');
    const clearBtn = document.getElementById('clearBtn');
    const previews = document.querySelectorAll('.color-preview');
    const output = document.getElementById('paletteOutput');

    blendBtn.addEventListener('click', generatePalette);
    clearBtn.addEventListener('click', clearPalette);

    function hexToRgb(hex) {
        const sanitized = hex.replace(/^#/, '');
        const expanded = sanitized.length === 3 ? 
            sanitized.split('').map(c => c + c).join('') : sanitized;
        return {
            r: parseInt(expanded.substring(0, 2), 16),
            g: parseInt(expanded.substring(2, 4), 16),
            b: parseInt(expanded.substring(4, 6), 16)
        };
    }

    function blendColors(startColor, endColor, steps) {
        const blended = [];
        const delta = {
            r: (endColor.r - startColor.r) / (steps + 1),
            g: (endColor.g - startColor.g) / (steps + 1),
            b: (endColor.b - startColor.b) / (steps + 1)
        };

        for (let i = 0; i <= steps + 1; i++) {
            blended.push({
                r: Math.round(startColor.r + delta.r * i),
                g: Math.round(startColor.g + delta.g * i),
                b: Math.round(startColor.b + delta.b * i)
            });
        }
        return blended;
    }

    function rgbToHex(r, g, b) {
        const clamp = num => Math.min(Math.max(num, 0), 255);
        return '#' + [r, g, b].map(c => 
            clamp(c).toString(16).padStart(2, '0')
        ).join('');
    }

    function isValidHex(hex) {
        return /^#([A-Fa-f0-9]{3,4}){1,2}$/.test(hex);
    }

    function generatePalette() {
        const colors = Array.from(colorInputs).map(input => input.value);
        if (!colors.every(isValidHex)) {
            alert('Please enter valid hex color values');
            return;
        }

        colors.forEach((color, i) => {
            previews[i].style.backgroundColor = color;
        });

        const [color1, color2] = colors.map(hexToRgb);
        const steps = parseInt(stepsSelect.value, 10);
        const blended = blendColors(color1, color2, steps);
        
        output.innerHTML = blended.map(color => {
            const hex = rgbToHex(color.r, color.g, color.b);
            return `
                <div class="color-card">
                    <div class="color-swatch" style="background: ${hex}"></div>
                    <div class="color-value">${hex}</div>
                </div>
            `;
        }).join('');
    }

    function clearPalette() {
        output.innerHTML = '';
        previews.forEach(preview => preview.style.backgroundColor = '');
        colorInputs.forEach(input => input.value = '');
    }
});
