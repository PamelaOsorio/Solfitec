// 1. Ler e processar os dados do input
function obterVetores() {
  const x = document.getElementById('x').value;
  const y = document.getElementById('y').value;
  const vx = x.split(";").map(Number);
  const vy = y.split(";").map(Number);

  if (vx.length !== vy.length || vx.length === 0) {
    alert("Erro: Os vetores X e Y devem ter o mesmo tamanho e não podem estar vazios.");
    return null;
  }

  return { vx, vy };
}

// 2. Calcular soma e produtos necessários
function calcularSomas(vx, vy) {
  let somaX = 0, somaY = 0, somaX2 = 0, somaY2 = 0, somaXY = 0;
  for (let i = 0; i < vx.length; i++) {
    somaX += vx[i];
    somaY += vy[i];
    somaX2 += vx[i] * vx[i];
    somaY2 += vy[i] * vy[i];
    somaXY += vx[i] * vy[i];
   
  }
  return { somaX, somaY, somaX2, somaY2, somaXY };

  
}

// 3. Calcular correlação
function calcularCorrelacao(n, somaX, somaY, somaX2, somaY2, somaXY) {
  const numerador = (n * somaXY) - (somaX * somaY);
  const denominador = Math.sqrt((n * somaX2 - somaX ** 2) * (n * somaY2 - somaY ** 2));
  return numerador / denominador;

}

// 4. Calcular coeficientes da regressão linear
function calcularRegressao(n, somaX, somaY, somaX2, somaXY) {
  const b = ((n * somaXY) - (somaX * somaY)) / (n * somaX2 - somaX ** 2);
  const a = (somaY - b * somaX) / n;
  return { a, b };
}

// 5. Classificar correlação
function classificarCorrelacao(r) {
  if (r === 1) return `Correlação: ${(r * 100).toFixed(2)}% (Perfeita positiva)`;
  if (r === -1) return `Correlação: ${(r * 100).toFixed(2)}% (Perfeita negativa)`;
  if (r === 0) return `Correlação: 0% (Nenhuma correlação)`;
  if ((r > 0.7 && r < 1) || (r < -0.7 && r > -1)) return `Correlação: ${(r * 100).toFixed(2)}% (Forte)`;
  if ((r >= 0.3 && r <= 0.7) || (r <= -0.3 && r >= -0.7)) return `Correlação: ${(r * 100).toFixed(2)}% (Moderada)`;
  return `Correlação: ${(r * 100).toFixed(2)}% (Fraca)`;
}

// 6. Gerar pontos para o gráfico (scatter)
function gerarPontos(vx, vy) {
  return vx.map((x, i) => [x, vy[i]]);
}

// 7. Gerar pontos da reta de regressão
function gerarReta(a, b, xmin, xmax) {
  let reta = [];
  for (let i = xmin; i <= xmax; i += 0.1) {
    reta.push([i, a + b * i]);
  }
  return reta;
}

// 8. Renderizar gráfico com Highcharts
function renderizarGrafico(pontos, reta, xmin, xmax, ymin, ymax) {
  Highcharts.chart('grafico', {
    chart: { type: 'line' },
    title: { text: 'Correlação e Regressão Linear' },
    xAxis: { title: { text: 'X' }, min: xmin - 1, max: xmax + 1 },
    yAxis: { title: { text: 'Y' }, min: ymin - 1, max: ymax + 1 },
    series: [
      { name: 'Reta de Regressão', data: reta, color: 'blue', marker: { enabled: false } },
      { type: 'scatter', name: 'Pontos Observados', data: pontos, color: 'red' }
    ]
  });
  document.getElementById('grafico').style.display = 'block';
}

// Função principal que chama tudo
function correlregressao() {
  const dados = obterVetores();
  if (!dados) return;

  const { vx, vy } = dados;
  const n = vx.length;

  const { somaX, somaY, somaX2, somaY2, somaXY } = calcularSomas(vx, vy);

  const r = calcularCorrelacao(n, somaX, somaY, somaX2, somaY2, somaXY);
  const { a, b } = calcularRegressao(n, somaX, somaY, somaX2, somaXY);

  const textoCorrelacao = classificarCorrelacao(r);

  // Atualiza resultados no HTML
  document.getElementById('correlacao').innerHTML = textoCorrelacao;
  document.getElementById('regressao').innerHTML = `Equação da regressão: y = ${a.toFixed(2)} + ${b.toFixed(2)}x`;
  document.getElementById('resultado').innerHTML = `Equação da reta: y = ${a.toFixed(4)} + ${b.toFixed(4)}x`;

  const pontos = gerarPontos(vx, vy);

  // Calcular limites para o gráfico
  const xmin = Math.min(...vx);
  const xmax = Math.max(...vx);
  const ymin = Math.min(...vy);
  const ymax = Math.max(...vy);

  const reta = gerarReta(a, b, xmin, xmax);

  renderizarGrafico(pontos, reta, xmin, xmax, ymin, ymax);
}




//var x = document.getElementById('x').value;
//var y = document.getElementById('y').value;

