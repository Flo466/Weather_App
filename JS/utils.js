// Fonction debounce
export function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
}

export function getIconPath(iconName) {
    const basePath = "asset/weather-icons/";
    const iconPath = `${basePath}${iconName}.svg`;
    return iconPath;
}
