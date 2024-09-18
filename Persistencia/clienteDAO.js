import Cliente from '../Modelo/cliente.js';
import conectar from "./conexao.js";

export default class ClienteDAO{

    async incluir(cliente){

        if (cliente instanceof Cliente){
            const conexao = await conectar();
            const sql="INSERT INTO cliente(cpf,nome,endereco,bairro,cidade, \
                                           estado,telefone, email) \
                                           VALUES(?,?,?,?,?,?,?,?)";
            const valores = [cliente.cpf,cliente.nome,cliente.endereco, 
                             cliente.bairro, cliente.cidade, cliente.uf,
                             cliente.telefone, cliente.email];                                        
            await conexao.query(sql,valores);
            global.poolConexoes.releaseConnection(conexao);
        }

    }

    async alterar(cliente){
        
        if (cliente instanceof Cliente){
            const conexao = await conectar();
            const sql="UPDATE cliente SET nome=?, endereco = ?,bairro = ?, \
                                      cidade = ?, estado = ?,telefone = ?, email = ? \
                       WHERE cpf=?";
            const valores = [cliente.nome,cliente.endereco, 
                             cliente.bairro, cliente.cidade, cliente.uf,
                             cliente.telefone, cliente.email, cliente.cpf];                                        
            await conexao.query(sql,valores);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(cliente){

        if (cliente instanceof Cliente){
            const conexao = await conectar();
            const sql="DELETE FROM cliente WHERE cpf=?";
            const valores = [cliente.cpf];                                        
            await conexao.query(sql,valores);
            global.poolConexoes.releaseConnection(conexao);
        } 

    }

    async consultar(termo){
        const conexao = await conectar();
        const sql = "SELECT * FROM cliente WHERE nome LIKE ?";
        const valores = ['%' + termo + '%']
        const [rows] = await conexao.query(sql, valores);
        global.poolConexoes.releaseConnection(conexao);
        const listaClientes = [];
        for(const row of rows){
            const cliente = new Cliente(row['cpf'],row['nome'],
            row['endereco'],row['bairro'],row['cidade'],row['estado'], 
            row['telefone'], row['email']);
            listaClientes.push(cliente);
        }
        return listaClientes;
    }

    async consultarCPF(cpf){
        const conexao = await conectar();
        const sql = "SELECT * FROM cliente WHERE cpf = ?";
        const valores = [cpf]
        const [rows] = await conexao.query(sql, valores);
        global.poolConexoes.releaseConnection(conexao);
        const listaClientes = [];
        for(const row of rows){
            const cliente = new Cliente(row['cpf'],row['nome'],
            row['endereco'],row['bairro'],row['cidade'],row['estado'], 
            row['telefone'], row['email']);
            listaClientes.push(cliente);
        }
        return listaClientes;
    }
}