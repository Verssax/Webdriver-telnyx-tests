export function pickRandom(array) {
    return array[Math.floor(Math.random() * array.length)]
}

export function randomInt(x, y) {
    return Math.floor(Math.random() * (y - x + 1)) + x;
}