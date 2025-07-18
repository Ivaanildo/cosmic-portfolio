# 🚀 Como Subir o Projeto para o GitHub

Como o Git não está instalado no sistema, aqui estão as instruções para fazer o upload manualmente:

## Opção 1: Usar o VS Code (Recomendado)

1. **Instalar Git**: Primeiro, você precisa instalar o Git:
   - Baixe em: https://git-scm.com/download/win
   - Execute o instalador com as configurações padrão

2. **Após instalar o Git, abra o terminal integrado do VS Code** (Ctrl + `):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: CosmicDev Portfolio"
   git remote add origin https://github.com/Ivaanildo/cosmic-portfolio.git
   git branch -M main
   git push -u origin main
   ```

## Opção 2: Upload via Interface Web do GitHub

1. **Acesse seu repositório**: https://github.com/Ivaanildo/cosmic-portfolio
2. **Clique em "uploading an existing file"**
3. **Arraste todos os arquivos do projeto** para a área de upload
4. **Estrutura de arquivos para upload**:
   ```
   ├── index.html
   ├── README.md
   ├── .gitignore
   ├── css/
   │   ├── main.css
   │   ├── animations.css
   │   └── responsive.css
   ├── js/
   │   ├── main.js
   │   ├── stars.js
   │   ├── mouseTrail.js
   │   └── animations.js
   └── assets/
       ├── icons/
       └── images/
   ```
5. **Adicione uma mensagem de commit**: "Initial commit: CosmicDev Portfolio"
6. **Clique em "Commit changes"**

## Opção 3: Usar GitHub Desktop

1. **Baixe o GitHub Desktop**: https://desktop.github.com/
2. **Instale e faça login** com sua conta GitHub
3. **Clique em "Add an Existing Repository from your Hard Drive"**
4. **Selecione a pasta**: `C:\Users\Public\new`
5. **Publique o repositório** para https://github.com/Ivaanildo/cosmic-portfolio

## ⚠️ Importante

- **Mantenha a estrutura de pastas** exatamente como está
- **Não esqueça de incluir o arquivo `.gitignore`** que foi criado
- **Todos os arquivos CSS e JavaScript** devem estar nas suas respectivas pastas

## 🔗 Links Úteis

- **Repositório**: https://github.com/Ivaanildo/cosmic-portfolio
- **Documentação Git**: https://git-scm.com/doc
- **GitHub Desktop**: https://desktop.github.com/

## 📦 Arquivos do Projeto

✅ **Arquivos principais**:
- `index.html` - Página principal
- `README.md` - Documentação
- `.gitignore` - Arquivos a serem ignorados pelo Git

✅ **Pasta CSS**:
- `main.css` - Estilos principais
- `animations.css` - Animações
- `responsive.css` - Responsividade

✅ **Pasta JS**:
- `main.js` - Lógica principal
- `stars.js` - Sistema de estrelas
- `mouseTrail.js` - Efeito de rastro
- `animations.js` - Animações JS

✅ **Pasta Assets**:
- `icons/` - Ícones (vazia por enquanto)
- `images/` - Imagens (vazia por enquanto)

Após fazer o upload, seu portfólio estará disponível em: https://github.com/Ivaanildo/cosmic-portfolio

## 🌐 GitHub Pages (Opcional)

Depois de fazer o upload, você pode ativar o GitHub Pages para hospedar seu site:

1. Vá para **Settings** no seu repositório
2. Role até **Pages**
3. Selecione **Deploy from a branch**
4. Escolha **main** como branch
5. Clique em **Save**

Seu site ficará disponível em: https://ivaanildo.github.io/cosmic-portfolio/
