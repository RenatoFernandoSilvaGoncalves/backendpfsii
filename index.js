import express from 'express';
import cors from 'cors';
import rotaCategoria from './Rotas/rotaCategoria.js';
import rotaProduto from './Rotas/rotaProduto.js';
import session from 'express-session';
import dotenv from 'dotenv';
import rotaAutenticacao from './Rotas/rotaAutenticacao.js';
import {verificarAutenticacao} from './Seguranca/autenticar.js';
import rotaPedido from './Rotas/rotaPedido.js';
import rotaCliente from './Rotas/rotaCliente.js';

dotenv.config(); // carrega as variáveis de ambiente extraindo elas
                 // do arquivo .env

const host='0.0.0.0';
const porta=4000;

const app = express();


app.use(session({
    secret: process.env.CHAVE_SECRETA, 
    resave: true, // a cada requisição a sessão precisa ser atualizada
    saveUninitialized: true, //salvar sessões não iniciadas
    cookie: { 
        httpOnly: false,
        secure: false,
        sameSite: false,
        maxAge: 1000 * 60 * 15 } //tempo máximo de ociosidade para considerar a sessão vencida
}));

app.use(cors({
    credentials: true, //middleware para passar “Access-Control-Allow-Credentials” no cabeçalho das requisições.
    origin: ["http://localhost:3000","http://192.168.0.101:3000"],
}));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/categoria',verificarAutenticacao,rotaCategoria);
app.use('/produto',verificarAutenticacao,rotaProduto);
app.use('/cliente',verificarAutenticacao,rotaCliente);
app.use('/pedido',verificarAutenticacao,rotaPedido);
app.use('/autenticacao', rotaAutenticacao);

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})
