export const kebabCase = text =>
    String(text)
        .toLowerCase()
        .replace(/ /g, "_");
