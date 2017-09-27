/** A small class to facilitate resolving a promise from outside its callback. */
module.exports = class Completer {
  constructor() {
    /** The `resolve` function of the promise callback. */
    this._resolveFn = null;

    /** The `arguments` object in case `complete` gets called before the promise's callback. */
    this._resolvedArgs = null;

    /** The promise. */
    this.promise = new Promise((resolve, reject) => {
      if (this._resolvedArgs !== null) {
        // Call `resolve` if `complete` has already been called.
        resolve.apply(null, this._resolvedArgs);
      } else {
        // Store `resolve` for `complete` to call.
        this._resolveFn = resolve;
      }
    });
  }

  /**
   * Resolves this completer's promise.
   * @returns {void}
   */
  complete() {
    if (this._resolveFn !== null) {
      // Call `resolve` with any arguments provided to this function.
      this._resolveFn.apply(null, arguments);
    } else {
      // Store `arguments` so the promise's callback can resolve with them.
      this._resolvedArgs = arguments;
    }
  }
};
