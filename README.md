# DevOps Blog Platform – Strapi on AWS with Terraform

## Overview
This project deploys a Strapi headless CMS on AWS using Terraform. It provisions the infrastructure (EC2, RDS PostgreSQL, S3), runs Strapi in production with PM2, and uses a GitHub webhook so each push to main can automatically deploy the backend to EC2.

## Architecture
- **Backend:** Strapi (Node.js) running on an Ubuntu EC2 instance.
- **Database:** Amazon RDS PostgreSQL used by Strapi.
- **Storage:** Amazon S3 bucket for media uploads.
- **IaC:** Terraform manages EC2, RDS, S3, security groups, outputs, and the GitHub repository webhook.
- **Deploy:** GitHub webhook → Node.js listener on EC2 (port 9090) → git pull + PM2 restart of Strapi.
## Architecture

[View Architecture Diagram](https://viewer.diagrams.net/index.html?tags=%7B%7D&lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&dark=auto#R%3Cmxfile%3E%3Cdiagram%20name%3D%22Page-1%22%20id%3D%22Z-lnIkduX91-ZtW7lErZ%22%3E7Vtbc6JKEP41qTrnYbe4GfVRxRi2AsZbsvqGMMFRZCyEKPz60z0DXtBcNtFUcja7m4VpemZ6pr%2BeMeRCbczXrdBeTEzmEv9Ckdz1hapfKIpyKV%2FCBSmJoFQqZUHwQuoKkrQl9GhKBFHOqTF1yTKjCVLEmB%2FRxT7RYUFAnGiPZochW%2B2zPTDf3CMsbI%2FsiYGEnmP75IDtnrrRJFtFaYf7mlBvks8sS9mTse3MvJDFQTbfhaLqpWZF18TjuZ2PlfEvJ7bLVjsktXmhNkLGInE3XzeIj3u7v21XTzzdyB2SIHpNB70ddcrJqrYMbu8H3fRH3SuFPy6rh8NkIy%2BjJN%2BjiKzhWX0SzX0gyHC7jEI2Iw3msxAoAQuAs2571Bug6cBQBOj1RxJGFLa6lj2YU9fFMeurCY1Ib2E7OMEKgAU0vpUEhZWg9cCCKAOLrOXtTCIUwLfHxK9vVFCQ5IH6fk4CvajVpnQF%2B1IXK3u0%2FThbmRE8hDYsJnaiOCTw7DZkj3RJWUADD5r%2F9EkY2g8snEODBfBf7b73bzYMrI6sd%2FYs2%2FcWYXMShQmwTHaQo2Y4WG1RVspRlo9SztqZLV1mTTvDuLcZeatnuMlU%2FQdqLx9Bz6HaAbELvKVzbkMbdd7g3t%2ByJY1gn%2BD5mEURm7%2BolCIaIoZqt5cLYdYPdI3ar%2FPZajlVyilw79qRfaHWRFO5Wj6ChuprwKTSuL22lFFSV%2B37rmTrErWmHWq0Jr597zI3b1%2BPFqPfbmOselVjWvPMRk2x%2BI%2FhkZa8HAdm1ZhPJPe6dnmTVFVXdWI3NeOx%2Biu4SY2VqdceHXUUGFOt4szvpm7jhflao8W4taoa1JQ7afeq2x%2FQmxT6tq4ku1Gf3fZ%2BWSbK0b8zzXTgmdO7e0uHe6Sld%2FdAtw1an9v36yXwqnbLl0Y94%2FF2ul4Nf3eZ0epUjZmUthu1tTVYyWZSS6y7oQT3SEvhfm3dsa0cgcvs313foBXYt9tGNXXnDtwds4sd2IN%2FV2VUwz%2FRji3Yi4WfvM0QKoeGUNm3gx9yZd8QNO1slqB8W8IHWoLV6k5nJegvLEH01W57xtrEufsSNcFKjGt3MbruMqBLKJPduluMlIkE7RTbo7m%2FHMPYrjJZuK3BwVhWLxtrWtsdKy2MpW2ty5h2Z8NSu19bZdZx%2Fcsfqh2P6LlEM9gpcw09Nis10%2F2VtnckM6RRq92frWBVYK8rvlu3HoIJ%2Fx3aG0QVIDQbSL5oKheA%2F6oK970IgiNFItgpRCdTeZPJbZKWHZvb0LJh1ELwKclnszn12%2BY%2BMvokVnrX7E6FnYwA7%2Fbvejrq1acc3akBvFYJbCBBG3QClM8AO6gnaEPtV9ibSY%2Fam2Tu21vylO0%2BIxO3%2F9fKdKOCHlLtWRvr6r3dmAZAiryQ9Do3bwtmr7GsH%2FK%2BZcnVs1mW9m1ZHxnNrqx0kFiDzmFe18ccrg55nQF5Xd20%2Bp1N29LhKp6%2FJr%2BDyAi5HOR0Jq1hbidboo1XyWxyugxX5JOya%2FrWvE%2FYSA9DTz12ZiTatZX2eIrKw6jEQtDV%2BSymVKiDzmcwpdcYzLY0lZ8oXndK493KVfnjyvVAIz0SwgYDrcGCB%2BrFoc2tEzOCS3u%2B4F02KjICsF0bV62Thc9w63tOSBfRqRJ1uZCpa8q%2BpjaaO72mLr9d27tc21Dxk6Gy9iGwYtBOMWgP1dkmsOaBfJPCpp2krd%2B1rMahS7J66HJMvEKQXyXc5fS4KwLXZEqWaEtt8RyvwO9hHxl520CDcjWFZ7wP0BOzx9trSzzHK%2FbZL2GpKZlTT%2B5OO68I%2BDp5JD5boPW8xU9pR%2BCv7cO%2FrBYcVeVs8C9%2Fw%2F9M8DeTDP6puVvBpU3N7DtrKzl84wKQXZszgGxDkwy9mcDP2tCN9c0Uony%2FCZHd0vFq6UZs4dsZqmmGPljx59NOzM0h0ZJOaihATwV9GHPIU02FsRSkWX0jNu%2BGUruhpcAL42P2MIstWsO5Yc6OfDN1oG8tBvORrJ6mdtJm6WaKc5sxmBjIj%2BN1Es7Xd2IrAZOknI%2F3tfRmzlcCPpjD5HzcdHt83pUYrxmDuYOZarDeDsg8hHmhL2QlsBYF%2BFIh3xD7JrBmScg3Az4H%2B6J8OJ4q5jU5H65NyId8npiXcj4plw9kxvUi3wr2ZsVlBD1bTTOjm2uUkcuDY3IZhTw4dxv5KK4P50aagXInIM9a8A0EDVYCa5GBlvA5pgPUCa5ZFX1RT7CvAzOfI%2BH7kIp5Tb5myPE4vQt3XNc5HXTq8XlAf%2BDiNEXMfaVbek3otJfrKpNH6CqTx9L5njVyuVEHTb4%2BrgOOMZRxAnxiXiFjhhEhI8cIyojyWfpA4KEhdC30j7wO5xV6MFWUG%2BYGuof7Ae6d77nGMQr6NuUh4nYNvFqOWxgX16ht8J3OdnDf2diD1edrksQeIa%2FH7QfoXJ88y01wr9DOTLS15J6%2Bpf5r0eg6HmMJSBbsTSGhfBgRyoU3%2BFIhdVXOl7pWzpq6viFVvSfjCWMzvsPjmPruE1lql7jF7HRbZCxYiCVGFf6%2Brb44oiS5cM6yqSfyV13lsykpO18jbn4K%2BczJC4tDhzw32KF6cdy8uICNmzCPBbbf3FILx2pbnhuGwZyrfUqiKMn0bscRO3bUl5%2BNYkVDAreGJ6%2FQdHx7uaSOIF5RP%2B%2F0wvEc4CwnueTBjv1og6fIDj0SPbcLygHwjoMiJD7USo%2F7%2B35yDVfkbw2fWsPqqTXMu8KK7GSHYcFoEC13Rr5Fws4L8UJtq1UKB%2Bwv8Oeuf4suIcEWa5ulvAN%2B6t8JP9deTjZh7Ut5mzdhsfie5SUsHvAXPw4p8F%2BWn%2BU%2FE3ZLfyd2zwlX7VPA9b2u8%2FJDXGf5lPArfcPv03jLojfL8%2F%2Fzwimrx7IPFe1xjgPpEFXP4rEAIf7ubl%2Ftr%2F%2FQLiRLmmaiIMaynYPBS%2FWLkl6o%2BZBjfAAMKM0e%2BJ8%2FrwgbPj5AdWPF3cAtDJaRzTfTYi7htE3tt8TjJuknCR4F75EaEjbHDnfrxc0HEisKNvBnX0gcBWF%2BZiv9lPezuRcwegSEe%2F03rjkfgT088AUX6o9TIPEvLTr3ckJs3NoR2AcaBB5oqmf2faVP4fuKn86p1RcyxfL7%2BGX1A3xr9aRF9uWXQfQ54Vo%2BNVzf9RqlqrwzelaP%2B6kPjJ7yqaNn7ecFHvvP5zQqRMFFvJzsBEHAGv7CAcXPAsahHTiTTxIDf5TUvQEqHxUCqyd9LXI8MfvbHEblczkM7b0OQ%2F3fOYw6OoztKUwUUs%2FDrx92Tle445DIIwmET%2BE5NXFCEr3%2BtOW8PkNV9vNmufxhTuOk76Mq307j07wQkKXiC6YsW38qyz3ooH3EG6nqSd9IKV8GgLyoP2Ti5K965PS%2B4HbSCv7rAOFLvRl%2FQsPQ3P5Sr%2FAM29%2BcVpv%2FAQ%3D%3D%3C%2Fdiagram%3E%3C%2Fmxfile%3E#%7B%22pageId%22%3A%22Z-lnIkduX91-ZtW7lErZ%22%7D)

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
