# 1️⃣ clone the repo and run the app locally
- git clone -b taras-branch https://github.com/Ivan1337-prg/GreenGo-App.git
- cd GreenGo-App
# install root dev deps (concurrently)
- npm install -D concurrently
### Client (frontend)

- cd client
- npm install
- cd ..
### Server (backend)

- cd server
- npm install
- cd ..
# Run it
- npm run dev
**that will start:**

- React frontend → http://localhost:5173
- Express backend → http://localhost:5000/api/ping
