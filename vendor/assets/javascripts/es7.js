function install(target, methods) {
  Object.keys(methods).forEach(function(key) {
    if (target.hasOwnProperty(key)) return;
    Object.defineProperty(target, key, {
      value: methods[key],
      writable: true,
      configurable: true,
    });
  });
};

install(Array.prototype, {
  includes: function(search) {
    if (this.length === 0) return false;
    var array = arguments.length > 1 ? [].slice.call(this, arguments[1]) : this;
    var is = Number.isNaN(search) ? Number.isNaN : function(item) { return item === search; };
    return [].findIndex.call(array, is) !== -1;
  },
});

// https://bugs.chromium.org/p/v8/issues/detail?id=5059
// [][Symbol.unscopables].includes = true;

install(Object, {
  values: function(object) {
    return Object.keys(object).map(function(key) { return object[key] });
  },
  entries: function(object) {
    return Object.keys(object).map(function(key) { return [key, object[key]] });
  },
});
