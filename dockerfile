# Usa una imagen de Node.js
FROM node:14

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Expón el puerto en el que tu aplicación se ejecuta
EXPOSE 4002

# Comando para ejecutar la aplicación
CMD ["node", "app.js"]
