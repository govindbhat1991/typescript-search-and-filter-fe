export const minifyHTML = (str: string) => {
    return str
        ? str
              .replace(/\>[\r\n ]+\</g, '><')
              .replace(/(<.*?>)|\s+/g, (_, $1) => ($1 ? $1 : ' '))
              .trim()
        : '';
};
