# Utiliza una imagen base adecuada para Node.js
FROM node:14

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de tu API a la imagen
COPY . .

# Instala las dependencias
RUN npm install
RUN npm install rimraf -g
RUN npm install bcryptjs
RUN npm install -g typescript
RUN npm i -g reflect-metadata
RUN npm i -g portfinder
RUN npm install mime


# Compila el proyecto TypeScript
RUN npm run build

# Expone el puerto en el que se ejecutará la API
EXPOSE 3001

# Comando para ejecutar la API compilada
CMD ["node", "dist/app.js"]
