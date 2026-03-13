# GitHub Secrets Setup

To enable Cloudflare Pages deployment, you need to configure the following secrets in your GitHub repository:

## Required Secrets

### 1. CF_API_TOKEN
Cloudflare API Token with Pages edit permission.

**How to create:**
1. Go to [Cloudflare Dashboard > Profile > API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Click "Create Custom Token"
3. Use these permissions:
   - **Account**: Cloudflare Pages: Edit
   - **Zone**: Not required
4. Name it `resume-craft-deploy`
5. Copy the generated token

### 2. CF_ACCOUNT_ID
Your Cloudflare Account ID.

**How to find:**
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Look at the URL: `https://dash.cloudflare.com/<ACCOUNT_ID>/...`
3. Copy the account ID

## Setup Steps

1. Go to your GitHub repository
2. Navigate to **Settings > Secrets and variables > Actions**
3. Click **New repository secret**
4. Add `CF_API_TOKEN` with your API token
5. Add `CF_ACCOUNT_ID` with your account ID

## Verify Deployment

After pushing to main/develop branch:
- Go to repository **Actions** tab
- Watch the workflow run
- Check Cloudflare Dashboard > Pages for deployment URL
