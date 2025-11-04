# Manual Gmail API Scope Fix - Google Cloud Console

## The Problem
Your OAuth2 consent screen doesn't have the correct Gmail scopes configured, which prevents emails from being delivered.

---

## Step-by-Step Manual Fix

### Step 1: Access Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Select your project (the one containing your Gmail API credentials)

### Step 2: Configure OAuth Consent Screen

1. In the left sidebar, click **"APIs & Services"** → **"OAuth consent screen"**
2. You should see your app configuration page
3. Scroll down to the **"Scopes"** section
4. Click **"ADD OR REMOVE SCOPES"**

### Step 3: Add Required Gmail Scopes

In the scopes dialog, you need to add these specific Gmail scopes:

**Required Scopes:**
1. `https://www.googleapis.com/auth/gmail.send`
   - Description: "Send email on your behalf"
   - This is the critical scope for sending emails

2. `https://www.googleapis.com/auth/gmail.compose`
   - Description: "Manage drafts and send emails"
   - This allows composing emails

**How to Add:**
- In the filter/search box, type: `gmail`
- Look for scopes containing `.../auth/gmail.send` and `.../auth/gmail.compose`
- Check the boxes next to these two scopes
- Click **"UPDATE"** at the bottom
- Click **"SAVE AND CONTINUE"**

### Step 4: Verify Gmail API is Enabled

1. In the left sidebar, click **"APIs & Services"** → **"Library"**
2. Search for: `Gmail API`
3. Click on "Gmail API"
4. Make sure it shows **"API Enabled"**
5. If not, click **"ENABLE"**

### Step 5: Check OAuth 2.0 Client Configuration

1. Go to **"APIs & Services"** → **"Credentials"**
2. Find your OAuth 2.0 Client ID in the list
3. Click on it to open the configuration
4. Verify **"Authorized redirect URIs"** includes:
   ```
   http://localhost:3000/api/auth/gmail/callback
   ```
5. If not, add it and click **"SAVE"**

### Step 6: Revoke Old Authorization

Since the old token doesn't have the correct scopes, you need to revoke it:

