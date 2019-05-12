var express = require('express');
var router = express.Router();
var banco = require('../app-banco');

router.get('/ultimas', function (req, res, next) {
  console.log(banco.conexao);
  banco.conectar().then(() => {
    var limite_linhas = 5;
    return banco.sql.query(`select top ${limite_linhas} 
                            Id, temperatura, umidade, FORMAT(momento,'HH:mm:ss') as momento 
                            from leitura order by id desc`);
  }).then(consulta => {

    console.log(consulta.recordset);
    res.send(consulta.recordset);

  }).catch(err => {

    var erro = `Erro na leitura dos últimos registros: ${err}`;
    console.error(erro);
    res.sendStatus(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });
  
});

module.exports = router;