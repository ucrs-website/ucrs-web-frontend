/**
 * Test Gmail Send Capability
 * This script tests if your Gmail API credentials can actually send emails
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
function loadEnvFile() {
  const envPath = path.join(__dirname, '..', '.env.local');

  if (!fs.existsSync(envPath)) {
    console.error('❌ Error: .env.local file not found');
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

async function testGmailSend() {
  try {
    console.log('\n=================================================');
    console.log('Testing Gmail API Send Capability');
    console.log('=================================================\n');

    // Check environment variables
    console.log('1. Checking environment variables...');
    if (!env.GMAIL_CLIENT_ID || !env.GMAIL_CLIENT_SECRET || !env.GMAIL_REFRESH_TOKEN || !env.GMAIL_USER_EMAIL) {
      console.error('❌ Missing required environment variables');
      console.log('Required: GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN, GMAIL_USER_EMAIL\n');
      process.exit(1);
    }
    console.log('✅ All environment variables found\n');

    // Create OAuth2 client
    console.log('2. Creating OAuth2 client...');
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
      env.GMAIL_CLIENT_ID,
      env.GMAIL_CLIENT_SECRET,
      'http://localhost:3000/api/auth/gmail/callback'
    );

    oauth2Client.setCredentials({
      refresh_token: env.GMAIL_REFRESH_TOKEN,
    });
    console.log('✅ OAuth2 client created\n');

    // Get Gmail API instance
    console.log('3. Initializing Gmail API...');
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    console.log('✅ Gmail API initialized\n');

    // Check token info
    console.log('4. Verifying token scopes...');
    try {
      const tokenInfo = await oauth2Client.getAccessToken();
      if (tokenInfo.token) {
        // Try to get token info from Google
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${tokenInfo.token}`);
        const info = await response.json();

        if (info.scope) {
          console.log('   Token scopes:', info.scope);

          const hasGmailSend = info.scope.includes('gmail.send');
          const hasGmailCompose = info.scope.includes('gmail.compose');

          if (hasGmailSend) {
            console.log('   ✅ gmail.send scope: PRESENT');
          } else {
            console.log('   ❌ gmail.send scope: MISSING');
          }

          if (hasGmailCompose) {
            console.log('   ✅ gmail.compose scope: PRESENT');
          } else {
            console.log('   ⚠️  gmail.compose scope: MISSING (optional)');
          }

          if (!hasGmailSend) {
            console.log('\n❌ ERROR: Your token is missing the gmail.send scope!');
            console.log('This is why emails are not being delivered to recipients.\n');
            console.log('Follow the instructions in scripts/MANUAL_GMAIL_SCOPE_FIX.md to fix this.\n');
            process.exit(1);
          }
        }
      }
    } catch (error) {
      console.log('   ⚠️  Could not verify token scopes (this is okay)');
    }
    console.log();

    // Create a simple test email
    console.log('5. Creating test email...');
    const testEmail = [
      `From: UCRS Quote System <${env.GMAIL_USER_EMAIL}>`,
      `To: ${env.GMAIL_USER_EMAIL}`, // Send to self for testing
      'Subject: Gmail API Test Email',
      'Content-Type: text/html; charset=utf-8',
      'MIME-Version: 1.0',
      '',
      '<h1>Test Email</h1><p>This is a test email from the UCRS Quote System.</p>',
    ].join('\n');

    const encodedMessage = Buffer.from(testEmail)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    console.log('✅ Test email created\n');

    // Send test email
    console.log('6. Sending test email...');
    console.log(`   From: UCRS Quote System <${env.GMAIL_USER_EMAIL}>`);
    console.log(`   To: ${env.GMAIL_USER_EMAIL}`);
    console.log();

    const result = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });

    console.log('✅ Test email sent successfully!');
    console.log(`   Message ID: ${result.data.id}`);
    console.log();
    console.log('=================================================');
    console.log('SUCCESS!');
    console.log('=================================================');
    console.log();
    console.log('Check your inbox at:', env.GMAIL_USER_EMAIL);
    console.log('You should receive the test email within a few seconds.');
    console.log();
    console.log('If you receive the email successfully, your Gmail API');
    console.log('configuration is correct and should work for quote requests.');
    console.log();

  } catch (error) {
    console.error('\n❌ Error testing Gmail send capability:');
    console.error('   Error:', error.message);

    if (error.message.includes('insufficient authentication scopes')) {
      console.log('\n⚠️  SCOPE ERROR: Your refresh token does not have the gmail.send scope.');
      console.log('Follow the instructions in scripts/MANUAL_GMAIL_SCOPE_FIX.md to get a new token.\n');
    } else if (error.message.includes('invalid_grant')) {
      console.log('\n⚠️  TOKEN ERROR: Your refresh token is invalid or expired.');
      console.log('Follow the instructions in scripts/MANUAL_GMAIL_SCOPE_FIX.md to get a new token.\n');
    } else {
      console.log('\nCheck your configuration in .env.local and try again.\n');
    }

    process.exit(1);
  }
}

testGmailSend();