1. Go to [Google Account Permissions](https://myaccount.google.com/permissions)
2. Sign in with **ucrs.rfq@gmail.com**
3. Find your app in the list
4. Click on it
5. Click **"REMOVE ACCESS"**

### Step 7: Get New Authorization URL (Manual Method)

Since you have issues with the script, use this manual URL generator:

**Create the URL manually:**

```
https://accounts.google.com/o/oauth2/v2/auth?
access_type=offline&
prompt=consent&
response_type=code&
client_id=YOUR_CLIENT_ID&
redirect_uri=http://localhost:3000/api/auth/gmail/callback&
scope=https://www.googleapis.com/auth/gmail.send%20https://www.googleapis.com/auth/gmail.compose
```

**Replace `YOUR_CLIENT_ID` with your actual client ID:**
```
837791954251-e3da4obpsk34vthltl9p1v0a43eqqlfc.apps.googleusercontent.com
```

**Full URL (copy this):**
```
https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent&response_type=code&client_id=837791954251-e3da4obpsk34vthltl9p1v0a43eqqlfc.apps.googleusercontent.com&redirect_uri=http://localhost:3000/api/auth/gmail/callback&scope=https://www.googleapis.com/auth/gmail.send%20https://www.googleapis.com/auth/gmail.compose
```

### Step 8: Authorize the Application

1. **Copy the URL above** and paste it in your browser
2. **Sign in** with **ucrs.rfq@gmail.com**
3. Google will show a permission screen with:
   - ✅ Send email on your behalf
   - ✅ Manage drafts and send emails
4. Click **"Continue"** or **"Allow"**
5. You'll be redirected to:
   ```
   http://localhost:3000/api/auth/gmail/callback?code=XXXXXX&scope=...
   ```
6. **Copy the entire code parameter value** (everything between `code=` and `&scope`)

### Step 9: Exchange Code for Token (Using cURL)

Now you need to exchange the authorization code for a refresh token.

**Open Terminal and run this command** (replace `YOUR_CODE_HERE` with the code you copied):

```bash
curl -X POST https://oauth2.googleapis.com/token \
  -d "code=YOUR_CODE_HERE" \
  -d "client_id=837791954251-e3da4obpsk34vthltl9p1v0a43eqqlfc.apps.googleusercontent.com" \
  -d "client_secret=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" \
  -d "redirect_uri=http://localhost:3000/api/auth/gmail/callback" \
  -d "grant_type=authorization_code"
```

**Example:**
```bash
curl -X POST https://oauth2.googleapis.com/token \
  -d "code=4/0AanRRrtXXXXXXXXX" \
  -d "client_id=837791954251-e3da4obpsk34vthltl9p1v0a43eqqlfc.apps.googleusercontent.com" \
  -d "client_secret=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" \
  -d "redirect_uri=http://localhost:3000/api/auth/gmail/callback" \
  -d "grant_type=authorization_code"
```

### Step 10: Get Your New Refresh Token

The cURL command will return JSON like this:

```json
{
  "access_token": "ya29.XXXXX",
  "expires_in": 3599,
  "refresh_token": "1//XXXXXXXXXXXXXXXXXXXXXXXX",
  "scope": "https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/gmail.compose",
  "token_type": "Bearer"
}
```

**Copy the `refresh_token` value** (the long string starting with `1//`)

### Step 11: Update .env.local

1. Open your `.env.local` file
2. Replace the `GMAIL_REFRESH_TOKEN` value with the new refresh token
3. Save the file

```env
GMAIL_REFRESH_TOKEN=1//YOUR_NEW_REFRESH_TOKEN_HERE
```

### Step 12: Restart Your Server

```bash
# Stop your dev server (Ctrl+C)
# Clear Next.js cache
rm -rf .next

# Restart
pnpm dev
```

### Step 13: Test Email Sending

1. Go to your quote page
2. Submit a quote request
3. Check that:
   - ✅ Email appears in sent folder
   - ✅ Recipients receive the email
   - ✅ CC recipients receive the email
   - ✅ NO bounce-back error from Mail Delivery Subsystem

---

## Alternative: Using Service Account (Recommended for Production)

If you continue to have issues with OAuth2, consider using a Service Account instead:

### Benefits:
- No refresh token needed
- More stable for server-side operations
- No user consent required
- Better for production environments

### Setup:
1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"CREATE CREDENTIALS"** → **"Service Account"**
3. Give it a name: "UCRS Email Service"
4. Grant it necessary permissions
5. Create and download a JSON key
6. Enable domain-wide delegation if needed

**Note:** Service accounts require Google Workspace (not available for free Gmail accounts).

---

## Troubleshooting

### Error: "redirect_uri_mismatch"
- Make sure `http://localhost:3000/api/auth/gmail/callback` is added to Authorized redirect URIs in your OAuth client configuration

### Error: "access_denied"
- Make sure you added the correct scopes to the OAuth consent screen
- Try revoking access and authorizing again

### Error: "invalid_grant"
- Your authorization code expired (valid for only ~10 minutes)
- Generate a new authorization URL and try again immediately

### Still Getting Bounce-Backs?
- Verify the scopes in the token by decoding it
- Check Gmail API quotas (APIs & Services → Dashboard → Gmail API)
- Verify ucrs.rfq@gmail.com has 2FA disabled (if required)
- Check for any security restrictions on the Gmail account

---

## Verify Token Scopes (Advanced)

To verify your token has the correct scopes, you can decode it:

```bash
# Using the access_token from Step 10
curl https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=YOUR_ACCESS_TOKEN
```

Look for `scope` in the response. It should include:
- `https://www.googleapis.com/auth/gmail.send`
- `https://www.googleapis.com/auth/gmail.compose`

---

## Need Help?

If none of these steps work, the issue might be:
1. Gmail account security settings blocking API access
2. Incorrect OAuth consent screen configuration
3. Gmail API quota limits reached
4. Incorrect credentials in .env.local

Double-check all environment variables and credentials are correct.
