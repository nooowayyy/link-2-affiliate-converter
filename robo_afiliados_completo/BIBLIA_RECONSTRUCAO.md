# 📑 BIBLIA DA RECONSTRUÇÃO: Engenharia Reversa e Escabilidade de Micro-SaaS para Afiliados

Este documento serve como o manual definitivo de arquitetura, segurança, engenharia reversa e expansão do ecossistema de automação de ofertas para WhatsApp e Telegram. Ele detalha os conceitos de infraestrutura, os padrões de código, as mitigações contra banimento e os passos cirúrgicos para reescrever o sistema do zero em qualquer linguagem.

---

## 🧭 Sumário Executivo
1. 🏗️ Arquitetura de Alto Nível (Arquitetura Limpa e Desacoplada)
2. 🔏 Engenharia Reversa de Links: O Motor do Parser
3. 🤖 Módulo WhatsApp: Ciclo de Vida e Sessões Resilientes
4. 🕸️ Módulo Crawler/Scraper: Captura Automática via Telegram e Web
5. 🛡️ Protocolo Anti-Banimento e Comportamento Humano Simulado
6. 📈 Banco de Dados, Filas de Mensagens e Persistência
7. 🚀 Deploy de Produção: Docker, VPS e CI/CD

---

## 1. 🏗️ Arquitetura de Alto Nível
Para reconstruir este sistema de forma profissional, eliminando gargalos de memória e travamentos do servidor, a aplicação deve seguir o padrão de **Camadas Desacopladas (Clean Architecture)**:

```
[ Camada de Interface (Front-End) ]
               │  (HTTP / WebSockets)
               ▼
[ Controladores da API / Rotas Express ]
               │
               ▼
[ Camada de Serviços / Casos de Uso ] ───► [ Banco de Dados / NoSQL ]
        │                  │
        ▼                  ▼
[ Motor do WhatsApp ]   [ Scrapers / Parsers ]
```

*   **Camada de Concorrência:** O envio de mensagens e a renderização do Puppeteer/Chromium consomem muita CPU. O Back-End deve isolar os disparos em uma fila de mensageria (como *BullMQ* ou *RabbitMQ*) para que uma falha de conexão no WhatsApp não derrube o servidor de API.

---

## 2. 🔏 Engenharia Reversa de Links: O Motor do Parser
O maior segredo das ferramentas comerciais (como o DivulgaLinks) é desestruturar links já encurtados de terceiros e remontar com a sua tag.

### A Lógica de Resolução de Redirecionamentos
Muitos afiliados postam links que passam por 3 ou 4 encurtadores antes de chegar à loja oficial. O robô faz requisições do tipo `HEAD` para seguir o rastro das URLs sem precisar baixar o HTML inteiro da página:

```javascript
async function resolverUrlFinal(urlEncurtada) {
    let urlAtual = urlEncurtada;
    let redirectCount = 0;
    
    while (redirectCount < 5) {
        const response = await axios.head(urlAtual, { maxRedirects: 0, validateStatus: (status) => status >= 300 && status < 400 });
        if (response.headers.location) {
            urlAtual = response.headers.location;
            redirectCount++;
        } else {
            break;
        }
    }
    return urlAtual;
}
```

### Padrões de Reconstrução por Marketplace
*   **Shopee:** Extrai o `itemid` e o `shopid` da URL final e remonta usando o formato de afiliados da API da Shopee: `https://shopee.com.br/product/${shopid}/${itemid}?sub_id=${SEU_ID}`.
*   **Amazon:** Localiza o parâmetro `tag=...` por meio de Expressões Regulares (Regex) e substitui textualmente pelo seu código de Associado (ex: `&tag=seu_id-20`).

---

## 3. 🤖 Módulo WhatsApp: Ciclo de Vida e Sessões Resilientes
A conexão com o WhatsApp não usa a API oficial (Cloud API), pois ela cobra por mensagem enviada e proíbe links de afiliados. Usamos bibliotecas baseadas no protocolo do WhatsApp Web (como *Baileys* ou *whatsapp-web.js*).

*   **Persistência de Sessão:** Após a leitura do QR Code, os tokens de autenticação (chaves criptográficas e cookies de sessão) são gravados em disco. Para reconstrução em ambiente Docker, esta pasta de sessões deve ser mapeada como um volume permanente, evitando que o usuário precise ler o QR Code a cada reinicialização do contêiner.

---

## 4. 🕸️ Módulo Crawler/Scraper: Captura Automática
Para operar no modo "Piloto Automático", o sistema implementa um cliente do Telegram (usando a biblioteca *GramJS* ou *Telethon*) rodando em segundo plano.

1.  O robô entra como membro em canais de ofertas concorrentes.
2.  Um escutador de eventos captura cada nova mensagem recebida (`NewMessage`).
3.  O robô limpa o texto, baixa a imagem anexada do servidor do Telegram, passa os links encontrados pelo módulo *Parser* e reenvia para o formulário de disparo do WhatsApp.

---

## 5. 🛡️ Protocolo Anti-Banimento (Anti-Ban)
O WhatsApp monitora o disparo de mensagens para bloquear robôs de spam. Para blindar a conta do usuário, a bíblia de reconstrução dita a implementação obrigatória de 3 regras:

*   **Delay Randômico:** Nunca envie mensagens em intervalos fixos (ex: exatamente a cada 5 minutos). Implemente uma variação de tempo aleatória (ex: `Tempo_Espera = 5 minutos + Randômico(30 a 90 segundos)`).
*   **Simulação de Digitação:** Ative o estado de `"digitando..."` ou `"gravando áudio..."` no chat por 3 a 5 segundos antes de disparar o bloco de texto e a imagem do produto.
*   **Aquecimento de Chip (Warm-up):** Recomende no painel que contas novas conversem com contatos conhecidos antes de disparar links para centenas de chats simultâneos.

---

## 6. 🚀 Deploy de Produção: Docker e VPS
Para comercializar este sistema no modelo SaaS (onde vários clientes pagam mensalidade), a aplicação deve ser empacotada em contêineres Docker isolados. Cada cliente ganha uma instância independente do Chromium rodando em sandbox, garantindo que os dados de conexão de um usuário jamais vazem para outro.