//var vx = new Array()
//var vy = new Array()
//var vx2 = new Array()
//var vy2 = new Array()
//vx = x.split(";");
//vy = y.split(";");
//vx2 = vx
/*vy2 = vy
var totalx = 0
var totaly = 0
var totalx2 = 0
var totaly2 = 0
var totalxy = 0
var cont = 0
var xmin = 0 , xman = 0, ymin = 0, yman = 0
console.log(vx) 
console.log(vy)
console.log(totalx)
for(i = 0; i < vx.length; i++){
  xmin = parseInt(vx[i]);
  xman = parseInt(vx[i]);
  if(vx.length != 0){
   totalx += parseInt(vx[i]) 
   cont++
   console.log(`Soma x = ${totalx}`) 
  }
  cont = vx.length
console.log(totalx)
}
for(i = 0; i < vy.length; i++){
  ymin = parseInt(vy[i]);
  yman = parseInt(vy[i]);
  if(vx.length != 0){
    totaly += parseInt(vy[i])
    console.log(`Soma y = ${totaly}`) 

  }
}
for(i = 0; i < vx.length; i++){
  for(i = 0; i < vx2.length; i++)
  if((vx.length != 0) && (vx.length == vx2.length)){
    totalx2 += parseInt(vx[i] * vx2[i])
    console.log(`Soma x2 = ${totalx2} // X = ${vx[i]} * ${vx2[i]}`)
  }
}
for(i = 0; i < vy.length; i++){
  for(i = 0; i < vy2.length; i++)
  if((vy.length != 0) && (vy.length == vy2.length)){
    totaly2 += parseInt(vy[i] * vy2[i])
    console.log(`Soma y2 = ${totaly2} // X = ${vy[i]} * ${vy2[i]}`)
  }
}
//for(i = 0; i < vx.length; i++){
  //for(i = 0; i < vy.length; i++)
  //if((vx.length != 0) && (vx.length == vy.length)){
    //totalxy += parseInt(vx[i] * vy[i])
    //console.log(`Soma y2 = ${totalxy} // X = ${vx[i]} * y =  ${vy[i]}`)
  //}
//}
//console.log(cont)
//var r = 0, r1 = 0; r2 = 0, totalr = 0
r = (cont * totalxy) - (totalx * totaly)
console.log(r)
r1 = Math.sqrt((cont * totalx2) - (totalx ** 2)).toFixed(2)
console.log(r1)
r2 = Math.sqrt((cont * totaly2) - (totaly ** 2)).toFixed(2)
console.log(r2)
totalr = r / ( r1 * r2 )
console.log(totalr)*/
/*
if(  totalr == 1){
  correlacao = (` Correlação : ${(totalr*100).toFixed(2)}% Perfeita positiva`)
  document.getElementById('correlacao').innerHTML  = correlacao


}
else if (totalr == -1){
  correlacao = (`Correlação :${(totalr*100).toFixed(2)}% Perfeita negativa `)
  document.getElementById('correlacao').innerHTML  = correlacao

}
else if ( totalr == 0){
  alert(" Variáveis não correlacionadas")
}
else if ((0.7 <= totalr && totalr < 1) | (-0.7 <= totalr && totalr < 1)){
  correlacao = (`Correlação :${(totalr*100).toFixed(2)}%  `);
  document.getElementById('correlacao').innerHTML  = correlacao

  }
else if ((0.3 <= totalr && totalr < 0.7)  | (-0.3 <= totalr && total < -0.7)) {
  correlacao = (`Correlação :${(totalr*100).toFixed(2)}% `)
  document.getElementById('correlacao').innerHTML  = correlacao

  }
else if ((0 < totalr && totalr < 0.3)  | (0 < totalr && total < -0.3)){
  correlacao = (`Correlação :${(totalr*100).toFixed(2)}% `)
  document.getElementById('correlacao').innerHTML  = correlacao

}*/



/*var a = 0; a1 = 0; totala = 0; correlacao = 0
a = (cont * totalxy - totalx * totaly) 
console.log(a)
a1 = (cont * totalx2 - Math.pow(totalx, 2))
totala =  (a / a1).toFixed(4)
console.log(totala)
correlacao1 = (cont * totalxy) - (totalx * totaly) /  (cont * totalx2) - (totalx ** 2)


var b = 0; y1 = 0 ;  x1 = 0
b = ((totaly / cont ) - totala * (totalx / cont)).toFixed(3)
console.log(b)
var resultado = 0
resultado = (` y =${totala}.x + ${b}`)
document.getElementById('resultado').innerHTML  = resultado

 var pontos = []
for( i = 0 ; i < vy.length; i++){
    for (i = 0 ; i < vx.length;i++){
     if (parseInt(vx[i]) > xman)
      xman = parseInt(vx[i]);
    if (parseInt(vx[i]) < xmin)
      xmin = parseInt(vx[i]);
    if (parseInt(vy[i]) > yman)
      yman = parseInt(vy[i]);
    if (parseInt(vy[i]) < ymin)
    ymin = parseInt(vy[i]);

  pontos.push([parseInt(vx[i]), parseInt(vy[i])])
  }
}
var cont = 0

var cont1 = []
for(i = 0; i < 101 ; i++ ){
  cont++
  cont1[0] = 0
  cont1[i] = cont
}
console.log(cont1)
var Total = []
var reta = []
for(i = 0; i < cont1.length+1;i++){
     Total = parseFloat((totala * ((cont1[i-1]/100)*100)) + ((b*100)/100))

     console.log(totala)
     console.log(cont1[i])
     console.log(Total)
     
     reta.push(parseFloat(Total))
}






Highcharts.chart('grafico', {
  xAxis: {
    min: xmin - 1,
    max: xman + 1
  },
  yAxis: {
    min: ymin,
    max: yman
  },
  rAxis:{
    min : reta,
    max: reta 
  },
  title: {
    text: 'Correlação e Regressão'
  },
  series: [{
    type: 'line',
    name: 'Reta',
    data : reta,
    marker: {
      radius: 0
    },
    states: {
      hover: {
        lineWidth: 0
      }
    },
    enableMouseTracking: true
  }, {
    type: 'scatter',
    name: 'Pontos',
    data: pontos,
    marker: {
      radius: 6
    }
  }]
});
}
*/
