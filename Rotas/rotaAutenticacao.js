import { Router } from "express";
import login, { logout } from "../Seguranca/autenticar.js";

const rotaAutenticacao = new Router();

rotaAutenticacao.post('/login', login);
rotaAutenticacao.get('/logout', logout);

export default rotaAutenticacao;