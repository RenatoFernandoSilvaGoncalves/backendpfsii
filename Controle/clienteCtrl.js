import Cliente from '../Modelo/cliente.js';

//esta classe irá manipular/controlar a entidade Cliente
export default class ClienteCTRL{

    //método responsável por gravar os dados de um cliente
    //das requisições (POST) vindas da internet por meio do protocolo http
    //recupera os dados de um cliente (JSON) vindos da requisição
    //Vamos combinar que as respostas estão no formato JSON
    gravar(requisicao, resposta){
        resposta.type("application/json");
        
        if(requisicao.method === "POST" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const bairro = dados.bairro;
            const cidade = dados.cidade;
            const uf = dados.uf;
            const telefone = dados.telefone;
            const email = dados.email;
            if(cpf && nome && endereco && bairro && cidade && uf && telefone && email)
            {
                //gravar esse cliente
                const cliente = new Cliente(cpf, nome, endereco, bairro, cidade,
                                            uf,telefone,email);
                //método assíncrono gravar que instancia a camada de persistência e
                //grava um cliente no banco de dados
                cliente.gravar().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem:"Cliente gravado com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status:false,
                        mensagem: erro.message
                    })
                });                                   
            }
            else
            {
               resposta.status(400).json({
                    status:false,
                    mensagem:"Informe adequadamente todos os dados de um cliente conforme documentação da API!"
               });     
            }
        }
        else{
            //código 400 o erro é do usuário que fez a requisição
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido ou cliente no formato JSON não fornecido! Consulte a documentação da API"
            });
        }
    }

    //requisição HTTP do tipo PUT
    atualizar(requisicao, resposta){
        resposta.type("application/json");
        
        if(requisicao.method === "PUT" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const bairro = dados.bairro;
            const cidade = dados.cidade;
            const uf = dados.uf;
            const telefone = dados.telefone;
            const email = dados.email;
            if(cpf && nome && endereco && bairro && cidade && uf && telefone && email)
            {
                //gravar esse cliente
                const cliente = new Cliente(cpf, nome, endereco, bairro, cidade,
                                            uf,telefone,email);
                //método assíncrono gravar que instancia a camada de persistência e
                //grava um cliente no banco de dados
                cliente.atualizar().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem:"Cliente atualizado com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status:false,
                        mensagem: erro.message
                    })
                });                                   
            }
            else
            {
               resposta.status(400).json({
                    status:false,
                    mensagem:"Informe adequadamente todos os dados de um cliente conforme documentação da API!"
               });     
            }
        }
        else{
            //código 400 o erro é do usuário que fez a requisição
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido ou cliente no formato JSON não fornecido! Consulte a documentação da API"
            });
        }
    }

    excluir(requisicao, resposta){
        resposta.type("application/json");
        
        if(requisicao.method === "DELETE" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const cpf = dados.cpf;
            if(cpf)
            {
                //gravar esse cliente
                const cliente = new Cliente(cpf);
                //método assíncrono removerDoBanco que instancia a camada de persistência e
                //grava um cliente no banco de dados
                cliente.removerDoBancoDados().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem:"Cliente excluído com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status:false,
                        mensagem: erro.message
                    })
                });                                   
            }
            else
            {
               resposta.status(400).json({
                    status:false,
                    mensagem:"Informe cpf do cliente conforme documentação da API!"
               });     
            }
        }
        else{
            //código 400 o erro é do usuário que fez a requisição
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido ou cliente no formato JSON não fornecido! Consulte a documentação da API"
            });
        }
    }

    consultar(requisicao, resposta){
        resposta.type("application/json");
        
        if(requisicao.method === "GET"){
            const cliente = new Cliente();
            //método assíncrono que recupera os clientes do banco dados
            cliente.consultar('').then((clientes)=>{
                    resposta.status(200).json({
                        status:true,
                        listaClientes:clientes
                    });
            }).catch((erro) => {
                resposta.status(500).json({
                    status:false,
                    mensagem: erro.message
                })
            });                                   
        }
        else{
            //código 400 o erro é do usuário que fez a requisição
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido! Consulte a documentação da API"
            });
        }
    }

    //alguém poderá fazer a seguinte requisição:
    //GET http://localhost:3000/clientes/111.111.111-11
    consultarPeloCPF(requisicao, resposta){
        resposta.type("application/json");
        
        const cpf = requisicao.params['cpf'];
        
        if(requisicao.method === "GET"){
            const cliente = new Cliente();
            //método assíncrono que recupera os clientes do banco dados
            cliente.consultarCPF(cpf).then((cliente)=>{
                    resposta.status(200).json({
                        status:true,
                        listaClientes:cliente
                    });
            }).catch((erro) => {
                resposta.status(500).json({
                    status:false,
                    mensagem: erro.message
                })
            });                                   
        }
        else{
            //código 400 o erro é do usuário que fez a requisição
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido! Consulte a documentação da API"
            });
        }
    }
}