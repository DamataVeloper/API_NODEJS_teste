const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const multer = require('multer');
const login = require('../middleware/login')

const produtosContoller = require('../controllers/produtos-controller') 


const storage = multer.diskStorage({
    
    destination: function (req, file, cb){
        cb(null, 'uploads');
    },
    filename: function (req, file, cb){
        cb(null, file.originalname);
    }

})
const fileFilter = (req, file, cb) =>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    }else{
        cb(null, false)
    }
}


const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})




router.get('/', produtosContoller.getProdutos);

router.post('/',login.obrigatorio , upload.single('produto_imagem'), produtosContoller.postProdutos )

router.get('/:id_produto', produtosContoller.getUmProduto);

router.patch('/', login.obrigatorio , produtosContoller.pachProduto);

router.delete('/',login.obrigatorio ,  produtosContoller.deleteProduto);

module.exports = router