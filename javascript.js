

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
	console.log(dvExcel)
	console.log(table)
};

function entradadosdado(){
var i;
var dados = document.getElementById('valores').value;
var medidasSeparatrizes = document.getElementById('valorMedidas').value;
var variavel = document.getElementById('variavel').value;
var separatriz = document.getElementById('medidas').value;
var tipodescritiva = document.getElementById('opcao').value;
var medidasDispersao = document.getElementById('dispersao').value;
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
// O VETOR COM NÚMEROS REPETIDOS
var  vetor = "0123456789";
for (var i = 1; i < vetor.length; i++) {
	if (dados.indexOf(vetor[i]) != -1) {
		dados = dados.replace(/ /g, ";");
	}
}
dados = (dados.replace(/\n/g, ";")).split(";")
// ORDENAÇÃO DOS DADOS REPETIDOS
dados = dados.sort((a,b)=> a - b)
console.log(dados)

var  cont2 = []
var valoresgrafico = []
//CONTABILIZA AS REPETIÇÕES DE CADA VARIÁVEL
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
		
}  
var grafico = []
 // ACUMULA E SOMA AS REPETIÇÕES DA VARIÁVEL
	for( i = 0; i <cont2.length; i++){ 
		soma += cont2[i]
		somaa[i] = soma

	}



//---------------------------------- MODA ----------------------------------------------//
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

	 //--------------------------------- MÉDIA ------------------------------------------------//

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

	//----------------------------------- MEDIANA ------------------------------------------------//

	mediana = (soma * 0.5).toFixed(0)
		
	
		medianaT = (`Mediana: ${dados[mediana-1]}`)
       

	//----------------------------------- QUINTIL ------------------------------------------------//

	var k1,k2,k3,k4,k5 = 0
	var quintilvalor
	console.log(cont2)
 if(separatriz == 'Quintil(K1-K5)'){
	if(medidasSeparatrizes == 'K1' || medidasSeparatrizes == 'k1'){
		k1 = (soma * 0.2).toFixed(0)
		k = 20
		valor = 100 - k
		
		
				
			
		
				quintilvalor = (`Medidas Separatrizes : ${k}% dos(as) ${variavel} é de ${dados[k1-1]} ou menos e ${valor}% é de ${dados[k1-1]} ou mais`)
				document.getElementById('quintilvalor').innerHTML = quintilvalor;

	}
	
	if(medidasSeparatrizes == 'K2' || medidasSeparatrizes == 'k2'){
		k2 = (soma * 0.4).toFixed(0)
		k = 40
		valor = 100 - k
		

				
		
		quintilvalor = (`Medidas Separatrizes: ${k}% dos(as) ${variavel} é de ${dados[k2-1]} menos e ${valor}% é de ${dados[k2-1]} ou mais`)
		document.getElementById('quintilvalor').innerHTML = quintilvalor;


	}

	if(medidasSeparatrizes == 'K3' || medidasSeparatrizes == 'k3'){
		k3 = (soma * 0.6).toFixed(0)
		k = 60
		valor =  100 - k
		
		
			quintilvalor = (`Medidas Separatrizes : ${k}% dos(as) ${variavel} é de ${dados[k3-1]} ou menos e ${valor}% é de ${dados[k3-1]} ou mais`)
			document.getElementById('quintilvalor').innerHTML = quintilvalor;
		}
	
	if(medidasSeparatrizes == 'K4' || medidasSeparatrizes =='k4'){
		k4 = (soma * 0.8).toFixed(0)
		k = 80
		valor = 100 - k
			
			
			
	
		quintilvalor = (`Medidas Separatrizes : ${k}% dos(as) ${variavel} é de ${dados[k4-1]} ou menos e ${valor}% é de ${dados[k4-1]} ou mais`)
		document.getElementById('quintilvalor').innerHTML = quintilvalor;


	}
	if(medidasSeparatrizes == 'K5' || medidasSeparatrizes == 'k5'){
		k5 = (soma * 1.0).toFixed(0)
		k = 100
		

		

		
			   quintilvalor = (`Medidas Separatrizes : ${k}% dos(as) ${variavel} é de ${dados[k5-1]}`)
			   document.getElementById('quintilvalor').innerHTML = quintilvalor;

	}
 }


	 
	
	//------------------------------------------ QUARTIL -------------------------------------------------//
 
	var quartilvalor
 var q,q1,q2,q3,q4
 if(separatriz == 'Quartil(Q1-Q4)'){
    if(medidasSeparatrizes == 'Q1' || medidasSeparatrizes =='q1'){
		q1 = (soma * 0.25).toFixed(0)
		q = 25
		valor =  100 - q
             
		
				
			
		
				quartilvalor = (`Medidas Separatrizes : ${q}% dos(as) ${variavel} é de ${dados[q1-1]} ou menos e ${valor}% é de ${dados[q1-1]} ou mais`)
				document.getElementById('quartilvalor').innerHTML = quartilvalor;

	}
	if(medidasSeparatrizes == 'Q2' || medidasSeparatrizes == 'q2'){
		q2 = (soma * 0.5).toFixed(0)
		q = 50
		valor =  100 - q
				quartilvalor = (`Medidas Separatrizes : ${q}% dos(as) ${variavel} é de ${dados[q2-1]} ou menos e ${valor}% é de ${dados[q2-1]} ou mais`)
				document.getElementById('quartilvalor').innerHTML = quartilvalor;

	}
	if(medidasSeparatrizes == 'Q3' || medidasSeparatrizes == 'q3'){
		q3 = (soma * 0.75).toFixed(0)
		q = 75
		valor =  100 - q
			   quartilvalor = (`Medidas Separatrizes : ${q}% dos(as) ${variavel} é de ${dados[q3-1]} ou menos e ${valor}% é de ${dados[q3-1]} ou mais`)
			   document.getElementById('quartilvalor').innerHTML = quartilvalor;

	}
	if(medidasSeparatrizes == 'Q4' || medidasSeparatrizes == 'q4'){
		q4 = (soma * 1.0).toFixed(0)
		q = 100
			   quartilvalor = (`Medidas Separatrizes: ${q}% dos(as) ${variavel} é de ${dados[q4-1]} `)
			   document.getElementById('quartilvalor').innerHTML = quartilvalor;

	}
 }

	//----------------------------------------- DECIL ------------------------------------------//
	var d,d1,d2,d3,d4,d5,d6,d7,d8,d9
	var decilvalor
if(separatriz == 'Decil(D1-D10)'){
	if(medidasSeparatrizes == 'D1' || medidasSeparatrizes == 'd1'){
		d1 = (soma * 0.1).toFixed(0)
		d = 10
		valor =  100 - d		
			   decilvalor = (`Medidas Separatrizes: ${d}% dos(as) ${variavel} é de ${dados[d1-1]} ou menos e ${valor}% é de ${dados[d1-1]} ou mais`)
			   document.getElementById('decilvalor').innerHTML = decilvalor

	}
	if(medidasSeparatrizes == 'D2' || medidasSeparatrizes == 'd2'){
		d2 = (soma * 0.2).toFixed(0)
		d = 20
		valor =  100 - d
	
				decilvalor = (`Medidas Separatrizes: ${d}% dos(as) ${variavel} é de ${dados[d2-1]} ou menos e ${valor}% é de ${dados[d2-1]} ou mais`)
				document.getElementById('decilvalor').innerHTML = decilvalor

	}
	if(medidasSeparatrizes == 'D3' || medidasSeparatrizes == 'd3' ){
		d3 = (soma * 0.3).toFixed(0)
		d = 30
		valor =  100 - d
				decilvalor = (`Medidas Separatrizes: ${d}% dos(as) ${variavel} é de ${dados[d3-1]} ou menos e ${valor}% é de ${dados[d3-1]} ou mais`)
				document.getElementById('decilvalor').innerHTML = decilvalor

	}
	if(medidasSeparatrizes == 'D4' || medidasSeparatrizes == 'd4'){
		d4 = (soma * 0.4).toFixed(0)
		d = 40
		valor =  100 - d
				decilvalor = (`Medidas Separatrizes: ${d}% dos(as) ${variavel} é de ${dados[d4-1]} ou menos e ${valor}% é de ${dados[d4-1]} ou mais`)
				document.getElementById('decilvalor').innerHTML = decilvalor

	}
	if(medidasSeparatrizes == 'D5' || medidasSeparatrizes == 'd5'){
		d5 = (soma * 0.5).toFixed(0)
		d = 50
		valor =  100 - d
		
				decilvalor = (`Medidas Separatrizes: ${d}% dos(as) ${variavel} é de ${dados[d5-1]} ou menos e ${valor}% é de ${dados[d5-1]} ou mais`)
				document.getElementById('decilvalor').innerHTML = decilvalor

	}
	if(medidasSeparatrizes == 'D6' || medidasSeparatrizes == 'd6'){
		d6 = (soma * 0.6).toFixed(0)
		d = 60
		valor =  100 - d
		
				decilvalor = (`Medidas Separatrizes: ${d}% dos(as) ${variavel} é de ${dados[d6-1]} ou menos e ${valor}% é de ${dados[d6-1]} ou mais`)
				document.getElementById('decilvalor').innerHTML = decilvalor

	}
	if(medidasSeparatrizes == 'D7' || medidasSeparatrizes == 'd7'){
		d7 = (soma * 0.7).toFixed(0)
		d = 70
		valor =  100 - d
		decilvalor = (`Medidas Separatrizes: ${d}% dos(as) ${variavel} é de ${dados[d7-1]} ou menos e ${valor}% é de ${dados[d7-1]} ou mais`)
		document.getElementById('decilvalor').innerHTML = decilvalor

	}
	if(medidasSeparatrizes == 'D8' || medidasSeparatrizes == 'd8'){
		d8 = (soma * 0.8).toFixed(0)
		d = 80
		valor =  100 - d
	
				decilvalor = (`Medidas Separatrizes: ${d}% dos(as) ${variavel} é de ${dados[d8-1]} ou menos e ${valor}% é de ${dados[d8-1]} ou mais`)
				document.getElementById('decilvalor').innerHTML = decilvalor

	}
	if(medidasSeparatrizes == 'D9' || medidasSeparatrizes == 'd9'){
		d9 = (soma * 0.9).toFixed(0)
		d = 90
		valor =  100 - d
				decilvalor = (`Medidas Separatrizes: ${d}% dos(as) ${variavel} é de ${dados[d9-1]} ou menos e ${valor}% é de ${dados[d9-1]} ou mais`)
				document.getElementById('decilvalor').innerHTML = decilvalor

	}
	if(medidasSeparatrizes == 'D10' || medidasSeparatrizes == 'd10'){
		d10 = (soma * 1.0).toFixed(0)
		d = 100
			  decilvalor = (`Medidas Separatrizes: ${d}% dos(as) ${variavel} é de ${dados[d10-1]} `)
			  document.getElementById('decilvalor').innerHTML = decilvalor

	}

}

	//---------------------------------- PORCENTIL --------------------------------------------//	
	if( separatriz == 'Porcentil(1-100)' ){
			porcentil = (medidasSeparatrizes / 100)
			console.log(porcentil)
			p = (soma * porcentil).toFixed(0)
			console.log(p)
			console.log(soma)
			valor = 100 - medidasSeparatrizes
			      	
				
			
				porcentilvalor =(`${medidasSeparatrizes}% dos(as) ${variavel} é de ${dados[p-1]} ou menos e ${valor}% é de ${dados[p-1]} ou mais`)
				document.getElementById('porcentilvalor').innerHTML = porcentilvalor;

	   }
	            
		
    

	//-------------------------- DESVIO PADRÃO --------------------------------//
	var Desvio = 0
	var DesvioV

	for(i = 0; i<splitados.length; i++){
	
		Desvio += Math.pow(splitados[i] - mediaDesvio, 2) * cont2[i]
		console.log(`${Desvio} splitados = ${splitados[i]} - mediaDesvio ${mediaDesvio} (<2) ${Math.pow(splitados[i] - mediaDesvio, 2)} * cont2 ${cont2[i]}`)
	
	}
	//---------------------------------- POPULAÇÃO ------------------------------------------------//
