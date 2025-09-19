# Site-RSC&ENG
# Site Institucional RSC & Engenharia

Este é o repositório do site institucional da **RSC & Engenharia**, uma empresa focada em soluções inovadoras e precisão técnica em projetos de engenharia e construção. Desenvolvido com uma abordagem moderna e responsiva, o site visa apresentar a empresa, seus serviços, portfólio de projetos e permitir a interação com clientes através de formulários de contato e depoimentos.

---

## 🌟 Funcionalidades Destacadas

* **Página Inicial (Home):** Design moderno e responsivo, destacando a proposta de valor, estatísticas de sucesso e uma chamada à ação para explorar projetos.
* **O Escritório (Sobre):** Informações detalhadas sobre a empresa, sua história, missão, visão e valores.
* **Serviços:** Apresentação clara e organizada dos diversos serviços oferecidos pela RSC & Engenharia.
* **Projetos (Portfólio):** Uma galeria visualmente atraente dos projetos realizados, com a possibilidade de filtragem por categoria para facilitar a navegação e destaque de trabalhos concluídos.
* **Contato:** Formulário de contato intuitivo para que clientes em potencial possam entrar em contato facilmente.
* **Depoimentos de Clientes:** Seção dedicada a avaliações e feedback de clientes satisfeitos, transmitindo credibilidade e exibindo a nota em estrelas.
* **Painel Administrativo:**
    * **Autenticação Segura:** Sistema de login/logout para gerenciar o conteúdo do site.
    * **Moderação de Depoimentos:** Funcionalidade para visualizar, aprovar, rejeitar e **remover** depoimentos de clientes.
    * **Gerenciamento de Projetos:** Adicione, edite e remova projetos do portfólio de forma dinâmica.
    * **Edição de Serviços (Futuro):** Base para implementação futura de gerenciamento de serviços.
* **Responsividade Completa:** Design adaptável para garantir uma experiência de usuário impecável em desktops, tablets e smartphones, incluindo um **menu hambúrguer** funcional para navegação mobile. O layout se ajusta elegantemente em todas as seções, desde o cabeçalho até o conteúdo principal e as grades de serviços/projetos.
* **Favicon e Título da Página Personalizados:** Ícone da aba do navegador (favicon) e título da página configurados para refletir a marca RSC & Engenharia.
* **SEO Otimizado:** Estrutura baseada em React para melhor indexação por mecanismos de busca.

---

## 🛠️ Tecnologias Utilizadas

* **Frontend:**
    * **React:** Biblioteca JavaScript para construção de interfaces de usuário reativas e componentizadas.
    * **Vite:** Ferramenta de build rápida para desenvolvimento frontend moderno.
    * **React Router DOM:** Para navegação e gerenciamento de rotas na aplicação single-page.
    * **React Slick:** Carrossel responsivo para a seção de depoimentos.
    * **React Icons:** Biblioteca de ícones populares (Font Awesome, etc.) para elementos visuais.
    * **CSS Puro:** Estilização personalizada para controle total do design e responsividade.
* **Backend & Banco de Dados:**
    * **Supabase:** Plataforma open-source que oferece funcionalidades de banco de dados (PostgreSQL), autenticação, armazenamento e APIs em tempo real, servindo como backend-as-a-service.
* **Deployment:**
    * **Vercel:** Plataforma para deploy e hosting contínuo de aplicações web frontend.
* **Versionamento:**
    * **Git & GitHub:** Controle de versão e hospedagem do código-fonte.
* **Design Gráfico (Logo/Ícones):**
    * **Canva:** Ferramenta utilizada para criação e edição da logo e outros elementos visuais.

---

## 🚀 Como Rodar o Projeto Localmente

Siga estas instruções para configurar e rodar o projeto em seu ambiente de desenvolvimento.

### Pré-requisitos

* Node.js (versão 14 ou superior) e npm (ou yarn) instalados.
* Conta no Supabase com um projeto configurado (tabelas `testimonials`, `projects`, `users`).
* Variáveis de ambiente do Supabase (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) configuradas.

### 1. Clonar o Repositório

# bash
git clone [https://github.com/DevLuizFelip/Site-RSC.git]

### 2. Instalar as Dependências

npm install
# ou
yarn install

### 3. Configurar Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto e adicione suas credenciais do Supabase:

VITE_SUPABASE_URL="SUA_URL_SUPABASE"
VITE_SUPABASE_ANON_KEY="SUA_CHAVE_ANON_SUPABASE"

### 4. Rodar o Servidor de Desenvolvimento

npm run dev
# ou
yarn dev

O site estará acessível em http://localhost:5173 (ou outra porta disponível).

###
☁️ Deploy na Vercel
O projeto está configurado para deploy contínuo na Vercel.

Configurações na Vercel:
Framework Preset: Vite

Root Directory: . (se o package.json estiver na raiz do repositório) ou o nome da sua pasta principal (ex: my-react-app) se o projeto estiver em uma subpasta.

Build Command: npm run build

Output Directory: dist

Environment Variables: Adicione VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY com seus respectivos valores.

Redirecionamento SPA: Crie um arquivo vercel.json na raiz do projeto com o seguinte conteúdo para garantir que as rotas do React Router funcionem corretamente:

JSON

{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
Domínio Personalizado: Para apontar um domínio personalizado (ex: seusite.com.br), adicione-o na aba "Domains" do seu projeto na Vercel e configure os Nameservers fornecidos pela Vercel no painel do seu registrador de domínio (ex: Registro.br, GoDaddy).

🤝 Contribuições
Contribuições são bem-vindas! Para contribuir:

Faça um fork do repositório.

Crie uma nova branch (git checkout -b feature/sua-feature).

Faça suas alterações e commit (git commit -m 'feat: adiciona nova funcionalidade').

Envie para a branch original (git push origin feature/sua-feature).

Abra um Pull Request.

📝 Licença
Este projeto está sob a licença MIT.

📞 Contato
Luiz Felipe - https://github.com/DevLuizFelip - https://linkedin.com/in/luizcostasantana
