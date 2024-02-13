import jsPDF from "jspdf";
import $ from 'jquery';
(function (api, $) {
      'use strict';
      api.writeText = function (x, y, text, options) {
        options = options || {};
// This api is compatible with only JsPdf version b̶e̶l̶o̶w̶ ̶1̶.̶3̶.̶5̶  1.4.0+
// Do not downgrade to any older version unless any proper modificatopn - okkhor[at]live[dot]com
        var defaults = {
          align: 'left',
          width: this.internal.pageSize.getWidth()
          // width: this.internal.pageSize.width
        }
        var settings = $.extend({}, defaults, options);
        var fontSize = this.internal.getFontSize();
        var txtWidth = this.getStringUnitWidth(text) * fontSize / this.internal.scaleFactor;
        if (settings.align === 'center')
          x += (settings.width - txtWidth) / 2;
        else if (settings.align === 'right')
          x += (settings.width - txtWidth);
        this.text(text, x, y);
      }
    })(jsPDF.API, jQuery);