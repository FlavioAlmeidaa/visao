# Usar imagem oficial do Node como base
FROM node:18-alpine

# Definir diretório de trabalho no container
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar todo o código do projeto
COPY . .

# Construir a aplicação para produção
RUN npm run build

# Instalar serve para servir a aplicação
RUN npm install -g serve

# Expor a porta que a aplicação vai rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["serve", "-s", "dist", "-l", "3000"]