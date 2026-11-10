# 🚀 Robô de Ofertas e Achadinhos Automatizado para WhatsApp

Este projeto é um sistema Micro-SaaS completo (Front-end e Back-end integrados) desenvolvido em **Node.js** para automatizar a divulgação de links de afiliados dos principais marketplaces (Shopee, Amazon, Mercado Livre e Magazine Luiza) diretamente em Grupos ou Canais do WhatsApp.

A interface visual moderna em Dark Mode permite que você gerencie a conexão com o WhatsApp via QR Code e faça postagens formatadas profissionalmente com apenas alguns cliques.

---

## 📋 Sumário
1. [Pré-requisitos](#-pré-requisitos)
2. [Instalação](#-instalação)
3. [Como Inicializar e Usar](#-como-inicializar-e-usar)
4. [Onde Encontrar seus IDs de Afiliado](#-onde-encontrar-seus-ids-de-afiliado)
5. [Como Descobrir o ID do seu Grupo (chatId)](#-como-descobrir-o-id-do-seu-grupo-chatid)
6. [Resolução de Problemas (Erros Comuns)](#-resolução-de-problemas-erros-comuns)

---

## 🛠️ Pré-requisitos

Antes de começar, você precisa ter instalado no seu computador:
* **Node.js** (Versão 18 ou superior recomendada). Baixe diretamente do site oficial: [nodejs.org](https://nodejs.org/)

---

## 📥 Instalação

1. Extraia o arquivo compactado do projeto (`robo_afiliados_completo.zip`) em uma pasta de sua escolha.
2. Abra o terminal do seu sistema operacional (**Prompt de Comando/CMD** no Windows ou **Terminal** no Mac/Linux).
3. Navegue até a pasta onde os arquivos foram extraídos utilizando o comando `cd`:
   ```bash
   cd "C:\Caminho\Ate\A\Pasta\robo_afiliados_completo"
   ```
4. Instale todas as dependências necessárias executando o comando abaixo:
   ```bash
   npm install
   ```
   *Nota: Este processo pode demorar entre 1 e 3 minutos, pois as bibliotecas do WhatsApp realizam o download de uma instância segura do navegador Chromium em segundo plano.*

---

## 🚀 Como Inicializar e Usar

1. No terminal, dentro da pasta do projeto, ligue o servidor digitando:
   ```bash
   npm start
   ```
2. Mantenha essa janela do terminal aberta. Abra o seu navegador de internet e acesse a interface gráfica pelo endereço:
   👉 **http://localhost:3000**

### 📲 Conectando o WhatsApp Web
1. Na tela inicial do painel, localize a seção **Status do WhatsApp**.
2. Clique no botão de inicialização. Um **QR Code** será gerado e exibido diretamente na página.
3. Abra o WhatsApp no seu celular, vá em **Aparelhos Conectados** ➔ **Conectar um aparelho** e escaneie o código na tela do computador.
4. O status mudará para **"Conectado"**. Uma pasta de sessão será criada localmente, garantindo que o robô reconecte automaticamente nas próximas vezes que for ligado.

### 📝 Enviando uma Oferta com Link Convertido
No formulário de envio da página, preencha os campos estruturados:
* **ID do Chat (chatId):** O identificador numérico do seu grupo ou canal.
* **Título do Produto:** O nome que aparecerá no topo do post.
* **Link Original:** Cole o link comum obtido do produto (mesmo que seja de outro afiliado).
* **Preço, Parcelamento e Cupom:** Detalhes comerciais da oferta.
* **URL da Imagem:** Link direto da foto do produto para ser enviada junto à mensagem.
* **ID de Afiliado:** A sua tag de identificação da comissão correspondente ao marketplace selecionado.

Clique em **Publicar** e veja o robô converter o link e disparar no WhatsApp com emojis e formatação profissional de alta conversão!

---

## 🔑 Onde Encontrar seus IDs de Afiliado

Para garantir que a comissão das vendas caia corretamente na sua conta bancária, use o identificador exato de cada plataforma:

* **Shopee:** Acesse [affiliate.shopee.com.br](https://affiliate.shopee.com.br). O seu ID é o **ID de Membro** (Member ID) numérico localizado no seu painel de perfil.
* **Amazon:** Acesse o painel de Associados Amazon. O seu ID é a sua **Tag de Associado / Store ID** (ex: `seunome-20`).
* **Mercado Livre:** Acesse o painel de Afiliados do Mercado Livre. O seu ID é a tag alfa-numérica de acompanhamento de campanhas.
* **Magazine Luiza:** É o **nome da sua loja** no Magazine Você (ex: se a URL da sua loja é `magazinevoce.com.br/magazineoas`, o ID é apenas `magazineoas`).

---

## 💬 Como Descobrir o ID do seu Grupo (chatId)

Os grupos no WhatsApp são identificados por códigos internos da rede e não por seus nomes comerciais. 
* Assim que você escaneia o QR Code, configuramos o servidor para imprimir no terminal os IDs de todos os grupos em que o seu número está ativo.
* Procure pelo nome do seu grupo no terminal e copie o código correspondente terminado em `@g.us` (Exemplo: `120363194829301923@g.us`). Use este código inteiro no campo `chatId` do formulário.

---

## ❌ Resolução de Problemas (Erros Comuns)

### Erro: `MODULE_NOT_FOUND`
* **Por que acontece:** O Node.js não encontrou as dependências instaladas.
* **Como corrigir:** Certifique-se de que fechou o terminal antigo, abriu um novo exatamente dentro da pasta do projeto e executou `npm install` com sucesso antes de rodar o `npm start`.

### Erro de Timeout no QR Code
* **Por que acontece:** O QR Code expira se não for escaneado em até 1 minuto.
* **Como corrigir:** Atualize a página do painel no seu navegador ou clique em recarregar para que um novo token atualizado seja requisitado ao WhatsApp.

---

*Aviso: Evite programar disparos em massa em intervalos menores que 15 minutos em contas novas para proteger o seu número de telefone contra as diretrizes de spam do WhatsApp.*
