const express = require('express');
const path = require('path');
const { router: whatsappRouter } = require('./routes/whatsapp');
const affiliateRouter = require('./routes/affiliate');

const app = express();
app.use(express.json());

// Servir arquivos estáticos do Painel Front-end
app.use(express.static(path.join(__dirname, '../public')));

// Rotas da API
app.use('/api/whatsapp', whatsappRouter);
app.use('/api/affiliate', affiliateRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 SERVIDOR DO ROBÔ DE AFILIADOS INICIADO COM SUCESSO`);
    console.log(`👉 Acesse a interface visual em: http://localhost:${PORT}`);
    console.log(`====================================================`);
});