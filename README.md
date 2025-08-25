# eleventy-plugin-rubber-stamp

An Eleventy plugin that adds a `{% rubberstamp %}` shortcode for creating vintage-style travel stamps with random colors and rotations - perfect for travel blogs and creative portfolios.

## Installation

```bash
npm install eleventy-plugin-rubber-stamp
```

## Usage

Add the plugin to your `.eleventy.js` configuration file:

```javascript
import rubberStampPlugin from 'eleventy-plugin-rubber-stamp';

export default function(eleventyConfig) {
    eleventyConfig.addPlugin(rubberStampPlugin);
    
    // Your other configuration...
}
```

Then use the shortcode in your templates:

```liquid
{% rubberstamp "PARIS", "2023", "europe" %}
{% rubberstamp "TOKYO", "2024", "asia", "circle" %}
{% rubberstamp "NEW YORK", "2022", "usa", "square" %}
```

### More Examples

```liquid
<!-- Travel blog stamps -->
{% rubberstamp "BANGKOK", "2023", "thailand" %}
{% rubberstamp "ROME", "2024", "italy", "circle" %}
{% rubberstamp "LONDON", "2022", "uk", "square" %}

<!-- Long destination names get double-line treatment automatically -->
{% rubberstamp "SAN FRANCISCO", "2023", "california" %}

<!-- Without tags - uses default category URL -->
{% rubberstamp "MADRID", "2024" %}
```

## Output

The shortcode generates vintage-style stamp HTML with random colors and rotations:

```html
<a class="rubber-stamp r3 c5 rectangle rounded" href="/tags/europe/">
    <span class="text">PARIS</span>
    <span class="year">23</span>
</a>
```

## Parameters

The rubber stamp shortcode accepts these parameters:

1. **text** (string, required): The destination/location text
2. **year** (string/number, required): The year for the stamp
3. **tag** (string, optional): Category tag for the link URL
4. **shape** (string, optional): Shape style - 'rectangle', 'square', or 'circle' (default: 'rectangle')

## Shape Types

### Rectangle (default)
- Shows abbreviated year (e.g., "2023" becomes "23")
- Clean, classic passport stamp look
- May get rounded corners randomly

### Square  
- Shows full year (e.g., "2023")
- Compact square format
- May get rounded corners randomly

### Circle
- Shows full year below curved text
- Uses SVG for curved text path
- No rounded corner variation

## Configuration

You can customize the plugin behavior by passing options:

```javascript
eleventyConfig.addPlugin(rubberStampPlugin, {
    shortcodeName: 'stamp',                    // Change shortcode name (default: 'rubberstamp')
    defaultUrl: '/travel/',                    // Default URL when no tag provided (default: '/categories/my-travel')
    baseClassName: 'travel-stamp'              // Base CSS class (default: 'rubber-stamp')
});
```

### Options

- **`shortcodeName`** (string, default: `'rubberstamp'`): The name of the shortcode
- **`defaultUrl`** (string, default: `'/categories/my-travel'`): Default link URL when no tag is provided
- **`baseClassName`** (string, default: `'rubber-stamp'`): Base CSS class for styling

## CSS Classes

The plugin generates HTML with these CSS classes:

- **Base class**: `rubber-stamp` (configurable)
- **Rotation classes**: `r1` through `r10` (randomly applied)
- **Color classes**: `c1` through `c8` (randomly applied)
- **Shape classes**: `rectangle`, `square`, or `circle`
- **Modifier classes**: `double-line` (for long text), `rounded` (randomly applied to non-circles)

## CSS Styling

Here's example CSS to style your rubber stamps:

```css
.rubber-stamp {
    display: inline-block;
    padding: 8px 12px;
    margin: 4px;
    border: 2px solid;
    text-decoration: none;
    font-family: 'Courier New', monospace;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    transform-origin: center;
    transition: transform 0.2s ease;
}

.rubber-stamp:hover {
    transform: scale(1.1);
}

/* Rotation classes */
.rubber-stamp.r1 { transform: rotate(-5deg); }
.rubber-stamp.r2 { transform: rotate(3deg); }
.rubber-stamp.r3 { transform: rotate(-2deg); }
.rubber-stamp.r4 { transform: rotate(7deg); }
.rubber-stamp.r5 { transform: rotate(-8deg); }
.rubber-stamp.r6 { transform: rotate(4deg); }
.rubber-stamp.r7 { transform: rotate(-3deg); }
.rubber-stamp.r8 { transform: rotate(6deg); }
.rubber-stamp.r9 { transform: rotate(-4deg); }
.rubber-stamp.r10 { transform: rotate(2deg); }

/* Color classes */
.rubber-stamp.c1 { color: #8B0000; border-color: #8B0000; } /* Dark Red */
.rubber-stamp.c2 { color: #006400; border-color: #006400; } /* Dark Green */
.rubber-stamp.c3 { color: #000080; border-color: #000080; } /* Navy */
.rubber-stamp.c4 { color: #8B008B; border-color: #8B008B; } /* Dark Magenta */
.rubber-stamp.c5 { color: #B8860B; border-color: #B8860B; } /* Dark Goldenrod */
.rubber-stamp.c6 { color: #2F4F4F; border-color: #2F4F4F; } /* Dark Slate Gray */
.rubber-stamp.c7 { color: #800000; border-color: #800000; } /* Maroon */
.rubber-stamp.c8 { color: #556B2F; border-color: #556B2F; } /* Dark Olive Green */

/* Shape variations */
.rubber-stamp.square {
    width: 80px;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.rubber-stamp.circle {
    border-radius: 50%;
    width: 150px;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.rubber-stamp.rounded {
    border-radius: 8px;
}

.rubber-stamp.double-line .text {
    font-size: 0.9em;
    line-height: 1.1;
}

.rubber-stamp .text {
    display: block;
    font-size: 1em;
}

.rubber-stamp .year {
    display: block;
    font-size: 0.8em;
    margin-top: 2px;
}
```

## Use Cases

Perfect for:
- **Travel blogs** - Add authentic passport stamp feel
- **Portfolio sites** - Show locations and dates creatively
- **Event documentation** - Mark important dates and places
- **Creative storytelling** - Add vintage flair to narratives
- **Achievement tracking** - Celebrate milestones with stamps

## Requirements

- Node.js 18.0.0 or higher
- Eleventy 3.0.0 or higher

## License

MIT