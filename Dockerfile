FROM node:20 as base

WORKDIR /opt/sigprev-backend
COPY package*.json ./

FROM base as prod
RUN npm ci --omit-dev
COPY . .
EXPOSE 4000
ENV DATABASE_URL="mysql://root:123@192.168.100.9:3306/sigprev"
ENV SECRET="123"
ENV BACKEND_URL="https://api.sigprev.app"
RUN apt update -y && apt -y install ca-certificates fonts-liberation libasound2 libatk-bridge2.0-0 \
    libatk1.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgbm1 \
    libgcc1 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libstdc++6 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    lsb-release \
    wget \
    xdg-utils

RUN npx prisma generate
RUN npx tsc
RUN npx babel build -d build

CMD ["node", "build/server.js"]
