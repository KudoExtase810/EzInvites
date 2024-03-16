export const formatNumber = (number: number) => {
    return number >= 10 ? number : `0${number}`;
};

export const genId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
};
