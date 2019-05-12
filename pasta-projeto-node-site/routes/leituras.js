var express = require('express');
var router = express.Router();
var banco = require('../app-banco');

router.get('/ultimas', function (req, res, next) {
  console.log(banco.conexao);
  banco.conectar().then(() => {
    return banco.sql.query `select top 10 * from leitura order by id desc`;
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