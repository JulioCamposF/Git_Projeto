const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

const port = 3000;
const user = "****";
const pass = "******";

// Função para gerar senha aleatória
function gerarSenhaAleatoria(tamanho = 8) {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$!';
    let senha = '';
    for (let i = 0; i < tamanho; i++) {
        senha += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return senha;
}

app.get('/', (req, res) => res.send('Hello World!!'));

app.get('/send', (req, res) => {
    const novaSenha = gerarSenhaAleatoria(); // Gerar senha aleatória
    const mensagemTexto = `Olá! Sua senha foi redefinida com sucesso. \n\nNova senha: ${novaSenha} \n\nPor favor, altere-a assim que possível.`;
    console.log("Email enviado com nova senha !")
    const transporter = nodemailer.createTransport({
        host: '******',
        port: 587,
        secure: false, // true para 465, false para 587
        auth: { user, pass },
    });

    transporter.sendMail({
        from: user,
        to:'******',
        subject: "Redefinição de Senha",
        text: mensagemTexto, // Usar a mensagem com a senha gerada
    })
    .then(info => {
        res.send({ status: 'success', info, novaSenha }); // Retorna a senha gerada junto com a resposta
    })
    .catch(error => {
        res.status(500).send({ status: 'error', error: error.message });
    });
});

app.listen(port, () => console.log(`Running Server on port ${port}`));
