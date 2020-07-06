

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
var medidasSeparatrizes = document.getElementById('valorMedidas').value;
var variavel = document.getElementById('variavel').value;
var separatriz = document.getElementById('medidas').value;
var tipodescritiva = document.getElementById('opcao').value;
var repetidos = [];
var cont 
var splitados = new Array();
contador = 0;
var controle;
var fperc = [];
var ftperc = [];


if(tipodescritiva == "Quantitativa Discreta"){
var soma 
// ORDENAÇÃO DOS DADOS
if (dados != ""){
	var splita = dados.split(";");
	splitados = splita.sort((a, b) => a - b)
		
}	

    

var  cont2 = []

	var xman
//Contabiliza as repetições de cada variável
for( i = 0; i< splitados.length; i++){
	 cont = 1
	 xman = 0
	for( j = i; j < splitados.length; j++){

		if ((splitados[i] == splitados[j]) && (splitados[i].length == splitados[j].length)) {
			while(splitados[j] == splitados[j+1]){
				 
				cont ++
				
				splitados.splice(j,1);
				
			}
            
				
		}
		var  somaa = []
		soma = 0
		cont2[i] = cont
		xman = splitados[i]
	

            
	}
		
}   // Acumula e soma as repetições da variavel
	for( i = 0; i <cont2.length; i++){ 
		soma += cont2[i]
		somaa[i] = soma
	}



//-----------------------------------Moda------------------------------------------------//
	var moda = 0
	var pos = 0
	
	for(i = 0; i< splitados.length; i++){	
		for( i = 0; i< cont2.length; i++){
			if(cont2[i] > moda){
                moda = cont2[i]
                pos = i
			}
		}
		moda = splitados[pos]
		
	}
	 moda = (`Moda: ${moda}`)

	 //-----------------------------------Média------------------------------------------------//

	 var sum = 0
	 var soma1 = [];
	 var mediaTotal = 0
	 var mediaDesvio = 0
	for( i = 0; i< splitados.length; i++){
		soma1[i] = 0
		numero = [];
	   for( j = 0; j< splitados.length; j++){
		   for( i = 0; i < cont2.length; i++){
			   if(splitados[i] == splitados[j]){
			    
				sum += splitados[i] * cont2[i]
				console.log(sum)
			   }
		
			}
		}
		mediaDesvio = sum/soma
		console.log(mediaDesvio)
		mediaTotal = sum/soma
		mediaTotal =(`Média: ${mediaTotal.toFixed(2)}`)
	}

	//-----------------------------------Mediana------------------------------------------------//

	var medianaTotal 
	mediana = (soma * 0.5).toFixed(0)
	var posMEDIANA = 0
	for(i = 0; i< splitados.length; i++){		
		for(i = 0; i< cont2.length; i++){
			if(cont2[i] > mediana){
                             posMEDIANA = i
			}
		}
		
	
	 MedianaTotal = (`Mediana: ${splitados[posMEDIANA]}`)
          }			
			
		
		medianaT = (`Mediana: ${medianaTotal}`)
       }

	//-----------------------------------Quintil------------------------------------------------//

	var k1,k2,k3,k4,k5 = 0
	var quintilvalor
	if(medidasSeparatrizes == 'K1'){
		k1 = (soma * 0.2).toFixed(0)
		k = 20
		valor = 100 - k
                var poskD = 0
		for(i = 0; i< splitados.length; i++){		
			for(i = 0; i< cont2.length; i++){
				if(cont2[i] > k1){
                                 poskD = i
			}
		}
		quintilvalor = splitados[poskD]
				
				
			
		}
				quintilvalor = (`${k}% dos(as) ${variavel} é de ${quintilvalor} ou menos e ${valor}% é de ${quintilvalor} ou mais`)
                document.getElementById('quintilvalor').innerHTML = quintilvalor;
	}
	if(medidasSeparatrizes == 'K2'){
		k2 = (soma * 0.4).toFixed(0)
		k = 40
		valor = 100 - k
		for(i = 0; i< splitados.length; i++){		
			for(i = 0; i< cont2.length; i++){
				if(cont2[i] > k2){
                           
                                 poskD = i
			}
		}
		quintilvalor = splitados[poskD]
				
				
				}
			
		
				quintilvalor = (`${k}% dos(as) ${variavel} é de ${quintilvalor} ou menos e ${valor}% é de ${quintilvalor} ou mais`)
                document.getElementById('quintilvalor').innerHTML = quintilvalor;
	}
	if(medidasSeparatrizes == 'K3'){
		k3 = (soma * 0.6).toFixed(0)
		k = 60
		valor =  100 - k
		for(i = 0; i< splitados.length; i++){		
			for(i = 0; i< cont2.length; i++){
				if(cont2[i] > k3){
                                 poskD = i
			}
		}
		quintilvalor = splitados[poskD]
				
		}
		       quintilvalor = (`${k}% dos(as) ${variavel} é de ${quintilvalor} ou menos e ${valor}% é de ${quintilvalor} ou mais`)
                document.getElementById('quintilvalor').innerHTML = quintilvalor;
	}
	if(medidasSeparatrizes == 'K4'){
		k4 = (soma * 0.8).toFixed(0)
		k = 80
		valor = 100 - k
		for(i = 0; i< splitados.length; i++){		
			for(i = 0; i< cont2.length; i++){
				if(cont2[i] > k4){
                                 poskD = i
			}
		}
		quintilvalor = splitados[poskD]
				
				
			
		}
		       quintilvalor = (`${k}% dos(as) ${variavel} é de ${quintilvalor} ou menos e ${valor}% é de ${quintilvalor} ou mais`)
                document.getElementById('quintilvalor').innerHTML = quintilvalor;
	}
	if(medidasSeparatrizes == 'K5'){
		k5 = (soma * 1.0).toFixed(0)
		k = 100
		for(i = 0; i< splitados.length; i++){		
			for(i = 0; i< cont2.length; i++){
				if(cont2[i] > k5){
                                 poskD = i
				
				
				}

			}
                    		quintilvalor = splitados[poskD]

		}
		       quintilvalor = (`${k}% dos(as) ${variavel} é de ${quintilvalor}`)
                document.getElementById('quintilvalor').innerHTML = quintilvalor;
	}


	 
	
	//------------------------------------------------------Quartil-------------------------------------------------//
 
	var quartilvalor
 var q,q1,q2,q3,q4
    if(medidasSeparatrizes == 'Q1'){
		q1 = (soma * 0.25).toFixed(0)
		q = 25
		valor =  100 - q
                var poskQ = 0
		for(i = 0; i< splitados.length; i++){		
			for(i = 0; i< somaa.length; i++){
				for(i = 0; i< cont2.length; i++){
				if(cont2[i] > q1){
                                 poskQ = i
				
				
				}
                        }
			
                    		quartilvalor = splitados[poskQ]

		
				
			
		}
				quartilvalor = (`${q}% dos(as) ${variavel} é de ${quartilvalor} ou menos e ${valor}% é de ${quartilvalor} ou mais`)
                document.getElementById('quartilvalor').innerHTML = quartilvalor;
	}
	if(medidasSeparatrizes == 'Q2'){
		q2 = (soma * 0.5).toFixed(0)
		q = 50
		valor =  100 - q
		for(i = 0; i< splitados.length; i++){		
			for(i = 0; i< cont2.length; i++){
				if(cont2[i] > q2){
                                 poskQ = i
				
				
				}
                        }
			
                    		quartilvalor = splitados[poskQ]

		
				
			
		
			
		}
				quartilvalor = (`${q}% dos(as) ${variavel} é de ${quartilvalor} ou menos e ${valor}% é de ${quartilvalor} ou mais`)
                document.getElementById('quartilvalor').innerHTML = quartilvalor;
	}
	if(medidasSeparatrizes == 'Q3'){
		q3 = (soma * 0.75).toFixed(0)
		q = 75
		valor =  100 - q
		for(i = 0; i< splitados.length; i++){		
			for(i = 0; i< cont2.length; i++){
				if(cont2[i] > q3){
                                 poskQ = i
				
				
				}
                        }
			
                    		quartilvalor = splitados[poskQ]

		
				
			
		
		}
		       quartilvalor = (`${q}% dos(as) ${variavel} é de ${quartilvalor} ou menos e ${valor}% é de ${quartilvalor} ou mais`)
                document.getElementById('quartilvalor').innerHTML = quartilvalor;
	}
	if(medidasSeparatrizes == 'Q4'){
		q4 = (soma * 1.0).toFixed(0)
		q = 100
		for(i = 0; i< splitados.length; i++){		
			   for(i = 0; i< cont2.length; i++){
				if(cont2[i] > q4){
                                 poskQ = i
				
				
				}
                        }
			
                    		quartilvalor = splitados[poskQ]

		
				
			
		
		}
		        quartilvalor = (`${q}% dos(as) ${variavel} é de ${quartilvalor} `)
                document.getElementById('quartilvalor').innerHTML = quartilvalor;
	}
	//---------------------------------------------Decil------------------------------------------//
	var d,d1,d2,d3,d4,d5,d6,d7,d8,d9
	var decilvalor
	if(medidasSeparatrizes == 'D1'){
		d1 = (soma * 0.1).toFixed(0)
		d = 10
		valor =  100 - d
                var poskDi = 0 
		for(i = 0; i< splitados.length; i++){		
				for(i = 0; i< cont2.length; i++){
				if(cont2[i] > d1){
                                 poskDi = i
				
				
				}
                        }
			
                    		decilvalor = splitados[poskDi]

		
				
			
		
		}
		       decilvalor = (`${d}% dos(as) ${variavel} é de ${decilvalor} ou menos e ${valor}% é de ${decilvalor} ou mais`)
				document.getElementById('decilvalor').innerHTML = decilvalor
	}
	if(medidasSeparatrizes == 'D2'){
		d2 = (soma * 0.2).toFixed(0)
		d = 20
		valor =  100 - d
		for(i = 0; i< splitados.length; i++){		
				for(i = 0; i< cont2.length; i++){
				if(cont2[i] > d2){
                                 poskDi = i
				
				
				}
                        }
			
                    		decilvalor = splitados[poskDi]

		
				
			
		}
				decilvalor = (`${d}% dos(as) ${variavel} é de ${decilvalor} ou menos e ${valor}% é de ${decilvalor} ou mais`)
				document.getElementById('decilvalor').innerHTML = decilvalor
	}
	if(medidasSeparatrizes == 'D3'){
		d3 = (soma * 0.3).toFixed(0)
		d = 30
		valor =  100 - d
		for(i = 0; i< splitados.length; i++){		
				for(i = 0; i< cont2.length; i++){
				if(cont2[i] > d3){
                                 poskDi = i
				
				
				}
                        }
			
                    		decilvalor = splitados[poskDi]

		
				
			
			
		}
				decilvalor = (`${d}% dos(as) ${variavel} é de ${decilvalor} ou menos e ${valor}% é de ${decilvalor} ou mais`)
				document.getElementById('decilvalor').innerHTML = decilvalor
	}
	if(medidasSeparatrizes == 'D4'){
		d4 = (soma * 0.4).toFixed(0)
		d = 40
		valor =  100 - d
		for(i = 0; i< splitados.length; i++){		
				for(i = 0; i< cont2.length; i++){
				if(cont2[i] > d4){
                                 poskDi = i
				
				
				}
                        }
			
                    		decilvalor = splitados[poskDi]

		
				
                   }
				decilvalor = (`${d}% dos(as) ${variavel} é de ${decilvalor} ou menos e ${valor}% é de ${decilvalor} ou mais`)
				document.getElementById('decilvalor').innerHTML = decilvalor
	}
	if(medidasSeparatrizes == 'D5'){
		d5 = (soma * 0.5).toFixed(0)
		d = 50
		valor =  100 - d
		for(i = 0; i< splitados.length; i++){		
				for(i = 0; i< cont2.length; i++){
				if(cont2[i] > d5){
                                 poskDi = i
				
				
				}
                        }
			
                    		decilvalor = splitados[poskDi]

		
				
			
				
				
			
		}
				decilvalor = (`${d}% dos(as) ${variavel} é de ${decilvalor} ou menos e ${valor}% é de ${decilvalor} ou mais`)
				document.getElementById('decilvalor').innerHTML = decilvalor
	}
	if(medidasSeparatrizes == 'D6'){
		d6 = (soma * 0.6).toFixed(0)
		d = 60
		valor =  100 - d
		for(i = 0; i< splitados.length; i++){		
				for(i = 0; i< cont2.length; i++){
				if(cont2[i] > d6){
                                 poskDi = i
				
				
				}
                        }
			
                    		decilvalor = splitados[poskDi]

		
				
			
		}
				decilvalor = (`${d}% dos(as) ${variavel} é de ${decilvalor} ou menos e ${valor}% é de ${decilvalor} ou mais`)
				document.getElementById('decilvalor').innerHTML = decilvalor
	}
	if(medidasSeparatrizes == 'D7'){
		d7 = (soma * 0.7).toFixed(0)
		d = 70
		valor =  100 - d
		for(i = 0; i< splitados.length; i++){		
				for(i = 0; i< cont2.length; i++){
				if(cont2[i] > d7){
                                 poskDi = i
				
				
				}
                        }
			
                    		decilvalor = splitados[poskDi]

		
				
			
			
		}
		decilvalor = (`${d}% dos(as) ${variavel} é de ${decilvalor} ou menos e ${valor}% é de ${decilvalor} ou mais`)
		document.getElementById('decilvalor').innerHTML = decilvalor
	}
	if(medidasSeparatrizes == 'D8'){
		d8 = (soma * 0.8).toFixed(0)
		d = 80
		valor =  100 - d
		for(i = 0; i< splitados.length; i++){		
				for(i = 0; i< cont2.length; i++){
				if(cont2[i] > d8){
                                 poskDi = i
				
				
				}
                        }
			
                    		decilvalor = splitados[poskDi]

		
				
			
		}
				decilvalor = (`${d}% dos(as) ${variavel} é de ${decilvalor} ou menos e ${valor}% é de ${decilvalor} ou mais`)
				document.getElementById('decilvalor').innerHTML = decilvalor
	}
	if(medidasSeparatrizes == 'D9'){
		d9 = (soma * 0.9).toFixed(0)
		d = 90
		valor =  100 - d
		for(i = 0; i< splitados.length; i++){		
				for(i = 0; i< cont2.length; i++){
				if(cont2[i] > d9){
                                 poskDi = i
				
				
				}
                        }
			
                    		decilvalor = splitados[poskDi]

		
				
			
		}
	        	decilvalor = (`${d}% dos(as) ${variavel} é de ${decilvalor} ou menos e ${valor}% é de ${decilvalor} ou mais`)
				document.getElementById('decilvalor').innerHTML = decilvalor
	}
	if(medidasSeparatrizes == 'D10'){
		d10 = (soma * 1.0).toFixed(0)
		d = 100
		for(i = 0; i< splitados.length; i++){		
				for(i = 0; i< cont2.length; i++){
				if(cont2[i] > d10){
                                 poskDi = i
				
				
				}
                        }
			
                    		decilvalor = splitados[poskDi]

		
				
			
		}
		      decilvalor = (`${d}% dos(as) ${variavel} é de ${decilvalor} `)
			  document.getElementById('decilvalor').innerHTML = decilvalor
	}
	//----------------------------------Porcentil--------------------------------------------//	
	if( separatriz == 'Porcentil' ){
		var porcentil1  = 0
			porcentil = (medidasSeparatrizes / 100)
			console.log(porcentil)
			p = (soma * porcentil).toFixed(0)
			console.log(p)
			console.log(soma)
			valor = 100 - medidasSeparatrizes
			for(i = 0; i< splitados.length; i++){
						porcentil1 = splitados[p]
						console.log(porcentil1)
				      console.log(i)
					}
					console.log(porcentil1)
					console.log(i)
			      	
				
			
				porcentilvalor =(`${medidasSeparatrizes}% dos(as) ${variavel} é de ${porcentil1} ou menos e ${valor}% é de ${porcentil1} ou mais`)
				document.getElementById('porcentilvalor').innerHTML = porcentilvalor;

	   }
	            
		
    

	//-------------------------- DESVIO PADRÃO --------------------------------//
	var Desvio = 0
	var DesvioV
	for(i = 0; i<splitados.length; i++){
	
		Desvio += Math.pow(splitados[i] - mediaDesvio, 2) * cont2[i]
	
	}
	  DesvioP = Math.sqrt(Desvio / soma)
	  DesvioV = Math.sqrt(Desvio / soma)
            
	  console.log(Desvio.toFixed(2))
	  DesvioV =(`Desvio padrão: ${DesvioV.toFixed(2)}`)
	  document.getElementById('desvio').innerHTML = DesvioV;

	  //------------------------------COEFICIENTE DE VARIAÇÃO----------------------//
	  var coeficienteV 
	  coeficienteV = Desvio
	  console.log(coeficienteV)
	  coeficienteV = (`Coeficiente de variação: ${coeficienteV}`)
	  document.getElementById('variacao').innerHTML = coeficienteV;
	  //------------------------------------TABELA------------------------------------//
	
	var html = '<table id="tabela"> <th> <td>Fi</td> <td>F%</td> <td>Fac</td> <td>Fac%</td> </th>'; 
	for(i=0; i <cont2.length; i ++) {
		fperc[i] = Math.round(((cont2[i] / soma) * 100));
		ftperc[i] = Math.round(((somaa[i] / soma) * 100))
		controle = 0;
		for(j = 0; j < splitados.length; j++){
			if (repetidos[j] == splitados[i]){
				controle = 1;
				
			}
		}
		if (controle == 0) {
			html += "<tr><td> " + splitados[i] + "</td><td> " + cont2[i] + "</td><td>"  + fperc[i] + "</td><td>"+ somaa[i] + "</td><td>" + ftperc[i] + "</td></tr>"
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
		data.addColumn('number', 'soma');
		data.addRows([ ['Variavel', somaa[i]] 
	
	  ]);
	
		
  
	  var chart = new google.visualization.ColumnChart(document.getElementById('Chart'));
	  chart.draw(data, somaa[i]);
	

	  

	

	
	
	


}
	document.getElementById('moda').innerHTML = moda;
	document.getElementById('media').innerHTML = mediaTotal;
	document.getElementById('mediana').innerHTML = medianaT;

	
	

	html += '</table>';
	document.getElementById('tabela').innerHTML = html	
	console.log(html);
}
if(tipodescritiva == "Quantitativa Continua"){
	if (dados != ""){
		var splita = dados.split(";");
		splitados = splita.sort((a, b) => a - b)
			
	}	
	
		
	
	var  cont2 = []
	
		var xman
	//Contabiliza as repetições de cada variável
	for( i = 0; i< splitados.length; i++){
		 cont = 1
		 xman = 0
		for( j = i; j < splitados.length; j++){
	
			if ((splitados[i] == splitados[j]) && (splitados[i].length == splitados[j].length)) {
				while(splitados[j] == splitados[j+1]){
					 
					cont ++
					
					splitados.splice(j,1);
					
				}
			
					
			}
			var  somaa = []
				soma = 0
				cont2[i] = cont
		}
	}// Acumula e soma as repetições da variavel
	for( i = 0; i <cont2.length; i++){ 
		soma += cont2[i]
	   somaa[i] = soma
	}
				
		
			
	
let min = splitados[0]
console.log(min)
	let max = splitados[splitados.length-1]
	console.log(max)

	let At = max - min	
	console.log(At)

	let K = Math.sqrt(soma).toFixed(0)
	console.log(soma)

	let vetK = [K-1, K, (((K/100) *100 )+1)];
	console.log(vetK)
  
  for(let i = At+1; i != 0; i++){
	if(i % vetK[0] == 0){
	   At = i;
	   K = vetK[0];
	   break;
	} else if(i%vetK[1] == 0){
	   At = i;
	   K = vetK[1];
	   break;
	} else if(i%vetK[2] == 0){
	   At = i;
	   K = vetK[2];
	   break;
	}
 }
 console.log(At)
 console.log(K)
 let Ic = At/K;	
 console.log(Ic)
 var kVetor =[]
 //calculo da frequencia
 for( i= 0; i < k; i ++){
	 kVetor[i] = K


 }
var html = '<table id="tabela"> <th> <td>Fi</td> <td>F%</td> <td>Fac</td> <td>Fac%</td> </th>'; 
for(i=0; i <kVetor.length; i ++) {
	fperc[i] = Math.round(((cont2[i] / soma) * 100));
	ftperc[i] = Math.round(((somaa[i] / soma) * 100))
	controle = 0;
	for(j = 0; j < splitados.length; j++){
		if (repetidos[j] == splitados[i]){
			controle = 1;
			
		}
	}
	if (controle == 0) {
		html += "<tr><td> " + splitados[i] + "|----" + splitados[Ic] + "</td><td> " 
		repetidos[i] = splitados[i];
        
			
		

	}
	else{
		repetidos[i] = -1;
	  
		
	}
	
 
	html += '</table>';
	document.getElementById('tabela').innerHTML = html	
	console.log(html);
}


console.log(splitados)
}
if(tipodescritiva == "Qualitativa Ordinal"){
	var soma 
	// ORDENAÇÃO DOS DADOS
	if (dados != ""){
		var splita = dados.split(";");
		splitados = splita.sort((a, b) => a - b)
			
	}	
	
		
	
	var  cont2 = []
	
	//Contabiliza as repetições de cada variável
	for( i = 0; i< splitados.length; i++){
		 cont = 1
		 xman = 0
		for( j = i; j < splitados.length; j++){
	
			if ((splitados[i] == splitados[j]) && (splitados[i].length == splitados[j].length)) {
				while(splitados[j] == splitados[j+1]){
					 
					cont ++
					
					splitados.splice(j,1);
					
				}
				
					
			}
			var  somaa = []
			soma = 0
			cont2[i] = cont
			xman = splitados[i]
		
	
				
		}
			
	}   // Acumula e soma as repetições da variavel
		for( i = 0; i <cont2.length; i++){ 
			soma += cont2[i]
			somaa[i] = soma
		}
	
	
	
	//-----------------------------------Moda------------------------------------------------//
		var moda = 0
		var pos = 0
		
		for(i = 0; i< splitados.length; i++){	
			for( i = 0; i< cont2.length; i++){
				if(cont2[i] > moda){
					moda = cont2[i]
					pos = i
				}
			}
			moda = splitados[pos]
			
		}
		 moda = (`Moda: ${moda}`)
	
		//-----------------------------------Mediana------------------------------------------------//
	
		var medianaTotal = ""
		mediana = (soma * 0.5).toFixed(0)
		console.log(mediana)
		var posm = 0
		
		for(i = 0; i< splitados.length; i++){	
			for( i = 0; i< cont2.length; i++){
				if(cont2[i] == mediana){
					mediana = cont2[i]
					posm = i
				}
			}
			medianaT = splitados[posm]
		}

		
		medianaT = (`Mediana:50% de ${soma} = ${mediana}, desta forma a ${variavel} da posição ${mediana}  é ${medianaT}`)

	
		//-----------------------------------Quintil------------------------------------------------//
	
		var k1,k2,k3,k4,k5 = 0
		var quintilvalor
		if(medidasSeparatrizes == 'K1'){
			k1 = (soma * 0.2).toFixed(0)
			k = 20
			valor = 100 - k
			 var posk = 0
			 quintilvalor = 0
			for(i = 0; i< splitados.length; i++){		
				for(i = 0; i< cont2.length; i++){
					if(cont2[i] == k1){
						quintilvalor = cont2[i]
						posk = i
					}
					
				}
				quintilvalor = splitados[posk]
			}
		
		quintilvalor = (`${k}% dos(as) ${variavel} julgaram ${quintilvalor} ou menos e ${valor}% é de ${quintilvalor} ou mais`)
		document.getElementById('quintilvalor').innerHTML = quintilvalor;
}
		if(medidasSeparatrizes == 'K2'){
			k2 = (soma * 0.4).toFixed(0)
			k = 40
			valor = 100 - k
			for(i = 0; i< splitados.length; i++){		
				for(i = 0; i< cont2.length; i++){
					if(cont2[i] == k2){
						quintilvalor = cont2[i]
						posk = i
					}
					quintilvalor = splitados[posk]

				}
			}
			quintilvalor = (`${k}% dos(as) ${variavel} julgaram ${quintilvalor} ou menos e ${valor}% é de ${quintilvalor} ou mais`)
			document.getElementById('quintilvalor').innerHTML = quintilvalor;
	}		
		if(medidasSeparatrizes == 'K3'){
			k3 = (soma * 0.6).toFixed(0)
			k = 60
			valor =  100 - k
			for(i = 0; i< splitados.length; i++){		
				for(i = 0; i< cont2.length; i++){
					if(cont2[i] == k3){
						quintilvalor = cont2[i]
						posk = i
					}
					quintilvalor = splitados[posk]
				}
			}
		
			quintilvalor = (`${k}% dos(as) ${variavel} julgaram ${quintilvalor} ou menos e ${valor}% é de ${quintilvalor} ou mais`)
			document.getElementById('quintilvalor').innerHTML = quintilvalor;
				
		}
					
		if(medidasSeparatrizes == 'K4'){
			k4 = (soma * 0.8).toFixed(0)
			k = 80
			valor = 100 - k
			for(i = 0; i< splitados.length; i++){		
				for(i = 0; i< cont2.length; i++){
					if(cont2[i] == k4){
						quintilvalor = cont2[i]
						posk = i
					}

				}
				quintilvalor = splitados[posk]

			}
					quintilvalor = (`${k}% dos(as) ${variavel} julgaram ${quintilvalor} ou menos e ${valor}% é de ${quintilvalor} ou mais`)
					document.getElementById('quintilvalor').innerHTML = quintilvalor;
		
		}
		
	
		if(medidasSeparatrizes == 'K5'){
			k5 = (soma * 1.0).toFixed(0)
			k = 100
			for(i = 0; i< splitados.length; i++){		
					for(i = 0; i< cont2.length; i++){
						if(cont2[i] == k5){
							quintilvalor = cont2[i]
							posk = i
						}

					}
					quintilvalor = splitados[posk]

				}
			
						quintilvalor = (`${k}% dos(as) ${variavel} julgaram ${quintilvalor} ou menos e ${valor}% é de ${quintilvalor} ou mais`)
						document.getElementById('quintilvalor').innerHTML = quintilvalor;
	
		}
	
    
		 
		
		//------------------------------------------------------Quartil-------------------------------------------------//
	 
		var quartilvalor
	 var q,q1,q2,q3,q4
		if(medidasSeparatrizes == 'Q1'){
			q1 = (soma * 0.25).toFixed(0)
			q = 25
			valor =  100 - q
			var poskq = 0
			for(i = 0; i< splitados.length; i++){		
					for(i = 0; i< cont2.length; i++){
						if(cont2[i] == q1){
							quartilvalor = cont2[i]
							poskq = i
						}
					}
					quartilvalor = splitados[poskq]

			    }		
				
					quartilvalor = (`${q}% dos(as) ${variavel} é de ${quartilvalor} ou menos e ${valor}% é de ${quartilvalor} ou mais`)
					document.getElementById('quartilvalor').innerHTML = quartilvalor;
		}
		if(medidasSeparatrizes == 'Q2'){
			q2 = (soma * 0.5).toFixed(0)
			q = 50
			valor =  100 - q
			for(i = 0; i< splitados.length; i++){		
				for(i = 0; i< cont2.length; i++){
					if(cont2[i] == q2){
						quartilvalor = cont2[i]
						poskq = i
					}

				}
				quartilvalor = splitados[poskq]

			}	
			
				quartilvalor = (`${q}% dos(as) ${variavel} é de ${quartilvalor} ou menos e ${valor}% é de ${quartilvalor} ou mais`)
				document.getElementById('quartilvalor').innerHTML = quartilvalor;
	    }
		if(medidasSeparatrizes == 'Q3'){
			q3 = (soma * 0.75).toFixed(0)
			q = 75
			valor =  100 - q
			for(i = 0; i< splitados.length; i++){		
				for(i = 0; i< cont2.length; i++){
					if(cont2[i] == q3){
						quartilvalor = cont2[i]
						poskq = i
					}

				}
				quartilvalor = splitados[poskq]

					
			}
				quartilvalor = (`${q}% dos(as) ${variavel} é de ${quartilvalor} ou menos e ${valor}% é de ${quartilvalor} ou mais`)
				document.getElementById('quartilvalor').innerHTML = quartilvalor;
	}					
		if(medidasSeparatrizes == 'Q4'){
			q4 = (soma * 1.0).toFixed(0)
			q = 100
			for(i = 0; i< splitados.length; i++){
				for(i = 0; i< cont2.length; i++){
					if(cont2[i] == q4){
						quartilvalor = cont2[i]
						poskq = i
					}
					quartilvalor = splitados[poskq]

				}
				quartilvalor = (`${q}% dos(as) ${variavel} é de ${quartilvalor} ou menos e ${valor}% é de ${quartilvalor} ou mais`)
				document.getElementById('quartilvalor').innerHTML = quartilvalor;
	
			}
				
		//---------------------------------------------Decil------------------------------------------//
		var d,d1,d2,d3,d4,d5,d6,d7,d8,d9
		var decilvalor
		if(medidasSeparatrizes == 'D1'){
			d1 = (soma * 0.1).toFixed(0)
			d = 10
			valor =  100 - d
			var posd = 0
			for(i = 0; i< splitados.length; i++){	
				for(i = 0; i< cont2.length; i++){
					if(cont2[i] == d1){
						decilvalor = cont2[i]
						posd = i
					}
				}
				decilvalor = splitados[posd]

			}
				decilvalor = (`${d}% dos(as) ${variavel} é de ${decilvalor} ou menos e ${valor}% é de ${decilvalor} ou mais`)
			    document.getElementById('decilvalor').innerHTML = decilvalor
			
		}
		if(medidasSeparatrizes == 'D2'){
			d2 = (soma * 0.2).toFixed(0)
			d = 20
			valor =  100 - d
			for(i = 0; i< splitados.length; i++){		
				for(i = 0; i< cont2.length; i++){
					if(cont2[i] == d2){
						decilvalor = cont2[i]
						posd = i
					}
				}
				decilvalor = splitados[posd]

			}
				decilvalor = (`${d}% dos(as) ${variavel} é de ${decilvalor} ou menos e ${valor}% é de ${decilvalor} ou mais`)
			    document.getElementById('decilvalor').innerHTML = decilvalor
			}	

		if(medidasSeparatrizes == 'D3'){
			d3 = (soma * 0.3).toFixed(0)
			d = 30
			valor =  100 - d
			for(i = 0; i< splitados.length; i++){		
					for(i = 0; i< cont2.length; i++){
						if(cont2[i] == d3){
							decilvalor = cont2[i]
							posd = i
						}
					}
					decilvalor = splitados[posd]

				
			    }
					decilvalor = (`${d}% dos(as) ${variavel} é de ${decilvalor} ou menos e ${valor}% é de ${decilvalor} ou mais`)
					document.getElementById('decilvalor').innerHTML = decilvalor
				}	
		if(medidasSeparatrizes == 'D4'){
			d4 = (soma * 0.4).toFixed(0)
			d = 40
			valor =  100 - d
			for(i = 0; i< splitados.length; i++){		
				for(i = 0; i< cont2.length; i++){
					if(cont2[i] == d4){
						decilvalor = cont2[i]
						posd = i
					}
				}
				decilvalor = splitados[posd]

			}
				decilvalor = (`${d}% dos(as) ${variavel} é de ${decilvalor} ou menos e ${valor}% é de ${decilvalor} ou mais`)
			    document.getElementById('decilvalor').innerHTML = decilvalor
			}	
		if(medidasSeparatrizes == 'D5'){
			d5 = (soma * 0.5).toFixed(0)
			d = 50
			valor =  100 - d
			for(i = 0; i< splitados.length; i++){		
				for(i = 0; i< cont2.length; i++){
					if(cont2[i] == d5){
						decilvalor = cont2[i]
						posd = i
					}
				}
				decilvalor = splitados[posd]

			}
				decilvalor = (`${d}% dos(as) ${variavel} é de ${decilvalor} ou menos e ${valor}% é de ${decilvalor} ou mais`)
			    document.getElementById('decilvalor').innerHTML = decilvalor
			}	
		if(medidasSeparatrizes == 'D6'){
			d6 = (soma * 0.6).toFixed(0)
			d = 60
			valor =  100 - d
			for(i = 0; i< splitados.length; i++){		
				for(i = 0; i< cont2.length; i++){
					if(cont2[i] == d6){
						decilvalor = cont2[i]
						posd = i
					}
				}
				decilvalor = splitados[posd]

			}
				decilvalor = (`${d}% dos(as) ${variavel} é de ${decilvalor} ou menos e ${valor}% é de ${decilvalor} ou mais`)
			    document.getElementById('decilvalor').innerHTML = decilvalor
			}	
		if(medidasSeparatrizes == 'D7'){
			d7 = (soma * 0.7).toFixed(0)
			d = 70
			valor =  100 - d
			for(i = 0; i< splitados.length; i++){		
				for(i = 0; i< cont2.length; i++){
					if(cont2[i] == d7){
						decilvalor = cont2[i]
						posd = i
					}
				}
				decilvalor = splitados[posd]

			}
			
				decilvalor = (`${d}% dos(as) ${variavel} é de ${decilvalor} ou menos e ${valor}% é de ${decilvalor} ou mais`)
			    document.getElementById('decilvalor').innerHTML = decilvalor
			
		}
		  
		if(medidasSeparatrizes == 'D8'){
			d8 = (soma * 0.8).toFixed(0)
			d = 80
			valor =  100 - d
			for(i = 0; i< splitados.length; i++){
				for(i = 0; i< cont2.length; i++){
					if(cont2[i] == d8){
						decilvalor = cont2[i]
						posd = i
					}
				}
				decilvalor = splitados[posd]

			
			}
				decilvalor = (`${d}% dos(as) ${variavel} é de ${decilvalor} ou menos e ${valor}% é de ${decilvalor} ou mais`)
			    document.getElementById('decilvalor').innerHTML = decilvalor
			
		}		
				
		if(medidasSeparatrizes == 'D9'){
			d9 = (soma * 0.9).toFixed(0)
			d = 90
			valor =  100 - d
			for(i = 0; i< splitados.length; i++){		
				for(i = 0; i< cont2.length; i++){
					if(cont2[i] == d9){
						decilvalor = cont2[i]
						posd = i
					}
				}
				decilvalor = splitados[posd]

			}
				decilvalor = (`${d}% dos(as) ${variavel} é de ${decilvalor} ou menos e ${valor}% é de ${decilvalor} ou mais`)
			    document.getElementById('decilvalor').innerHTML = decilvalor
			
		}
		if(medidasSeparatrizes == 'D10'){
			d10 = (soma * 1.0).toFixed(0)
			d = 100
			for(i = 0; i< splitados.length; i++){		
				for(i = 0; i< cont2.length; i++){
					if(cont2[i] == d10){
						decilvalor = cont2[i]
						posd = i
					}
				}
				decilvalor = splitados[posd]

			}
				decilvalor = (`${d}% dos(as) ${variavel} é de ${decilvalor} ou menos e ${valor}% é de ${decilvalor} ou mais`)
			    document.getElementById('decilvalor').innerHTML = decilvalor
			
		}
		//----------------------------------Porcentil--------------------------------------------//	
		if( separatriz == 'Porcentil' ){
			var porcentil1  = 0
				porcentil = (medidasSeparatrizes / 100)
				console.log(porcentil)
				p = (soma * porcentil).toFixed(0)
				console.log(p)
				console.log(soma)
				valor = 100 - medidasSeparatrizes
				for(i = 0; i< splitados.length; i++){
							porcentil1 = splitados[p]
							console.log(porcentil1)
						  console.log(i)
						}
						console.log(porcentil1)
						console.log(i)
										
		   }
		   			porcentilvalor =(`${medidasSeparatrizes}% dos(as) ${variavel} é de ${porcentil1} ou menos e ${valor}% é de ${porcentil1} ou mais`)
					document.getElementById('porcentilvalor').innerHTML = porcentilvalor;
	
		}		
			
		
		  //------------------------------------TABELA------------------------------------//
		
		var html = '<table id="tabela"> <th> <td>Fi</td> <td>F%</td> <td>Fac</td> <td>Fac%</td> </th>'; 
		for(i=0; i <cont2.length; i ++) {
			fperc[i] = Math.round(((cont2[i] / soma) * 100));
			ftperc[i] = Math.round(((somaa[i] / soma) * 100))
			controle = 0;
			for(j = 0; j < splitados.length; j++){
				if (repetidos[j] == splitados[i]){
					controle = 1;
					
				}
			}
			if (controle == 0) {
				html += "<tr><td> " + splitados[i] + "</td><td> " + cont2[i] + "</td><td>"  + fperc[i] + "</td><td>"+ somaa[i] + "</td><td>" + ftperc[i] + "</td></tr>"
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
			data.addColumn('number', 'soma');
			data.addRows([ ['Variavel', somaa[i]] 
		
		  ]);
		
			
	  
		  var chart = new google.visualization.ColumnChart(document.getElementById('Chart'));
		  chart.draw(data, somaa[i]);
		
	
		  
	
		
	
		
		
		
	
	
	}
		document.getElementById('moda').innerHTML = moda;
		document.getElementById('mediana').innerHTML = medianaT;
	
		
		
	
		html += '</table>';
		document.getElementById('tabela').innerHTML = html	
		console.log(html);
	}
	if(tipodescritiva == "Qualitativa Nominal"){
		var soma 
		// ORDENAÇÃO DOS DADOS
		if (dados != ""){
			var splitados = dados.split(";");
				
		}	
		
			
		
		var  cont2 = []
		
		//Contabiliza as repetições de cada variável
		for( i = 0; i< splitados.length; i++){
			 cont = 1
			 xman = 0
			for( j = i; j < splitados.length; j++){
		
				if ((splitados[i] == splitados[j]) && (splitados[i].length == splitados[j].length)) {
					while(splitados[j] == splitados[j+1]){
						 
						cont ++
						
						splitados.splice(j,1);
						
					}
					
						
				}
				var  somaa = []
				soma = 0
				cont2[i] = cont
				xman = splitados[i]
			
		
					
			}
				
		}   // Acumula e soma as repetições da variavel
			for( i = 0; i <cont2.length; i++){ 
				soma += cont2[i]
				somaa[i] = soma
			}
		
		
		
		//-----------------------------------Moda------------------------------------------------//
			var moda = 0
			var pos = 0
			
			for(i = 0; i< splitados.length; i++){	
				for( i = 0; i< cont2.length; i++){
					if(cont2[i] > moda){
						moda = cont2[i]
						pos = i
					}
				}
				moda = splitados[pos]
				
			}
			 moda = (`Moda: ${moda}`)
		
			//-----------------------------------Mediana------------------------------------------------//
		
			var medianaTotal = ""
			mediana = (soma * 0.5).toFixed(0)
			console.log(mediana)
			var posm = 0
			
			for(i = 0; i< splitados.length; i++){	
				for( i = 0; i< cont2.length; i++){
					if(cont2[i] == mediana){
						mediana = cont2[i]
						posm = i
					}
				}
				medianaT = splitados[posm]
			}
	
			
			medianaT = (`Mediana:50% de ${soma} = ${mediana}, desta forma a ${variavel} da posição ${mediana}  é ${medianaT}`)
	
		
			//-----------------------------------Quintil------------------------------------------------//
		
			var k1,k2,k3,k4,k5 = 0
			var quintilvalor
			if(medidasSeparatrizes == 'K1'){
				k1 = (soma * 0.2).toFixed(0)
				k = 20
				valor = 100 - k
				 var posk = 0
				 quintilvalor = 0
				for(i = 0; i< splitados.length; i++){		
					for(i = 0; i< cont2.length; i++){
						if(cont2[i] == k1){
							quintilvalor = cont2[i]
							posk = i
						}
						
					}
					quintilvalor = splitados[posk]
				}
			
			quintilvalor = (`${k}% dos(as) ${variavel} julgaram ${quintilvalor} ou menos e ${valor}% é de ${quintilvalor} ou mais`)
			document.getElementById('quintilvalor').innerHTML = quintilvalor;
	}
			if(medidasSeparatrizes == 'K2'){
				k2 = (soma * 0.4).toFixed(0)
				k = 40
				valor = 100 - k
				for(i = 0; i< splitados.length; i++){		
					for(i = 0; i< cont2.length; i++){
						if(cont2[i] == k2){
							quintilvalor = cont2[i]
							posk = i
						}
						quintilvalor = splitados[posk]
	
					}
				}
				quintilvalor = (`${k}% dos(as) ${variavel} julgaram ${quintilvalor} ou menos e ${valor}% é de ${quintilvalor} ou mais`)
				document.getElementById('quintilvalor').innerHTML = quintilvalor;
		}		
			if(medidasSeparatrizes == 'K3'){
				k3 = (soma * 0.6).toFixed(0)
				k = 60
				valor =  100 - k
				for(i = 0; i< splitados.length; i++){		
					for(i = 0; i< cont2.length; i++){
						if(cont2[i] == k3){
							quintilvalor = cont2[i]
							posk = i
						}
						quintilvalor = splitados[posk]
					}
				}
			
				quintilvalor = (`${k}% dos(as) ${variavel} julgaram ${quintilvalor} ou menos e ${valor}% é de ${quintilvalor} ou mais`)
				document.getElementById('quintilvalor').innerHTML = quintilvalor;
					
			}
						
			if(medidasSeparatrizes == 'K4'){
				k4 = (soma * 0.8).toFixed(0)
				k = 80
				valor = 100 - k
				for(i = 0; i< splitados.length; i++){		
					for(i = 0; i< cont2.length; i++){
						if(cont2[i] == k4){
							quintilvalor = cont2[i]
							posk = i
						}
	
					}
					quintilvalor = splitados[posk]
	
				}
						quintilvalor = (`${k}% dos(as) ${variavel} julgaram ${quintilvalor} ou menos e ${valor}% é de ${quintilvalor} ou mais`)
						document.getElementById('quintilvalor').innerHTML = quintilvalor;
			
			}
			
		
			if(medidasSeparatrizes == 'K5'){
				k5 = (soma * 1.0).toFixed(0)
				k = 100
				for(i = 0; i< splitados.length; i++){		
						for(i = 0; i< cont2.length; i++){
							if(cont2[i] == k5){
								quintilvalor = cont2[i]
								posk = i
							}
	
						}
						quintilvalor = splitados[posk]
	
					}
				
							quintilvalor = (`${k}% dos(as) ${variavel} julgaram ${quintilvalor} ou menos e ${valor}% é de ${quintilvalor} ou mais`)
							document.getElementById('quintilvalor').innerHTML = quintilvalor;
		
			}
		
		
			 
			
			//------------------------------------------------------Quartil-------------------------------------------------//
		 
			var quartilvalor
		 var q,q1,q2,q3,q4
			if(medidasSeparatrizes == 'Q1'){
				q1 = (soma * 0.25).toFixed(0)
				q = 25
				valor =  100 - q
				var poskq = 0
				for(i = 0; i< splitados.length; i++){		
						for(i = 0; i< cont2.length; i++){
							if(cont2[i] == q1){
								quartilvalor = cont2[i]
								poskq = i
							}
						}
						quartilvalor = splitados[poskq]
	
					}		
					
						quartilvalor = (`${q}% dos(as) ${variavel} é de ${quartilvalor} ou menos e ${valor}% é de ${quartilvalor} ou mais`)
						document.getElementById('quartilvalor').innerHTML = quartilvalor;
			}
			if(medidasSeparatrizes == 'Q2'){
				q2 = (soma * 0.5).toFixed(0)
				q = 50
				valor =  100 - q
				for(i = 0; i< splitados.length; i++){		
					for(i = 0; i< cont2.length; i++){
						if(cont2[i] == q2){
							quartilvalor = cont2[i]
							poskq = i
						}
	
					}
					quartilvalor = splitados[poskq]
	
				}	
				
					quartilvalor = (`${q}% dos(as) ${variavel} é de ${quartilvalor} ou menos e ${valor}% é de ${quartilvalor} ou mais`)
					document.getElementById('quartilvalor').innerHTML = quartilvalor;
			}
			if(medidasSeparatrizes == 'Q3'){
				q3 = (soma * 0.75).toFixed(0)
				q = 75
				valor =  100 - q
				for(i = 0; i< splitados.length; i++){		
					for(i = 0; i< cont2.length; i++){
						if(cont2[i] == q3){
							quartilvalor = cont2[i]
							poskq = i
						}
	
					}
					quartilvalor = splitados[poskq]
	
						
				}
					quartilvalor = (`${q}% dos(as) ${variavel} é de ${quartilvalor} ou menos e ${valor}% é de ${quartilvalor} ou mais`)
					document.getElementById('quartilvalor').innerHTML = quartilvalor;
		}					
			if(medidasSeparatrizes == 'Q4'){
				q4 = (soma * 1.0).toFixed(0)
				q = 100
				for(i = 0; i< splitados.length; i++){
					for(i = 0; i< cont2.length; i++){
						if(cont2[i] == q4){
							quartilvalor = cont2[i]
							poskq = i
						}
						quartilvalor = splitados[poskq]
	
					}
					quartilvalor = (`${q}% dos(as) ${variavel} é de ${quartilvalor} ou menos e ${valor}% é de ${quartilvalor} ou mais`)
					document.getElementById('quartilvalor').innerHTML = quartilvalor;
		
				}
					
			//---------------------------------------------Decil------------------------------------------//
			var d,d1,d2,d3,d4,d5,d6,d7,d8,d9
			var decilvalor
			if(medidasSeparatrizes == 'D1'){
				d1 = (soma * 0.1).toFixed(0)
				d = 10
				valor =  100 - d
				var posd = 0
				for(i = 0; i< splitados.length; i++){	
					for(i = 0; i< cont2.length; i++){
						if(cont2[i] == d1){
							decilvalor = cont2[i]
							posd = i
						}
					}
					decilvalor = splitados[posd]
	
				}
					decilvalor = (`${d}% dos(as) ${variavel} é de ${decilvalor} ou menos e ${valor}% é de ${decilvalor} ou mais`)
					document.getElementById('decilvalor').innerHTML = decilvalor
				
			}
			if(medidasSeparatrizes == 'D2'){
				d2 = (soma * 0.2).toFixed(0)
				d = 20
				valor =  100 - d
				for(i = 0; i< splitados.length; i++){		
					for(i = 0; i< cont2.length; i++){
						if(cont2[i] == d2){
							decilvalor = cont2[i]
							posd = i
						}
					}
					decilvalor = splitados[posd]
	
				}
					decilvalor = (`${d}% dos(as) ${variavel} é de ${decilvalor} ou menos e ${valor}% é de ${decilvalor} ou mais`)
					document.getElementById('decilvalor').innerHTML = decilvalor
				}	
	
			if(medidasSeparatrizes == 'D3'){
				d3 = (soma * 0.3).toFixed(0)
				d = 30
				valor =  100 - d
				for(i = 0; i< splitados.length; i++){		
						for(i = 0; i< cont2.length; i++){
							if(cont2[i] == d3){
								decilvalor = cont2[i]
								posd = i
							}
						}
						decilvalor = splitados[posd]
	
					
					}
						decilvalor = (`${d}% dos(as) ${variavel} é de ${decilvalor} ou menos e ${valor}% é de ${decilvalor} ou mais`)
						document.getElementById('decilvalor').innerHTML = decilvalor
					}	
			if(medidasSeparatrizes == 'D4'){
				d4 = (soma * 0.4).toFixed(0)
				d = 40
				valor =  100 - d
				for(i = 0; i< splitados.length; i++){		
					for(i = 0; i< cont2.length; i++){
						if(cont2[i] == d4){
							decilvalor = cont2[i]
							posd = i
						}
					}
					decilvalor = splitados[posd]
	
				}
					decilvalor = (`${d}% dos(as) ${variavel} é de ${decilvalor} ou menos e ${valor}% é de ${decilvalor} ou mais`)
					document.getElementById('decilvalor').innerHTML = decilvalor
				}	
			if(medidasSeparatrizes == 'D5'){
				d5 = (soma * 0.5).toFixed(0)
				d = 50
				valor =  100 - d
				for(i = 0; i< splitados.length; i++){		
					for(i = 0; i< cont2.length; i++){
						if(cont2[i] == d5){
							decilvalor = cont2[i]
							posd = i
						}
					}
					decilvalor = splitados[posd]
	
				}
					decilvalor = (`${d}% dos(as) ${variavel} é de ${decilvalor} ou menos e ${valor}% é de ${decilvalor} ou mais`)
					document.getElementById('decilvalor').innerHTML = decilvalor
				}	
			if(medidasSeparatrizes == 'D6'){
				d6 = (soma * 0.6).toFixed(0)
				d = 60
				valor =  100 - d
				for(i = 0; i< splitados.length; i++){		
					for(i = 0; i< cont2.length; i++){
						if(cont2[i] == d6){
							decilvalor = cont2[i]
							posd = i
						}
					}
					decilvalor = splitados[posd]
	
				}
					decilvalor = (`${d}% dos(as) ${variavel} é de ${decilvalor} ou menos e ${valor}% é de ${decilvalor} ou mais`)
					document.getElementById('decilvalor').innerHTML = decilvalor
				}	
			if(medidasSeparatrizes == 'D7'){
				d7 = (soma * 0.7).toFixed(0)
				d = 70
				valor =  100 - d
				for(i = 0; i< splitados.length; i++){		
					for(i = 0; i< cont2.length; i++){
						if(cont2[i] == d7){
							decilvalor = cont2[i]
							posd = i
						}
					}
					decilvalor = splitados[posd]
	
				}
				
					decilvalor = (`${d}% dos(as) ${variavel} é de ${decilvalor} ou menos e ${valor}% é de ${decilvalor} ou mais`)
					document.getElementById('decilvalor').innerHTML = decilvalor
				
			}
			  
			if(medidasSeparatrizes == 'D8'){
				d8 = (soma * 0.8).toFixed(0)
				d = 80
				valor =  100 - d
				for(i = 0; i< splitados.length; i++){
					for(i = 0; i< cont2.length; i++){
						if(cont2[i] == d8){
							decilvalor = cont2[i]
							posd = i
						}
					}
					decilvalor = splitados[posd]
	
				
				}
					decilvalor = (`${d}% dos(as) ${variavel} é de ${decilvalor} ou menos e ${valor}% é de ${decilvalor} ou mais`)
					document.getElementById('decilvalor').innerHTML = decilvalor
				
			}		
					
			if(medidasSeparatrizes == 'D9'){
				d9 = (soma * 0.9).toFixed(0)
				d = 90
				valor =  100 - d
				for(i = 0; i< splitados.length; i++){		
					for(i = 0; i< cont2.length; i++){
						if(cont2[i] == d9){
							decilvalor = cont2[i]
							posd = i
						}
					}
					decilvalor = splitados[posd]
	
				}
					decilvalor = (`${d}% dos(as) ${variavel} é de ${decilvalor} ou menos e ${valor}% é de ${decilvalor} ou mais`)
					document.getElementById('decilvalor').innerHTML = decilvalor
				
			}
			if(medidasSeparatrizes == 'D10'){
				d10 = (soma * 1.0).toFixed(0)
				d = 100
				for(i = 0; i< splitados.length; i++){		
					for(i = 0; i< cont2.length; i++){
						if(cont2[i] == d10){
							decilvalor = cont2[i]
							posd = i
						}
					}
					decilvalor = splitados[posd]
	
				}
					decilvalor = (`${d}% dos(as) ${variavel} é de ${decilvalor} ou menos e ${valor}% é de ${decilvalor} ou mais`)
					document.getElementById('decilvalor').innerHTML = decilvalor
				
			}
			//----------------------------------Porcentil--------------------------------------------//	
			if( separatriz == 'Porcentil' ){
				var porcentil1  = 0
					porcentil = (medidasSeparatrizes / 100)
					console.log(porcentil)
					p = (soma * porcentil).toFixed(0)
					console.log(p)
					console.log(soma)
					valor = 100 - medidasSeparatrizes
					for(i = 0; i< splitados.length; i++){
								porcentil1 = splitados[p]
								console.log(porcentil1)
							  console.log(i)
							}
							console.log(porcentil1)
							console.log(i)
											
			   }
						   porcentilvalor =(`${medidasSeparatrizes}% dos(as) ${variavel} é de ${porcentil1} ou menos e ${valor}% é de ${porcentil1} ou mais`)
						document.getElementById('porcentilvalor').innerHTML = porcentilvalor;
		
			}		
				
			
			  //------------------------------------TABELA------------------------------------//
			
			var html = '<table id="tabela"> <th> <td>Fi</td> <td>F%</td> <td>Fac</td> <td>Fac%</td> </th>'; 
			for(i=0; i <cont2.length; i ++) {
				fperc[i] = Math.round(((cont2[i] / soma) * 100));
				ftperc[i] = Math.round(((somaa[i] / soma) * 100))
				controle = 0;
				for(j = 0; j < splitados.length; j++){
					if (repetidos[j] == splitados[i]){
						controle = 1;
						
					}
				}
				if (controle == 0) {
					html += "<tr><td> " + splitados[i] + "</td><td> " + cont2[i] + "</td><td>"  + fperc[i] + "</td><td>"+ somaa[i] + "</td><td>" + ftperc[i] + "</td></tr>"
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
				data.addColumn('number', 'soma');
				data.addRows([ ['Variavel', somaa[i]] 
			
			  ]);
			
				
		  
			  var chart = new google.visualization.ColumnChart(document.getElementById('Chart'));
			  chart.draw(data, somaa[i]);
			
		
			  
		
			
		
			
			
			
		
		
		}
			document.getElementById('moda').innerHTML = moda;
			document.getElementById('mediana').innerHTML = medianaT;
		
			
			
		
			html += '</table>';
			document.getElementById('tabela').innerHTML = html	
			console.log(html);
		}
	
	
	
	
}	


