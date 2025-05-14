# Dockerfile
FROM node:18

# Define diretório de trabalho
WORKDIR /app

# Copia os arquivos do projeto
COPY package.json package-lock.json ./
RUN npm install

# Copia o restante do projeto
COPY . .

# Gera o Prisma Client
RUN npx prisma generate

# Compila o projeto Next.js (pode ser removido para modo dev)
RUN npm run build

# Expõe a porta padrão do Next.js
EXPOSE 3000

# Comando padrão (modo produção)
CMD ["npm", "start"]
