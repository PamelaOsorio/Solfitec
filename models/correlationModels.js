exports.calcularCorrelacaoRegr = (vx, vy) => {
  const n = vx.length;
  let somaX = 0, somaY = 0, somaX2 = 0, somaY2 = 0, somaXY = 0;

  for (let i = 0; i < n; i++) {
    somaX += vx[i];
    somaY += vy[i];
    somaX2 += vx[i] * vx[i];
    somaY2 += vy[i] * vy[i];
    somaXY += vx[i] * vy[i];
  }

  const numerador = (n * somaXY) - (somaX * somaY);
  const denominador = Math.sqrt((n * somaX2 - somaX ** 2) * (n * somaY2 - somaY ** 2));

  // Evitar divisão por zero
  if (denominador === 0) {
    return {
      correlacao: 0,
      classificacao: "Indefinida (denominador zero)",
      regressao: { a: 0, b: 0 }
    };
  }

  const r = numerador / denominador;
  const b = numerador / (n * somaX2 - somaX ** 2);
  const a = (somaY - b * somaX) / n;

  let classificacao;
  if (r === 1) classificacao = "Perfeita positiva";
  else if (r === -1) classificacao = "Perfeita negativa";
  else if (r === 0) classificacao = "Nenhuma correlação";
  else if ((r > 0.7 && r < 1) || (r < -0.7 && r > -1)) classificacao = "Forte";
  else if ((r >= 0.3 && r <= 0.7) || (r <= -0.3 && r >= -0.7)) classificacao = "Moderada";
  else classificacao = "Fraca";

  return {
    correlacao: r,
    classificacao,
    regressao: { a, b }
  };
};
