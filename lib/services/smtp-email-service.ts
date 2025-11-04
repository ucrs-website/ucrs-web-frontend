/**
 * SMTP Email Service using Nodemailer
 * More reliable alternative to Gmail API for automated email sending
 */

import nodemailer from 'nodemailer';
import type { QuoteEmailData } from './gmail-service';

/**
 * Create SMTP transporter
 */
function createTransporter() {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.GMAIL_USER_EMAIL,
      pass: process.env.GMAIL_APP_PASSWORD, // App-specific password, not regular password
    },
  });
}

/**
 * Send quote request email using SMTP
 */
export async function sendQuoteRequestEmailSMTP(data: QuoteEmailData) {
  try {
    // Validate environment variables
    if (!process.env.GMAIL_USER_EMAIL || !process.env.GMAIL_APP_PASSWORD) {
      throw new Error('Missing GMAIL_USER_EMAIL or GMAIL_APP_PASSWORD in .env.local');
    }

    if (!process.env.QUOTE_ADMIN_EMAIL) {
      throw new Error('Missing QUOTE_ADMIN_EMAIL in .env.local');
    }

    console.log('📧 Preparing to send email via SMTP...');

    // Import the email template generator
    const { generateQuoteEmailHTML } = await import('@/lib/templates/quote-email-template');

    // Create transporter
    const transporter = createTransporter();

    // Generate HTML content
    const htmlContent = generateQuoteEmailHTML(data);

    // Prepare email details
    const subject = `New Quote Request from ${data.userInfo.fullName} - ${data.quoteType === 'products' ? 'Products' : 'Services'}`;
    const from = `UCRS Quote System <${process.env.GMAIL_USER_EMAIL}>`;
    const to = process.env.QUOTE_ADMIN_EMAIL;
    const cc = process.env.QUOTE_CC_EMAIL;
    const replyTo = data.userInfo.email;

    console.log('📤 Sending email with configuration:');
    console.log(`   From: ${from}`);
    console.log(`   To: ${to}`);
    console.log(`   CC: ${cc}`);
    console.log(`   Reply-To: ${replyTo}`);

    // Send email
    const info = await transporter.sendMail({
      from,
      to,
      cc,
      replyTo,
      subject,
      html: htmlContent,
    });

    console.log('✅ Quote request email sent successfully via SMTP');
    console.log(`   Message ID: ${info.messageId}`);
    console.log(`   From: ${from}`);
    console.log(`   To: ${to}`);
    console.log(`   CC: ${cc}`);
    console.log(`   Reply-To: ${replyTo}`);
    console.log(`   Customer: ${data.userInfo.fullName} (${data.userInfo.email})`);
    console.log(`   Type: ${data.quoteType}`);

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error('❌ Error sending quote request email via SMTP:', error);

    if (error instanceof Error) {
      console.error(`   Error message: ${error.message}`);
    }

    throw error;
  }
}

/**
 * Test SMTP email sending
 */
export async function sendTestEmailSMTP() {
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

  return await sendQuoteRequestEmailSMTP(testData);
}
