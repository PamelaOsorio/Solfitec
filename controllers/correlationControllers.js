const correlacaoModel = require('../models/correlationModels');

exports.calcular = (req, res) => {
  const { x, y } = req.body;
  if (!x || !y || x.length !== y.length || x.length === 0) {
    return res.status(400).json({ error: 'Vetores inválidos' });
  }

  const resultado = correlacaoModel.calcularCorrelacaoRegr(x, y);

  res.json(resultado);
};
