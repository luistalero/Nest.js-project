# Usa una imagen base de Node.js
FROM node:20-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia package.json y package-lock.json para instalar las dependencias
COPY package*.json ./

# Instala las dependencias (producción para la imagen, desarrollo para el volumen)
RUN npm install

# Copia todo el código fuente de tu aplicación al contenedor
COPY . .

# Expone el puerto en el que tu aplicación NestJS va a escuchar (3000 por defecto)
EXPOSE 3000

# Comando para iniciar la aplicación en modo de desarrollo con "watch"
# Esto es importante para que los cambios de código se reflejen
CMD [ "npm", "run", "start:dev" ]