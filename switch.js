const html = document.querySelector("html");
const checkbox = document.querySelector("input[name=theme]");

const getStyle = (element, style) => 
    window
        .getComputedStyle(element)
        .getPropertyValue(style);

const lightTheme = {
    bg: getStyle(html, "--bg"),
    bgContainer: getStyle(html, "--bg-container"),
    bgBaseName: getStyle(html, "--bg-basename"),
    bgIO: getStyle(html, "--bg-io"),
    colorText: getStyle(html, "--color-text"),
    colorHighlight: getStyle(html, "--color-highlight"),
    colorScroll: getStyle(html, "--color-scroll"),
    colorScrollHover: getStyle(html, "--color-scrollhover"),
}

const darkTheme = {
    bg: "#404552",
    bgContainer: "#4b5162",
    bgBaseName: "#3d414d",
    bgIO: "#2e323a",
    colorText: "#ffffff",
    colorHighlight: "#5294e2",
    colorScroll: "#30343d",
    colorScrollHover: "#21242b"
}

const transformKey = key => 
    "--" + key.replace(/([A-Z])/, "-$1").toLowerCase();

const changeColors = (colors) => {
    Object.keys(colors).map(key => 
        html.style.setProperty(transformKey(key), colors[key]) 
    );
}

checkbox.addEventListener("change", ({ target }) => {
    target.checked ? changeColors(darkTheme) : changeColors(lightTheme);
});
