export default function eleventy11tyPluginRubberStamp(eleventyConfig, options = {}) {
    const { shortcodeName = "rubberstamp", baseClassName = "rubber-stamp" } = options;

    eleventyConfig.addShortcode(shortcodeName, function (text, year, url, shape = "rectangle") {
        const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

        const wrap = (element) => {
            return url ? `<a class="${classStr}" href="${url}">${element}</a>` : `<span class="${classStr}">${element}</span>`;
        };

        const getRotation = () => {
            const rotations = ["r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8", "r9", "r10"];
            return randomElement(rotations);
        };

        const getColor = () => {
            const colors = ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8"];
            return randomElement(colors);
        };

        let classes = [baseClassName];
        if (text.length > 14) {
            classes.push("double-line");
        }
        classes.push(getRotation());
        classes.push(getColor());
        classes.push(shape);

        if (shape !== "circle" && randomElement([true, false])) {
            classes.push("rounded");
        }

        const classStr = classes.join(" ");

        let element = "";

        if (shape === "circle") {
            const uniqueId = `textPath-${text
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, "")}-${year}`;
            element = `<svg width="150px" height="150px" preserveAspectRatio="xMinYMin">
                    <defs>
                        <path id="${uniqueId}" stroke="1px solid #ddd" d="M25,75a50,50 0 0,1 100,0a50,50 0 0,1 -100,0" />
                    </defs>
                    <text x="0" y="0" text-anchor="start">
                        <textPath xlink:href="#${uniqueId}" startOffset="0">${text}</textPath>
                    </text>
                </svg>`;
        } else {
            element = `<span class="text">${text}</span>`;
        }

        return element ? wrap(element + `<span class="year">${year}</span>`) : "";
    });
}
