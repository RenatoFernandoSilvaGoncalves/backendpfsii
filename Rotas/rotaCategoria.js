import { Router } from "express";
import CategoriaCtrl from "../Controle/categoriaCtrl.js";

//rotas é o mapeamento das requisições da web para um determinado
//endpoint da aplicação

const catCtrl = new CategoriaCtrl();
const rotaCategoria = new Router();

rotaCategoria
.get('/',catCtrl.consultar)
.get('/:termo', catCtrl.consultar)
.post('/',catCtrl.gravar)
.patch('/',catCtrl.atualizar)
.put('/',catCtrl.atualizar)
.delete('/',catCtrl.excluir);

export default rotaCategoria;