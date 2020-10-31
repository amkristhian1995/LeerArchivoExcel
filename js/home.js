var rows=[];
var columns=[];
$("#file-excel").on("change", function (oEvent) {
    rows=[];
    columns=[];
    var oFile=oEvent.target.files[0];
    if (oFile!=undefined) {
        var reader=new FileReader();
        reader.onload=function (e) {
            var data=e.target.result;
            var cfb=XLS.CFB.read(data, { type: 'binary' });
            var wb=XLS.parse_xlscfb(cfb);
            wb.SheetNames.forEach(function (sheetName){
                rows = XLS.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
                rows.forEach(function(e,i){
                	columns = Object.keys(e);
                });
            });
            LoadTable();
        };
        reader.readAsBinaryString(oFile);
    } else {
        $(this).val('');
        LoadTable();
    }
});
function LoadTable() {
	$("#tbl-data-excel > thead > tr").html("");
	columns.forEach(function(e,i){
		$("#tbl-data-excel > thead > tr").append('<th>'+e+'</th>');
	});
	$("#tbl-data-excel > tbody").html("");
	rows.forEach(function(e,i){
		var html="<tr>";
		columns.forEach(function(_e,_i){
			html+='<td>'+e[_e]+'</td>';
		});
		html+="</tr>";
		$("#tbl-data-excel > tbody").append(html);
	});
}