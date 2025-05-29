# CI/CD Deployment Guide

## GitHub Actions CI/CD Setup

This project includes automated CI/CD pipeline that builds and deploys Docker containers to Docker Hub.

### Prerequisites

1. **GitHub Repository**: Your code should be in a GitHub repository
2. **Docker Hub Account**: Active account at https://hub.docker.com/
3. **Docker Hub Access Token**: Generated from Docker Hub settings

### Setup Instructions

#### 1. Docker Hub Access Token
1. Log in to Docker Hub: https://hub.docker.com/
2. Go to Account Settings → Security
3. Click "New Access Token"
4. Name: `github-actions-diabetes-dashboard`
5. Permissions: Read, Write, Delete
6. Copy the generated token

#### 2. GitHub Repository Secrets
In your GitHub repository, go to Settings → Secrets and variables → Actions

Add these repository secrets:
- `DOCKERHUB_USERNAME`: Your Docker Hub username
- `DOCKERHUB_TOKEN`: The access token from step 1

#### 3. Repository Setup
Ensure your repository has a `main` branch (or update the workflow file to match your default branch).

### CI/CD Pipeline Features

The pipeline includes 4 jobs:

#### 🧪 **Test Job**
- Installs dependencies
- Runs TypeScript checks
- Builds the application
- Runs on every push and pull request

#### 🐳 **Build and Push Job**
- Creates multi-architecture Docker images (AMD64, ARM64)
- Pushes to Docker Hub with multiple tags:
  - `latest` (for main branch)
  - `sha-main-<commit>` (unique per commit)
  - Branch name tags
- Updates Docker Hub repository description
- Only runs on main branch pushes

#### 🔒 **Security Scan Job**
- Scans Docker images for vulnerabilities using Trivy
- Uploads results to GitHub Security tab
- Provides security insights for healthcare compliance

#### 📢 **Deployment Notification Job**
- Provides deployment summary
- Shows Docker Hub links and image details

### Docker Image Usage

After successful deployment, your image will be available at:
```
docker.io/<your-username>/diabetes-care-dashboard:latest
```

#### Running the Container
```bash
# Pull and run the latest image
docker pull <your-username>/diabetes-care-dashboard:latest
docker run -p 5000:5000 <your-username>/diabetes-care-dashboard:latest

# Access the dashboard
open http://localhost:5000
```

#### Using Docker Compose
```bash
# Clone the repository
git clone <your-repo-url>
cd diabetes-care-dashboard

# Start with Docker Compose
docker-compose up -d

# With PostgreSQL database
docker-compose --profile database up -d
```

### Environment Variables

The container supports these environment variables:

- `NODE_ENV`: Set to "production" for production deployment
- `DATABASE_URL`: PostgreSQL connection string (optional)
- `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`: Individual PostgreSQL settings

### Monitoring and Health Checks

The container includes:
- Health check endpoint: `/api/health`
- Built-in health monitoring
- Automatic restart policies
- Non-root user execution for security

### Deployment Verification

After deployment, verify your container:

1. **Check Docker Hub**: Visit https://hub.docker.com/r/<your-username>/diabetes-care-dashboard
2. **Test Health Endpoint**: `curl http://localhost:5000/api/health`
3. **Access Dashboard**: Open http://localhost:5000 in browser

### Troubleshooting

#### Build Failures
- Check GitHub Actions logs in your repository
- Verify all dependencies are properly defined
- Ensure TypeScript compilation succeeds

#### Docker Hub Push Issues
- Verify DOCKERHUB_USERNAME and DOCKERHUB_TOKEN secrets
- Check Docker Hub token permissions
- Ensure repository name matches expectations

#### Container Runtime Issues
- Check container logs: `docker logs <container-id>`
- Verify port bindings and environment variables
- Test health endpoint accessibility

### Production Deployment

For production environments:
1. Use specific image tags instead of `latest`
2. Set up proper environment variables
3. Configure external database if needed
4. Set up monitoring and logging
5. Implement backup strategies for healthcare data

### Security Considerations

- Container runs as non-root user
- Regular security scans included in pipeline
- HIPAA compliant data handling
- Access tokens stored securely in GitHub Secrets
- Multi-stage builds minimize attack surface

## Next Steps

1. Set up your Docker Hub credentials in GitHub Secrets
2. Push code to main branch to trigger first deployment
3. Monitor the Actions tab for pipeline execution
4. Access your deployed application via Docker Hub image

The CI/CD pipeline will automatically build and deploy your diabetes care dashboard whenever you push changes to the main branch.