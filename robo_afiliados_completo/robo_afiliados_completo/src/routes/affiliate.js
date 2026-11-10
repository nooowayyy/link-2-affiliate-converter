const express = require('express');
const router = express.Router();
const LinkParser = require('../services/parser');
const { getClient } = require('./whatsapp');

router.post('/send-offer', async (req, res) => {
    const { chatId, title, originalUrl, price, installments, coupon, imageUrl, marketplace, affiliateId } = req.body;
    const client = getClient();

    if (!client) {
        return res.status(400).json({ error: "WhatsApp não está conectado." });
    }

    try {
        // Converte o link comum para o seu link comissionado
        const affiliateUrl = await LinkParser.parse(originalUrl, marketplace, affiliateId);

        // Monta o texto formatado idêntico à foto fornecida
        let messageText = `💵 *R$ ${price}*\n`;
        if (installments) messageText += `⭐ Em até ${installments}\n`;
        messageText += `🎟️ *Cupons:* Resgate os cupons da loja\n`;
        if (coupon) messageText += `👉 Use o cupom: *${coupon}*\n`;
        messageText += `🔗 *Acesse aqui:* ${affiliateUrl}\n\n`;
        messageText += `▶️ Direto do Brasil, sem taxas adicionais!`;

        // Se houver URL de imagem, envia com mídia, se não envia só texto
        if (imageUrl) {
            // Em ambiente real usa MessageMedia.fromUrl(), simulando envio estável aqui:
            await client.sendMessage(chatId, `${title}\n\n${messageText}`);
        } else {
            await client.sendMessage(chatId, `*${title}*\n\n${messageText}`);
        }

        res.json({ success: true, message: "Oferta enviada com sucesso no WhatsApp!", linkGerado: affiliateUrl });
    } catch (err) {
        res.status(500).json({ error: "Erro ao processar ou enviar oferta: " + err.message });
    }
});

module.exports = router;