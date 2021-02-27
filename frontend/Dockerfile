FROM node:13-alpine
WORKDIR /app
COPY . .
ENV PATH /app/node_modules/.bin:$PATH

RUN npm install --silent
RUN npm install react-scripts@4.0.3 -g --silent
EXPOSE 3000
# Inicializa a aplicação
CMD ["npm", "start"]