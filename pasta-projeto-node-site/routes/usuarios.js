var express = require('express');
var router = express.Router();
var banco = require('../app-banco');

router.post('/entrar', function (req, res, next) {

  banco.conectar().then(() => {
    var login = req.body.login; // depois de .body, use o nome (name) do campo em seu formulário de login
    var senha = req.body.senha; // depois de .body, use o nome (name) do campo em seu formulário de login
    return banco.sql.query(`select * from usuario where login='${login}' and senha='${senha}'`);
  }).then(consulta => {

    if (consulta.recordset.length==1) {
      res.send(consulta.recordset);
    } else {
      console.log(`Usuários encontrados: ${consulta.recordset.length}`);
      res.sendStatus(404);
    }

  }).catch(err => {

    var erro = `Erro no login: ${err}`;
    console.error(erro);
    res.sendStatus(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});

module.exports = router;