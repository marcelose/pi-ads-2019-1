var express = require('express');
var router = express.Router();
var banco = require('../app-banco');

router.get('/teste', function (req, res, next) {
  res.send('banco ' + banco.configuracoes.server);
});

router.get('/entrar', function (req, res, next) {
  console.log(banco.conexao);
  banco.conectar().then(() => {
    return banco.sql.query `select top 3 * from leitura where id <= 10`;
  }).then(consulta => {
    console.log(consulta.recordset);
    res.send(consulta.recordset);
  }).catch(err => {
    var erro = `Erro no login: ${err}`;
    console.error(erro);
    res.status(500).send(erro);
  }).finally(() => {
    banco.sql.close();
  })
});

module.exports = router;