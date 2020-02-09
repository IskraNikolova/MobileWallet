/**
* Performs a deep merge of objects and returns new object. Does not modify
* objects (immutable) and merges arrays via concatenation.
*
* @param {...object} objects - Objects to merge
* @returns {object} New object with merged key/values
*/
export function deepMerge (...objects) {
  if (JSON.stringify(objects[0]) === JSON.stringify(objects[1])) return objects[0]
  if (typeof objects[0] === 'string' || typeof objects[1] === 'string') return undefined

  const isObject = obj => obj && typeof obj === 'object'

  try {
    return objects.reduce((prev, obj) => {
      Object.keys(obj).forEach(key => {
        if (Array.isArray(prev[key]) && Array.isArray(obj[key])) {
          prev[key] = prev[key].concat(...obj[key])
        } else if (isObject(prev[key]) && isObject(obj[key])) {
          prev[key] = deepMerge(prev[key], obj[key])
        } else {
          prev[key] = obj[key]
        }
      })
      return prev
    }, {})
  } catch (err) {
    return undefined
  }
}

/**
* Check password is include upper and lower case letters, numbers and symbols and must be at least 8 characters
*
* @param passord objects - string
* @returns boolean is match pattern
*/
export const validatePassFormat = ({ password }) => {
  const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/gm
  return pattern.test(password)
}
