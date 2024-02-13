import jsPDF from "jspdf";
var jQuery = require('jquery');
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

export const pdfDataL = function (doc, details) {
    let insinfox = localStorage.getItem('jwt');
    let insinfo = JSON.parse(insinfox);
    var instituteName = insinfo?.instituteName
    var instituteAddress = insinfo?.instituteAddress
    //var imgData = insinfo?.imageName;
    var imgData = insinfo?.instituteLogo === '' ? 'data:image/gif;base64,R0lGODlhAQABAIAAAP7//wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==' : insinfo?.instituteLogo;

    return doc.addImage(imgData, "JPEG", 15, 12, 20, 20),
        doc.setFontSize(15), doc.writeText(37, 21, instituteName, { align: "left" }),
        doc.setFontSize(9), doc.writeText(37, 26, instituteAddress, { align: "left" }),
        doc.setDrawColor(219, 219, 219), doc.line(14, 33, 283, 33),
        doc.setFontType("bold"), doc.setFontSize(11), doc.writeText(0, 40, details, { align: "center" });

}

var pdfday = new Date();
var dd = pdfday.getDate();
var mm = pdfday.getMonth() + 1;
var yyyy = pdfday.getFullYear();
if (dd < 10) {
    dd = '0' + dd
}

if (mm < 10) {
    mm = '0' + mm
}

pdfday = dd + '/' + mm + '/' + yyyy;
export const lpowerdbypdf = "Powered by Sheba Digital Limited || Part of Sheba Group                                                                       Page  ";
// export const ppowerdbypdf = "Powered by Sheba Digital Limited || Part of Sheba Group                               Page  ";
export const ppowerdbypdfx = "Powered by Sheba Digital Limited || Part of Sheba Group                       Page  ";
export const ppowerdbypdf = "Powered by Sheba Digital Limited || Part of Sheba Group                       Page  ";
export const ldatepdf = `                                                                                                                                Date: ${pdfday}`;
export const pdatepdf = `                                                                 Date: ${pdfday}`;
export const pdfGenerate = function (doc, col, rows, pageContent) {

    return doc.autoTable(col, rows, {
        headerStyles: {
            lineWidth: .01,
            lineColor: [224, 224, 224]
        },
        theme: "grid",
        startY: 45,
        addPageContent: pageContent
    })


};