# Azure Static Web Apps Deployment Guide

This guide will walk you through deploying the UCRS website to Azure Static Web Apps.

## Prerequisites

- Azure account ([Create free account](https://azure.microsoft.com/free/))
- Azure CLI installed ([Install guide](https://docs.microsoft.com/cli/azure/install-azure-cli))
- GitHub account with repository access
- Git installed locally

## Deployment Options

### Option 1: Azure Portal (Recommended for First-Time Setup)

This is the easiest method with a visual interface.

#### Step 1: Create Azure Static Web App

1. **Sign in to Azure Portal**
   - Go to [https://portal.azure.com](https://portal.azure.com)
   - Sign in with your Azure account

2. **Create New Resource**
   - Click "Create a resource" in the left sidebar
   - Search for "Static Web Apps"
   - Click "Create"

3. **Configure Basics**
   ```
   Subscription: [Your Azure subscription]
   Resource Group: Create new → "rg-ucrs-prod"
   Name: "swa-ucrs-website"
   Plan type: Free (or Standard for production)
   Region: East US 2 (or closest to your users)
   ```

4. **Configure Deployment**
   ```
   Source: GitHub
   Organization: [Your GitHub username/org]
   Repository: [Your UCRS repository]
   Branch: main
   ```

5. **Configure Build**
   ```
   Build Presets: Next.js
   App location: /
   Api location: (leave empty)
   Output location: .next
   ```

6. **Review + Create**
   - Review all settings
   - Click "Create"
   - Wait 2-3 minutes for deployment

7. **GitHub Authorization**
   - Azure will request access to your GitHub repository
   - Click "Authorize Azure Static Web Apps"
   - This creates a GitHub Actions workflow automatically

#### Step 2: Configure Environment Variables

1. **Navigate to Your Static Web App**
   - Go to Azure Portal → Resource Groups → rg-ucrs-prod
   - Click on "swa-ucrs-website"

2. **Add Environment Variables**
   - Click "Configuration" in the left sidebar
   - Click "Application settings"
   - Add the following variables:

   ```
   NEXT_PUBLIC_SITE_URL = https://ucrs.com
   NEXT_PUBLIC_SITE_NAME = UCRS - Railway Parts & Locomotive Services
   ```

3. **Add Gmail API Credentials (for quote requests)**
   ```
   GMAIL_CLIENT_ID = [your_gmail_client_id]
   GMAIL_CLIENT_SECRET = [your_gmail_client_secret]
   GMAIL_REDIRECT_URI = [your_redirect_uri]
   GMAIL_REFRESH_TOKEN = [your_refresh_token]
   GMAIL_USER_EMAIL = [your_gmail_address]
   ```

4. **Save Configuration**
   - Click "Save" at the top
   - Wait for the configuration to update

#### Step 3: Configure Custom Domain

1. **Add Custom Domain**
   - In your Static Web App, click "Custom domains"
   - Click "Add" → "Custom domain on other DNS"
   - Enter your domain: `ucrs.com`

2. **Configure DNS Records**
   - Go to your domain registrar (GoDaddy, Namecheap, etc.)
   - Add the following DNS records:

   **For apex domain (ucrs.com):**
   ```
   Type: TXT
   Name: @
   Value: [validation code from Azure]
   TTL: 3600

   Type: ALIAS or A
   Name: @
   Value: [provided by Azure]
   TTL: 3600
   ```

   **For www subdomain (www.ucrs.com):**
   ```
   Type: CNAME
   Name: www
   Value: [your-swa-name].azurestaticapps.net
   TTL: 3600
   ```

3. **Validate Domain**
   - Return to Azure Portal
   - Click "Validate" to verify DNS records
   - Wait 5-10 minutes for DNS propagation
   - Azure will automatically provision SSL certificate

#### Step 4: Update GitHub Secrets

Your GitHub repository should already have the Azure deployment token added automatically. Verify and add additional secrets:

1. Go to your GitHub repository
2. Click "Settings" → "Secrets and variables" → "Actions"
3. Add the following secrets:

   ```
   AZURE_STATIC_WEB_APPS_API_TOKEN (should already exist)
   NEXT_PUBLIC_SITE_URL = https://ucrs.com
   NEXT_PUBLIC_SITE_NAME = UCRS - Railway Parts & Locomotive Services
   ```

#### Step 5: Deploy

Your site should deploy automatically when you push to the `main` branch. To trigger an initial deployment:

```bash
git add .
git commit -m "Configure Azure Static Web Apps deployment"
git push origin main
```

Monitor deployment:
- Go to GitHub → Your repository → Actions
- Watch the "Azure Static Web Apps CI/CD" workflow
- Deployment typically takes 3-5 minutes

---

### Option 2: Azure CLI (Advanced/Automated Setup)

For automated deployments or infrastructure-as-code approach.

#### Step 1: Login to Azure

```bash
# Login to Azure
az login

# Set your subscription (if you have multiple)
az account set --subscription "Your Subscription Name"
```

#### Step 2: Create Resource Group

```bash
az group create \
  --name rg-ucrs-prod \
  --location eastus2
```

#### Step 3: Create Static Web App

```bash
# Install Static Web Apps extension
az extension add --name staticwebapp

# Create Static Web App with GitHub integration
az staticwebapp create \
  --name swa-ucrs-website \
  --resource-group rg-ucrs-prod \
  --source https://github.com/YOUR_USERNAME/YOUR_REPO \
  --branch main \
  --app-location "/" \
  --output-location ".next" \
  --login-with-github
```

#### Step 4: Get Deployment Token

```bash
# Get the deployment token for GitHub Actions
az staticwebapp secrets list \
  --name swa-ucrs-website \
  --resource-group rg-ucrs-prod \
  --query "properties.apiKey" -o tsv
```

Copy this token and add it to GitHub:
- GitHub repo → Settings → Secrets → Actions
- Create secret: `AZURE_STATIC_WEB_APPS_API_TOKEN`
- Paste the token value

#### Step 5: Configure Environment Variables

```bash
# Add environment variables
az staticwebapp appsettings set \
  --name swa-ucrs-website \
  --resource-group rg-ucrs-prod \
  --setting-names \
    NEXT_PUBLIC_SITE_URL="https://ucrs.com" \
    NEXT_PUBLIC_SITE_NAME="UCRS - Railway Parts & Locomotive Services" \
    GMAIL_CLIENT_ID="your_value" \
    GMAIL_CLIENT_SECRET="your_value" \
    GMAIL_REDIRECT_URI="your_value" \
    GMAIL_REFRESH_TOKEN="your_value" \
    GMAIL_USER_EMAIL="your_value"
```

#### Step 6: Configure Custom Domain

```bash
# Add custom domain
az staticwebapp hostname set \
  --name swa-ucrs-website \
  --resource-group rg-ucrs-prod \
  --hostname ucrs.com
```

Then configure DNS records as described in Option 1.

---

## Monitoring and Management

### View Deployment Status

**Azure Portal:**
1. Go to your Static Web App resource
2. Click "Deployment history" to see all deployments
3. Click on a deployment to view logs

**GitHub Actions:**
1. Go to your repository → Actions tab
2. Click on the latest workflow run
3. View build and deployment logs

### View Application Logs

```bash
# View logs via Azure CLI
az staticwebapp logs show \
  --name swa-ucrs-website \
  --resource-group rg-ucrs-prod
```

### Update Environment Variables

**Azure Portal:**
1. Navigate to your Static Web App
2. Configuration → Application settings
3. Edit or add variables
4. Save changes

**Azure CLI:**
```bash
az staticwebapp appsettings set \
  --name swa-ucrs-website \
  --resource-group rg-ucrs-prod \
  --setting-names KEY="VALUE"
```

---

## Preview Environments (Staging)

Azure Static Web Apps automatically creates preview environments for pull requests.

### How It Works

1. Create a pull request to `main` branch
2. GitHub Actions automatically deploys a preview environment
3. Preview URL is posted as a comment on the PR
4. Preview URL format: `https://[random]-[pr-number].eastus2.azurestaticapps.net`
5. When PR is merged or closed, preview environment is deleted

### Testing Preview Environments

```bash
# Create a feature branch
git checkout -b feature/new-section

# Make changes
git add .
git commit -m "Add new section"
git push origin feature/new-section

# Create PR on GitHub
# Wait for preview deployment
# Test at the preview URL
```

---

## CI/CD Pipeline Details

The GitHub Actions workflow (`.github/workflows/azure-static-web-apps.yml`) handles:

1. **Build Process:**
   - Checkout code
   - Setup Node.js 20
   - Install pnpm
   - Cache dependencies
   - Install dependencies with `pnpm install`
   - Build with `pnpm run build:azure`

2. **Deployment:**
   - Deploy build artifacts to Azure
   - Configure routing and headers
   - Enable CDN caching

3. **PR Previews:**
   - Create preview environment for each PR
   - Post preview URL as comment
   - Clean up when PR closes

### Workflow Triggers

- **Push to `main`:** Production deployment
- **Pull Request:** Preview environment
- **PR Close:** Cleanup preview environment

---

## Troubleshooting

### Build Fails with Memory Error

**Solution:** The workflow already includes `NODE_OPTIONS: '--max-old-space-size=4096'`. If still failing, upgrade to Standard tier in Azure.

### Environment Variables Not Working

**Check:**
1. Variables are added in Azure Portal → Configuration
2. Variables are prefixed with `NEXT_PUBLIC_` for client-side access
3. Redeploy after adding variables: push a new commit

### Custom Domain Not Working

**Check:**
1. DNS records are correctly configured
2. Wait 10-15 minutes for DNS propagation
3. Verify with: `dig ucrs.com` or `nslookup ucrs.com`
4. Check Azure Portal → Custom domains for validation status

### API Routes Return 404

**Check:**
1. `staticwebapp.config.json` is in the root directory
2. API routes are in `app/api/` directory
3. Platform runtime is set to `node:20` in config
4. Redeploy the application

### Images Not Loading

**Check:**
1. Images are in the `public/` directory
2. Image paths start with `/` (e.g., `/images/hero.png`)
3. AVIF/WebP formats are supported (they are)
4. Check browser console for specific errors

---

## Cost Estimation

### Free Tier
- **Cost:** $0/month
- **Includes:**
  - 100 GB bandwidth/month
  - Unlimited SSL certificates
  - 2 custom domains
  - Staging environments
  - GitHub Actions integration

### Standard Tier
- **Cost:** ~$9/month
- **Includes:**
  - 100 GB bandwidth included (then $0.20/GB)
  - Unlimited custom domains
  - Private endpoints
  - Enhanced authentication
  - SLA: 99.95% uptime

**Recommendation:** Start with Free tier, upgrade to Standard when:
- You exceed 100 GB bandwidth/month
- You need more than 2 custom domains
- You need enterprise features (private endpoints, SSO)

---

## Security Best Practices

1. **Never commit secrets to Git**
   - Use Azure environment variables
   - Use GitHub Secrets for CI/CD
   - `.env` files are gitignored

2. **Enable HTTPS Only**
   - Azure enforces HTTPS automatically
   - HTTP requests are redirected to HTTPS

3. **Secure Headers**
   - Security headers are configured in `staticwebapp.config.json`
   - CSP, HSTS, X-Frame-Options, etc.

4. **API Authentication**
   - Implement authentication for sensitive API routes
   - Use Azure AD or custom JWT tokens if needed

5. **Regular Updates**
   - Keep dependencies updated: `pnpm update`
   - Monitor security advisories: `pnpm audit`

---

## Useful Commands

```bash
# View Static Web App details
az staticwebapp show \
  --name swa-ucrs-website \
  --resource-group rg-ucrs-prod

# List all Static Web Apps
az staticwebapp list --resource-group rg-ucrs-prod

# Delete Static Web App
az staticwebapp delete \
  --name swa-ucrs-website \
  --resource-group rg-ucrs-prod

# View environment variables
az staticwebapp appsettings list \
  --name swa-ucrs-website \
  --resource-group rg-ucrs-prod

# Get deployment token
az staticwebapp secrets list \
  --name swa-ucrs-website \
  --resource-group rg-ucrs-prod
```

---

## Support and Resources

- **Azure Static Web Apps Docs:** https://docs.microsoft.com/azure/static-web-apps/
- **Next.js on Azure:** https://docs.microsoft.com/azure/static-web-apps/deploy-nextjs
- **Azure CLI Reference:** https://docs.microsoft.com/cli/azure/staticwebapp
- **GitHub Actions for Azure:** https://github.com/Azure/static-web-apps-deploy

---

## Next Steps

After successful deployment:

1. ✅ Configure custom domain (ucrs.com)
2. ✅ Set up Azure Application Insights for monitoring
3. ✅ Configure Azure CDN for additional caching
4. ✅ Set up automated backups
5. ✅ Configure email alerts for deployment failures
6. ✅ Enable Web Application Firewall (WAF) for security
7. ✅ Set up staging environment for testing

---

**Need Help?** Contact Azure Support or refer to the [troubleshooting section](#troubleshooting) above.
