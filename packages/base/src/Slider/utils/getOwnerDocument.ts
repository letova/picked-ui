export const getOwnerDocument = (element?: HTMLElement | null): Document => {
    if (element == null) return document;

    return element.ownerDocument;
}