export default class ItemPedido {
    #produto;
    #quantidade;
    #precoUnitario;
    #subtotal; 
    
    constructor(produto, quantidade, precoUnitario,subtotal) {
        this.#produto = produto;
        this.#quantidade = quantidade;
        this.#precoUnitario = precoUnitario;
        this.#subtotal = quantidade * precoUnitario;
    }

    // Métodos de acesso (get) e modificação (set)
    get produto() {
        return this.#produto;
    }

    set produto(novoProduto) {
        this.#produto = novoProduto;
    }

    get quantidade() {
        return this.#quantidade;
    }

    set quantidade(novaQuantidade) {
        this.#quantidade = novaQuantidade;
    }
    
    get precoUnitario() {
        return this.#precoUnitario;
    }

    set precoUnitario(novoPrecoUnitario) {
        this.#precoUnitario = novoPrecoUnitario;
    }
    // Produto Nome
    
    get subtotal() {
        this.#subtotal = this.#quantidade * this.#precoUnitario;
        return this.#subtotal;
    }

    
    // JSON
    toJSON() {
        return {
            'produto': this.#produto,
            'quantidade': this.#quantidade,
            'precoUnitario': this.#precoUnitario,
            'subtotal': this.#subtotal
        };
    }
}

