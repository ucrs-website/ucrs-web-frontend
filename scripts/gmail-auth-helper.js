/**
 * Gmail OAuth2 Authorization Helper Script
 * Run this script to get a new refresh token with the correct scopes
 *
 * Usage:
 * 1. Make sure GMAIL_CLIENT_ID and GMAIL_CLIENT_SECRET are set in .env.local
 * 2. Run: node scripts/gmail-auth-helper.js
 * 3. Visit the URL printed in the console
 * 4. Authorize the application
 * 5. Copy the code from the redirect URL
 * 6. Paste it back into the console
 * 7. Copy the new refresh token to your .env.local file
 */

const { google } = require('googleapis');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const OAuth2 = google.auth.OAuth2;

// Load environment variables from .env.local
function loadEnvFile() {
  const envPath = path.join(__dirname, '..', '.env.local');

  if (!fs.existsSync(envPath)) {
    console.error('❌ Error: .env.local file not found');
    console.log(`Expected path: ${envPath}\n`);
    process.exit(1);
  }

  const envContent = fs.readFileSync(envPath, 'utf8');
  const envVars = {};

  envContent.split('\n').forEach(line => {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith('#')) return;

    const [key, ...valueParts] = trimmedLine.split('=');
    if (key && valueParts.length > 0) {
      let value = valueParts.join('=').trim();
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      envVars[key.trim()] = value;
    }
  });

  return envVars;
}

const env = loadEnvFile();

// IMPORTANT: These are the scopes needed for sending emails
const SCOPES = [
  'https://www.googleapis.com/auth/gmail.send', // Send emails
  'https://www.googleapis.com/auth/gmail.compose', // Compose emails
];

async function getNewToken() {
  const oauth2Client = new OAuth2(
    env.GMAIL_CLIENT_ID,
    env.GMAIL_CLIENT_SECRET,
    'http://localhost:3000/api/auth/gmail/callback'
  );

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent', // Force to get a new refresh token
  });

  console.log('\n=================================================');
  console.log('Gmail API Authorization');
  console.log('=================================================\n');
  console.log('1. Visit this URL to authorize the application:\n');
  console.log(authUrl);
  console.log('\n2. After authorization, you\'ll be redirected to a URL.');
  console.log('   Copy the "code" parameter from that URL.\n');
  console.log('3. Paste the code below:\n');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Enter the authorization code: ', async (code) => {
    try {
      const { tokens } = await oauth2Client.getToken(code);

      console.log('\n=================================================');
      console.log('Success! Copy these values to your .env.local:');
      console.log('=================================================\n');
      console.log(`GMAIL_REFRESH_TOKEN=${tokens.refresh_token}\n`);

      if (tokens.access_token) {
        console.log('Access Token (for testing, expires in 1 hour):');
        console.log(tokens.access_token);
      }

      console.log('\n=================================================');
      console.log('Next Steps:');
      console.log('=================================================');
      console.log('1. Copy the GMAIL_REFRESH_TOKEN value above');
      console.log('2. Replace the GMAIL_REFRESH_TOKEN in your .env.local file');
      console.log('3. Restart your development server');
      console.log('4. Test sending an email\n');

    } catch (error) {
      console.error('\n❌ Error retrieving access token:', error.message);
      console.log('\nPlease try again and make sure:');
      console.log('- The authorization code is correct');
      console.log('- Your GMAIL_CLIENT_ID and GMAIL_CLIENT_SECRET are correct');
      console.log('- You copied the entire code parameter from the redirect URL\n');
    }

    rl.close();
  });
}

// Check if required environment variables are set
if (!env.GMAIL_CLIENT_ID || !env.GMAIL_CLIENT_SECRET) {
  console.error('❌ Error: Missing GMAIL_CLIENT_ID or GMAIL_CLIENT_SECRET in .env.local');
  console.log('\nPlease make sure your .env.local file contains:');
  console.log('GMAIL_CLIENT_ID=your_client_id');
  console.log('GMAIL_CLIENT_SECRET=your_client_secret\n');
  process.exit(1);
}

getNewToken();
