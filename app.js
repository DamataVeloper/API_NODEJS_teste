const express = require('express');
const app = express();
const morgan = require('morgan');





const rotaProdutos = require('./routers/produtos');
const rotaPedidos = require('./routers/pedidos');
const rotaUsuarios = require('./routers/usuarios');


app.use(morgan('dev'));
app.use('./uploads', express.static('uploads'))
app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.use((req, res, next)=>{
    //res.header('Acces-Control-Allow-Origin', 'https://gymwod.com.br')
    res.header('Acces-Control-Allow-Origin', '*');
    res.header('Acces-Control-Allow_Header', 'Origin, X-Requested-With, Content_Type, Accept, Authorization');

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).res({});
    }

    next();
});


app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotaPedidos);
app.use('/usuarios', rotaUsuarios);




app.use((req, res, next) => {
    const erro = new Error('Nao encontrado');
    erro.status = 404;
    next(erro);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });

});






module.exports = app