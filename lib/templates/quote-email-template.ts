/**
 * Quote Request Email Template
 * Generates professional HTML emails for quote requests
 */

interface QuoteEmailData {
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
 * Generate HTML email for quote requests
 */
export function generateQuoteEmailHTML(data: QuoteEmailData): string {
  const { userInfo, quoteType, products, services, attachments } = data;

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Quote Request - UCRS</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
      line-height: 1.6;
      color: #333333;
      background-color: #f4f4f4;
    }
    .email-wrapper {
      max-width: 680px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background: linear-gradient(135deg, #c41e3a 0%, #8b1529 100%);
      color: #ffffff;
      padding: 40px 30px;
      text-align: center;
    }
    .header h1 {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .header p {
      font-size: 14px;
      opacity: 0.9;
    }
    .content {
      padding: 30px;
    }
    .alert-banner {
      background: linear-gradient(135deg, #0056b3 0%, #003d82 100%);
      color: #ffffff;
      padding: 20px 30px;
      margin: -30px -30px 30px -30px;
      border-left: 5px solid #ffc107;
    }
    .alert-banner h2 {
      font-size: 18px;
      margin-bottom: 5px;
    }
    .alert-banner p {
      font-size: 14px;
      opacity: 0.9;
    }
    .section {
      margin-bottom: 30px;
      background: #f9f9f9;
      padding: 25px;
      border-radius: 8px;
      border-left: 4px solid #c41e3a;
    }
    .section h2 {
      color: #c41e3a;
      font-size: 18px;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .info-grid {
      display: table;
      width: 100%;
    }
    .info-row {
      display: table-row;
    }
    .info-label,
    .info-value {
      display: table-cell;
      padding: 8px 0;
      border-bottom: 1px solid #e0e0e0;
    }
    .info-label {
      font-weight: 600;
      color: #555555;
      width: 140px;
      padding-right: 20px;
    }
    .info-value {
      color: #333333;
    }
    .info-row:last-child .info-label,
    .info-row:last-child .info-value {
      border-bottom: none;
    }
    .products-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 15px;
      background: #ffffff;
    }
    .products-table th,
    .products-table td {
      padding: 12px;
      text-align: left;
      border: 1px solid #e0e0e0;
    }
    .products-table th {
      background: #c41e3a;
      color: #ffffff;
      font-weight: 600;
      font-size: 13px;
      text-transform: uppercase;
    }
    .products-table td {
      font-size: 14px;
    }
    .products-table tr:nth-child(even) {
      background: #f9f9f9;
    }
    .service-badge {
      display: inline-block;
      background: #0056b3;
      color: #ffffff;
      padding: 6px 12px;
      border-radius: 4px;
      font-size: 13px;
      font-weight: 600;
      margin: 4px 4px 4px 0;
    }
    .description-box {
      background: #ffffff;
      padding: 15px;
      border-radius: 5px;
      border: 1px solid #e0e0e0;
      margin-top: 10px;
      font-style: italic;
      color: #555555;
    }
    .attachment-list {
      list-style: none;
      margin-top: 10px;
    }
    .attachment-list li {
      padding: 10px;
      background: #ffffff;
      margin-bottom: 8px;
      border-radius: 5px;
      border: 1px solid #e0e0e0;
    }
    .attachment-list a {
      color: #0056b3;
      text-decoration: none;
      font-weight: 500;
    }
    .attachment-list a:hover {
      text-decoration: underline;
    }
    .quote-type-badge {
      display: inline-block;
      padding: 8px 16px;
      border-radius: 20px;
      font-weight: 600;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .quote-type-products {
      background: linear-gradient(135deg, #28a745 0%, #1e7e34 100%);
      color: #ffffff;
    }
    .quote-type-services {
      background: linear-gradient(135deg, #0056b3 0%, #003d82 100%);
      color: #ffffff;
    }
    .footer {
      background: #2c2c2c;
      color: #ffffff;
      padding: 30px;
      text-align: center;
      font-size: 13px;
    }
    .footer p {
      margin-bottom: 8px;
      opacity: 0.8;
    }
    .footer a {
      color: #ffffff;
      text-decoration: underline;
    }
    .cta-button {
      display: inline-block;
      background: #c41e3a;
      color: #ffffff;
      padding: 12px 30px;
      text-decoration: none;
      border-radius: 5px;
      font-weight: 600;
      margin-top: 10px;
    }
    .timestamp {
      color: #777777;
      font-size: 12px;
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <!-- Header -->
    <div class="header">
      <h1>🚂 New Quote Request</h1>
      <p>Upper Canada Railway Services</p>
    </div>

    <!-- Content -->
    <div class="content">
      <!-- Alert Banner -->
      <div class="alert-banner">
        <h2>⚡ Action Required</h2>
        <p>A new quote request has been submitted and requires your attention.</p>
      </div>

      <!-- Customer Information -->
      <div class="section">
        <h2>👤 Customer Information</h2>
        <div class="info-grid">
          <div class="info-row">
            <div class="info-label">Full Name:</div>
            <div class="info-value">${userInfo.fullName}</div>
          </div>
          ${userInfo.companyName ? `
          <div class="info-row">
            <div class="info-label">Company:</div>
            <div class="info-value">${userInfo.companyName}</div>
          </div>
          ` : ''}
          <div class="info-row">
            <div class="info-label">Email:</div>
            <div class="info-value"><a href="mailto:${userInfo.email}" style="color: #0056b3; text-decoration: none;">${userInfo.email}</a></div>
          </div>
          <div class="info-row">
            <div class="info-label">Phone:</div>
            <div class="info-value">${userInfo.phone}</div>
          </div>
          ${userInfo.country ? `
          <div class="info-row">
            <div class="info-label">Country:</div>
            <div class="info-value">${userInfo.country}</div>
          </div>
          ` : ''}
        </div>
      </div>

      <!-- Quote Type -->
      <div class="section">
        <h2>📋 Quote Type</h2>
        <span class="quote-type-badge ${quoteType === 'products' ? 'quote-type-products' : 'quote-type-services'}">
          ${quoteType === 'products' ? '🛒 Buy Products' : '🔧 Get Services'}
        </span>
      </div>

      ${quoteType === 'products' && products && products.length > 0 ? `
      <!-- Products List -->
      <div class="section">
        <h2>🛒 Requested Products (${products.length} ${products.length === 1 ? 'item' : 'items'})</h2>
        <table class="products-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>SKU</th>
              <th>Qty</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            ${products.map(product => `
            <tr>
              <td><strong>${product.name}</strong></td>
              <td>${product.oemSku}</td>
              <td><strong>${product.quantity}</strong></td>
              <td>${product.description || '<em style="color: #999;">No description provided</em>'}</td>
            </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      ` : ''}

      ${quoteType === 'services' && services ? `
      <!-- Services Details -->
      <div class="section">
        <h2>🔧 Requested Services</h2>
        <p style="margin-bottom: 10px;"><strong>Service Types:</strong></p>
        <div>
          ${services.serviceTypes.repair ? '<span class="service-badge">🔨 Repair</span>' : ''}
          ${services.serviceTypes.consulting ? '<span class="service-badge">💼 Consulting</span>' : ''}
          ${services.serviceTypes.reverseEngineering ? '<span class="service-badge">⚙️ Reverse Engineering</span>' : ''}
          ${services.serviceTypes.rebuild ? '<span class="service-badge">🔧 Rebuild</span>' : ''}
        </div>
        <p style="margin-top: 15px; margin-bottom: 5px;"><strong>Description:</strong></p>
        <div class="description-box">
          ${services.description.replace(/\n/g, '<br>')}
        </div>
      </div>
      ` : ''}

      ${attachments && attachments.length > 0 ? `
      <!-- Attachments -->
      <div class="section">
        <h2>📎 Attachments (${attachments.length})</h2>
        <ul class="attachment-list">
          ${attachments.map(url => `
          <li>
            📄 <a href="${url}" target="_blank">${url.split('/').pop()}</a>
          </li>
          `).join('')}
        </ul>
      </div>
      ` : ''}

      <!-- Next Steps -->
      <div class="section">
        <h2>📌 Next Steps</h2>
        <ol style="margin-left: 20px; line-height: 1.8;">
          <li>Review the quote request details above</li>
          <li>Contact the customer at <a href="mailto:${userInfo.email}" style="color: #0056b3;">${userInfo.email}</a></li>
          <li>Prepare and send the quote based on their requirements</li>
          <li>Follow up within 24-48 hours</li>
        </ol>
        <a href="mailto:${userInfo.email}?subject=Re:%20Quote%20Request" class="cta-button">Reply to Customer</a>
      </div>

      <!-- Timestamp -->
      <div class="timestamp">
        <p><strong>Request submitted:</strong> ${currentDate}</p>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p><strong>Upper Canada Railway Services</strong></p>
      <p>This email was automatically generated by the UCRS Quote Request System</p>
      <p>© ${new Date().getFullYear()} UCRS. All rights reserved.</p>
      <p style="margin-top: 15px;">
        <a href="https://ucrs.com">Visit Website</a> |
        <a href="mailto:${process.env.QUOTE_ADMIN_EMAIL}">Contact Support</a>
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}
