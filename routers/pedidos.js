const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool

const pedidosContoller = require('../controllers/pedidos-controller') 


router.get('/', pedidosContoller.getPedidos);

router.post('/', pedidosContoller.postPedidos);

router.get('/:id_pedido', pedidosContoller.getUmPedido);

router.delete('/', pedidosContoller.deletePedido);

module.exports = router