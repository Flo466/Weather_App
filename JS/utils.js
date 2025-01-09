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


export function limitArraySize(array, maxLength) {
    if (array.length > maxLength) {
        return array.slice(0, maxLength);
    }
    return array;
}
