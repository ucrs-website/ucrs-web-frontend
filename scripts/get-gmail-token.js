/**
 * Gmail API Token Generator
 * Run this script to generate a refresh token for Gmail API access
 *
 * Usage:
 * 1. Set your CLIENT_ID and CLIENT_SECRET below
 * 2. Run: node scripts/get-gmail-token.js
 * 3. Follow the prompts to authorize the app
 * 4. Copy the refresh token to your .env.local file
 */

const { google } = require("googleapis");
const readline = require("readline");

// ==========================================
// CONFIGURATION - Replace with your values
// ==========================================
const CLIENT_ID =
  "837791954251-e3da4obpsk34vthltl9p1v0a43eqqlfc.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "http://localhost:3000/api/auth/gmail/callback";

// Gmail API scope for sending emails
const SCOPES = ["https://www.googleapis.com/auth/gmail.send"];

// ==========================================
// OAuth2 Client Setup
// ==========================================
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
);

// Generate authorization URL
const authUrl = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  scope: SCOPES,
  prompt: "consent",
});

console.log(
  "\n╔════════════════════════════════════════════════════════════════╗",
);
console.log(
  "║           Gmail API Refresh Token Generator                   ║",
);
console.log(
  "╚════════════════════════════════════════════════════════════════╝\n",
);

console.log("📋 Step 1: Authorize this app by visiting this URL:\n");
console.log("\x1b[36m%s\x1b[0m\n", authUrl);
console.log("📋 Step 2: Sign in with ucrs.rfq@gmail.com");
console.log("📋 Step 3: Grant permissions");
console.log("📋 Step 4: You will be redirected to a URL like:");
console.log("   http://localhost:3000/api/auth/gmail/callback?code=XXXXX\n");
console.log('📋 Step 5: Copy the CODE part (everything after "code=")');
console.log("   and paste it below when prompted.\n");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the authorization code from the URL: ", (code) => {
  rl.close();

  console.log("\n⏳ Exchanging authorization code for tokens...\n");

  oAuth2Client.getToken(code, (err, token) => {
    if (err) {
      console.error("\n❌ Error retrieving access token:", err);
      console.error(
        "\n💡 Tip: Make sure you copied the entire code from the URL",
      );
      return;
    }

    console.log("✅ Success! Your tokens have been generated.\n");
    console.log(
      "╔════════════════════════════════════════════════════════════════╗",
    );
    console.log(
      "║                    REFRESH TOKEN                               ║",
    );
    console.log(
      "╚════════════════════════════════════════════════════════════════╝\n",
    );
    console.log("\x1b[32m%s\x1b[0m\n", token.refresh_token);
    console.log(
      "╔════════════════════════════════════════════════════════════════╗",
    );
    console.log(
      "║                IMPORTANT - SAVE THIS TOKEN!                    ║",
    );
    console.log(
      "╚════════════════════════════════════════════════════════════════╝\n",
    );
    console.log("📝 Add this to your .env.local file:\n");
    console.log(`GMAIL_REFRESH_TOKEN=${token.refresh_token}\n`);
    console.log(
      "⚠️  Keep this token secure and never commit it to version control!\n",
    );
  });
});
