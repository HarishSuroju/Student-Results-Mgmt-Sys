# AWS Deployment Guide

## Target Architecture

- Frontend: React build served through Nginx on EC2
- Backend: Node.js Express API on EC2
- Database: Amazon RDS MySQL
- Edge: Application Load Balancer
- Scaling: Auto Scaling Group

## 1. Provision RDS

1. Create a MySQL RDS instance.
2. Note the endpoint, port, database name, username, and password.
3. Allow inbound access from the EC2 security group on port `3306`.
4. Run [database/schema.sql](/d:/Projects/SRMS/database/schema.sql) against the RDS database.

## 2. Configure Environment Variables

### Backend `.env`

```env
PORT=5000
CLIENT_URL=https://your-frontend-domain
JWT_SECRET=replace-with-a-strong-secret
JWT_EXPIRES_IN=1d
DB_HOST=your-rds-endpoint.amazonaws.com
DB_PORT=3306
DB_NAME=srms
DB_USER=admin
DB_PASSWORD=your-password
DB_SSL=false
```

### Frontend `.env`

```env
VITE_API_BASE_URL=https://your-domain/api
```

## 3. EC2 Deployment

1. Launch an EC2 instance or Auto Scaling launch template using Amazon Linux or Ubuntu.
2. Install Docker and Docker Compose.
3. Copy the repository to the server.
4. Create `backend/.env` and `frontend/.env`.
5. Run:

```bash
docker compose up --build -d
```

## 4. Application Load Balancer

1. Create an ALB with listeners on `80` and `443`.
2. Point the target group to the EC2 instances.
3. Terminate SSL at the ALB.
4. Forward traffic to the Nginx container or host port `8080`.

## 5. Auto Scaling Group

1. Create a launch template with Docker installed and your deployment bootstrap steps.
2. Put EC2 instances in private subnets if possible.
3. Use the ALB target group for health checks.

## 6. Security Recommendations

- Store JWT secrets and DB credentials in AWS Systems Manager Parameter Store or AWS Secrets Manager.
- Restrict RDS to the application security group only.
- Enable HTTPS on the ALB.
- Rotate credentials and backups regularly.
- Set up CloudWatch logs for backend and Nginx containers.

## 7. Seed Sample Data

After containers are running and the backend can reach RDS:

```bash
docker exec -it <backend-container-id> npm run seed
```
