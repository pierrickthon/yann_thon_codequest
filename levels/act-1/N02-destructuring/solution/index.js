const extractName = ({ name }) => name;
const mergeObjects = (obj1, obj2) => ({ ...obj1, ...obj2 });
const setDefault = (config) => ({ lang: 'en', debug: false, ...config });

module.exports = { extractName, mergeObjects, setDefault };


