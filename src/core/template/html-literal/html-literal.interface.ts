export type TemplateResult = {
    strings: TemplateStringsArray;
    values: unknown[];
};

export type HtmlLiteralType = (strings: TemplateStringsArray, ...values: unknown[]) => TemplateResult;
