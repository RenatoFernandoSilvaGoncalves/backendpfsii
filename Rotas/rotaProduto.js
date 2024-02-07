import { Router } from "express";
import ProdutoCtrl from "../Controle/produtoCtrl.js";

const prodCtrl = new ProdutoCtrl();
const rotaProduto = new Router();

rotaProduto
.get('/', prodCtrl.consultar)
.get('/:termo', prodCtrl.consultar)
.post('/', prodCtrl.gravar)
.patch('/', prodCtrl.atualizar)
.put('/', prodCtrl.atualizar)
.delete('/', prodCtrl.excluir);

export default rotaProduto;