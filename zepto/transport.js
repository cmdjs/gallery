/**
 * @name zepto
 * @description Zepto is a minimalist JavaScript framework for modern browsers with a largely jQuery-compatible API.
 * @author Thomas Fuchs
 * @url http://zeptojs.com/
 * @keywords dom
 * @keywords mobile
 *
 * @version 1.0.0
 * @src http://zeptojs.com/zepto.js
 * @min http://zeptojs.com/zepto.min.js
 */

define('#{{id}}', [], function(require) {

  var _zepto = window.Zepto;
  var _$ = window.$;

  /*{{code}}*/

  window.Zepto = _zepto;
  window.$ = _$;

  return Zepto;
});
