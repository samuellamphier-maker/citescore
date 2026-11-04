/**
 * Turbopack/webpack loader. Replaces Next's module polyfill with an empty
 * module. Chrome 111+ and Safari 16.4+ already have those features.
 */
module.exports = function modernBrowserPolyfillLoader() {
  return "/* modern browsers: module polyfills omitted */\n";
};
