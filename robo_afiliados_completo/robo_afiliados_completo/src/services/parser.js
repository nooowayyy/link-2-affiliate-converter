class LinkParser {
    static async parse(originalUrl, marketplace, affiliateId) {
        // Remove tracking antigo e limpa a URL básica
        let cleanUrl = originalUrl.split('?')[0];
        
        // Simulação de injeção de ID de afiliado baseada no Marketplace
        switch(marketplace.toLowerCase()) {
            case 'shopee':
                return `${cleanUrl}?utm_source=affiliate&utm_campaign=${affiliateId}`;
            case 'amazon':
                return `${cleanUrl}?tag=${affiliateId}`;
            case 'mercadolivre':
                return `${cleanUrl}?allocatorId=${affiliateId}`;
            case 'magalu':
                return `https://www.magazinevoce.com.br/${affiliateId}/p/${cleanUrl.split('/p/')[1] || ''}`;
            default:
                return originalUrl;
        }
    }
}

module.exports = LinkParser;