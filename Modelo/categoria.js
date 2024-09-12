import CategoriaDAO from "../Persistencia/categoriaDAO.js";
//não esqueça do .js no final da importação

export default class Categoria {
    //definição dos atributos privados
    #codigo;
    #descricao;

    constructor(codigo=0, descricao=''){
        this.#codigo=codigo;
        this.#descricao=descricao;
    }

    //métodos de acesso públicos

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
        this.#descricao = novaDesc;
    }

    //override do método toJSON
    toJSON()     
    {
        return {
            codigo:this.#codigo,
            descricao:this.#descricao
        }
    }

    //camada de modelo acessa a camada de persistencia
    async gravar(){
        const catDAO = new CategoriaDAO();
        await catDAO.gravar(this);
    }

    async excluir(){
        const catDAO = new CategoriaDAO();
        await catDAO.excluir(this);
    }

    async atualizar(){
        const catDAO = new CategoriaDAO();
        await catDAO.atualizar(this);

    }

    async consultar(parametro){
        const catDAO = new CategoriaDAO();
        return await catDAO.consultar(parametro);
    }

    async possuiProdutos(){
        const catDAO = new CategoriaDAO();
        return await catDAO.possuiProdutos(this);
    }
}