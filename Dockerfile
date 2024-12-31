# Usar Ubuntu 22.04 como base
FROM ubuntu:22.04

# Atualizar o sistema e instalar dependências necessárias
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    && rm -rf /var/lib/apt/lists/*

# Adicionar o repositório oficial do Node.js e instalar a versão 16
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
