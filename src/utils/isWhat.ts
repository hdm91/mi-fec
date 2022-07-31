export type AnyFunction = (...args: any[]) => any;

/**
 * Returns whether the payload is a function (regular or async)
 *
 * @param {*} payload
 * @returns {payload is AnyFunction}
 */
export function isFunction(payload: any): payload is AnyFunction {
  return typeof payload === 'function';
}

/**
 * Returns the object type of the given payload
 *
 * @param {*} payload
 * @returns {string}
 */
export function getType(payload: any): string {
  return Object.prototype.toString.call(payload).slice(8, -1);
}

export function isArray(payload: any): payload is any[] {
  return getType(payload) === 'Array';
}

/**
 * Returns whether the payload is a an array with at least 1 item
 *
 * @param {*} payload
 * @returns {payload is any[]}
 */
export function isFullArray(payload: any): payload is any[] {
  return isArray(payload) && payload.length > 0;
}
