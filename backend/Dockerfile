[10:26 a.m., 27/9/2026] 🥰: # 1. Descargar Node.js en una versión ligera para la nube
FROM node:20-alpine

# 2. Crear una carpeta interna en Docker para nuestra app
WORKDIR /app

# 3. Copiar el archivo que dice qué herramientas instalamos
COPY package*.json ./

# 4. Instalar las herramientas dentro de Docker
RUN npm install

# 5. Copiar todo nuestro código del backend adentro de Docker
COPY . .

# 6. Decirle a Docker que use el puerto 3001
EXPOSE 3001

# 7. El comando final para encender la API en la nube
CMD ["node", "server.js"]
[10:29 a.m., 27/9/2026] 🥰: # 1. Descargar Node.js en una versión ligera para la nube
FROM node:20-alpine

# 2. Crear una carpeta interna en Docker para nuestra app
WORKDIR /app

# 3. Copiar el archivo que dice qué herramientas instalamos
COPY package*.json ./

# 4. Instalar las herramientas dentro de Docker
RUN npm install

# 5. Copiar todo nuestro código del backend adentro de Docker
COPY . .

# 6. Decirle a Docker que use el puerto 3001
EXPOSE 3001

# 7. El comando final para encender la API en la nube
CMD ["node", "server.js"]