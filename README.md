# DevOps Blog Platform – Strapi on AWS with Terraform

## Overview
This project deploys a Strapi headless CMS on AWS using Terraform. It provisions the infrastructure (EC2, RDS PostgreSQL, S3), runs Strapi in production with PM2, and uses a GitHub webhook so each push to main can automatically deploy the backend to EC2.

## Architecture
- **Backend:** Strapi (Node.js) running on an Ubuntu EC2 instance.
- **Database:** Amazon RDS PostgreSQL used by Strapi.
- **Storage:** Amazon S3 bucket for media uploads.
- **IaC:** Terraform manages EC2, RDS, S3, security groups, outputs, and the GitHub repository webhook.
- **Deploy:** GitHub webhook → Node.js listener on EC2 (port 9090) → git pull + PM2 restart of Strapi.

## Requirements
- Node.js 20+ and npm.
- Terraform >= 1.5 installed.
- AWS account with CLI credentials configured.
- GitHub account with Personal Access Token (scopes: repo, admin:repo_hook).
- SSH key pair to access the EC2 instance.

## How to Deploy

### 1. Clone and configure Terraform
```bash
git clone https://github.com/UmaMahiii/devops-blog-platform.git
cd devops-blog-platform/infra
```

- Create `terraform.tfvars` with values for DB name/user, S3 bucket prefix, and `webhook_secret`.
- Export the GitHub token as an environment variable:

```bash
export TF_VAR_github_token="YOUR_GITHUB_PAT"
```

### 2. Provision AWS + webhook with Terraform
```bash
terraform init
terraform apply
```

Terraform creates EC2, RDS, S3, security groups, and a `github_repository_webhook` on your repo.

### 3. Configure Strapi on EC2
```bash
ssh -i "strapi-key.pem" ubuntu@<EC2_PUBLIC_IP>
git clone https://github.com/UmaMahiii/devops-blog-platform.git
cd devops-blog-platform/backend
npm install
```

- Create a `.env` file with DB (RDS) and S3 settings using the Terraform outputs.

```bash
NODE_ENV=production npm run build
NODE_ENV=production npm run start
```

- Run with PM2 so it stays alive:

```bash
pm2 start npm --name "strapi" -- start
pm2 startup
pm2 save
```

### 4. Auto-deploy from GitHub
- On each push to main, GitHub calls the webhook on EC2 (port 9090).
- The listener verifies the secret, pulls latest code, and restarts the strapi PM2 process.

## Cloud API Endpoint
For this deployment, the public API endpoint is:

```
http://3.238.99.152:8080/api/articles
```

(Replace with the current EC2 public IP and port if it changes.)


## License
This project is released under the [MIT License](https://opensource.org/licenses/MIT).

---

**Repository**: [https://github.com/UmaMahiii/devops-blog-platform](https://github.com/UmaMahiii/devops-blog-platform)
