/** custom marker comment text */
export const generalMarker = '$-wc-marker-$';

/** string indicates if a comment is a marker comment */
export const markerMatch = '?' + generalMarker;

/** marker can be used for implementing comment node */
export const nodeMarker = `<${markerMatch}>`;

/** custom marker attribute */
export const attrMarker = '$-wc-attr-marker-$';
export const attrPrefix = '$-wc-attr-';
export const attrSuffix = '-$';

export const attrFullMarkerRegex = /[$]-wc-attr-marker-[$]/g;
export const attrMarkerRegex = /[$]-wc-marker-[$]/g;

export const fullAttributeRegex = /([\w|()|data-]+)=["']?((?:.(?!["']?\s+(?:\S+)=|\s*\/?[>"']))+.)["']?/g;

export const eventRegex = /\(([A-Za-z]+)\)/g;

/** boolean attribute list */
export const booleanAttributes = [
    'allowfullscreen',
    'async',
    'autofocus',
    'autoplay',
    'checked',
    'controls',
    'default',
    'defer',
    'disabled',
    'formnovalidate',
    'inert',
    'ismap',
    'itemscope',
    'loop',
    'multiple',
    'muted',
    'nomodule',
    'novalidate',
    'open',
    'playsinline',
    'readonly',
    'required',
    'reversed',
    'selected',
];
