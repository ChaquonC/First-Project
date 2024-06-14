export const randomFighters = (max) => {
    const minimum = Math.ceil(0);
    const maximum = Math.floor(max);
    return Math.floor(Math.random() * (maximum - minimum) + minimum);
}
