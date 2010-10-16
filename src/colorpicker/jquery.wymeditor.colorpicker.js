/*
 * WYMeditor : what you see is What You Mean web-based editor
 * Copyright (c) 2005 - 2009 Jean-Francois Hovinne, http://www.wymeditor.org/
 * Dual licensed under the MIT (MIT-license.txt)
 * and GPL (GPL-license.txt) licenses.
 *
 * For further information visit:
 *        http://www.wymeditor.org/
 *
 * File Name:
 *        jquery.wymeditor.colorpicker.js
 *        Color picker plugin for WYMeditor
 *
 * File Authors:
 *        Morgan Massena (morgan@mmassena.com)
 */

// Extend WYMeditor
WYMeditor.editor.prototype.colorpicker = function(options) {
  var picker = new WymColorPicker(options, this);
  return picker;
}

// WymColorPicker constructor
function WymColorPicker(options, wym) {

  options = jQuery.extend({

    sButtonHtml:     "<li class='wym_tools_colorpicker'>"
                   + "<a name='Color Picker' href='#'"
                   + " style='background-image:"
                   + " url(" + wym._options.basePath + "plugins/colorpicker/colorpicker.png)'>"
                   + "Color Picker"
                   + "</a></li>",

    sButtonSelector: "li.wym_tools_colorpicker a"

  }, options);

  this._options = options;
  this._wym = wym;

};

// WymTidy initialization
WymColorPicker.prototype.init = function() {

  var picker = this;
            
  // append button to toolbar
  jQuery(this._wym._box).find(
    this._wym._options.toolsSelector + this._wym._options.toolsListSelector)
    .append(this._options.sButtonHtml);
  
  // handle click event
  jQuery(this._wym._box).find(this._options.sButtonSelector).click(function() {

    $(this).ColorPicker({
        onSubmit: function(hsb, hex, rgb, el) {
            picker.pick(hex);
            $(el).ColorPickerHide();
        }
    }).ColorPickerShow();

    return(false);
  });

};

// WymTidy cleanup
WymColorPicker.prototype.pick = function(hex) {
    // wrap selected text in a span
    this._wym.wrap('<span style="color: #'+hex+'">', '</span>');
};
