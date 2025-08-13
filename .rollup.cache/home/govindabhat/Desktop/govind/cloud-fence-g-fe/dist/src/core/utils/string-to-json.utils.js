const stringToJsonRegex = /([a-zA-Z0-9-]+).*?(:).*?([a-zA-Z0-9-]+)/g;
/** this will convert `{name: tuttu}` to `{"name": "tuttu"}` */
export const toJSON = (str) => JSON.parse(str.replace(stringToJsonRegex, '"$1":"$3"'));
//# sourceMappingURL=string-to-json.utils.js.map