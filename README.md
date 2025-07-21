# 🚀 Real-Time Order & Delivery System

---

### 1. 📌 Project Overview

Design and build a **Real-Time Quick Commerce Application** where:

- Customers can **place orders** and **track live status**.
- Delivery partners can **accept and update orders** in real-time.
- Admins can **monitor the system**.
- The system should be **Dockerized** and **self-hosted on a cloud VM (AWS EC2)**.

---

### 2. 🧩 System Architecture Diagram

> _Add a simple block diagram here showing Customer ↔ Backend ↔ Partner/Admin via WebSocket/API_

---

### 3. 🛠️ Stack Used

- **Frontend**: React.js, Tailwind CSS, TypeScript, Shadcn UI  
- **Backend**: Node.js, Express.js, TypeScript, Redis  
- **Real-time Communication**: Socket.io + Redis Adapter 
- **Database**: MongoDB Atlas  
- **Authentication**: JWT (JSON Web Tokens)  
- **DevOps**: Docker, Docker Compose, Nginx  
- **Cloud Hosting**: AWS EC2 (Virtual Machine)  
- **Reverse Proxy**: Nginx  
- **State Management**: React Context API  
- **Other Tools**: REST APIs, WebSockets, dotenv, cors, morgan

---

### 4. 🗂️ Folder Structure
    /frontend
        /public
        /src
            /@types ( added all data types such as intefaces,types and enum)
            /assessts  (images etc.)
            /components (ui components frequently use)
            /context  (State Management related context,provider and custom hooks)
            /features 
            /lib
            /services (all sockets and api related logics )
            App.tsx  
            AppRoute.tsx (initialise all routes)
            main.tsx
        index.html
        nginx.conf  (nginx conf for frontend Deployment)
        Dockerfile
        package.json
        tsconfig.json
        vite.config.json
    /backend
        /public
        /src
            /@types  ( added all data types such as intefaces,types and enum)
            /db (Database connection logics)
            /config (Environment accessing and others...)
            /controller 
            /middleware
            /models
            /routes (every features routes in single-single file)
            /services (all Application logics in it.)
            /sockets 
            /utils
            index.ts
            routes.ts (initialised all routes at single place)
            server.ts (initialise server,middleware,socket,and more.)
        Dockerfile
        package.json
        tsconfig.json
    docker-compose.yml



---

### 5. ⚙️ Setup Instructions

```bash
# 1. SSH into your server
ssh -i example.pem ubuntu@your-ec2-ip

# 2. Switch to root user
sudo -i

# 3. Install Docker and Docker Compose
sudo apt-get update
sudo apt-get install -y ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

echo \
"deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
$(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 4. Clone the repository
git clone https://github.com/jaihindkushwah/beeyond_test.git
cd beeyond_test-main

# 5. Configure environment variables
# Create .env files inside /backend and /frontend

# Example backend .env
# File: /backend/.env
API_PORT=8000
MONGO_URI=mongodb+srv://user:password@cluster0.qjf5hf3.mongodb.net/quick-com
JWT_SECRET_KEY=secret
REDIS_URL=redis://localhost:6379

# 6. Start the containers
docker-compose up -d

```

### 6. Hosting & Deployment
Dockerized backend and frontend served via Nginx reverse proxy, which is in the **frontend** folder

Containers are managed via docker-compose

App is hosted on AWS EC2 virtual machine


### 7. 📡 WebSocket Flow
Customers place orders (via REST API) → backend emits to delivery partners via WebSocket
Partner accepts order → backend updates DB and emits update to customer
Admin monitors all events in real-time

