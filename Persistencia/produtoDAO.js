import Produto from '../Modelo/produto.js';
import conectar from './conexao.js';

export default class ProdutoDAO {

    constructor() {
        this.init();
    }

    async init() {
        try 
        {
            const conexao = await conectar(); //retorna uma conexão
            const sql = `
            CREATE TABLE IF NOT EXISTS produto(
                prod_codigo INT NOT NULL AUTO_INCREMENT,
                prod_descricao VARCHAR(100) NOT NULL,
                prod_precoCusto DECIMAL(10,2) NOT NULL DEFAULT 0,
                prod_precoVenda DECIMAL(10,2) NOT NULL DEFAULT 0,
                prod_dataValidade DATE,
                prod_qtdEstoque DECIMAL(10,2) NOT NULL DEFAULT 0,
                CONSTRAINT pk_produto PRIMARY KEY(prod_codigo)
            )
        `;
            await conexao.execute(sql);
            await conexao.release();
        }
        catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }


    async gravar(produto) {
        if (produto instanceof Produto) {
            const sql = `INSERT INTO produto(prod_descricao, prod_precoCusto,
                prod_precoVenda, prod_dataValidade, prod_qtdEstoque)
                VALUES(?,?,?,?,?)`;
            const parametros = [produto.descricao, produto.precoCusto, produto.precoVenda,
            produto.dataValidade, produto.qtdEstoque];

            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            produto.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }
    async atualizar(produto) {
        if (produto instanceof Produto) {
            const sql = `UPDATE produto SET prod_descricao = ?, prod_precoCusto = ?,
            prod_precoVenda = ?, prod_dataValidade = ?, prod_qtdEstoque = ?,
            WHERE prod_codigo = ?`;
            const parametros = [produto.descricao, produto.precoCusto, produto.precoVenda,
            produto.dataValidade, produto.qtdEstoque, produto.codigo];

            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(produto) {
        if (produto instanceof Produto) {
            const sql = `DELETE FROM produto WHERE prod_codigo = ?`;
            const parametros = [produto.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo) {
        if (!termo){
            termo="";
        }
        //termo é um número
        const conexao = await conectar();
        let listaProdutos = [];
        if (!isNaN(parseInt(termo))){
            //consulta pelo código do produto
            const sql = `SELECT p.prod_codigo, p.prod_descricao,
              p.prod_precoCusto, p.prod_precoVenda, p.prod_dataValidade, 
              p.prod_qtdEstoque
              FROM produto p 
              WHERE p.prod_codigo = ?
              ORDER BY p.prod_descricao               
            `;
            const parametros=[termo];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const produto = new Produto(registro.prod_codigo,registro.prod_descricao,
                                            registro.prod_precoCusto,registro.prod_precoVenda,
                                            registro.prod_dataValidade, registro.prod_qtdEstoque
                                            );
                listaProdutos.push(produto);
            }
        }
        else
        {
            //consulta pela descrição do produto
            const sql = `SELECT p.prod_codigo, p.prod_descricao, p.prod_precoCusto, 
                         p.prod_precoVenda, p.prod_dataValidade, p.prod_qtdEstoque
                         FROM produto p 
                         WHERE p.prod_descricao like ?
                         ORDER BY p.prod_descricao`;
            const parametros=['%'+termo+'%'];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const produto = new Produto(registro.prod_codigo,registro.prod_descricao,
                                            registro.prod_precoCusto,registro.prod_precoVenda,
                                            registro.prod_dataValidade, registro.prod_qtdEstoque,
                                            );
                listaProdutos.push(produto);
            }
        }

        return listaProdutos;
    }
}