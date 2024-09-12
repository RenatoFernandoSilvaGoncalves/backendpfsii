import { Router } from "express";
import PedidoCtrl from "../Controle/pedidoCtrl.js";

const rotaPedido = new Router();
const pedidoCtrl = new PedidoCtrl();

rotaPedido
.get('/:termo', pedidoCtrl.consultar)
.post('/', pedidoCtrl.gravar);
//.patch('/', pedidoCtrl.atualizar)
//.put('/', pedidoCtrl.atualizar)
//.delete('/', pedidoCtrl.excluir);

export default rotaPedido;