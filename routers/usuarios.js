const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const usuariosContoller = require('../controllers/usuarios-controller') 


router.post('/cadastro', usuariosContoller.cadastrarUsuario)
router.post('/login', usuariosContoller.loginUsuario)



module.exports = router