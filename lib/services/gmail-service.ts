/**
 * Gmail API Service
 * Handles sending emails using Gmail API with OAuth 2.0 authentication
 */

import { google } from 'googleapis';

const OAuth2 = google.auth.OAuth2;

/**
 * Create OAuth2 client and Gmail API instance
 */
async function createGmailClient() {
  const oauth2Client = new OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    'http://localhost:3000/api/auth/gmail/callback' // Match your redirect URI
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  });

  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

  return gmail;
}

/**
 * Create email message in RFC 2822 format
 */
function createMessage(to: string, from: string, subject: string, htmlContent: string, replyTo?: string, bcc?: string) {
  const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;

  const messageParts = [
    `From: ${from}`,
    `To: ${to}`,
    bcc ? `Bcc: ${bcc}` : '',
    replyTo ? `Reply-To: ${replyTo}` : '',
    'Content-Type: text/html; charset=utf-8',
    'MIME-Version: 1.0',
    `Subject: ${utf8Subject}`,
    '',
    htmlContent,
  ].filter(line => line !== ''); // Remove empty lines

  const message = messageParts.join('\n');

  // Encode the message in base64url format
  const encodedMessage = Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  return encodedMessage;
}

/**
 * Quote Request Data Interface
 */
export interface QuoteEmailData {
  userInfo: {
    fullName: string;
    companyName?: string;
    email: string;
    country?: string;
    phone: string;
  };
  quoteType: 'products' | 'services';
  products?: Array<{
    name: string;
    oemSku: string;
    quantity: number;
    description?: string;
    imageUrl?: string;
  }>;
  services?: {
    serviceTypes: {
      repair: boolean;
      consulting: boolean;
      reverseEngineering: boolean;
      rebuild: boolean;
    };
    description: string;
  };
  attachments?: string[];
}

/**
 * Send quote request email using Gmail API
 */
export async function sendQuoteRequestEmail(data: QuoteEmailData) {
  try {
    // Validate environment variables
    if (!process.env.GMAIL_CLIENT_ID || !process.env.GMAIL_CLIENT_SECRET || !process.env.GMAIL_REFRESH_TOKEN) {
      throw new Error('Missing Gmail API credentials. Please check your .env.local file.');
    }

    if (!process.env.GMAIL_USER_EMAIL) {
      throw new Error('Missing GMAIL_USER_EMAIL in .env.local');
    }

    if (!process.env.QUOTE_ADMIN_EMAIL) {
      throw new Error('Missing QUOTE_ADMIN_EMAIL in .env.local');
    }

    console.log('📧 Preparing to send email via Gmail API...');

    // Import the email template generator
    const { generateQuoteEmailHTML } = await import('@/lib/templates/quote-email-template');

    // Create Gmail client
    const gmail = await createGmailClient();

    // Generate HTML content
    const htmlContent = generateQuoteEmailHTML(data);

    // Prepare email details
    const subject = `New Quote Request from ${data.userInfo.fullName} - ${data.quoteType === 'products' ? 'Products' : 'Services'}`;
    const from = `UCRS Quote System <${process.env.GMAIL_USER_EMAIL}>`;
    const to = process.env.QUOTE_ADMIN_EMAIL;
    const bcc = process.env.QUOTE_BCC_EMAIL;
    const replyTo = data.userInfo.email;

    // Create the email message
    const encodedMessage = createMessage(to, from, subject, htmlContent, replyTo, bcc);

    // Send email using Gmail API
    const result = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });

    console.log('✅ Quote request email sent successfully');
    console.log(`   Message ID: ${result.data.id}`);
    console.log(`   To: ${to}`);
    console.log(`   BCC: ${bcc}`);
    console.log(`   From: ${data.userInfo.fullName} (${data.userInfo.email})`);
    console.log(`   Type: ${data.quoteType}`);

    return {
      success: true,
      messageId: result.data.id || 'unknown',
    };
  } catch (error) {
    console.error('❌ Error sending quote request email:', error);

    // Log specific error details
    if (error instanceof Error) {
      console.error(`   Error message: ${error.message}`);
    }

    throw error;
  }
}

/**
 * Test email sending functionality
 * Used for debugging and testing the Gmail API integration
 */
export async function sendTestEmail() {
  const testData: QuoteEmailData = {
    userInfo: {
      fullName: 'Test User',
      companyName: 'Test Company Inc.',
      email: 'test@example.com',
      country: 'Canada',
      phone: '+1 (555) 123-4567',
    },
    quoteType: 'products',
    products: [
      {
        name: 'Test Railway Part',
        oemSku: 'TEST-001',
        quantity: 2,
        description: 'This is a test product description',
        imageUrl: '/images/placeholder-product.png',
      },
    ],
  };

  return await sendQuoteRequestEmail(testData);
}
