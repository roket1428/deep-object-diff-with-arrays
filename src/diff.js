import { isDate, isEmptyObject, isObject, hasOwnProperty, makeObjectWithoutPrototype } from './utils.js';

const diff = (lhs, rhs, keepArray = false) => {
  if (lhs === rhs) return {}; // equal return no diff

  if (!isObject(lhs) || !isObject(rhs)) return rhs; // return updated rhs

  const deletedValues = Object.keys(lhs).reduce((acc, key) => {
    if (!hasOwnProperty(rhs, key)) {
      acc[key] = undefined;

    }

    return acc;
  }, makeObjectWithoutPrototype());

  if (isDate(lhs) || isDate(rhs)) {
    if (lhs.valueOf() == rhs.valueOf()) return {};
    return rhs;
  }

  return Object.keys(rhs).reduce((acc, key) => {
    if (!hasOwnProperty(lhs, key)){
      acc[key] = rhs[key]; // return added r key
      return acc;
    }

    const difference = diff(lhs[key], rhs[key], keepArray);

    // If the difference is empty, and the lhs is an empty object or the rhs is not an empty object
    if (isEmptyObject(difference) && !isDate(difference) && (isEmptyObject(lhs[key]) || !isEmptyObject(rhs[key])))
      return acc; // return no diff

    if (keepArray && Array.isArray(rhs[key])) {
      acc[key] = rhs[key] // return updated key
      return acc; // return updated key
    } else {
      acc[key] = difference // return updated key
      return acc; // return updated key
    }
  }, deletedValues);
};

export default diff;
