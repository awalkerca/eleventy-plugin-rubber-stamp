export default function eleventy11tyPluginRubberStamp(eleventyConfig, options = {}) {
    const {
        shortcodeName = 'rubberstamp',
        defaultUrl = '/categories/my-travel',
        baseClassName = 'rubber-stamp'
    } = options;

    eleventyConfig.addShortcode(shortcodeName, function(text, year, tag, shape = 'rectangle') {
        const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

        const getRotation = () => {
            const rotations = ['r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8', 'r9', 'r10'];
            return randomElement(rotations);
        };

        const getColor = () => {
            const colors = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];
            return randomElement(colors);
        };

        const subYear = year.toString().split('').slice(2).join('');
        const url = tag ? `/tags/${tag.replace(' ', '-')}/` : defaultUrl;

        let classes = [baseClassName];
        if (text.length > 14) {
            classes.push('double-line');
        }
        classes.push(getRotation());
        classes.push(getColor());
        classes.push(shape);

        if (shape !== 'circle' && randomElement([true, false])) {
            classes.push('rounded');
        }

        const classStr = classes.join(' ');

        if (shape === 'square') {
            return `<a class="${classStr}" href="${url}">
                <span class="text">${text}</span>
                <span class="year">${year}</span>
            </a>`;
        }

        if (shape === 'rectangle') {
            return `<a class="${classStr}" href="${url}">
                <span class="text">${text}</span>
                <span class="year">${subYear}</span>
            </a>`;
        }

        if (shape === 'circle') {
            const uniqueId = `textPath-${text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}-${year}`;
            return `<a class="${classStr}" href="${url}">
                <svg width="150px" height="150px" preserveAspectRatio="xMinYMin">
                    <defs>
                        <path id="${uniqueId}" stroke="1px solid #ddd" d="M25,75a50,50 0 0,1 100,0a50,50 0 0,1 -100,0" />
                    </defs>
                    <text x="0" y="0" text-anchor="start">
                        <textPath xlink:href="#${uniqueId}" startOffset="0">${text}</textPath>
                    </text>
                </svg>
                <span class="year">${year}</span>
            </a>`;
        }

        return '';
    });
}