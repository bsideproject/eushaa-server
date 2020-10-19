exports.styleHyphenFormat = (propertyName) => {
    return propertyName.replace(/[A-Z]/g, match => '_' + match.toLowerCase());
}

exports.styleUpperFormat = (propertyName) => {
    return propertyName.replace(/_[a-z]/g, match => match[1].toUpperCase());
}