if(medidasDispersao == 'População'){
		//-------------------------- DESVIO PADRÃO POPULAÇÃO --------------------------------//

	  DesvioP = Math.sqrt(Desvio / soma)
	  DesvioV = Math.sqrt(Desvio / soma)
         
	  console.log(Desvio.toFixed(2))
	  DesvioV =(`Desvio padrão: ${DesvioV.toFixed(2)}`)
	  document.getElementById('desvio').innerHTML = DesvioV;

	  //------------------------------ COEFICIENTE DE VARIAÇÃO POPULAÇÃO ----------------------//
	  var coeficienteV 
	  coeficienteV = (DesvioP/mediaDesvio)*100
	  console.log(coeficienteV)
	  coeficienteV = (`Coeficiente de variação: ${coeficienteV.toFixed(2)}%`)
	  document.getElementById('variacao').innerHTML = coeficienteV;
}
    //----------------------------------- AMOSTRA ----------------------------------------//
if(medidasDispersao == 'Amostra'){
	//-------------------------- DESVIO PADRÃO AMOSTRA --------------------------------//

	DesvioP = Math.sqrt(Desvio / (soma-1))
	DesvioV = Math.sqrt(Desvio / (soma-1))
	DesvioV = (`Desvio padrão: ${DesvioV.toFixed(2)}`)
	document.getElementById('desvio').innerHTML = DesvioV;

	//--------------------------- COEFICIENTE DE VARIAÇÃO AMOSTRA  ----------------------//

	coeficienteV = (DesvioP/mediaDesvio) * 100
	coeficienteV = (`Coeficiente de variação: ${coeficienteV.toFixed(2)}%`)
	document.getElementById('variacao').innerHTML = coeficienteV;
}
var guardaG


	  //------------------------------------TABELA------------------------------------//
	var html = '<table id="tabela"> <th> <td>Fi</td> <td>F%</td> <td>Fac</td> <td>Fac%</td> </th>'; 
	for(i=0; i <cont2.length; i ++) {
		fperc[i] = Math.round(((cont2[i] / soma) * 100));
		guardaG = Math.round(((cont2[i] / soma) * 100))
		grafico.push(parseFloat(guardaG))
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
	document.getElementById('moda').innerHTML = moda;
	document.getElementById('media').innerHTML = mediaTotal;
	document.getElementById('mediana').innerHTML = medianaT;

	
	

	html += '</table>';
	document.getElementById('tabela').innerHTML = html	
	console.log(html);


console.log(valoresgrafico)
console.log(grafico)

Highcharts.chart('barraSeparada', {
	xAxis: {
	  grafico 
	},
	title: {
	  text: 'Descritiva'
	},
	series: [{
	  type: 'column',
	  data : grafico,
	  enableMouseTracking: true
	},
	]})
  

	
}

