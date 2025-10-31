/**
 * Test Quote Email Script
 * Tests the quote request email functionality
 *
 * Usage:
 * 1. Make sure your dev server is running: pnpm dev
 * 2. Run: node scripts/test-quote-email.js
 */

const API_URL = 'http://localhost:3000/api/quote-request';

// Test data for a product quote
const testProductQuote = {
  fullName: "John Smith",
  companyName: "Railway Solutions Inc.",
  email: "john.smith@railwaysolutions.com",
  country: "Canada",
  phone: "+1 (416) 555-1234",
  quoteType: "products",
  products: [
    {
      name: "Locomotive Wheel Assembly",
      oemSku: "LWA-2024-001",
      quantity: 2,
      description: "Heavy-duty wheel assembly for freight locomotives",
      imageUrl: "/images/placeholder-product.png"
    },
    {
      name: "Brake System Component",
      oemSku: "BSC-2024-045",
      quantity: 5,
      description: "Replacement brake components compatible with EMD models",
      imageUrl: "/images/placeholder-product.png"
    },
    {
      name: "Engine Control Module",
      oemSku: "ECM-2024-123",
      quantity: 1,
      description: "Electronic control module for diesel engines",
      imageUrl: "/images/placeholder-product.png"
    }
  ],
  attachmentUrls: []
};

// Test data for a services quote
const testServicesQuote = {
  fullName: "Sarah Johnson",
  companyName: "Metro Transit Authority",
  email: "sarah.johnson@metrotransit.com",
  country: "United States",
  phone: "+1 (555) 987-6543",
  quoteType: "services",
  services: {
    serviceTypes: {
      repair: true,
      consulting: false,
      reverseEngineering: true,
      rebuild: false
    },
    description: "We need repair services for 3 EMD GP38-2 locomotives. The units have issues with traction motors and electrical systems. We also require reverse engineering for some obsolete electrical components that are no longer available from the OEM."
  },
  attachmentUrls: []
};

async function testQuoteEmail(testName, testData) {
  console.log(`\n${'='.repeat(70)}`);
  console.log(`📧 Testing: ${testName}`);
  console.log('='.repeat(70));

  try {
    console.log('\n⏳ Sending request to API...');

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      console.log('\n✅ SUCCESS!');
      console.log(`   Message: ${result.message}`);
      if (result.messageId) {
        console.log(`   Email Message ID: ${result.messageId}`);
      }
      console.log('\n📬 Check your admin email inbox:');
      console.log(`   To: ${process.env.QUOTE_ADMIN_EMAIL || 'sales@ucrs.com'}`);
      console.log(`   BCC: ${process.env.QUOTE_BCC_EMAIL || 'kgholian@gmail.com'}`);
    } else {
      console.log('\n❌ FAILED!');
      console.log(`   Status: ${response.status}`);
      console.log(`   Error: ${result.error || 'Unknown error'}`);
    }
  } catch (error) {
    console.log('\n❌ ERROR!');
    console.error(`   ${error.message}`);
    console.log('\n💡 Make sure:');
    console.log('   1. Your dev server is running (pnpm dev)');
    console.log('   2. Gmail API credentials are configured in .env.local');
    console.log('   3. You have generated the refresh token');
  }
}

async function runTests() {
  console.log('\n╔════════════════════════════════════════════════════════════════════╗');
  console.log('║           Quote Email Testing Suite                                ║');
  console.log('╚════════════════════════════════════════════════════════════════════╝');

  // Test 1: Product Quote
  await testQuoteEmail('Product Quote (3 products)', testProductQuote);

  // Wait a bit before next test
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Test 2: Services Quote
  await testQuoteEmail('Services Quote (Repair + Reverse Engineering)', testServicesQuote);

  console.log('\n' + '='.repeat(70));
  console.log('✅ All tests completed!');
  console.log('='.repeat(70) + '\n');
}

// Run the tests
runTests();
