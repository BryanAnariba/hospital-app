# Coffee App Backend init project
- This project will be developed with MEAN Stack

## Steps: if you want to create this project from zero do it this
1. Initialize node project ```npm init -yes``` 
2. Install Development Dependencies ```npm install --save-dev typescript ts-node-dev rimraf```
3. Install Product Dependencies ```npm i --save express cors dotenv mongoose bcryptjs jsonwebtoken```
4. Install types (it depends that Product Dependencies) ```npm intall @types/express @types/cors @types/node @types/bcryptjs @types/jsonwebtoken --save-dev```
5. Create ts init file ```npx tsc --init --rootDir src/ --outDir dist/```
6. Copy and paste this in package.json ```"scripts": {"build": "rimraf ./dist && tsc","start:dev": "tsnd --respawn --clear src/app.ts","start": "npm run build && node dist/app.js"}```
7. Think and code!

- Run project run docker command ```docker compose up -d```, installing all dependencies with ```npm i```, create .env file with .env.template and run with ```npm run start:dev```