# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el package.json y package-lock.json a /app
COPY package*.json ./

# Instala las dependencias
RUN npm install


# Copia el resto de la aplicación
COPY . .

# Expone el puerto 4000
EXPOSE 4000

# Comando para ejecutar la aplicación
CMD ["node", "app.js"]
