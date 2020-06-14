function binomial(){
    var n = document.getElementById('amostra').value;
    var p = document.getElementById('sucesso').value;
    var q = document.getElementById('fracasso').value;
    var k = document.getElementById('evento').value;
      
    p = p/100
    q = q/100
       
       if ( (n == 0) || (n == 1) ) {

        acumula = 1;
       
      } else {

        var acumula = 1;
        for(x=n;x>1;x--) {
          acumula = acumula * x;
        }
        console.log(acumula)
        evento = []
        evento = k.split(";")
      }
      for(i = 0; i < evento.length; i++){
          if ( ( evento == 0) || (evento == 1) ) {
    
             acumula1 = 1;
           
          } else {
    
              var acumula1 = 1;
              for(x=evento[i];x>1;x--) {
              acumula1 = acumula1 * x;
            }
              var cont = []
               cont[i] = acumula1;
               var fatorial = []
               fatorial[i] = n - evento[i]
               console.log(cont[i])
          }

            for(i = 0; i < fatorial;i++){
               if ( (fatorial == 0) || (fatorial == 1) ) {
        
                acumula2 = 1;
               
              } else {
        
                var acumula2 = 1;

                for(x=fatorial;x>1;x--) {
                  acumula2 = acumula2 * x;

                }       
              }
            }
          } 
          var psoma, qsoma
          psoma = Math.pow (p , k)
          qsoma = Math.pow(n , k)
          combinar = acumula/acumula1 + acumula2
          contar = combinar * psoma * qsoma
          combinar = (`Resultado: ${combinar}%`)
          document.getElementById('resultado').innerHTML = combinar;
                 

        
      
          
                
        //--------------------------------Media----------------------------------//
        var media = Number(n*p)
        var mediacv = Number(n*p)
        console.log(media)
        media = (`Media: ${media}`)
        document.getElementById('mediabinomial').innerHTML = media;
      
        //---------------------------------Desvio Padrão-------------------------//
        var DP = Math.sqrt(n*p*q)
        var dpcv = Math.sqrt(n*p*q)
        console.log(DP)
         DP = (`Desvio Padrão: ${DP.toFixed(2)}`)
        document.getElementById('desviopadrao').innerHTML = DP;
        //---------------------------------Coeficiente de variação----------------//
        var CV = (dpcv/mediacv)*100
        console.log(CV)
        CV = (`Coeficiente de variação: ${CV.toFixed(0)}%`)
        document.getElementById('variacao').innerHTML = CV;
        
            
      
}