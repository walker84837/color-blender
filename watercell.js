var colors = ["00", "33", "66", "99", "CC", "FF"];
document.write('<table cellspacing="0" id="grid">');
for (i = 5; i >= 0; i--) {
	for (j = 5; j >= 0; j--) {
		document.write("<tr>");
		for (k = 5; k >= 0; k--) {
			var col = colors[i] + colors[j] + colors[k];
			document.write(
				'<td style="background: #' +
					col +
					';"><a href="javascript:colorIns(\'#' +
					col +
					"');\"></a></td>"
			);
		}
		document.write("</tr>");
	}
}
document.write("</table>");
