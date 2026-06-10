Deployment
Platform: Railway
Database: Neon PostgreSQL
Public URL: https://schedula-vaibhav-production.up.railway.app
Note on Branch Usage
Apologies — the deployment configuration changes were made directly on the main branch by mistake. I forgot to create a feature branch before starting the Day 5 task. Going forward, I will strictly follow the branch guidelines and always create a feature branch before making any changes.

Environment Variables
DATABASE_URL - Neon PostgreSQL connection string
JWT_SECRET - JWT secret key
NODE_ENV - production
APIs Available
POST /auth/signup
POST /auth/login
GET /doctor
POST /doctor/onboard
GET /doctor/:id
POST /patient/profile
GET /patient/profile
