import ProdutoDAO from "../Persistencia/produtoDAO.js";
import Categoria from "./categoria.js";

export default class Produto{
    #codigo;
    #descricao;
    #precoCusto;
    #precoVenda;
    #dataValidade;
    #qtdEstoque;
    #categoria;


    constructor(codigo=0,descricao="", precoCusto=0, 
                precoVenda=0,dataValidade='', qtdEstoque=0,
                categoria=null
                ){
        this.#codigo=codigo;
        this.#descricao=descricao;
        this.#precoCusto=precoCusto;
        this.#precoVenda=precoVenda;
        this.#dataValidade=dataValidade;
        this.#qtdEstoque=qtdEstoque;
        this.#categoria=categoria;
    }

    get codigo(){
        return this.#codigo;
    }
    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    get descricao(){
        return this.#descricao;
    }

    set descricao(novaDesc){
        this.#descricao=novaDesc;
    }

    get precoCusto(){
        return this.#precoCusto;
    }

    set precoCusto(novoPreco){
        this.#precoCusto = novoPreco
    }

    get precoVenda(){
        return this.#precoVenda;
    }
    
    set precoVenda(novoPreco){
        this.#precoVenda = novoPreco
    }

    get dataValidade(){
        return this.#dataValidade;
    }

    set dataValidade(novaData){
        this.#dataValidade = novaData;
    }

    get qtdEstoque(){
        return this.#qtdEstoque;
    }

    set qtdEstoque(novaQtd){
        this.#qtdEstoque = novaQtd;
    }

    get categoria(){
        return this.#categoria;
    }

    set categoria(novaCat){   
        if (novaCat instanceof Categoria){
            this.#categoria = novaCat;
        }
    }  


    toJSON(){
        return {
            codigo:this.#codigo,
            descricao:this.#descricao,
            precoCusto:this.#precoCusto,
            precoVenda:this.#precoVenda,
            dataValidade: new Date(this.#dataValidade).toLocaleDateString(),
            qtdEstoque:this.#qtdEstoque,
            categoria:this.#categoria
        }
    }

     //camada de modelo acessa a camada de persistencia
     async gravar(){
        const prodDAO = new ProdutoDAO();
        await prodDAO.gravar(this);
     }
 
     async excluir(){
        const prodDAO = new ProdutoDAO();
        await prodDAO.excluir(this);
     }
 
     async alterar(){
        const prodDAO = new ProdutoDAO();
        await prodDAO.atualizar(this);
     }
 
     async consultar(termo){
        const prodDAO = new ProdutoDAO();
        return await prodDAO.consultar(termo);
     }

}