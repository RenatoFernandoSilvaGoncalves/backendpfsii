import { assinar, verificarAssinatura } from "./funcoesJWT.js";

export default function login(req, resp){

    const usuario = req.body.usuario;
    const senha   = req.body.senha;

    if (usuario === 'admin' && senha === 'admin'){ //lembre-se de verificar com uma consulta no banco de dados
        //usuário autenticado
        //Tendo em vista as características do protocolo HTTP em ser um protocolo stateless,
        //esse protocolo não é capaz de lembrar com quem ele se comunicou.
        //Para identificar com quem o servidor se comunicou, é necessário utilizar sessões.
        req.session.usuario = usuario;
        resp.status(200).json({
                status: true, 
                mensagem: "Logado com sucesso!",
                token: assinar(usuario)}
            );

    }
    else{
        resp.status(401).json(
            {
                status: false,
                mensagem: 'Usuário ou senha inválidos!'
            });
    }

}

export function logout(req, resp){
    req.session.destroy(); //excluir a variável usuario da sessão

}

//funcionar um middleware que é processado a cada requisição
//decidindo sempre se ela será atendida ou recusada
export function verificarAutenticacao(req, resp, next){
    const token = req.headers['authorization'];
    let tokenVerificado = undefined;
    if (token){
        tokenVerificado = verificarAssinatura(token);
        if (tokenVerificado != undefined && tokenVerificado.usuario == req.session.usuario){
            next();
        }
        else{
            resp.status(401).json(
                {
                    status: false,
                    mensagem: 'Acesso não autorizado! Faça o login na aplicação!'
                });
        }
    }
    else{
        resp.status(401).json(
            {
                status: false,
                mensagem: 'Acesso não autorizado! Faça o login na aplicação!'
            });
    }

}