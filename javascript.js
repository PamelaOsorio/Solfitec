

function entrarnosite(){
var nome = document.getElementById('nome').value;
var senha = document.getElementById('senha').value;


if (nome == "admin" && senha == 123){
	window.open('first-page.html');
}
else{
	alert("Por favor digite um usuário válido");
	}
}
function menudropdown() {
document.getElementById("tipos-descritivos").classList.toggle("show");

	window.onclick = function(event) {
		if (!event.target.matches('.dropbtn')) {
			var dropdowns = document.getElementsByClassName("dropdown-content");
			var i;
			for (i = 0; i < dropdowns.length; i++) {
  				var openDropdown = dropdowns[i];
 			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
		 	}
			}
		}
	} 
}


function Upload() {
	var fileUpload = document.getElementById("fileUpload");
	var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
	if (regex.test(fileUpload.value.toLowerCase())) {
		if (typeof (FileReader) != "undefined") {
			var reader = new FileReader();
			if (reader.readAsBinaryString) {
				reader.onload = function (e) {
					ProcessExcel(e.target.result);
				};
				reader.readAsBinaryString(fileUpload.files[0]);
			} else {
				reader.onload = function (e) {
					var data = "";
					var bytes = new Uint8Array(e.target.result);
					for (var i = 0; i < bytes.byteLength; i++) {
						data += String.fromCharCode(bytes[i]);
					}
					ProcessExcel(data);
				};
				reader.readAsArrayBuffer(fileUpload.files[0]);
			}
		} else {
			alert("This browser does not support HTML5.");
		}
	} else {
		alert("Please upload a valid Excel file.");
	}
};
function ProcessExcel(data) {
	var workbook = XLSX.read(data, {
		type: 'binary'
	});

	var firstSheet = workbook.SheetNames[0];

	var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);

	var table = document.createElement("table");
	table.border = "1";

	var row = table.insertRow(-1);
	
	var headerCell = document.createElement("TH");
	headerCell.innerHTML = "Id";
	row.appendChild(headerCell);

	headerCell = document.createElement("TH");
	headerCell.innerHTML = "Name";
	row.appendChild(headerCell);

	headerCell = document.createElement("TH");
	headerCell.innerHTML = "Country";
	row.appendChild(headerCell);
	
	for (var i = 0; i < excelRows.length; i++) {
		var row = table.insertRow(-1);

		
		var cell = row.insertCell(-1);
		cell.innerHTML = excelRows[i].Id;

		cell = row.insertCell(-1);
		cell.innerHTML = excelRows[i].Name;

		cell = row.insertCell(-1);
		cell.innerHTML = excelRows[i].Country;
	}

	var dvExcel = document.getElementById("dvExcel");
	dvExcel.innerHTML = "";
	dvExcel.appendChild(table);
};

function entradadosdado(){
var i;
var dados = document.getElementById('valores').value;
var repetidos = [];
var cont = [];
var splitados = new Array();
contador = 0;
var controle;
var totalrep = 0;
var fperc = [];
var cont2 = [];




var somaa = []
if (dados != ""){
	var splita = dados.split(";");
	splitados = splita.sort((a,b) => a-b)
}	
		
	



  for( i = 0; i< splitados.length; i++){
	 cont2[i] = 1
	 cont[i] = 1
	for( j = 0; j< splitados.length; j++){
		if((splitados[j] == splitados[j + 1]) && ( splitados[j] == splitados[i])){
				cont2[i] ++;

				cont[i] = cont[i] 
                
			}

		}
		totalrep = cont[i] + totalrep

	}
var soma = 0

for(i = 0; i < cont.length; i++){

		soma += cont[i]
		somaa[i] = soma

	

}
var moda = 0
    var pos = 0
	for(i = 0; i< splitados.length; i++){	
		for( i = 0; i< cont2.length; i++){
			if(cont2[i] > moda){
                moda = cont[i]
                pos = i
			}
		}
		moda = splitados[pos]
	}
	




var html = '<table id="tabela"> <th> <td>Fi</td> <td>F%</td> <td>Fac</td> <td>Fac%</td> </th>'; 
for(i=0; i <cont2.length; i ++) {
	fperc[i] = Math.round(((cont2[i] / totalrep) * 100));
		controle = 0;
		for(j = 0; j < splitados.length; j++){
			if (repetidos[j] == splitados[i]){
				controle = 1;
				
			}
		}
		if (controle == 0) {
			html += "<tr><td> " + splitados[i] + "</td><td> " + cont2[i] + "</td><td>"  + fperc[i]*cont2[i] + "</td><td>"+ somaa[i] + "</td><td>" + fperc[i]*somaa[i] + "</td></tr>"
			repetidos[i] = splitados[i];
				
			

		}
		else{
			repetidos[i] = -1;

		}
	}
	 

	google.charts.load('current', {packages: ['corechart']});
	google.charts.setOnLoadCallback(drawChart);

	function drawChart() {
	  // Define the chart to be drawn.
	  var data = new google.visualization.DataTable();
	  data.addColumn('string', 'Element');
	  data.addColumn('number', 'total');
	  data.addRows([ ['Variavel', totalrep] 
	]);
	  

	var chart = new google.visualization.ColumnChart(document.getElementById('Chart'));
	chart.draw(data, null);
}
	
console.log(totalrep);
html += '</table>';
document.getElementById('tabela').innerHTML = html;
console.log(html);
}


