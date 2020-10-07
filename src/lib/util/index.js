exports.styleHyphenFormat = (propertyName) => {
    return propertyName.replace(/[A-Z]/g, match => '_' + match.toLowerCase());
}