//------------------- Quantitativa Continua --------------------------//
if(tipodescritiva == "Quantitativa Continua"){
	// ORDENAÇÃO DOS DADOS
	if (dados != ""){
		var splita = dados.split(";");
		splitados = splita.sort((a, b) => a - b)
			
	}	

	// O VETOR COM NÚMEROS REPETIDOS
	var vetor = "0123456789";
    for (var i = 0; i < vetor.length; i++) {
        if (dados.indexOf(vetor[i]) != -1) {
            dados = dados.replace(/ /g, ";");
        }
	}
	// ORDENAÇÃO DO VETOR COM NÚMEROS REPETIDOS
	dados = (dados.replace(/\n/g, ";")).split(";");
	dados = dados.sort((a,b) => a - b)
	
	
		   
   
   
   
soma  = dados.length // quantidade total 
				   
	
var xmin = splitados[0]
console.log(xmin)
	var xmax = splitados[splitados.length-1]
	console.log(xmax)

	var At = xmax - xmin	
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

 
 for( i= 0; i < K; i ++){
	 kVetor[i] = K


 }

// Intervalo de classes
var intervalos = [] , intervalos1 = [], intervalo1, intervalo
	for(i= 0; i < kVetor.length;i++){
		intervalo = parseInt((splitados[0]/100)* 100) + Ic + 1
      intervalos1[0] = intervalo
	   intervalo1 = parseInt(intervalo + Ic)
	   intervalos1[1] = intervalo1
	   intervalo1 = intervalo1 + Ic
		intervalos1[i] = parseInt(intervalos1[i-1] + Ic)
	  
}

// Intervalo de classes
for(i= 0; i < kVetor.length;i++){
	intervalo = parseInt(splitados[0])
	intervalos[0] = intervalo
  	intervalo1 = parseInt((intervalos[0]/100)* 100) + Ic + 1
   	intervalos[1] = intervalo1
  	intervalo1 = intervalo1 + Ic
	intervalos[i] = parseInt(intervalos[i-1] + Ic) 
}
var somaContinua = []
var cont4 = 0


var somaTotal = []
var inter = []
var meio
var meioTotal = []
		for(i = 0; i < dados.length;i++){
			if(dados[i] >= intervalos[0] && dados[i]<= intervalos1[0]){
				cont4++
				console.log(cont4)


				
			}
		
		}
		console.log(cont4)
		console.log(inter)
		somaTotal[0] = cont4
		var cont5 = 0
		meio = (((intervalos[0]/100)*100)+ intervalos1[0])/ 2
		console.log(meio)
		meioTotal[0] = meio

		for(i = 0; i < dados.length;i++){
			if(dados[i] >= intervalos[1] && dados[i]<= intervalos1[1]){
				cont5++
				console.log(cont5)
			}
		
		}
		somaTotal[1] = cont5
		console.log(cont5)
		var cont6 = 0
		meio = (((intervalos[1]/100)*100)+ intervalos1[1])/ 2
		console.log(meio)
		meioTotal[1] = meio

		

		
		for(i = 0; i < dados.length;i++){
			if(dados[i] >= intervalos[2] && dados[i]<= intervalos1[2]){
				cont6++
				console.log(cont6)
			}
		
		}
		somaTotal[2] = cont6
		console.log(cont6)
		var cont7 = 0
		meio = (((intervalos[2]/100)*100)+ intervalos1[2])/ 2
        meioTotal[2] = meio
		for(i = 0; i < dados.length;i++){
			if(dados[i] >= intervalos[3] && dados[i]<= intervalos1[3]){
				cont7++
				console.log(cont7)
			}
		
		}
		console.log(cont7)
		somaTotal[3] = cont7
		var cont8 = 0
		meio = (((intervalos[3]/100)*100)+ intervalos1[3])/ 2
		meioTotal[3] = meio
		for(i = 0; i < dados.length;i++){
			if(dados[i] >= intervalos[4] && dados[i]<= intervalos1[4]){
				cont8++
				console.log(cont8)
			}
		
		}
		console.log(cont8)
		somaTotal[4] = cont8
		var cont9 = 0
		meio = (((intervalos[4]/100)*100)+ intervalos1[4])/ 2
		meioTotal[4] = meio          
		for(i = 0; i < dados.length;i++){
			if(dados[i] >= intervalos[5] && dados[i]<= intervalos1[5]){
				cont9++
				console.log(cont9)
			}
		
		}
		console.log(cont9)
		somaTotal[5] = cont9
		var cont10 = 0
		meio = (((intervalos[5]/100)*100)+ intervalos1[5])/ 2
		meioTotal[5] = meio
		for(i = 0; i < dados.length;i++){
			if(dados[i] >= intervalos[6] && dados[i]<= intervalos1[6]){
				cont10++
				console.log(cont10)
			}
		
		}
		console.log(cont10)
		somaTotal[6] = cont10
		var cont11 = 0
		meio = (((intervalos[6]/100)*100)+ intervalos1[6])/ 2
		meioTotal[6] = meio
		for(i = 0; i < dados.length;i++){
			if(dados[i] >= intervalos[7] && dados[i]<= intervalos1[7]){
				cont11++
				console.log(cont11)
			}
		
		}
		console.log(cont11)
		somaTotal[7] = cont11
		var cont12 = 0
		meio = (((intervalos[7]/100)*100)+ intervalos1[7])/ 2
		meioTotal[7] = meio
		for(i = 0; i < dados.length;i++){
			if(dados[i] >= intervalos[8] && dados[i]<= intervalos1[8]){
				cont12++
				console.log(cont12)
			}
		
		}
		console.log(cont12)
		somaTotal[8] = cont12
		var cont13 = 0
		meio = (((intervalos[8]/100)*100)+ intervalos1[8])/ 2
		meioTotal[8] = meio
		for(i = 0; i < dados.length;i++){
			if(dados[i] >= intervalos[9] && dados[i]<= intervalos1[9]){
				cont13++
				console.log(cont13)
			}
		
		}
		console.log(cont13)
		var cont14 = 0
		somaTotal[9] = cont13
		meio = (((intervalos[9]/100)*100)+ intervalos1[9])/ 2
		meioTotal[9] = meio
		for(i = 0; i < dados.length;i++){
			if(dados[i] >= intervalos[10] && dados[i]<= intervalos1[10]){
				cont14++
				console.log(cont14)
			}
		
		}
		console.log(cont14)
		var cont15 = 0
		somaTotal[10] = cont14
        meio = (((intervalos[10]/100)*100)+ intervalos1[10])/ 2
		meioTotal[10] = meio
		for(i = 0; i < dados.length;i++){
			if(dados[i] >= intervalos[11] && dados[i]<= intervalos1[11]){
				cont15++
				console.log(cont15)
			}
		
		}
		console.log(cont15)
		var cont16 = 0
		somaTotal[11] = cont15
        meio = (((intervalos[11]/100)*100)+ intervalos1[11])/ 2
		meioTotal[11] = meio
		for(i = 0; i < dados.length;i++){
			if(dados[i] >= intervalos[12] && dados[i]<= intervalos1[12]){
				cont16++
				console.log(cont16)
			}
		
		}
		console.log(cont16)
		somaTotal[12] = cont16
		var cont17 = 0
        meio = (((intervalos[12]/100)*100)+ intervalos1[12])/ 2
		meioTotal[12] = meio
		for(i = 0; i < dados.length;i++){
			if(dados[i] >= intervalos[13] && dados[i]<= intervalos1[13]){
				cont17++
				console.log(cont17)
			}
		
		}
		console.log(cont17)
		var cont18 = 0
		somaTotal[13] = cont17
        meio = (((intervalos[13]/100)*100)+ intervalos1[13])/ 2
		meioTotal[13] = meio
		for(i = 0; i < dados.length;i++){
			if(dados[i] >= intervalos[14] && dados[i]<= intervalos1[14]){
				cont18++
				console.log(cont18)
			}
		
		}
		console.log(cont18)
		var cont19 = 0
		somaTotal[14] = cont18
		meio = (((intervalos[14]/100)*100)+ intervalos1[14])/ 2
		meioTotal[14] = meio
		for(i = 0; i < dados.length;i++){
			if(dados[i] >= intervalos[15] && dados[i]<= intervalos1[15]){
				cont19++
				console.log(cont19)
				
			}
		
		}
		console.log(cont19)
		var cont20 = 0
		somaTotal[15] = cont19
		meio = (((intervalos[15]/100)*100)+ intervalos1[15])/ 2
		meioTotal[15] = meio
		for(i = 0; i < dados.length;i++){
			if(dados[i] >= intervalos[16] && dados[i]<= intervalos1[16]){
				cont20++
				console.log(cont20)
			}
		
		}
		console.log(cont20)
		var cont21 = 0
		somaTotal[16] = cont20
		meio = (((intervalos[16]/100)*100)+ intervalos1[16])/ 2
		meioTotal[16] = meio
		for(i = 0; i < dados.length;i++){
			if(dados[i] >= intervalos[17] && dados[i]<= intervalos1[17]){
				cont21++
				console.log(cont21)
			}
		
		}
		console.log(cont21)
		somaTotal[17] = cont21
		meio = (((intervalos[17]/100)*100)+ intervalos1[17])/ 2
		meioTotal[17] = meio
		var somat = 0
  for(i = 0; i < kVetor.length; i++){
	  somat += somaTotal[i]
	  somaContinua[i] = somat	  
 	}

console.log(intervalo)
console.log(intervalos)



//-----------------------------------Moda------------------------------------------------//
var moda = 0
var pos = 0

for(i = 0; i< meioTotal.length; i++){	
	for( i = 0; i< somaTotal.length; i++){
		if(somaTotal[i] > moda){
			moda = somaTotal[i]
			pos = i
		}
	}
	moda = meioTotal[pos]
	
}
 moda = (`Moda: ${moda}`)
 document.getElementById('moda').innerHTML = moda

 //-----------------------------------Média------------------------------------------------//

 var sum = 0
 var soma1 = [];
 var mediaTotal = 0
 var mediaDesvio = 0
 var meioMedia = []
 var somaMedia = []
 for(i=0;i < kVetor.length; i++){
	 meioMedia[i] = meioTotal[i]
	 somaMedia[i] = somaTotal[i]
 }
   for( i = 0; i < meioMedia.length; i++){
	soma1[i] = 0
	numero = [];
	   for( i = 0; i < somaMedia.length; i++){
					sum += meioTotal[i] * somaTotal[i]
					console.log(sum)
				
		}
	}	
	
	mediaDesvio = sum/soma
	console.log(mediaDesvio)
	mediaTotal = sum/soma
	mediaTotal =(`Média: ${mediaTotal.toFixed(2)}`)

	document.getElementById('media').innerHTML = mediaTotal
   
//-----------------------------------Mediana------------------------------------------------//

mediana = (soma * 0.5).toFixed(0)
medianaT = dados[mediana-1]
var medianainter
var medianaMeio
var medianaInicio
var medianaAnt
for(i = 0; i < intervalos1.length;i++){
	for(i = 0; i < intervalos.length;i++){
  		 for(i = 0; i < meioMedia.length;i++){
	  		 if(medianaT >= intervalos[i] && medianaT <= intervalos1[i]){
				   medianainter = (intervalos[i] + intervalos1[i]) / 2
				   medianaInicio = intervalos[i]
				   console.log(`${medianainter} intervalos: ${intervalos[i]} + intervalos1: ${intervalos1[i]} = ${(intervalos[i] + intervalos1[i]) / 2}`)
				if(medianainter == meioMedia[i]){
					medianaMeio = meioMedia[i]
               	 console.log(medianaMeio)

				}

			}
		}
	}
}	
for(i = 0;i<meioMedia.length;i++){
	for(i = 0; i < somaContinua.length;i++){
		medianaAnt = 0
		if(medianainter == meioMedia[i] && meioMedia.length == somaContinua.length && somaContinua[i] != somaContinua[0]){
			medianaAnt = somaContinua[i-1]

			console.log(medianaAnt)
			console.log(somaContinua[i-1])

		}
		else{
			medianaAnt = 0
		}
	}
}
var MedianaFi
for(i = 0;i< meioMedia.length;i++){
	for(i = 0; i < somaMedia.length;i++){
		MedianaFi = 0
		if(medianainter == meioMedia[i] && meioMedia.length == somaMedia.length){
			MedianaFi = somaMedia[i]

			console.log(MedianaFi)

		}
	
	}

}
console.log(somaTotal)


var medianaTotal = 0
medianaTotal = ((((soma / 2) - medianaAnt ) / MedianaFi) * Ic)
medianaTotal = medianaInicio + medianaTotal
medianaTotal = (`Mediana: ${medianaTotal}`)
	document.getElementById('mediana').innerHTML = medianaTotal



	//----------------------------------- QUINTIL ------------------------------------------------//

	if(separatriz == 'Quintil(K1-K5)'){
		var quintilTotal
		if(medidasSeparatrizes == 'K1' || medidasSeparatrizes == 'k1'){
			k1 = (soma * 0.2).toFixed(0)
			var k1m 
			k1m = soma * 0.2
			k = 20
			valor = 100 - k
			quintilvalor = dados[k1-1]
			console.log(quintilvalor)
			var quintilinter
			var quintilMeio
			var quintilInicio
			var quintilAnt
		for(i = 0; i < intervalos1.length;i++){
			for(i = 0; i < intervalos.length;i++){
			quintilInicio = 0
  				 for(i = 0; i < meioMedia.length;i++){
	  				 if(quintilvalor >= intervalos[i] && quintilvalor <= intervalos1[i]){
				  		 quintilinter = (intervalos[i] + intervalos1[i]) / 2
				  		 quintilInicio = intervalos[i]
				  		 console.log(quintilinter)
						if(quintilinter == meioMedia[i]){
							quintilMeio = meioMedia[i]
               	 			console.log(quintilMeio)

						}

					}
				}
			}
		}	
	for(i = 0;i<meioMedia.length;i++){
		for(i = 0; i < somaContinua.length;i++){
			quintilAnt = 0
			if(quintilinter == meioMedia[i] && meioMedia.length == somaContinua.length && somaContinua[i] != somaContinua[0]){
				quintilAnt = somaContinua[i-1]

				console.log(quintilAnt)

			}
			else{
			quintilAnt = 0
			}
		}
	}
	var quintilFi
	for(i = 0;i< meioMedia.length;i++){
		for(i = 0; i < somaMedia.length;i++){
			if(quintilinter == meioMedia[i] && meioMedia.length == somaMedia.length){
				quintilFi = somaMedia[i]

				console.log(quintilFi)

			}
	
		}

	}
	

	quintilTotal = quintilInicio + (((k1m - quintilAnt) / quintilFi) * Ic)
	console.log(quintilvalor)
	console.log(quintilInicio)
	console.log(k1)
	console.log(quintilFi)
	console.log(quintilAnt)
	console.log(soma)
	console.log(Ic)



			quintilvalor = (`Medidas Separatrizes : ${k}% dos(as) ${variavel} é de ${quintilTotal} ou menos e ${valor}% é de ${quintilTotal} ou mais`)
			document.getElementById('quintilvalor').innerHTML = quintilvalor;
	}
		
		if(medidasSeparatrizes == 'K2' || medidasSeparatrizes == 'k2'){
			k2 = (soma * 0.4).toFixed(0)
			var k2m 
			k2m = soma * 0.4
			k = 40
			valor = 100 - k
			quintilvalor = dados[k2-1]
			console.log(quintilvalor)
			for(i = 0; i < intervalos1.length;i++){
				for(i = 0; i < intervalos.length;i++){
				quintilInicio = 0
					   for(i = 0; i < meioMedia.length;i++){
						   if(quintilvalor >= intervalos[i] && quintilvalor <= intervalos1[i]){
							   quintilinter = (intervalos[i] + intervalos1[i]) / 2
							   quintilInicio = intervalos[i]
							   console.log(quintilinter)
							if(quintilinter == meioMedia[i]){
								quintilMeio = meioMedia[i]
									console.log(quintilMeio)
	
							}
	
						}
					}
				}
			}	
		for(i = 0;i<meioMedia.length;i++){
			for(i = 0; i < somaContinua.length;i++){
				quintilAnt = 0
				if(quintilinter == meioMedia[i] && meioMedia.length == somaContinua.length && somaContinua[i] != somaContinua[0]){
					quintilAnt = somaContinua[i-1]
	
					console.log(quintilAnt)
	
				}
				else{
				quintilAnt = 0
				}
			}
		}
		var quintilFi
		for(i = 0;i< meioMedia.length;i++){
			for(i = 0; i < somaMedia.length;i++){
				MedianaFi = 0
				if(quintilinter == meioMedia[i] && meioMedia.length == somaMedia.length){
					quintilFi = somaMedia[i]
	
					console.log(quintilFi)
	
				}
		
			}
	
		}
		
	
	
		quintilTotal = quintilInicio + (((k2m - quintilAnt) / quintilFi) * Ic)
		console.log(quintilvalor)
		console.log(quintilInicio)
		console.log(quintilFi)
		console.log(quintilAnt)
		console.log(soma)
		console.log(Ic)
	
	
	
				quintilvalor = (`Medidas Separatrizes : ${k}% dos(as) ${variavel} é de ${quintilTotal} ou menos e ${valor}% é de ${quintilTotal} ou mais`)
				document.getElementById('quintilvalor').innerHTML = quintilvalor;
		}
	
	
		if(medidasSeparatrizes == 'K3' || medidasSeparatrizes == 'k3'){
			k3 = (soma * 0.6).toFixed(0)
			k = 60
			valor =  100 - k
			var k3m
			k3m = soma * 0.6
			quintilvalor = dados[k3-1]
			
		for(i = 0; i < intervalos1.length;i++){
			for(i = 0; i < intervalos.length;i++){
			quintilInicio = 0
  				 for(i = 0; i < meioMedia.length;i++){
	  				 if(quintilvalor >= intervalos[i] && quintilvalor <= intervalos1[i]){
				  		 quintilinter = (intervalos[i] + intervalos1[i]) / 2
				  		 quintilInicio = intervalos[i]
				  		 console.log(quintilinter)
						if(quintilinter == meioMedia[i]){
							quintilMeio = meioMedia[i]
               	 			console.log(quintilMeio)

						}

					}
				}
			}
		}	
	for(i = 0;i<meioMedia.length;i++){
		for(i = 0; i < somaContinua.length;i++){
			quintilAnt = 0
			if(quintilinter == meioMedia[i] && meioMedia.length == somaContinua.length && somaContinua[i] != somaContinua[0]){
				quintilAnt = somaContinua[i-1]

				console.log(quintilAnt)

			}
			else{
			quintilAnt = 0
			}
		}
	}
	var quintilFi
	for(i = 0;i< meioMedia.length;i++){
		for(i = 0; i < somaMedia.length;i++){
			MedianaFi = 0
			if(quintilinter == meioMedia[i] && meioMedia.length == somaMedia.length){
				quintilFi = somaMedia[i]

				console.log(quintilFi)

			}
	
		}

	}
	

	quintilTotal = quintilInicio + (((k3m - quintilAnt) / quintilFi) * Ic)
	console.log(quintilvalor)
	console.log(quintilInicio)
	console.log(quintilFi)
	console.log(quintilAnt)
	console.log(soma)
	console.log(Ic)



			quintilvalor = (`Medidas Separatrizes : ${k}% dos(as) ${variavel} é de ${quintilTotal} ou menos e ${valor}% é de ${quintilTotal} ou mais`)
			document.getElementById('quintilvalor').innerHTML = quintilvalor;

			
			
		}
		if(medidasSeparatrizes == 'K4' || medidasSeparatrizes =='k4'){
			k4 = (soma * 0.8).toFixed(0)
			k = 80
			valor = 100 - k
			var k4m
			k4m = soma * 0.8
			quintilvalor = dados[k4-1]
		for(i = 0; i < intervalos1.length;i++){
			for(i = 0; i < intervalos.length;i++){
			quintilInicio = 0
  				 for(i = 0; i < meioMedia.length;i++){
	  				 if(quintilvalor >= intervalos[i] && quintilvalor <= intervalos1[i]){
				  		 quintilinter = (intervalos[i] + intervalos1[i]) / 2
				  		 quintilInicio = intervalos[i]
				  		 console.log(quintilinter)
						if(quintilinter == meioMedia[i]){
							quintilMeio = meioMedia[i]
               	 			console.log(quintilMeio)

						}

					}
				}
			}
		}	
	for(i = 0;i<meioMedia.length;i++){
		for(i = 0; i < somaContinua.length;i++){
			quintilAnt = 0
			if(quintilinter == meioMedia[i] && meioMedia.length == somaContinua.length && somaContinua[i] != somaContinua[0]){
				quintilAnt = somaContinua[i-1]

				console.log(quintilAnt)

			}
			else{
			quintilAnt = 0
			}
		}
	}
	var quintilFi
	for(i = 0;i< meioMedia.length;i++){
		for(i = 0; i < somaMedia.length;i++){
			MedianaFi = 0
			if(quintilinter == meioMedia[i] && meioMedia.length == somaMedia.length){
				quintilFi = somaMedia[i]

				console.log(quintilFi)

			}
	
		}

	}
	


	quintilTotal = quintilInicio + (((k4m - quintilAnt) / quintilFi) * Ic)
	console.log(quintilvalor)
	console.log(quintilInicio)
	console.log(quintilFi)
	console.log(quintilAnt)
	console.log(soma)
	console.log(Ic)

    }
		if(medidasSeparatrizes == 'K5' || medidasSeparatrizes == 'k5'){
			k5 = (soma * 1.0).toFixed(0)
			k = 100
			var k5m
			k5m = soma * 1.0
			quintilvalor = dados[k5-1]
		for(i = 0; i < intervalos1.length;i++){
			for(i = 0; i < intervalos.length;i++){
			quintilInicio = 0
  				 for(i = 0; i < meioMedia.length;i++){
	  				 if(quintilvalor >= intervalos[i] && quintilvalor <= intervalos1[i]){
				  		 quintilinter = (intervalos[i] + intervalos1[i]) / 2
				  		 quintilInicio = intervalos[i]
				  		 console.log(quintilinter)
						if(quintilinter == meioMedia[i]){
							quintilMeio = meioMedia[i]
               	 			console.log(quintilMeio)

						}

					}
				}
			}
		}	
	for(i = 0;i<meioMedia.length;i++){
		for(i = 0; i < somaContinua.length;i++){
			quintilAnt = 0
			if(quintilinter == meioMedia[i] && meioMedia.length == somaContinua.length && somaContinua[i] != somaContinua[0]){
				quintilAnt = somaContinua[i-1]

				console.log(quintilAnt)

			}
			else{
			quintilAnt = 0
			}
		}
	}
	for(i = 0;i< meioMedia.length;i++){
		for(i = 0; i < somaMedia.length;i++){
			if(quintilinter == meioMedia[i] && meioMedia.length == somaMedia.length){
				quintilFi = somaMedia[i]

				console.log(quintilFi)

			}
	
		}

	}
	


	quintilTotal = quintilInicio + (((k5m - quintilAnt) / quintilFi) * Ic)
	console.log(quintilvalor)
	console.log(quintilInicio)
	console.log(quintilFi)
	console.log(quintilAnt)
	console.log(soma)
	console.log(Ic)



			quintilvalor = (`Medidas Separatrizes : ${k}% dos(as) ${variavel} é de ${quintilTotal} `)
			document.getElementById('quintilvalor').innerHTML = quintilvalor;

			
		}
	 }
	
//-------------------------------- Quartil --------------------------------------------//	
		 
if(separatriz == 'Quartil(Q1-Q4)'){
    if(medidasSeparatrizes == 'Q1' || medidasSeparatrizes =='q1'){
		q1 = (soma * 0.25).toFixed(0)
		q = 25
		valor =  100 - q
		var q1m
		q1m = soma * 0.25
		quartilvalor = dados[q1-1]
		var quartilInicio
		var quartilinter
		var quartilMeio
		quartilMeio = 0
	for(i = 0; i < intervalos1.length;i++){
		for(i = 0; i < intervalos.length;i++){
		quartilInicio = 0
			   for(i = 0; i < meioMedia.length;i++){
				   if(quartilvalor >= intervalos[i] && quartilvalor <= intervalos1[i]){
					   quartilinter = (intervalos[i] + intervalos1[i]) / 2
					   quartilInicio = intervalos[i]
					if(quartilinter == meioMedia[i]){
						quartilMeio = meioMedia[i]

					}

				}
			}
		}
	}	
	var quartilAnt
for(i = 0;i<meioMedia.length;i++){
	for(i = 0; i < somaContinua.length;i++){
		quartilAnt = 0
		if(quartilinter == meioMedia[i] && meioMedia.length == somaContinua.length && somaContinua[i] != somaContinua[0]){
			quartilAnt = somaContinua[i-1]


		}
		else{
		quartilAnt = 0
		}
	}
}
var quartilFi
for(i = 0;i< meioMedia.length;i++){
	for(i = 0; i < somaMedia.length;i++){
		if(quartilinter == meioMedia[i] && meioMedia.length == somaMedia.length){
			quartilFi = somaMedia[i]


		}

	}

}

var quartilTotal

quartilTotal = quartilInicio + (((q1m - quartilAnt) / quartilFi) * Ic)
	
				quartilvalor = (`Medidas Separatrizes : ${q}% dos(as) ${variavel} é de ${quartilTotal} ou menos e ${valor}% é de ${quartilTotal} ou mais`)
				document.getElementById('quartilvalor').innerHTML = quartilvalor;

	}
	if(medidasSeparatrizes == 'Q2' || medidasSeparatrizes == 'q2'){
		q2 = (soma * 0.5).toFixed(0)
		q = 50
		valor =  100 - q
		var q2m
		q2m = soma * 0.5
		quartilvalor = dados[q2-1]
		
	for(i = 0; i < intervalos1.length;i++){
		for(i = 0; i < intervalos.length;i++){
		quartilInicio = 0
			   for(i = 0; i < meioMedia.length;i++){
				   if(quartilvalor >= intervalos[i] && quartilvalor <= intervalos1[i]){
					   quartilinter = (intervalos[i] + intervalos1[i]) / 2
					   quartilInicio = intervalos[i]
					if(quartilinter == meioMedia[i]){
						quartilMeio = meioMedia[i]

					}

				}
			}
		}
	}	
for(i = 0;i<meioMedia.length;i++){
	for(i = 0; i < somaContinua.length;i++){
		quartilAnt = 0
		if(quartilinter == meioMedia[i] && meioMedia.length == somaContinua.length && somaContinua[i] != somaContinua[0]){
			quartilAnt = somaContinua[i-1]


		}
		else{
		quartilAnt = 0
		}
	}
}
var quartilFi
for(i = 0;i< meioMedia.length;i++){
	for(i = 0; i < somaMedia.length;i++){
		if(quartilinter == meioMedia[i] && meioMedia.length == somaMedia.length){
			quartilFi = somaMedia[i]


		}

	}

}


quartilTotal = quartilInicio + (((q2m - quartilAnt) / quartilFi) * Ic)




             
		
				
			
		
				quartilvalor = (`Medidas Separatrizes : ${q}% dos(as) ${variavel} é de ${quartilTotal} ou menos e ${valor}% é de ${quartilTotal} ou mais`)
				document.getElementById('quartilvalor').innerHTML = quartilvalor;

}

	if(medidasSeparatrizes == 'Q3' || medidasSeparatrizes == 'q3'){
		q3 = (soma * 0.75).toFixed(0)
		q = 75
		valor =  100 - q
		var q3m
		q3m = soma * 0.75
		quartilvalor = dados[q3-1]
		
	for(i = 0; i < intervalos1.length;i++){
		for(i = 0; i < intervalos.length;i++){
		quartilInicio = 0
			   for(i = 0; i < meioMedia.length;i++){
				   if(quartilvalor >= intervalos[i] && quartilvalor <= intervalos1[i]){
					   quartilinter = (intervalos[i] + intervalos1[i]) / 2
					   quartilInicio = intervalos[i]
					if(quartilinter == meioMedia[i]){
						quartilMeio = meioMedia[i]

					}

				}
			}
		}
	}	
for(i = 0;i<meioMedia.length;i++){
	for(i = 0; i < somaContinua.length;i++){
		quartilAnt = 0
		if(quartilinter == meioMedia[i] && meioMedia.length == somaContinua.length && somaContinua[i] != somaContinua[0]){
			quartilAnt = somaContinua[i-1]


		}
		else{
		quartilAnt = 0
		}
	}
}
var quartilFi
for(i = 0;i< meioMedia.length;i++){
	for(i = 0; i < somaMedia.length;i++){
		if(quartilinter == meioMedia[i] && meioMedia.length == somaMedia.length){
			quartilFi = somaMedia[i]


		}

	}

}


quartilTotal = quartilInicio + (((q3m - quartilAnt) / quartilFi) * Ic)




             
		
				
			
		
				quartilvalor = (`Medidas Separatrizes : ${q}% dos(as) ${variavel} é de ${quartilTotal} ou menos e ${valor}% é de ${quartilTotal} ou mais`)
				document.getElementById('quartilvalor').innerHTML = quartilvalor;

}

	if(medidasSeparatrizes == 'Q4' || medidasSeparatrizes == 'q4'){
		q4 = (soma * 1.0).toFixed(0)
		q = 100
		var q2m
		q4m = soma * 1.0
		quartilvalor = dados[q4-1]
		
	for(i = 0; i < intervalos1.length;i++){
		for(i = 0; i < intervalos.length;i++){
		quartilInicio = 0
			   for(i = 0; i < meioMedia.length;i++){
				   if(quartilvalor >= intervalos[i] && quartilvalor <= intervalos1[i]){
					   quartilinter = (intervalos[i] + intervalos1[i]) / 2
					   quartilInicio = intervalos[i]
					if(quartilinter == meioMedia[i]){
						quartilMeio = meioMedia[i]

					}

				}
			}
		}
	}	
for(i = 0;i<meioMedia.length;i++){
	for(i = 0; i < somaContinua.length;i++){
		quartilAnt = 0
		if(quartilinter == meioMedia[i] && meioMedia.length == somaContinua.length && somaContinua[i] != somaContinua[0]){
			quartilAnt = somaContinua[i-1]


		}
		else{
		quartilAnt = 0
		}
	}
}
var quartilFi
for(i = 0;i< meioMedia.length;i++){
	for(i = 0; i < somaMedia.length;i++){
		if(quartilinter == meioMedia[i] && meioMedia.length == somaMedia.length){
			quartilFi = somaMedia[i]


		}

	}

}


quartilTotal = quartilInicio + (((q4m - quartilAnt) / quartilFi) * Ic)

			
		
			   quartilvalor = (`Medidas Separatrizes: ${q}% dos(as) ${variavel} é de ${quartilTotal} `)
			   document.getElementById('quartilvalor').innerHTML = quartilvalor;

	}
 }

//--------------------------------- Decil --------------------------------//
if(separatriz == 'Decil(D1-D10)'){
	if(medidasSeparatrizes == 'D1' || medidasSeparatrizes == 'd1'){
		d1 = (soma * 0.1).toFixed(0)
		d = 10
		valor =  100 - d
		var d1m
		d1m = soma * 1.0
		decilvalor = dados[d1-1]
		var decilInicio
		var decilMeio 
		var decilInter
		decilMeio = 0
	for(i = 0; i < intervalos1.length;i++){
		for(i = 0; i < intervalos.length;i++){
		decilInicio = 0
			   for(i = 0; i < meioMedia.length;i++){
				   if(decilvalor >= intervalos[i] && decilvalor <= intervalos1[i]){
					   decilInter = (intervalos[i] + intervalos1[i]) / 2
					   decilInicio = intervalos[i]
					if(decilInter == meioMedia[i]){
						decilMeio = meioMedia[i]

					}

				}
			}
		}
	}	
	var decilAnt
for(i = 0;i<meioMedia.length;i++){
	for(i = 0; i < somaContinua.length;i++){
		decilAnt = 0
		if(decilInter == meioMedia[i] && meioMedia.length == somaContinua.length && somaContinua[i] != somaContinua[0]){
			decilAnt = somaContinua[i-1]


		}
		else{
		 decilAnt = 0
		}
	}
}
var decilFi
for(i = 0;i< meioMedia.length;i++){
	for(i = 0; i < somaMedia.length;i++){
		if(decilInter == meioMedia[i] && meioMedia.length == somaMedia.length){
			decilFi = somaMedia[i]


		}

	}

}

var decilTotal
decilTotal = decilInicio + (((d1m - decilAnt) / decilFi) * Ic)

			
		
	
 
   decilvalor = (`Medidas Separatrizes: ${d}% dos(as) ${variavel} é de ${decilTotal} ou menos e ${valor}% é de ${decilTotal} ou mais`)
			   document.getElementById('decilvalor').innerHTML = decilvalor

	}
	if(medidasSeparatrizes == 'D2' || medidasSeparatrizes == 'd2'){
		d2 = (soma * 0.2).toFixed(0)
		d = 20
		valor =  100 - d
		var d2m
		d2m = soma * 0.2
		decilvalor = dados[d2-1]
		
	for(i = 0; i < intervalos1.length;i++){
		for(i = 0; i < intervalos.length;i++){
		decilInicio = 0
			   for(i = 0; i < meioMedia.length;i++){
				   if(decilvalor >= intervalos[i] && decilvalor <= intervalos1[i]){
					   decilInter = (intervalos[i] + intervalos1[i]) / 2
					   decilInicio = intervalos[i]
					if(decilInter == meioMedia[i]){
						decilMeio = meioMedia[i]

					}

				}
			}
		}
	}	
for(i = 0;i<meioMedia.length;i++){
	for(i = 0; i < somaContinua.length;i++){
		decilAnt = 0
		if(decilInter == meioMedia[i] && meioMedia.length == somaContinua.length && somaContinua[i] != somaContinua[0]){
			decilAnt = somaContinua[i-1]


		}
		else{
		 decilAnt = 0
		}
	}
}
for(i = 0;i< meioMedia.length;i++){
	for(i = 0; i < somaMedia.length;i++){
		if(decilInter == meioMedia[i] && meioMedia.length == somaMedia.length){
			decilFi = somaMedia[i]


		}

	}

}

decilTotal = decilInicio + (((d2m - decilAnt) / decilFi) * Ic)

			
		
	
 
   decilvalor = (`Medidas Separatrizes: ${d}% dos(as) ${variavel} é de ${decilTotal} ou menos e ${valor}% é de ${decilTotal} ou mais`)
			   document.getElementById('decilvalor').innerHTML = decilvalor

	}

	
	if(medidasSeparatrizes == 'D3' || medidasSeparatrizes == 'd3' ){
		d3 = (soma * 0.3).toFixed(0)
		d = 30
		valor =  100 - d
		var d3m
		d3m = soma * 0.3
		decilvalor = dados[d3-1]
	
	for(i = 0; i < intervalos1.length;i++){
		for(i = 0; i < intervalos.length;i++){
		decilInicio = 0
			   for(i = 0; i < meioMedia.length;i++){
				   if(decilvalor >= intervalos[i] && decilvalor <= intervalos1[i]){
					   decilInter = (intervalos[i] + intervalos1[i]) / 2
					   decilInicio = intervalos[i]
					if(decilInter == meioMedia[i]){
						decilMeio = meioMedia[i]

					}

				}
			}
		}
	}	
for(i = 0;i<meioMedia.length;i++){
	for(i = 0; i < somaContinua.length;i++){
		decilAnt = 0
		if(decilInter == meioMedia[i] && meioMedia.length == somaContinua.length && somaContinua[i] != somaContinua[0]){
			decilAnt = somaContinua[i-1]


		}
		else{
		 decilAnt = 0
		}
	}
}
for(i = 0;i< meioMedia.length;i++){
	for(i = 0; i < somaMedia.length;i++){
		if(decilInter == meioMedia[i] && meioMedia.length == somaMedia.length){
			decilFi = somaMedia[i]


		}

	}

}

var decilTotal
decilTotal = decilInicio + (((d3m - decilAnt) / decilFi) * Ic)

			
		
	
 
   decilvalor = (`Medidas Separatrizes: ${d}% dos(as) ${variavel} é de ${decilTotal} ou menos e ${valor}% é de ${decilTotal} ou mais`)
			   document.getElementById('decilvalor').innerHTML = decilvalor

	}

			
	if(medidasSeparatrizes == 'D4' || medidasSeparatrizes == 'd4'){
		d4 = (soma * 0.4).toFixed(0)
		d = 40
		valor =  100 - d
		var d4m
		d4m = soma * 1.0
		decilvalor = dados[d4-1]
		
	for(i = 0; i < intervalos1.length;i++){
		for(i = 0; i < intervalos.length;i++){
		decilInicio = 0
			   for(i = 0; i < meioMedia.length;i++){
				   if(decilvalor >= intervalos[i] && decilvalor <= intervalos1[i]){
					   decilInter = (intervalos[i] + intervalos1[i]) / 2
					   decilInicio = intervalos[i]
					if(decilInter == meioMedia[i]){
						decilMeio = meioMedia[i]

					}

				}
			}
		}
	}	
for(i = 0;i<meioMedia.length;i++){
	for(i = 0; i < somaContinua.length;i++){
		decilAnt = 0
		if(decilInter == meioMedia[i] && meioMedia.length == somaContinua.length && somaContinua[i] != somaContinua[0]){
			decilAnt = somaContinua[i-1]


		}
		else{
		 decilAnt = 0
		}
	}
}
for(i = 0;i< meioMedia.length;i++){
	for(i = 0; i < somaMedia.length;i++){
		if(decilInter == meioMedia[i] && meioMedia.length == somaMedia.length){
			decilFi = somaMedia[i]


		}

	}

}

var decilTotal
decilTotal = decilInicio + (((d4m - decilAnt) / decilFi) * Ic)

			
		
	
 
   decilvalor = (`Medidas Separatrizes: ${d}% dos(as) ${variavel} é de ${decilTotal} ou menos e ${valor}% é de ${decilTotal} ou mais`)
			   document.getElementById('decilvalor').innerHTML = decilvalor

	}

			
	if(medidasSeparatrizes == 'D5' || medidasSeparatrizes == 'd5'){
		d5 = (soma * 0.5).toFixed(0)
		d = 50
		valor =  100 - d
		var d5m
		d5m = soma * 0.5
		decilvalor = dados[d5-1]
		
	for(i = 0; i < intervalos1.length;i++){
		for(i = 0; i < intervalos.length;i++){
		decilInicio = 0
			   for(i = 0; i < meioMedia.length;i++){
				   if(decilvalor >= intervalos[i] && decilvalor <= intervalos1[i]){
					   decilInter = (intervalos[i] + intervalos1[i]) / 2
					   decilInicio = intervalos[i]
					if(decilInter == meioMedia[i]){
						decilMeio = meioMedia[i]

					}

				}
			}
		}
	}	
for(i = 0;i<meioMedia.length;i++){
	for(i = 0; i < somaContinua.length;i++){
		decilAnt = 0
		if(decilInter == meioMedia[i] && meioMedia.length == somaContinua.length && somaContinua[i] != somaContinua[0]){
			decilAnt = somaContinua[i-1]


		}
		else{
		 decilAnt = 0
		}
	}
}
for(i = 0;i< meioMedia.length;i++){
	for(i = 0; i < somaMedia.length;i++){
		if(decilInter == meioMedia[i] && meioMedia.length == somaMedia.length){
			decilFi = somaMedia[i]


		}

	}

}

var decilTotal
decilTotal = decilInicio + (((d5m - decilAnt) / decilFi) * Ic)

			
		
	
 
   decilvalor = (`Medidas Separatrizes: ${d}% dos(as) ${variavel} é de ${decilTotal} ou menos e ${valor}% é de ${decilTotal} ou mais`)
			   document.getElementById('decilvalor').innerHTML = decilvalor

	}

		
			
	if(medidasSeparatrizes == 'D6' || medidasSeparatrizes == 'd6'){
		d6 = (soma * 0.6).toFixed(0)
		d = 60
		valor =  100 - d
		var d6m
		d6m = soma * 0.6
		decilvalor = dados[d6-1]
	for(i = 0; i < intervalos1.length;i++){
		for(i = 0; i < intervalos.length;i++){
		decilInicio = 0
			   for(i = 0; i < meioMedia.length;i++){
				   if(decilvalor >= intervalos[i] && decilvalor <= intervalos1[i]){
					   decilInter = (intervalos[i] + intervalos1[i]) / 2
					   decilInicio = intervalos[i]
					if(decilInter == meioMedia[i]){
						decilMeio = meioMedia[i]

					}

				}
			}
		}
	}	
for(i = 0;i<meioMedia.length;i++){
	for(i = 0; i < somaContinua.length;i++){
		decilAnt = 0
		if(decilInter == meioMedia[i] && meioMedia.length == somaContinua.length && somaContinua[i] != somaContinua[0]){
			decilAnt = somaContinua[i-1]


		}
		else{
		 decilAnt = 0
		}
	}
}
for(i = 0;i< meioMedia.length;i++){
	for(i = 0; i < somaMedia.length;i++){
		if(decilInter == meioMedia[i] && meioMedia.length == somaMedia.length){
			decilFi = somaMedia[i]


		}

	}

}

decilTotal = decilInicio + (((d6m - decilAnt) / decilFi) * Ic)

			
		
	
 
   decilvalor = (`Medidas Separatrizes: ${d}% dos(as) ${variavel} é de ${decilTotal} ou menos e ${valor}% é de ${decilTotal} ou mais`)
			   document.getElementById('decilvalor').innerHTML = decilvalor

	}

		
	if(medidasSeparatrizes == 'D7' || medidasSeparatrizes == 'd7'){
		d7 = (soma * 0.7).toFixed(0)
		d = 70
		valor =  100 - d
		var d7m
		d7m = soma * 1.0
		decilvalor = dados[d7-1]
	for(i = 0; i < intervalos1.length;i++){
		for(i = 0; i < intervalos.length;i++){
		decilInicio = 0
			   for(i = 0; i < meioMedia.length;i++){
				   if(decilvalor >= intervalos[i] && decilvalor <= intervalos1[i]){
					   decilInter = (intervalos[i] + intervalos1[i]) / 2
					   decilInicio = intervalos[i]
					if(decilInter == meioMedia[i]){
						decilMeio = meioMedia[i]

					}

				}
			}
		}
	}	
for(i = 0;i<meioMedia.length;i++){
	for(i = 0; i < somaContinua.length;i++){
		decilAnt = 0
		if(decilInter == meioMedia[i] && meioMedia.length == somaContinua.length && somaContinua[i] != somaContinua[0]){
			decilAnt = somaContinua[i-1]


		}
		else{
		 decilAnt = 0
		}
	}
}
for(i = 0;i< meioMedia.length;i++){
	for(i = 0; i < somaMedia.length;i++){
		if(decilInter == meioMedia[i] && meioMedia.length == somaMedia.length){
			decilFi = somaMedia[i]


		}

	}

}

decilTotal = decilInicio + (((d7m - decilAnt) / decilFi) * Ic)

			
		
	
 
   decilvalor = (`Medidas Separatrizes: ${d}% dos(as) ${variavel} é de ${decilTotal} ou menos e ${valor}% é de ${decilTotal} ou mais`)
			   document.getElementById('decilvalor').innerHTML = decilvalor

	}

		
	if(medidasSeparatrizes == 'D8' || medidasSeparatrizes == 'd8'){
		d8 = (soma * 0.8).toFixed(0)
		d = 80
		valor =  100 - d
		var d8m
		d8m = soma * 0.8
		decilvalor = dados[d8-1]
	for(i = 0; i < intervalos1.length;i++){
		for(i = 0; i < intervalos.length;i++){
		decilInicio = 0
			   for(i = 0; i < meioMedia.length;i++){
				   if(decilvalor >= intervalos[i] && decilvalor <= intervalos1[i]){
					   decilInter = (intervalos[i] + intervalos1[i]) / 2
					   decilInicio = intervalos[i]
					if(decilInter == meioMedia[i]){
						decilMeio = meioMedia[i]

					}

				}
			}
		}
	}	
for(i = 0;i<meioMedia.length;i++){
	for(i = 0; i < somaContinua.length;i++){
		decilAnt = 0
		if(decilInter == meioMedia[i] && meioMedia.length == somaContinua.length && somaContinua[i] != somaContinua[0]){
			decilAnt = somaContinua[i-1]


		}
		else{
		 decilAnt = 0
		}
	}
}
for(i = 0;i< meioMedia.length;i++){
	for(i = 0; i < somaMedia.length;i++){
		if(decilInter == meioMedia[i] && meioMedia.length == somaMedia.length){
			decilFi = somaMedia[i]


		}

	}

}
decilTotal = decilInicio + (((d8m - decilAnt) / decilFi) * Ic)

			
		
	
 
   decilvalor = (`Medidas Separatrizes: ${d}% dos(as) ${variavel} é de ${decilTotal} ou menos e ${valor}% é de ${decilTotal} ou mais`)
			   document.getElementById('decilvalor').innerHTML = decilvalor

	}

	
	if(medidasSeparatrizes == 'D9' || medidasSeparatrizes == 'd9'){
		d9 = (soma * 0.9).toFixed(0)
		d = 90
		valor =  100 - d
		var d9m
		d9m = soma * 0.9
		decilvalor = dados[d9-1]
	for(i = 0; i < intervalos1.length;i++){
		for(i = 0; i < intervalos.length;i++){
		decilInicio = 0
			   for(i = 0; i < meioMedia.length;i++){
				   if(decilvalor >= intervalos[i] && decilvalor <= intervalos1[i]){
					   decilInter = (intervalos[i] + intervalos1[i]) / 2
					   decilInicio = intervalos[i]
					if(decilInter == meioMedia[i]){
						decilMeio = meioMedia[i]

					}

				}
			}
		}
	}	
for(i = 0;i<meioMedia.length;i++){
	for(i = 0; i < somaContinua.length;i++){
		decilAnt = 0
		if(decilInter == meioMedia[i] && meioMedia.length == somaContinua.length && somaContinua[i] != somaContinua[0]){
			decilAnt = somaContinua[i-1]


		}
		else{
		 decilAnt = 0
		}
	}
}
for(i = 0;i< meioMedia.length;i++){
	for(i = 0; i < somaMedia.length;i++){
		if(decilInter == meioMedia[i] && meioMedia.length == somaMedia.length){
			decilFi = somaMedia[i]


		}

	}

}

var decilTotal
decilTotal = decilInicio + (((d9m - decilAnt) / decilFi) * Ic)

			
		
	
 
   decilvalor = (`Medidas Separatrizes: ${d}% dos(as) ${variavel} é de ${decilTotal} ou menos e ${valor}% é de ${decilTotal} ou mais`)
			   document.getElementById('decilvalor').innerHTML = decilvalor

	}

		
	if(medidasSeparatrizes == 'D10' || medidasSeparatrizes == 'd10'){
		d10 = (soma * 1.0).toFixed(0)
		d = 100
		var d10m
		d10m = soma * 1.0
		decilvalor = dados[d10-1]
	for(i = 0; i < intervalos1.length;i++){
		for(i = 0; i < intervalos.length;i++){
		decilInicio = 0
			   for(i = 0; i < meioMedia.length;i++){
				   if(decilvalor >= intervalos[i] && decilvalor <= intervalos1[i]){
					   decilInter = (intervalos[i] + intervalos1[i]) / 2
					   decilInicio = intervalos[i]
					if(decilInter == meioMedia[i]){
						decilMeio = meioMedia[i]

					}

				}
			}
		}
	}	
for(i = 0;i<meioMedia.length;i++){
	for(i = 0; i < somaContinua.length;i++){
		decilAnt = 0
		if(decilInter == meioMedia[i] && meioMedia.length == somaContinua.length && somaContinua[i] != somaContinua[0]){
			decilAnt = somaContinua[i-1]


		}
		else{
		 decilAnt = 0
		}
	}
}
for(i = 0;i< meioMedia.length;i++){
	for(i = 0; i < somaMedia.length;i++){
		if(decilInter == meioMedia[i] && meioMedia.length == somaMedia.length){
			decilFi = somaMedia[i]


		}

	}

}

decilTotal = decilInicio + (((d10m - decilAnt) / decilFi) * Ic)

			
		
	
 
  

			  decilvalor = (`Medidas Separatrizes: ${d}% dos(as) ${variavel} é de ${decilTotal} `)
			  document.getElementById('decilvalor').innerHTML = decilvalor

	}

}

	//-------------------------- DESVIO PADRÃO --------------------------------//
	var Desvio = 0
	var DesvioV

	for(i = 0; i<meioMedia.length; i++){
	
		Desvio += Math.pow(meioMedia[i] - mediaDesvio, 2) * somaMedia[i]
	
	}
	//---------------------------------- POPULAÇÃO ------------------------------------------------//
if(medidasDispersao == 'População'){
		//-------------------------- DESVIO PADRÃO POPULAÇÃO --------------------------------//

	  DesvioP = Math.sqrt(Desvio / soma)
	  DesvioV = Math.sqrt(Desvio / soma)
         
	  console.log(Desvio.toFixed(2))
	  DesvioV =(`Desvio padrão: ${DesvioV.toFixed(2)}`)
	  document.getElementById('desvio').innerHTML = DesvioV;

	  //------------------------------ COEFICIENTE DE VARIAÇÃO POPULAÇÃO ----------------------//
	  var coeficienteV 
	  coeficienteV = (DesvioP/mediaDesvio)*100
	  console.log(coeficienteV)
	  coeficienteV = (`Coeficiente de variação: ${coeficienteV.toFixed(2)}%`)
	  document.getElementById('variacao').innerHTML = coeficienteV;
}
    //----------------------------------- AMOSTRA ----------------------------------------//
if(medidasDispersao == 'Amostra'){
	//-------------------------- DESVIO PADRÃO AMOSTRA --------------------------------//

	DesvioP = Math.sqrt(Desvio / (soma-1))
	DesvioV = Math.sqrt(Desvio / (soma-1))
	DesvioV = (`Desvio padrão: ${DesvioV.toFixed(2)}`)
	document.getElementById('desvio').innerHTML = DesvioV;

	//--------------------------- COEFICIENTE DE VARIAÇÃO AMOSTRA  ----------------------//

	coeficienteV = (DesvioP/mediaDesvio) * 100
	coeficienteV = (`Coeficiente de variação: ${coeficienteV.toFixed(2)}%`)
	document.getElementById('variacao').innerHTML = coeficienteV;
}


//---------------------------------- PORCENTIL --------------------------------------------//	
if( separatriz == 'Porcentil(1-100)' ){
	porcentil = (medidasSeparatrizes / 100)
	console.log(porcentil)
	p = (soma * porcentil).toFixed(0)
	console.log(p)
	console.log(soma)
	valor = 100 - medidasSeparatrizes
	var pn
	pn = soma * porcentil
	porcentilvalor = dados[p-1]
	var porcentilInicio
	var porcentilMeio
	var porcentilAnt
    var porcentilInter
for(i = 0; i < intervalos1.length;i++){
	for(i = 0; i < intervalos.length;i++){
	porcentilInicio= 0
		   for(i = 0; i < meioMedia.length;i++){
			   if(porcentilvalor >= intervalos[i] && porcentilvalor <= intervalos1[i]){
				   porcentilInter = (intervalos[i] + intervalos1[i]) / 2
				   porcentilInicio = intervalos[i]
				if(porcentilInter == meioMedia[i]){
					porcentilMeio = meioMedia[i]

				}

			}
		}
	}
}	
for(i = 0;i<meioMedia.length;i++){
	for(i = 0; i < somaContinua.length;i++){
		porcentilAnt = 0
		if(porcentilInter == meioMedia[i] && meioMedia.length == somaContinua.length && somaContinua[i] != somaContinua[0]){
			porcentilAnt = somaContinua[i-1]


		}
		else{
		 porcentilAnt = 0
		}
	}
}	
var porcentilFi
for(i = 0;i< meioMedia.length;i++){
	for(i = 0; i < somaMedia.length;i++){
		if(porcentilInter == meioMedia[i] && meioMedia.length == somaMedia.length){
			porcentilFi = somaMedia[i]


		}

	}

}
var porcentilTotal

porcentilTotal = porcentilInicio + (((pn - porcentilAnt) / porcentilFi) * Ic)
		
	
		porcentilvalor =(`Medidas Separatrizes: ${medidasSeparatrizes}% dos(as) ${variavel} é de ${porcentilTotal} ou menos e ${valor}% é de ${porcentilTotal} ou mais`)
		document.getElementById('porcentilvalor').innerHTML = porcentilvalor;

}

//----------------------------- Tabela --------------------------------------//
var guardaD
	var grafico2 = []
var html = '<table id="tabela"> <th> <td>Fi</td> <td>F%</td> <td>Xi</td> <td>Fac</td> <td>Fac%</td> </th>'; 
for(i=0; i <kVetor.length; i++) {
	fperc[i] = Math.round(((somaTotal[i] / soma) * 100));
	guardaD = Math.round(((somaTotal[i] / soma) * 100))
	grafico2.push((parseInt(guardaD)))
	ftperc[i] = Math.round(((somaContinua[i] / soma) * 100))
	controle = 0;
	for(j = 0; j < splitados.length; j++){
		if (repetidos[j] == splitados[i]){
			controle = 1;
			
		}
	}
	if (controle == 0) {
		html += "<tr><td> " + intervalos[i] + "|----" + intervalos1[i] + "</td><td>" + somaTotal[i] + "</td><td>" + fperc[i] + "</td><td>" + meioTotal[i] +"</td><td>" + somaContinua[i] + "</td><td>" + ftperc[i] + "</td></tr>"
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
console.log(grafico2)
Highcharts.chart('barraJuntas', {
	xAxis: {
	  grafico2
	},
	title: {
	  text: 'Continua'
	},
	series: [{
	  type: 'column',
	  data : grafico2,
	  enableMouseTracking: true
	},
	]})
  

}
if(tipodescritiva == "Qualitativa Ordinal"){
	var soma 
	// ORDENAÇÃO DOS DADOS
	if (dados != ""){
		var splita = dados.split(";");
		splitados = splita.sort((a, b) => a - b)
			
	}	
	var  vetor = "0123456789";
for (var i = 1; i < vetor.length; i++) {
	if (dados.indexOf(vetor[i]) != -1) {
		dados = dados.replace(/ /g, ";");
	}
}
dados = (dados.replace(/\n/g, ";")).split(";")
dados = dados.sort((a,b)=> a - b)
console.log(dados)

		
	
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
	
		mediana = (soma * 0.5).toFixed(0)
		console.log(mediana)
		
		

		
		medianaT = (`Mediana:50% de ${soma} = ${mediana}, desta forma a ${variavel} da posição ${mediana}  é ${dados[mediana-1]}`)


		//-----------------------------------Quintil------------------------------------------------//
	
		var k1,k2,k3,k4,k5 = 0
		var quintilvalor
	if(separatriz == 'Quintil(K1-K5)'){
		if(medidasSeparatrizes == 'K1'|| medidasSeparatrizes == 'k1'){
			k1 = (soma * 0.2).toFixed(0)
			k = 20
			valor = 100 - k
		
		quintilvalor = (`Medidas Separatrizes: ${k}% dos(as) ${variavel} julgaram ${dados[k1-1]} ou menos e ${valor}% é de ${dados[k1-1]} ou mais`)
		document.getElementById('quintilvalor').innerHTML = quintilvalor;
	    }
		if(medidasSeparatrizes == 'K2'|| medidasSeparatrizes == 'k2'){
			k2 = (soma * 0.4).toFixed(0)
			k = 40
			valor = 100 - k
			
			quintilvalor = (`Medidas Separatrizes: ${k}% dos(as) ${variavel} julgaram ${dados[k2-1]} ou menos e ${valor}% é de ${dados[k2-1]} ou mais`)
			document.getElementById('quintilvalor').innerHTML = quintilvalor;
		}		
		if(medidasSeparatrizes == 'K3'|| medidasSeparatrizes == 'k3'){
			k3 = (soma * 0.6).toFixed(0)
			k = 60
			valor =  100 - k
				
			quintilvalor = (`Medidas Separatrizes: ${k}% dos(as) ${variavel} julgaram ${dados[k3-1]} ou menos e ${valor}% é de ${dados[k3-1]} ou mais`)
			document.getElementById('quintilvalor').innerHTML = quintilvalor;
				
		}
					
		if(medidasSeparatrizes == 'K4' || medidasSeparatrizes == 'k4'){
			k4 = (soma * 0.8).toFixed(0)
			k = 80
			valor = 100 - k
		
			quintilvalor = (`Medidas Separatrizes: ${k}% dos(as) ${variavel} julgaram ${dados[k4-1]} ou menos e ${valor}% é de ${dados[k4-1]} ou mais`)
			document.getElementById('quintilvalor').innerHTML = quintilvalor;
		
		}
		
	
		if(medidasSeparatrizes == 'K5' || medidasSeparatrizes == 'k5'){
			k5 = (soma * 1.0).toFixed(0)
			k = 100
			
			
						quintilvalor = (`Medidas Separatrizes: ${k}% dos(as) ${variavel} julgaram ${dados[k5-1]} ou menos e ${valor}% é de ${dados[k5-1]} ou mais`)
						document.getElementById('quintilvalor').innerHTML = quintilvalor
		}
		
	
    
	}
		
		//------------------------------------------------------Quartil-------------------------------------------------//
	 
		var quartilvalor
	 var q,q1,q2,q3,q4
	 if(separatriz == 'Quartil(Q1-Q4)'){
		if(medidasSeparatrizes == 'Q1'  || medidasSeparatrizes == 'q1'){
			q1 = (soma * 0.25).toFixed(0)
			q = 25
			valor =  100 - q
			
				
					quartilvalor = (`Medidas Separatrizes: ${q}% dos(as) ${variavel} julgaram ${dados[q1-1]} ou menos e ${valor}% é de ${dados[q1-1]} ou mais`)
					document.getElementById('quartilvalor').innerHTML = quartilvalor;
		}
		if(medidasSeparatrizes == 'Q2' || medidasSeparatrizes == 'q2'){
			q2 = (soma * 0.5).toFixed(0)
			q = 50
			valor =  100 - q
			
			
				quartilvalor = (`Medidas Separatrizes: ${q}% dos(as) ${variavel} julgaram ${dados[q2-1]} ou menos e ${valor}% é de ${dados[q2-1]} ou mais`)
				document.getElementById('quartilvalor').innerHTML = quartilvalor;
	    }
		if(medidasSeparatrizes == 'Q3'|| medidasSeparatrizes == 'q3'){
			q3 = (soma * 0.75).toFixed(0)
			q = 75
			valor =  100 - q
			
				quartilvalor = (`Medidas Separatrizes: ${q}% dos(as) ${variavel} julgaram ${dados[q3-1]} ou menos e ${valor}% é de ${dados[q3-1]} ou mais`)
				document.getElementById('quartilvalor').innerHTML = quartilvalor;
		}					
		if(medidasSeparatrizes == 'Q4'|| medidasSeparatrizes == 'q4'){
			q4 = (soma * 1.0).toFixed(0)
			q = 100
			
				quartilvalor = (`Medidas Separatrizes: ${q}% dos(as) ${variavel} julgaram ${dados[q4-1]} ou menos e ${valor}% é de ${dados[q4-1]} ou mais`)
				document.getElementById('quartilvalor').innerHTML = quartilvalor;
	
			
		}
	}
				
		//---------------------------------------------Decil------------------------------------------//
		var d,d1,d2,d3,d4,d5,d6,d7,d8,d9
		var decilvalor
	if(separatriz == 'Decil(D1-D10)'){
		if(medidasSeparatrizes == 'D1' || medidasSeparatrizes == 'd1'){
			d1 = (soma * 0.1).toFixed(0)
			d = 10
			valor =  100 - d
		
				decilvalor = (`Medidas Separatrizes: ${d}% dos(as) ${variavel} julgaram ${dados[d1-1]} ou menos e ${valor}% é de ${dados[d1-1]} ou mais`)
			    document.getElementById('decilvalor').innerHTML = decilvalor
			
		}
		if(medidasSeparatrizes == 'D2' || medidasSeparatrizes == 'd2'){
			d2 = (soma * 0.2).toFixed(0)
			d = 20
			valor =  100 - d
			
				decilvalor = (`Medidas Separatrizes: ${d}% dos(as) ${variavel} julgaram ${dados[d2-1]} ou menos e ${valor}% é de ${dados[d2-1]} ou mais`)
			    document.getElementById('decilvalor').innerHTML = decilvalor
		}	

		if(medidasSeparatrizes == 'D3'|| medidasSeparatrizes == 'd3'){
			d3 = (soma * 0.3).toFixed(0)
			d = 30
			valor =  100 - d
			
					decilvalor = (`Medidas Separatrizes: ${d}% dos(as) ${variavel} julgaram ${dados[d3-1]} ou menos e ${valor}% é de ${dados[d3-1]} ou mais`)
					document.getElementById('decilvalor').innerHTML = decilvalor
		}	

		if(medidasSeparatrizes == 'D4' || medidasSeparatrizes == 'd4'){
			d4 = (soma * 0.4).toFixed(0)
			d = 40
			valor =  100 - d
		
				decilvalor = (`Medidas Separatrizes: ${d}% dos(as) ${variavel} julgaram ${dados[d4-1]} ou menos e ${valor}% é de ${dados[d4-1]} ou mais`)
			    document.getElementById('decilvalor').innerHTML = decilvalor
		}	

		if(medidasSeparatrizes == 'D5' || medidasSeparatrizes == 'd5'){
			d5 = (soma * 0.5).toFixed(0)
			d = 50
			valor =  100 - d
			
				decilvalor = (`Medidas Separatrizes: ${d}% dos(as) ${variavel} julgaram ${dados[d5-1]} ou menos e ${valor}% é de ${dados[d5-1]} ou mais`)
			    document.getElementById('decilvalor').innerHTML = decilvalor
		}	

		if(medidasSeparatrizes == 'D6' || medidasSeparatrizes == 'd6'){
			d6 = (soma * 0.6).toFixed(0)
			d = 60
			valor =  100 - d
			
				decilvalor = (`Medidas Separatrizes: ${d}% dos(as) ${variavel} julgaram ${dados[d6-1]} ou menos e ${valor}% é de ${dados[d6-1]} ou mais`)
			    document.getElementById('decilvalor').innerHTML = decilvalor
		}	

		if(medidasSeparatrizes == 'D7' || medidasSeparatrizes == 'd7'){
			d7 = (soma * 0.7).toFixed(0)
			d = 70
			valor =  100 - d
		
				decilvalor = (`Medidas Separatrizes: ${d}% dos(as) ${variavel} julgaram ${dados[d7-1]} ou menos e ${valor}% é de ${dados[d7-1]} ou mais`)
			    document.getElementById('decilvalor').innerHTML = decilvalor
			
		}
		  
		if(medidasSeparatrizes == 'D8' || medidasSeparatrizes == 'd8'){
			d8 = (soma * 0.8).toFixed(0)
			d = 80
			valor =  100 - d
		
				decilvalor = (`Medidas Separatrizes: ${d}% dos(as) ${variavel} julgaram ${dados[d8-1]} ou menos e ${valor}% é de ${dados[d8-1]} ou mais`)
			    document.getElementById('decilvalor').innerHTML = decilvalor
			
		}		
				
		if(medidasSeparatrizes == 'D9' || medidasSeparatrizes == 'd9'){
			d9 = (soma * 0.9).toFixed(0)
			d = 90
			valor =  100 - d
		
				decilvalor = (`Medidas Separatrizes: ${d}% dos(as) ${variavel} julgaram ${dados[d9-1]} ou menos e ${valor}% é de ${dados[d9-1]} ou mais`)
			    document.getElementById('decilvalor').innerHTML = decilvalor
			
		}

		if(medidasSeparatrizes == 'D10' || medidasSeparatrizes == 'd10'){
			d10 = (soma * 1.0).toFixed(0)
			d = 100
			
				decilvalor = (`Medidas Separatrizes: ${d}% dos(as) ${variavel} julgaram ${dados[d10-1]} ou menos e ${valor}% é de ${dados[d10-1]} ou mais`)
			    document.getElementById('decilvalor').innerHTML = decilvalor
			
		}
	}
		//----------------------------------Porcentil--------------------------------------------//	
		if( separatriz == 'Porcentil(1-100)' ){
				porcentil = (medidasSeparatrizes / 100)
				console.log(porcentil)
				p = (soma * porcentil).toFixed(0)
				
										
		   
		   			porcentilvalor =(`Medidas Separatrizes: ${medidasSeparatrizes}% dos(as) ${variavel} julgaram ${dados[p-1]} ou menos e ${valor}% é de ${dados[p-1]} ou mais`)
					document.getElementById('porcentilvalor').innerHTML = porcentilvalor;
	
			}		
			
		
		  //------------------------------------TABELA------------------------------------//
		var guardaP
		  var graficopie = []
		var html = '<table id="tabela"> <th> <td>Fi</td> <td>F%</td> <td>Fac</td> <td>Fac%</td> </th>'; 
		for(i=0; i <cont2.length; i ++) {
			fperc[i] = Math.round(((cont2[i] / soma) * 100));
			guardaP = Math.round(((cont2[i] / soma ) * 100));
			graficopie.push(parseInt(guardaP))
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
		document.getElementById('moda').innerHTML = moda;
		document.getElementById('mediana').innerHTML = medianaT;
	
		
		
	
		html += '</table>';
		document.getElementById('tabela').innerHTML = html	
		console.log(html);
	 
		Highcharts.chart('pieOrdinal', {
			xAxis: {
			  graficopie
			},
			title: {
			  text: 'Ordinal'
			},
			series: [{
			  type: 'pie',
			  data : graficopie,
			  enableMouseTracking: true
			},
			]})
		
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
		
			mediana = (soma * 0.5).toFixed(0)
			console.log(mediana)
			
			
			
			medianaT = (`Mediana:50% de ${soma} = ${mediana}, desta forma a ${variavel} da posição ${mediana}  é ${splitados[mediana-1]}`)
	
		
			//-----------------------------------Quintil------------------------------------------------//
		
			var k1,k2,k3,k4,k5 = 0
			var quintilvalor
		if(separatriz == 'Quintil(K1-K5)'){
			if(medidasSeparatrizes == 'K1' || medidasSeparatrizes == 'k1'){
				k1 = (soma * 0.2).toFixed(0)
				k = 20
				valor = 100 - k
			quintilvalor = (`${k}% dos(as) ${variavel} julgaram ${splitados[k1-1]} ou menos e ${valor}% é de ${splitados[k1-1]} ou mais`)
			document.getElementById('quintilvalor').innerHTML = quintilvalor;
			}
			if(medidasSeparatrizes == 'K2' || medidasSeparatrizes == 'k2'){
				k2 = (soma * 0.4).toFixed(0)
				k = 40
				valor = 100 - k
				quintilvalor = (`${k}% dos(as) ${variavel} julgaram ${splitados[k2-1]} ou menos e ${valor}% é de ${splitados[k2-1]} ou mais`)
				document.getElementById('quintilvalor').innerHTML = quintilvalor;
			}		
			if(medidasSeparatrizes == 'K3' || medidasSeparatrizes == 'k3'){
				k3 = (soma * 0.6).toFixed(0)
				k = 60
				valor =  100 - k
			
				quintilvalor = (`${k}% dos(as) ${variavel} julgaram ${splitados[k3-1]} ou menos e ${valor}% é de ${splitados[k3-1]} ou mais`)
				document.getElementById('quintilvalor').innerHTML = quintilvalor;
					
			}						
			if(medidasSeparatrizes == 'K4'|| medidasSeparatrizes == 'k4'){
				k4 = (soma * 0.8).toFixed(0)
				k = 80
				valor = 100 - k
						quintilvalor = (`${k}% dos(as) ${variavel} julgaram ${splitados[k4-1]} ou menos e ${valor}% é de ${splitados[k4-1]} ou mais`)
						document.getElementById('quintilvalor').innerHTML = quintilvalor;
			
			}	
			if(medidasSeparatrizes == 'K5' || medidasSeparatrizes == 'k5'){
				k5 = (soma * 1.0).toFixed(0)
				k = 100
				
							quintilvalor = (`${k}% dos(as) ${variavel} julgaram ${splitados[k5-1]} ou menos e ${valor}% é de ${splitados[k5-1]} ou mais`)
							document.getElementById('quintilvalor').innerHTML = quintilvalor;
		
			}
		}
		
			 
			
			//------------------------------------------------------Quartil-------------------------------------------------//
		 
			var quartilvalor
		 var q,q1,q2,q3,q4
		 if(separatriz == 'Quartil(Q1-Q4)'){
			if(medidasSeparatrizes == 'Q1' || medidasSeparatrizes == 'q1'){
				q1 = (soma * 0.25).toFixed(0)
				q = 25
				valor =  100 - q
						quartilvalor = (`${q}% dos(as) ${variavel} é de ${splitados[q1]} ou menos e ${valor}% é de ${splitados[q1]} ou mais`)
						document.getElementById('quartilvalor').innerHTML = quartilvalor;
			}
			if(medidasSeparatrizes == 'Q2' || medidasSeparatrizes == 'q2'){
				q2 = (soma * 0.5).toFixed(0)
				q = 50
				valor =  100 - q
				
					quartilvalor = (`${q}% dos(as) ${variavel} é de ${splitados[q2]} ou menos e ${valor}% é de ${splitados[q2]} ou mais`)
					document.getElementById('quartilvalor').innerHTML = quartilvalor;
			}
			if(medidasSeparatrizes == 'Q3' || medidasSeparatrizes == 'q3'){
				q3 = (soma * 0.75).toFixed(0)
				q = 75
				valor =  100 - q
					quartilvalor = (`${q}% dos(as) ${variavel} é de ${splitados[q3-1]} ou menos e ${valor}% é de ${splitados[q3-1]} ou mais`)
					document.getElementById('quartilvalor').innerHTML = quartilvalor;
			}					
			if(medidasSeparatrizes == 'Q4' || medidasSeparatrizes == 'q4'){
				q4 = (soma * 1.0).toFixed(0)
				q = 100
					quartilvalor = (`${q}% dos(as) ${variavel} é de ${splitados[q4-1]} ou menos e ${valor}% é de ${splitados[q4-1]} ou mais`)
					document.getElementById('quartilvalor').innerHTML = quartil
			}
		}		
			//---------------------------------------------Decil------------------------------------------//
			var d,d1,d2,d3,d4,d5,d6,d7,d8,d9
			var decilvalor
		if(separatriz == 'Decil(D1-D10)'){
			if(medidasSeparatrizes == 'D1' || medidasSeparatrizes == 'd1'){
				d1 = (soma * 0.1).toFixed(0)
				d = 10
				valor =  100 - d
					decilvalor = (`${d}% dos(as) ${variavel} é de ${splitados[d1-1]} ou menos e ${valor}% é de ${splitados[d1-1]} ou mais`)
					document.getElementById('decilvalor').innerHTML = decilvalor
				
			}
			if(medidasSeparatrizes == 'D2' || medidasSeparatrizes == 'd2'){
				d2 = (soma * 0.2).toFixed(0)
				d = 20
				valor =  100 - d
					decilvalor = (`${d}% dos(as) ${variavel} é de ${splitados[d2-1]} ou menos e ${valor}% é de ${splitados[d2-1]} ou mais`)
					document.getElementById('decilvalor').innerHTML = decilvalor
			}	
			if(medidasSeparatrizes == 'D3' || medidasSeparatrizes == 'd3'){
				d3 = (soma * 0.3).toFixed(0)
				d = 30
				valor =  100 - d

						decilvalor = (`Medidas Separatrizes: ${d}% dos(as) ${variavel} é de ${splitados[d3-1]} ou menos e ${valor}% é de ${splitados[d3-1]} ou mais`)
						document.getElementById('decilvalor').innerHTML = decilvalor
			}	
			if(medidasSeparatrizes == 'D4'|| medidasSeparatrizes == 'd4'){
				d4 = (soma * 0.4).toFixed(0)
				d = 40
				valor =  100 - d

					decilvalor = (`Medidas Separatrizes: ${d}% dos(as) ${variavel} é de ${splitados[d4-1]} ou menos e ${valor}% é de ${splitados[d4-1]} ou mais`)
					document.getElementById('decilvalor').innerHTML = decilvalor
			}	
			if(medidasSeparatrizes == 'D5' || medidasSeparatrizes == 'd5'){
				d5 = (soma * 0.5).toFixed(0)
				d = 50
				valor =  100 - d

					decilvalor = (`Medidas Separatrizes: ${d}% dos(as) ${variavel} é de ${splitados[d5-1]} ou menos e ${valor}% é de ${splitados[d5-1]} ou mais`)
					document.getElementById('decilvalor').innerHTML = decilvalor
			}	
			if(medidasSeparatrizes == 'D6' || medidasSeparatrizes == 'd6'){
				d6 = (soma * 0.6).toFixed(0)
				d = 60
				valor =  100 - d

					decilvalor = (`Medidas Separatrizes: ${d}% dos(as) ${variavel} é de ${splitados[d6-1]} ou menos e ${valor}% é de ${splitados[d6-1]} ou mais`)
					document.getElementById('decilvalor').innerHTML = decilvalor
			}	
			if(medidasSeparatrizes == 'D7' || medidasSeparatrizes == 'd7'){
				d7 = (soma * 0.7).toFixed(0)
				d = 70
				valor =  100 - d

					decilvalor = (`Medidas Separatrizes: ${d}% dos(as) ${variavel} é de ${splitados[d7-1]} ou menos e ${valor}% é de ${splitados[d7-1]} ou mais`)
					document.getElementById('decilvalor').innerHTML = decilvalor
				
			}
			  
			if(medidasSeparatrizes == 'D8' || medidasSeparatrizes == 'd8'){
				d8 = (soma * 0.8).toFixed(0)
				d = 80
				valor =  100 - d

					decilvalor = (`Medidas separatrizes: ${d}% dos(as) ${variavel} é de ${splitados[d8-1]} ou menos e ${valor}% é de ${splitados[d8-1]} ou mais`)
					document.getElementById('decilvalor').innerHTML = decilvalor
				
			}		
					
			if(medidasSeparatrizes == 'D9' || medidasSeparatrizes == 'd9'){
				d9 = (soma * 0.9).toFixed(0)
				d = 90
				valor =  100 - d

					decilvalor = (`Medidas Separatrizes: ${d}% dos(as) ${variavel} é de ${splitados[d9-1]} ou menos e ${valor}% é de ${splitados[d9-1]} ou mais`)
					document.getElementById('decilvalor').innerHTML = decilvalor
				
			}
			if(medidasSeparatrizes == 'D10' || medidasSeparatrizes == 'd10'){
				d10 = (soma * 1.0).toFixed(0)
				d = 100

					decilvalor = (`Medidas Separatrizes : ${d}% dos(as) ${variavel} é de ${splitados[d10-1]} ou menos e ${valor}% é de ${splitados[d10-1]} ou mais`)
					document.getElementById('decilvalor').innerHTML = decilvalor
				
			}
		}
			//----------------------------------Porcentil--------------------------------------------//	
			if( separatriz == 'Porcentil' ){
					porcentil = (medidasSeparatrizes / 100)
					console.log(porcentil)
					p = (soma * porcentil).toFixed(0)
					valor = 100 - medidasSeparatrizes
			   
						   porcentilvalor =(`Medidas Separarizes: ${medidasSeparatrizes}% dos(as) ${variavel} é de ${splitados[p-1]} ou menos e ${valor}% é de ${splitados[p-1]} ou mais`)
						document.getElementById('porcentilvalor').innerHTML = porcentilvalor;
		
			}		
				
			
			  //------------------------------------TABELA------------------------------------//
			  var interpie = []
			  var interp	
			var html = '<table id="tabela"> <th> <td>Fi</td> <td>F%</td> <td>Fac</td> <td>Fac%</td> </th>'; 
			for(i=0; i <cont2.length; i ++) {
				fperc[i] = Math.round(((cont2[i] / soma) * 100));
				ftperc[i] = Math.round(((somaa[i] / soma) * 100))
				interp = Math.round(((cont2[i] / soma) * 100))
				interpie.push(interp)
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
			document.getElementById('moda').innerHTML = moda;
			document.getElementById('mediana').innerHTML = medianaT;
		
			
			
		
			html += '</table>';
			document.getElementById('tabela').innerHTML = html	
			console.log(html);


			Highcharts.chart('pieNominal', {
				xAxis: {
				  interpie
				},
				title: {
				  text: 'Nominal'
				},
				series: [{
				  type: 'pie',
				  data : interpie,
				  enableMouseTracking: true
				},
				]})
			
	
		}
	
	
	
	
}	


