import ClienteDAO from '../Persistencia/ClienteDAO.js';

export default class Cliente{

    #cpf;  //# define que um atributo seja privado
    #nome;
    #endereco;
    #bairro;
    #cidade;
    #uf;
    #telefone;
    #email;

    //método construtor que define as informações necessárias para se criar um cliente
    constructor(cpf, nome, endereco, bairro, cidade, uf, telefone, email){
        this.#cpf = cpf;
        this.#nome = nome;
        this.#endereco = endereco;
        this.#bairro = bairro;
        this.#cidade = cidade;
        this.#uf = uf;
        this.#telefone = telefone;
        this.#email = email;
        
    }


    get cpf(){
        return this.#cpf;
    }

    set cpf(novoCpf){
        this.#cpf = novoCpf;
    }

    get nome(){
        return this.#nome;
    }

    set nome(novoNome){
        if(novoNome != "") //regra de negócio que impede que clientes existam com nomes vazios
            this.#nome = novoNome;
    }

    get endereco() {
        return this.#endereco;
    }

    set endereco(novoEnd){
        this.#endereco = novoEnd;
    }

    get bairro(){
        return this.#bairro;    
    }
    
    set bairro(novoBairro){
        this.#bairro = novoBairro;
    }

    get cidade(){
        return this.#cidade;
    }

    set cidade(novaCidade){
        this.#cidade = novaCidade;
    }

    get uf(){
        return this.#uf;
    }
    
    set uf(novaUf){
        this.#uf=novaUf;
    }

    get telefone(){
        return this.#telefone;
    }

    set telefone(novoTel){
        this.#telefone = novoTel;
    }

    get email(){
        return this.#email;
    }

    set email(novoEmail){
        this.#email = novoEmail;
    }
    
    //override ou sobrescrita do método toJSON
    toJSON(){
        return {
            "cpf"      : this.#cpf,
            "nome"     : this.#nome,
            "endereco" : this.#endereco,
            "bairro"   : this.#bairro,
            "cidade"   : this.#cidade,
            "uf"       : this.#uf,
            "telefone" : this.#telefone,
            "email"    : this.#email
        }
    }

    async gravar(){
        const clienteDAO = new ClienteDAO();
        await clienteDAO.incluir(this);
    }

    async atualizar() {
        const clienteBD = new ClienteDAO();
        await clienteBD.alterar(this);
    }

    async removerDoBancoDados() {
        const clienteBD = new ClienteDAO();
        await clienteBD.excluir(this);
    }

    async consultar(termo){
        const clienteBD = new ClienteDAO();
        const clientes = await clienteBD.consultar(termo);
        return clientes;
    }

    async consultarCPF(cpf){
        const clienteBD = new ClienteDAO();
        const clientes = await clienteBD.consultarCPF(cpf);
        return clientes;
    }
}