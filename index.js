const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('? WhatsApp conectado e pronto!');

    // Função para enviar mensagem
    function enviarMensagem() {
        const agora = new Date();
        const horas = agora.getHours();
        const minutos = agora.getMinutes();

        if (horas === 8 && minutos === 0) {
            const mensagem = `?????? Bom dia, galera! Bora treinar! Foco, disciplina e evolução! ????`;

            const nomeDoGrupo = 'Bruno Personal';

            client.getChats().then(chats => {
                const grupo = chats.find(chat => chat.isGroup && chat.name === nomeDoGrupo);

                if (grupo) {
                    grupo.sendMessage(mensagem);
                    console.log(`? Mensagem enviada para o grupo "${nomeDoGrupo}"`);
                } else {
                    console.log(`? Grupo "${nomeDoGrupo}" não encontrado.`);
                }
            });
        }
    }

    // Verifica a cada 1 minuto
    setInterval(enviarMensagem, 60000);
});

client.initialize();
