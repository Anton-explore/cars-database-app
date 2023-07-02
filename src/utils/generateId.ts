export const generateId = (): number => {
    const min = 1001;
    const max = 2001;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};