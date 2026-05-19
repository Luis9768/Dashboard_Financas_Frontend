# Usa a versão oficial do Node (leve)
FROM node:20-alpine

# Define a pasta de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos de dependência primeiro (otimiza o cache do Docker)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o resto do código
COPY . .

# Expõe a porta que o front-end vai rodar (5173 é o padrão do Vite/React)
EXPOSE 5173

# Comando para rodar o servidor de desenvolvimento
CMD ["npm", "run", "dev"]