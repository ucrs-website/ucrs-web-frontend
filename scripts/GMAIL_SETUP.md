# Gmail API Setup Guide

## Problem
Emails appear in the sent folder but recipients don't receive them. This happens when the OAuth2 refresh token doesn't have the correct Gmail API scopes.

## Solution
You need to regenerate your refresh token with the proper `gmail.send` scope.

---

## Step-by-Step Instructions

### 1. Run the Authorization Helper Script

```bash
cd /Users/qulian/Desktop/Projects/ucrs/website
node scripts/gmail-auth-helper.js
```

### 2. Authorize the Application

The script will output a URL like this:
```
https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=...
```

**Copy this URL and open it in your browser.**

### 3. Sign In and Grant Permissions

- Sign in with the Gmail account: **ucrs.rfq@gmail.com**
- Google will show a permission request screen
- **IMPORTANT**: Make sure to grant these permissions:
  - ✅ Send email on your behalf
  - ✅ Compose and send emails
- Click "Allow" or "Continue"

### 4. Get the Authorization Code

After authorizing, Google will redirect you to:
```
http://localhost:3000/api/auth/gmail/callback?code=XXXXX&scope=...
```

**Copy the entire `code` parameter value** (the long string after `code=` and before `&scope`)

Example:
```
http://localhost:3000/api/auth/gmail/callback?code=4/0AanRRrtXXXXXXXXX&scope=...
                                                     ^^^^^^^^^^^^^^^^
                                                     Copy this part
```

### 5. Paste the Code

Go back to your terminal where the script is running and paste the authorization code when prompted.

### 6. Update .env.local

The script will output a new refresh token:
```
GMAIL_REFRESH_TOKEN=1//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

**Copy this value and replace the existing `GMAIL_REFRESH_TOKEN` in your `.env.local` file.**

### 7. Restart Your Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
pnpm dev
```

### 8. Test Email Sending

Submit a quote request and verify that:
- ✅ Email appears in the sent folder
- ✅ Recipients receive the email
- ✅ CC recipients receive the email
- ✅ No bounce-back error from Mail Delivery Subsystem

---

## Troubleshooting

### Error: "redirect_uri_mismatch"

This means the redirect URI in your Google Cloud Console doesn't match.

**Fix:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to "APIs & Services" > "Credentials"
4. Click on your OAuth 2.0 Client ID
5. Under "Authorized redirect URIs", make sure this is added:
   ```
   http://localhost:3000/api/auth/gmail/callback
   ```
6. Save changes and try again

### Error: "Invalid grant"

Your authorization code expired (they only last a few minutes).

**Fix:**
1. Run the script again: `node scripts/gmail-auth-helper.js`
2. Get a fresh authorization code
3. Paste it immediately

### Still Getting Bounce-Back Emails?

Check these:

1. **Wrong Scope**: Make sure you're authorizing with the new URL from the script (not an old one)

2. **Old Token Cached**:
   ```bash
   # Clear any cached tokens
   rm -rf .next
   pnpm dev
   ```

3. **Gmail API Not Enabled**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - APIs & Services > Library
   - Search for "Gmail API"
   - Make sure it's enabled

4. **Wrong Google Account**: Make sure you're authorizing with **ucrs.rfq@gmail.com** (not a different account)

---

## Required Scopes

The script requests these scopes:
- `https://www.googleapis.com/auth/gmail.send` - **Required** to actually send emails
- `https://www.googleapis.com/auth/gmail.compose` - Required to compose email messages

Your old token likely only had `gmail.readonly` or was missing `gmail.send`.

---

## Security Notes

- The refresh token grants access to send emails from ucrs.rfq@gmail.com
- Keep the `.env.local` file secure and never commit it to git
- The refresh token doesn't expire unless explicitly revoked
- You can revoke access anytime at: https://myaccount.google.com/permissions

---

## Need Help?

If you're still having issues after following these steps:

1. Check the server console logs for detailed error messages
2. Verify all environment variables are set correctly in `.env.local`
3. Make sure the Gmail API is enabled in your Google Cloud project
4. Try revoking the app and re-authorizing from scratch
