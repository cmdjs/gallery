/**
 * @name labjs
 * @description Loading And Blocking JavaScript.
 * @author Kyle Simpson
 * @url http://labjs.com/
 * @keywords loader
 * @keywords performance
 *
 * @filename lab
 * @src https://raw.github.com/getify/LABjs/master/LAB.src.js
 * @min https://raw.github.com/getify/LABjs/master/LAB.js
 *
 * @notes Run LABjs in node is not significant.
 */

define('#{{id}}', [], function(require) {

  /*{{code}}*/

  if (require) return $LAB.noConflict();
});
