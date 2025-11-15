# 🚨 Security Incident Report & Remediation

**Date**: 2025-11-12
**Severity**: HIGH
**Status**: Partially Remediated - Action Required

## Incident Summary

Google Cloud service account credentials were exposed in a public GitHub repository.

- **Exposed File**: `lib/ucrs-476807-ff5f9d3cf07b.json`
- **Commit**: `4045042` (feat: enhance quote system with improved UX and email functionality)
- **Repository**: https://github.com/ucrs-website/ucrs-web-frontend
- **Exposed Credentials**:
  - Service Account: `ucrs-newsletter-service@ucrs-476807.iam.gserviceaccount.com`
  - Project ID: `ucrs-476807`
  - Private Key ID: `ff5f9d3cf07bd30e61b8808bd857a2538e9626db`

## Actions Completed ✅

1. ✅ **Added `.json` files to `.gitignore`** (with exceptions for config files)
2. ✅ **Deleted exposed JSON file from local repository**
3. ✅ **Identified the root cause** of quote submission error

## URGENT Actions Required 🚨

### 1. Revoke Compromised Credentials (HIGHEST PRIORITY)

**Do this IMMEDIATELY:**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **IAM & Admin** → **Service Accounts**
3. Find service account: `ucrs-newsletter-service@ucrs-476807.iam.gserviceaccount.com`
4. Click on the service account
5. Go to **Keys** tab
6. Delete the key with ID: `ff5f9d3cf07bd30e61b8808bd857a2538e9626db`
7. Click **Add Key** → **Create New Key** → Select **JSON**
8. Download the new key file
9. Update `.env.local` with new credentials:
   ```env
   GOOGLE_SHEETS_PRIVATE_KEY="<paste new private key here>"
   GOOGLE_SHEETS_CLIENT_EMAIL="<paste new client email here>"
   ```

### 2. Remove Sensitive Data from Git History

The exposed file still exists in your Git history. You need to remove it:

#### Option A: Using git-filter-repo (Recommended)

```bash
# Install git-filter-repo
pip install git-filter-repo

# Remove the file from all history
git filter-repo --path lib/ucrs-476807-ff5f9d3cf07b.json --invert-paths

# Force push to remote (WARNING: This rewrites history)
git push origin --force --all
```

#### Option B: Using BFG Repo-Cleaner

```bash
# Download BFG: https://rtyley.github.io/bfg-repo-cleaner/
java -jar bfg.jar --delete-files ucrs-476807-ff5f9d3cf07b.json

# Clean up
git reflog expire --expire=now --all && git gc --prune=now --aggressive

# Force push
git push origin --force --all
```

⚠️ **WARNING**: Both methods rewrite Git history. Coordinate with your team before doing this.

### 3. Grant Service Account Access to Quote Sheet

The quote submission error is caused by the service account lacking access:

1. Open: https://docs.google.com/spreadsheets/d/1gD2dZwYjARjxksbCDirKeghM_j07iRlxJeE8HlDZPS4
2. Click **Share** button
3. Add email: `ucrs-newsletter-service@ucrs-476807.iam.gserviceaccount.com`
4. Set permission: **Editor**
5. Uncheck "Notify people"
6. Click **Share**

### 4. Audit Google Cloud Project

Check for any unauthorized access:

1. Go to [Google Cloud Console Activity](https://console.cloud.google.com/home/activity)
2. Review activity logs for project `ucrs-476807`
3. Look for suspicious API calls or unauthorized access
4. Check **IAM & Admin** → **IAM** for unexpected permissions

### 5. Commit Security Improvements

```bash
git add .gitignore
git commit -m "security: prevent JSON credential files from being committed

- Add *.json to .gitignore with exceptions for config files
- Prevent future credential exposure
- Part of security incident remediation"

git push origin main
```

## Root Cause: Quote Submission Error

**Error**: `Invalid JWT Signature` when submitting quote requests

**Cause**: The service account (`ucrs-newsletter-service@ucrs-476807.iam.gserviceaccount.com`) has access to the **newsletter sheet** but NOT the **quote requests sheet**.

**Solution**: Grant the service account Editor access to the Quote Requests sheet (see Action #3 above).

## Prevention Measures

### Implemented ✅
- Added `.json` files (except config files) to `.gitignore`

### Recommended 🔧
1. **Use Secret Management**:
   - Consider using Vercel Environment Variables
   - Or use Google Secret Manager
   - Never commit `.env.local` files

2. **Pre-commit Hooks**:
   ```bash
   npm install --save-dev husky
   npx husky init
   echo "npx secretlint **/*" > .husky/pre-commit
   ```

3. **GitHub Secret Scanning**:
   - Enable GitHub Advanced Security (if available)
   - Set up secret scanning alerts

4. **Regular Credential Rotation**:
   - Rotate service account keys every 90 days
   - Document the rotation process

## Timeline

- **2025-11-12 (Exposure)**: Commit `4045042` pushed with exposed credentials
- **2025-11-12 (Discovery)**: Credentials discovered exposed in public repo
- **2025-11-12 (Initial Response)**:
  - Added `.json` to `.gitignore`
  - Deleted local file
  - Created incident report

## Next Steps

- [ ] Revoke old service account key
- [ ] Generate new service account key
- [ ] Update `.env.local` with new credentials
- [ ] Remove file from Git history
- [ ] Grant sheet access to service account
- [ ] Audit Google Cloud activity logs
- [ ] Test quote submission after fixes
- [ ] Implement pre-commit hooks
- [ ] Set up secret scanning

---

**DELETE THIS FILE** after completing all remediation steps.
