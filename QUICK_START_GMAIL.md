# Quick Start: Gmail API Setup

You're almost done! Just 3 quick steps to get email sending working.

## ✅ What's Already Done

- ✅ Google Cloud Project created
- ✅ Gmail API enabled
- ✅ OAuth credentials created (Client ID & Secret)
- ✅ App published
- ✅ Code is ready and tested
- ✅ Build successful

---

## 🚀 3 Steps to Complete Setup

### Step 1️⃣: Get Your Refresh Token (5 minutes)

1. Open `scripts/get-gmail-token.js`
2. Replace these two lines:
   ```javascript
   const CLIENT_ID = 'YOUR_CLIENT_ID_HERE';
   const CLIENT_SECRET = 'YOUR_CLIENT_SECRET_HERE';
   ```
3. Run:
   ```bash
   node scripts/get-gmail-token.js
   ```
4. Follow the prompts (sign in with **ucrs.rfq@gmail.com**)
5. Copy the refresh token it gives you

---

### Step 2️⃣: Update Environment Variables (2 minutes)

Open `.env.local` and replace these three lines:

```env
GMAIL_CLIENT_ID=your_actual_client_id_here
GMAIL_CLIENT_SECRET=your_actual_client_secret_here
GMAIL_REFRESH_TOKEN=paste_your_refresh_token_here
```

**Leave these as-is** (they're already correct):
```env
GMAIL_USER_EMAIL=ucrs.rfq@gmail.com
QUOTE_ADMIN_EMAIL=sales@ucrs.com
QUOTE_BCC_EMAIL=kgholian@gmail.com
```

Save the file.

---

### Step 3️⃣: Test It! (3 minutes)

**Start dev server:**
```bash
pnpm dev
```

**In a new terminal, run the test:**
```bash
node scripts/test-quote-email.js
```

**Expected result:**
```
✅ SUCCESS!
Message: Quote request submitted successfully
Email Message ID: <some-id>

📬 Check your admin email inbox:
   To: sales@ucrs.com
   BCC: kgholian@gmail.com
```

---

## 🎉 That's It!

If the test succeeds, your quote form is fully functional!

**Try it on the website:**
1. Go to `http://localhost:3000/quote`
2. Fill out the form
3. Submit
4. Check your email!

---

## 📚 Need More Help?

See the full documentation: `GMAIL_SETUP_INSTRUCTIONS.md`

---

## 🐛 Common Issues

**"Invalid grant" error?**
→ Re-run step 1 to get a fresh refresh token

**No email received?**
→ Check spam folder
→ Verify environment variables are correct
→ Make sure you used **ucrs.rfq@gmail.com** in step 1

**Build errors?**
→ Run `pnpm install` again
→ Build already passed, so you're good!

---

**Questions?** Check the full setup guide in `GMAIL_SETUP_INSTRUCTIONS.md`
