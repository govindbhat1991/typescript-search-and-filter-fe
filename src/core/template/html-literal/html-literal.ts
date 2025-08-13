import { HtmlLiteralType } from './html-literal.interface';

/** Wraps a template with html tag to add static value support. */
export const html: HtmlLiteralType = (strings, ...values) => ({ strings, values });
