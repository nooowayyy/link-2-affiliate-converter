const express = require('express');
const router = express.Router();
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

let client;
let qrCodeBase64 = "";
let clientStatus = "DESCONECTADO";

router.get('/status', (req, res) => {
    res.json({ status: clientStatus, qrCode: qrCodeBase64 });
});

router.post('/connect', (req, res) => {
    if (client) {
        return res.json({ message: "Instância já está rodando ou inicializando." });
    }

    clientStatus = "INICIALIZANDO";
    client = new Client({
        authStrategy: new LocalAuth({ dataPath: './sessions' }),
        puppeteer: { args: ['--no-sandbox'] }
    });

    client.on('qr', (qr) => {
        qrCodeBase64 = qr; // Armazena a string bruta do QR para o front ler
        clientStatus = "AGUARDANDO_QR";
        qrcode.generate(qr, { small: true });
    });

    client.on('ready', () => {
        clientStatus = "CONECTADO";
        qrCodeBase64 = "";
        console.log('WhatsApp pronto e conectado!');
    });

    client.on('disconnected', () => {
        clientStatus = "DESCONECTADO";
        client = null;
    });

    client.initialize();
    res.json({ message: "Inicializando o robô do WhatsApp..." });
});

module.exports = { router, getClient: () => client };