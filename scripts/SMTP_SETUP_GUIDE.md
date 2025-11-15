# SMTP Email Setup Guide - Fix for Gmail API Bounce-Back Issues

## The Problem

Gmail API with OAuth2 has limitations that cause emails to bounce back with "An error occurred. Your message was not sent." This happens because:

1. Gmail applies strict security restrictions to API-sent emails
2. Multiple recipients (To + CC) trigger additional validation
3. New accounts or automated patterns get flagged

## The Solution: SMTP with App-Specific Password

SMTP is more reliable for automated email sending and doesn't have the same restrictions as the Gmail API.

---

## Setup Instructions

### Step 1: Enable 2-Step Verification

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Sign in with **ucrs.rfq@gmail.com** / **UCRS123$**
3. Find "2-Step Verification" section
4. Click "Get started" and follow the prompts
5. Use your phone number for verification

### Step 2: Generate App-Specific Password

1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - If you can't access this page, make sure 2-Step Verification is enabled first
2. You may need to sign in again
3. In the "Select app" dropdown, choose **"Mail"**
4. In the "Select device" dropdown, choose **"Other (Custom name)"**
5. Type: **"UCRS Quote System"**
6. Click **"Generate"**
7. **Copy the 16-character password** (format: xxxx xxxx xxxx xxxx)
   - This password will only be shown once!
   - It will look like: `abcd efgh ijkl mnop`

### Step 3: Install Nodemailer

```bash
cd /Users/qulian/Desktop/Projects/ucrs/website
pnpm install nodemailer
pnpm install -D @types/nodemailer
```

### Step 4: Update .env.local

Add the app-specific password to your `.env.local` file:

```env
# Add this new line (remove spaces from the password)
GMAIL_APP_PASSWORD=abcdefghijklmnop

# Keep existing variables
GMAIL_USER_EMAIL=ucrs.rfq@gmail.com
QUOTE_ADMIN_EMAIL=commercial@ucrs.com
QUOTE_CC_EMAIL=sales@ucrs.com,a.moradian1379@gmail.com,kgholian@gmail.com
```

**IMPORTANT**: Remove all spaces from the app password!
- ❌ Wrong: `abcd efgh ijkl mnop`
- ✅ Correct: `abcdefghijklmnop`

### Step 5: Update API Route

Update your quote API route to use SMTP instead of Gmail API:

**File**: `app/api/quote-request/route.ts`

```typescript
// Change this import:
// import { sendQuoteRequestEmail } from '@/lib/services/gmail-service';

// To this:
import { sendQuoteRequestEmailSMTP } from '@/lib/services/smtp-email-service';

// In the POST handler, change:
// const result = await sendQuoteRequestEmail(emailData);

// To:
const result = await sendQuoteRequestEmailSMTP(emailData);
```

### Step 6: Restart Your Server

```bash
# Stop your dev server (Ctrl+C)

# Clear Next.js cache
rm -rf .next

# Restart
pnpm dev
```

### Step 7: Test Email Sending

Submit a quote request and verify:

1. ✅ No bounce-back error in ucrs.rfq@gmail.com inbox
2. ✅ Email appears in sent folder
3. ✅ **Recipients actually receive the email** (check commercial@ucrs.com)
4. ✅ CC recipients receive the email (sales@ucrs.com, a.moradian1379@gmail.com, kgholian@gmail.com)

---

## Testing Script

To test without submitting a quote form, run:

```bash
node -e "require('./lib/services/smtp-email-service').sendTestEmailSMTP().then(() => console.log('Test email sent!')).catch(console.error)"
```

---

## Advantages of SMTP over Gmail API

| Feature | Gmail API (OAuth2) | SMTP (App Password) |
|---------|-------------------|---------------------|
| Reliability | ❌ Strict limitations | ✅ Highly reliable |
| Multiple recipients | ❌ Often fails | ✅ Works perfectly |
| Setup complexity | 😰 Complex OAuth flow | 😊 Simple password |
| Delivery rate | ⚠️ Unpredictable | ✅ Consistent |
| CC/BCC support | ⚠️ Limited | ✅ Full support |
| Email appears in Sent | ✅ Yes | ✅ Yes |
| API quotas | ⚠️ Limited | ✅ Generous |

---

## Troubleshooting

### Error: "Invalid login: 535-5.7.8 Username and Password not accepted"

**Solutions**:
1. Make sure 2-Step Verification is enabled
2. Use the App-Specific Password, NOT your regular Gmail password
3. Remove all spaces from the app password
4. Generate a new app password if needed

### Error: "Missing GMAIL_APP_PASSWORD"

Make sure you added `GMAIL_APP_PASSWORD` to your `.env.local` file and restarted the server.

### Emails still not being received by recipients

1. Check spam folders of all recipients
2. Verify email addresses in `QUOTE_CC_EMAIL` are correct
3. Try sending a test email to your own email address first
4. Check Gmail's "Sent" folder to see if the email was actually sent

### Error: "Connection timeout"

1. Check your internet connection
2. Make sure port 587 is not blocked by your firewall
3. Try using port 465 with `secure: true` instead

---

## Security Notes

- The app-specific password only has permission to send emails
- It can be revoked anytime at: https://myaccount.google.com/apppasswords
- Keep `.env.local` secure and never commit it to git
- Each app should have its own unique app password

---

## Reverting to Gmail API (Not Recommended)

If you need to revert to Gmail API for some reason:

1. Keep the OAuth2 setup
2. Change imports back to `gmail-service`
3. Make sure you have the correct Gmail API scopes (gmail.send)

But SMTP is the recommended approach for production email sending.

---

## Need Help?

If emails are still bouncing after following all steps:

1. Double-check the app password (no spaces!)
2. Verify 2-Step Verification is enabled
3. Try generating a new app password
4. Test with a simple email client to rule out code issues
5. Check Google Account security alerts for blocked sign-in attempts
