export const minifyHTML = (str) => {
    return str
        ? str
            .replace(/\>[\r\n ]+\</g, '><')
            .replace(/(<.*?>)|\s+/g, (_, $1) => ($1 ? $1 : ' '))
            .trim()
        : '';
};
//# sourceMappingURL=html-minify.utils.js.map