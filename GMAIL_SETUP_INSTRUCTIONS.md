# Gmail API Setup Instructions

Complete this setup to enable email sending for the Quote Request form.

## 📋 What You've Done So Far

✅ Created Google Cloud Project
✅ Enabled Gmail API
✅ Created OAuth 2.0 credentials (Client ID & Secret)
✅ Published the OAuth consent screen

---

## 🔧 Next Steps

### Step 1: Generate Your Refresh Token

1. **Open the token generation script**:
   ```bash
   open scripts/get-gmail-token.js
   ```

2. **Replace the placeholders** with your actual credentials:
   ```javascript
   const CLIENT_ID = 'YOUR_CLIENT_ID_HERE';        // Replace with your Client ID
   const CLIENT_SECRET = 'YOUR_CLIENT_SECRET_HERE'; // Replace with your Client Secret
   ```

3. **Run the script**:
   ```bash
   node scripts/get-gmail-token.js
   ```

4. **Follow the prompts**:
   - Click the URL that appears
   - Sign in with **ucrs.rfq@gmail.com**
   - Grant permissions when asked
   - You'll be redirected to a URL like:
     ```
     http://localhost:3000/api/auth/gmail/callback?code=XXXXX
     ```
   - Copy the `code` part (everything after `code=`)
   - Paste it into the terminal when prompted

5. **Save the refresh token**:
   - The script will display your refresh token
   - Copy it (it's a long string)

---

### Step 2: Configure Environment Variables

1. **Open `.env.local`** (it's already created with placeholders)

2. **Replace the placeholders** with your actual values:

   ```env
   # Gmail API Configuration (Server-side only)
   GMAIL_CLIENT_ID=your_actual_client_id_here
   GMAIL_CLIENT_SECRET=your_actual_client_secret_here
   GMAIL_REFRESH_TOKEN=your_refresh_token_from_step_1
   GMAIL_USER_EMAIL=ucrs.rfq@gmail.com

   # Quote Request Email Settings
   QUOTE_ADMIN_EMAIL=sales@ucrs.com
   QUOTE_BCC_EMAIL=kgholian@gmail.com
   ```

3. **Save the file**

⚠️ **IMPORTANT**: Never commit `.env.local` to Git. It's already in `.gitignore`.

---

### Step 3: Test the Integration

1. **Start the dev server**:
   ```bash
   pnpm dev
   ```

2. **In a new terminal, run the test script**:
   ```bash
   node scripts/test-quote-email.js
   ```

3. **Check your email**:
   - Admin email should receive 2 test emails:
     - Test product quote (3 products)
     - Test services quote (Repair + Reverse Engineering)
   - BCC recipient (kgholian@gmail.com) should also receive copies

4. **If successful**, you'll see:
   ```
   ✅ SUCCESS!
   Message: Quote request submitted successfully
   Email Message ID: <message-id>
   ```

---

### Step 4: Test via the Website

1. **Navigate to the quote page**:
   ```
   http://localhost:3000/quote
   ```

2. **Fill out the form** (either Products or Services tab)

3. **Submit the form**

4. **Check for**:
   - Success message on the website
   - Email received in admin inbox
   - Email received in BCC inbox

---

## 🐛 Troubleshooting

### "Invalid grant" error
**Solution**: Your refresh token may have expired. Re-run Step 1 to generate a new one.

### "Missing Gmail API credentials" error
**Solution**: Check that all environment variables are set correctly in `.env.local`

### "Insufficient permissions" error
**Solution**:
- Make sure you granted all permissions during OAuth
- Verify the Gmail API scope is: `https://www.googleapis.com/auth/gmail.send`
- Re-run the token generation script

### Emails going to spam
**Solution**:
- This is normal for new Gmail API apps
- Mark the first email as "Not Spam"
- For production, consider setting up SPF/DKIM records

### "Daily sending quota exceeded"
**Solution**:
- Free Gmail accounts: 500 emails/day limit
- Google Workspace: Higher limits (2000+/day)
- Consider upgrading if needed

### Dev server not starting
**Solution**:
```bash
# Kill any existing processes
killall node

# Restart dev server
pnpm dev
```

---

## 📝 Files Created

Here's what was set up:

```
website/
├── .env.local                                   # Environment variables (configured)
├── scripts/
│   ├── get-gmail-token.js                      # Token generator script
│   └── test-quote-email.js                     # Email testing script
├── lib/
│   ├── services/
│   │   └── gmail-service.ts                    # Gmail API service
│   └── templates/
│       └── quote-email-template.ts             # HTML email template
└── app/
    └── api/
        └── quote-request/
            └── route.ts                         # Updated API endpoint
```

---

## ✅ Verification Checklist

Before deploying to production, verify:

- [ ] Generated refresh token successfully
- [ ] All environment variables configured in `.env.local`
- [ ] Test script sends emails successfully
- [ ] Quote form submits and sends emails via website
- [ ] Emails received in admin inbox (sales@ucrs.com)
- [ ] Emails received in BCC inbox (kgholian@gmail.com)
- [ ] Success/error states work correctly on website
- [ ] Email formatting looks professional

---

## 🚀 Production Deployment

When deploying to production:

1. **Add environment variables to your hosting platform** (Vercel, Netlify, etc.):
   - `GMAIL_CLIENT_ID`
   - `GMAIL_CLIENT_SECRET`
   - `GMAIL_REFRESH_TOKEN`
   - `GMAIL_USER_EMAIL`
   - `QUOTE_ADMIN_EMAIL`
   - `QUOTE_BCC_EMAIL`

2. **Update redirect URI in Google Cloud Console**:
   - Add your production domain: `https://ucrs.com/api/auth/gmail/callback`

3. **Test on production** before announcing

---

## 📧 Email Preview

The emails sent will include:

- **Subject**: `New Quote Request from [Name] - [Products/Services]`
- **From**: `UCRS Quote System <ucrs.rfq@gmail.com>`
- **To**: `sales@ucrs.com`
- **BCC**: `kgholian@gmail.com`
- **Reply-To**: Customer's email

**Email sections**:
- Customer information (name, company, email, phone, country)
- Quote type badge
- Products table (if product quote) or Services list (if services quote)
- Attachments (if any)
- Next steps for the admin
- Professional UCRS branding

---

## 🆘 Need Help?

If you encounter issues:

1. Check the console logs in your terminal (dev server)
2. Check browser console for frontend errors
3. Review the Gmail API documentation: https://developers.google.com/gmail/api
4. Verify all environment variables are correct
5. Make sure ucrs.rfq@gmail.com is the authenticated account

---

## 🎉 You're All Set!

Once you complete these steps, your Quote Request form will automatically send professional emails to your team whenever a customer submits a quote request.

**Happy testing! 🚀**
