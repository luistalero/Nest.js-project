# Usa una imagen base de Node.js para la fase de build
FROM node:20-alpine AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia package.json y package-lock.json para instalar las dependencias
COPY package*.json ./

RUN npm install

# Copia todo el código fuente de tu aplicación al contenedor
COPY . .

# Compila la aplicación NestJS
# Esto es crucial para que `ts-node` no tenga que compilar en tiempo de ejecución cada vez
RUN npm run build

# --- Opcional: Fase de Producción (para una imagen más pequeña, no estrictamente necesaria para desarrollo con docker-compose up) ---
# FROM node:20-alpine AS production

# WORKDIR /app

# COPY --from=build /app/package*.json ./
# COPY --from=build /app/node_modules ./node_modules
# COPY --from=build /app/dist ./dist

# EXPOSE 3000

# CMD [ "node", "dist/main" ]