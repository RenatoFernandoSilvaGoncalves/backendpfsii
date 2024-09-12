import { Router } from "express";
import ClienteCTRL from "../Controle/clienteCtrl.js";

const rotaCliente = new Router();
const clienteCTRL = new ClienteCTRL();
//definição de endpoints que serão processadas pela camada de controle
//para um determinado cliente

rotaCliente.post('/', clienteCTRL.gravar)
.put('/',clienteCTRL.atualizar)
.delete('/',clienteCTRL.excluir)
.get('/', clienteCTRL.consultar)
.get('/:cpf', clienteCTRL.consultarPeloCPF);

export default rotaCliente;