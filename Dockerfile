# Sử dụng Node.js 18
FROM node:18

# install simple http server for serving static content
RUN npm install -g http-server

# Thiết lập thư mục làm việc
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./docker run -d --name frontend --network my-network -p 80:80 frontend/v0.0.1

# install project dependencies
RUN npm install

# Copy toàn bộ code (trừ node_modules nhờ .dockerignore)
COPY . .

# Build ứng dụng (chỉ nếu chạy chế độ production)
RUN npm run build

# Mở cổng 5173
EXPOSE 5173

# Chạy ứng dụng Vue.js (nếu chạy development)
CMD ["npm", "run", "dev"]
