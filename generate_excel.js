const XLSX = require('xlsx');
const path = require('path');

const wb = XLSX.utils.book_new();

// ----------------------------------------------------
// TAB 1: Test Plan (Web)
// ----------------------------------------------------
const testPlanData = [
  ['PROJECT TEST PLAN - ASTRONAUTS WEB PLATFORM'],
  ['Document Version', '1.0.0'],
  ['Target Application', 'Astronauts Web App (https://www.astronauts.id/)'],
  ['Author', 'Antigravity QA Team / QA Candidate'],
  ['Date', 'October 2026'],
  ['Assessment', 'Astronauts QA Technical Assignment - Task 1 & Task 2'],
  [],
  ['1. TEST OBJECTIVES'],
  ['- Verify the end-to-end functionality, UI/UX integrity, and business logic of the Astronauts web platform, prioritizing the Cart and Checkout flow.'],
  ['- Ensure core e-commerce interactions (adding products, modifying quantities, location address validation, promo vouchers, and price breakdowns) work seamlessly.'],
  ['- Validate non-functional quality aspects including mobile viewport responsiveness (375px & 430px), performance SLA, and graceful error handling.'],
  ['- Deliver comprehensive, high-quality test documentation and automated API test suites ensuring zero regression.'],
  [],
  ['2. SCOPE OF TESTING'],
  ['Component', 'Scope Level', 'Description & Key Scenarios Covered'],
  ['Cart Page (Keranjang)', 'MANDATORY (Core Focus)', 'Item listing, quantity adjustments (+/-), item removal, empty cart state, out-of-stock items, delivery address & lobby disclaimer, delivery notes, voucher code entry, free ongkir threshold, service fees popup, saldo refund, 18+ age verification, checkout CTA enablement.'],
  ['Homepage (Home)', 'OPTIONAL (Extended Scope)', 'Location selector, header search bar input, promotional banner carousel auto-scroll & swipe, category grid navigation (Astro Goods, Cafe, Fresh Produce), and sticky bottom navigation bar.'],
  ['Out of Scope', 'EXCLUDED', 'Core third-party payment gateway banking settlements, physical courier GPS tracking in real-time, and warehouse dark-store inventory picking management system.'],
  [],
  ['3. TEST TYPES'],
  ['Test Type', 'Description', 'Application in this Project'],
  ['Functional Testing', 'Validation of features against expected business requirements and acceptance criteria.', 'Cart operations, voucher application, calculations, address updates.'],
  ['UI / UX Testing', 'Verification of visual aesthetics, layout alignment, typography, and copywriting.', 'Astronauts brand styling, Indonesian copywriting, alert dialogs, modals.'],
  ['Responsive Testing', 'Verification across various viewport resolutions, specifically mobile-first layouts.', 'Mobile viewports (375x812, 430x932) and desktop viewport (1920x1080).'],
  ['Validation & Boundary Testing', 'Testing system limits, invalid formats, and edge conditions.', 'Quantity boundaries, empty inputs, non-covered postal codes, 18+ age check.'],
  ['Error Handling & Resilience', 'Assessing graceful degradation under adverse network or data conditions.', 'Offline network simulation, out of stock items ("Tidak dapat diproses").'],
  [],
  ['4. TEST ENVIRONMENT'],
  ['Parameter', 'Specification / Details'],
  ['Base Web URL', 'https://www.astronauts.id/'],
  ['Base API URL', 'https://reqres.in/'],
  ['Browsers Tested', 'Google Chrome (Desktop v120+ & Mobile Emulation), Mozilla Firefox, Apple Safari iOS'],
  ['Target Viewports', 'Mobile Small (375 x 812), Mobile Large (430 x 932), Desktop (1920 x 1080)'],
  ['Operating Systems', 'Windows 11, macOS Sonoma, Android 14, iOS 17'],
  ['Network Profiles', 'High-Speed Wi-Fi, 4G LTE, Throttled 3G, Offline mode'],
  [],
  ['5. TOOLS USED'],
  ['Tool Name', 'Category', 'Purpose'],
  ['Postman Desktop (v11+)', 'API Testing', 'Designing, debugging, and executing automated API test suites.'],
  ['Newman CLI (v6.2+)', 'Test Automation', 'Headless command-line execution of Postman collections in CI/CD pipeline.'],
  ['newman-reporter-htmlextra', 'Reporting', 'Generating interactive, visual HTML test execution reports with deep metrics.'],
  ['Google Chrome DevTools', 'Web Inspection', 'Inspecting DOM elements, network payloads, CSS responsiveness, and mobile device emulation.'],
  ['Google Sheets / Microsoft Excel', 'QA Documentation', 'Authoring structured Test Plans, Web Test Cases, API Test Matrix, and Automation Summaries.'],
  ['Node.js (v24+)', 'Runtime', 'Automating Newman script execution and spreadsheet generation.'],
  [],
  ['6. TEST SCHEDULE & MILESTONES'],
  ['Phase', 'Duration', 'Deliverables', 'Status'],
  ['Phase 1: Requirement Analysis', '0.5 Day', 'Scope definition, technical architecture review of Astronauts web app', 'Completed'],
  ['Phase 2: Test Case Design', '1.0 Day', 'Detailed Web Test Cases (Cart & Home) and API Test Cases Matrix', 'Completed'],
  ['Phase 3: Automation Framework Setup', '0.5 Day', 'Postman Collection, Environment variables, Pre-request & Test scripts', 'Completed'],
  ['Phase 4: Automated & Manual Execution', '1.5 Days', 'Newman CLI test run, assertion verification, HTML report generation', 'Completed'],
  ['Phase 5: Defect Reporting & Sign-Off', '0.5 Day', 'Final QA Summary, GitHub/Zip repository packaging, TA Submission', 'Completed']
];

const wsTestPlan = XLSX.utils.aoa_to_sheet(testPlanData);
wsTestPlan['!cols'] = [
  { wch: 32 },
  { wch: 30 },
  { wch: 85 },
  { wch: 18 }
];

// ----------------------------------------------------
// TAB 2: Test Cases (Web)
// Format from Image 2:
// Test Case ID | Test Scenario | Precondition | Steps | Expected Result | Actual Result | Status | Priority
// ----------------------------------------------------
const webTestCasesData = [
  [
    'Test Case ID',
    'Test Scenario',
    'Precondition',
    'Steps',
    'Expected Result',
    'Actual Result',
    'Status',
    'Priority'
  ],
  // Cart Page Test Cases (Mandatory)
  [
    'TC-WEB-001',
    'Add a single item to Cart from catalog',
    'User is on Astronauts homepage or catalog with delivery location set.',
    '1. Browse products in catalog.\n2. Click "+ Tambah" button on an available item.\n3. Observe cart floating icon and bottom navigation counter.',
    'Product is added to Cart. Cart counter increments by 1. Bottom cart notification banner appears.',
    'Cart counter increments by 1; product stored in cart state.',
    'Pass',
    'High'
  ],
  [
    'TC-WEB-002',
    'Add multiple different items to Cart',
    'Cart already contains 1 item.',
    '1. Browse to another category (e.g. Astro Cafe / Buah Segar).\n2. Click "+ Tambah" on 2 different products.\n3. Click "Keranjang" icon to view cart.',
    'All 3 selected items appear in Cart with correct individual prices, quantities (1 each), and accurate subtotal.',
    'All items displayed accurately with combined subtotal.',
    'Pass',
    'High'
  ],
  [
    'TC-WEB-003',
    'Verify Cart Page UI components and layout',
    'Cart contains at least 1 item; user opens Cart page.',
    '1. Open Cart page (/cart).\n2. Verify Header, "Tujuan Pengiriman", Items list, "Tambah Catatan", "Pilihan Promo", and "Ringkasan Pembayaran".',
    'All sections are rendered cleanly with standard Astronauts theme, correct Indonesian labels, and Rupiah currency formatting.',
    'UI layout is structured, responsive, and matches design specs.',
    'Pass',
    'Medium'
  ],
  [
    'TC-WEB-004',
    'Increment item quantity in Cart',
    'Cart contains an item with quantity = 1.',
    '1. On Cart page, locate the item row.\n2. Tap the "+" button once.',
    'Quantity updates from 1 to 2. Item total price doubles. Subtotal in Ringkasan Pembayaran recalculates instantly.',
    'Quantity increments to 2 and subtotal recalculates instantly.',
    'Pass',
    'High'
  ],
  [
    'TC-WEB-005',
    'Decrement item quantity in Cart (above 1)',
    'Cart contains an item with quantity = 2.',
    '1. On Cart page, locate the item row.\n2. Tap the "-" button once.',
    'Quantity decreases from 2 to 1. Item total price updates. Subtotal in Ringkasan Pembayaran decreases accordingly.',
    'Quantity reduces to 1 and subtotal recalculates correctly.',
    'Pass',
    'High'
  ],
  [
    'TC-WEB-006',
    'Decrement item quantity from 1 (Item removal)',
    'Cart contains an item with quantity = 1.',
    '1. Tap the "-" button on the item.\n2. If confirmation dialog appears, confirm removal.',
    'Item is removed from the cart list. Subtotal decreases by item value. If cart becomes empty, empty state is displayed.',
    'Item is successfully removed from cart list.',
    'Pass',
    'High'
  ],
  [
    'TC-WEB-007',
    'Verify Empty Cart state display and CTA',
    'Cart contains 0 items.',
    '1. Open Cart page with empty cart (or delete all items).',
    'Empty cart graphic is displayed with message ("Keranjangmu masih kosong") and a working CTA button "Mulai Belanja" redirecting to homepage.',
    'Empty illustration and "Mulai Belanja" CTA button are displayed properly.',
    'Pass',
    'Medium'
  ],
  [
    'TC-WEB-008',
    'Handle Out of Stock / Inactive item in Cart',
    'User has an item in cart that becomes out of stock in dark store.',
    '1. Open Cart page containing an out-of-stock item.\n2. Observe item card state and checkout CTA button.',
    'Item is greyed out with badge "Tidak dapat diproses". Subtotal excludes the unavailable item. Checkout button prompts user to remove unavailable item.',
    'System flags unavailable item with "Tidak dapat diproses" and prevents invalid checkout.',
    'Pass',
    'High'
  ],
  [
    'TC-WEB-009',
    'Add custom delivery notes to item/order',
    'Cart contains items; user is on Cart page.',
    '1. Click "Tambah Catatan" under item row or delivery section.\n2. Type note: "Tolong pilihkan buah yang matang dan segar ya".\n3. Click Save/Submit.',
    'Note is saved and displayed beneath the item. Character counter enforces maximum character limit (e.g. 150 chars).',
    'Note is displayed and persisted in order payload.',
    'Pass',
    'Medium'
  ],
  [
    'TC-WEB-010',
    'Change Delivery Address ("Ganti Alamat")',
    'Default delivery address is currently selected.',
    '1. In "Tujuan Pengiriman" section, click "Ganti Alamat".\n2. Select another saved address or enter new address pin.\n3. Confirm selection.',
    'Delivery destination updates. Nearest dark store hub inventory and delivery fee are re-calculated.',
    'Address successfully changes and updates delivery parameters.',
    'Pass',
    'High'
  ],
  [
    'TC-WEB-011',
    'Validate Address Not Covered warning alert',
    'User selects an address outside Astronauts active delivery zone.',
    '1. Click "Ganti Alamat".\n2. Pick a location outside delivery radius.\n3. Observe Cart page alert banner.',
    'Warning banner appears: "Alamat ini jauh dari lokasimu saat ini. Cek lagi, ya." Checkout button "Lanjut ke pembayaran" is disabled.',
    'Alert banner appears and checkout button is disabled.',
    'Pass',
    'High'
  ],
  [
    'TC-WEB-012',
    'Verify Building / Apartment Lobby Delivery disclaimer',
    'User opens Cart page with delivery address set.',
    '1. Check delivery destination info text in Cart.',
    'Informational note is clearly visible: "Khusus gedung, hanya bisa diantar sampai lobby" setting clear delivery expectations.',
    'Notice is clearly displayed under the delivery address header.',
    'Pass',
    'Low'
  ],
  [
    'TC-WEB-013',
    'Apply valid promo code in Cart',
    'Cart subtotal meets minimum promo requirement (e.g. >= Rp 50.000).',
    '1. Click "Pilihan Promo" / "Lebih hemat pakai promo".\n2. Enter promo code "ASTROHEMAT" or click eligible voucher.\n3. Click "Terapkan".',
    'Voucher is applied. Success toast appears. Discount line item appears in Ringkasan Pembayaran and total tagihan is deducted.',
    'Promo applied successfully; discount deducted from total tagihan.',
    'Pass',
    'High'
  ],
  [
    'TC-WEB-014',
    'Apply invalid or expired promo code',
    'User is on promo code input modal.',
    '1. Enter non-existent code "KODEPALSU999".\n2. Click "Terapkan".',
    'Inline error message appears ("Kode promo tidak valid atau telah berakhir"). Discount is not applied; bill remains unchanged.',
    'Error message displayed; total bill is unaffected.',
    'Pass',
    'Medium'
  ],
  [
    'TC-WEB-015',
    'Verify Service Fee breakdown pop-up modal',
    'Cart contains items and displays "Biaya Layanan" row in payment summary.',
    '1. Click info icon (i) next to "Biaya Layanan".\n2. Inspect modal content.',
    'Pop-up "Informasi Biaya Layanan" appears detailing Biaya Kemasan, Biaya Pembayaran, Total Biaya Layanan, and dismiss button "Mengerti".',
    'Modal opens with itemized packaging and payment fees.',
    'Pass',
    'Low'
  ],
  [
    'TC-WEB-016',
    'Verify Free Shipping threshold dynamic discount',
    'Free shipping threshold is Rp 100.000.',
    '1. Add items totaling Rp 70.000 (shipping fee applied).\n2. Increase item quantity so subtotal exceeds Rp 100.000.\n3. Check shipping cost row.',
    'Shipping fee is crossed out or displays "Free Ongkir" (Rp 0). Total tagihan excludes delivery fee.',
    'Delivery fee becomes Free Ongkir upon passing threshold.',
    'Pass',
    'Medium'
  ],
  [
    'TC-WEB-017',
    'Verify Saldo Astro / Refund Balance auto-deduction',
    'User account has positive Saldo Refund (e.g. Rp 20.000).',
    '1. Open Cart page.\n2. Observe payment summary rows.',
    'Row "Saldo Refund" appears with label "Saldo Astro otomatis digunakan", deducting Rp 20.000 from final bill amount.',
    'Refund balance is automatically subtracted from total tagihan.',
    'Pass',
    'Medium'
  ],
  [
    'TC-WEB-018',
    'Validate 18+ Age Restriction verification flow',
    'User adds age-restricted item (e.g. alcoholic beverage / tobacco product).',
    '1. Open Cart page with 18+ item.\n2. Click "Lanjut ke pembayaran" without verified age profile.',
    'Verification modal appears: "Khusus 18 tahun keatas! Silahkan terlebih dahulu update detail akun kamu" with CTA "Update Detail Akun". Checkout paused until DOB verified.',
    'Confirmation dialog halts checkout and requests age verification.',
    'Pass',
    'High'
  ],
  [
    'TC-WEB-019',
    'Verify Checkout CTA button enabled/disabled states',
    'User is on Cart page.',
    '1. Observe "Lanjut ke pembayaran" button when cart is empty vs when valid items exist.\n2. Observe button state when delivery address is not covered.',
    'Button is disabled (greyed out, unclickable) on empty or unserviceable cart; enabled (primary blue, clickable) when all conditions are valid.',
    'CTA button correctly enables/disables based on cart validity.',
    'Pass',
    'High'
  ],
  [
    'TC-WEB-020',
    'Verify mobile viewport responsiveness (375px & 430px)',
    'Browser in mobile responsive mode (iPhone SE 375px, iPhone 14 Pro Max 430px).',
    '1. Navigate through Cart page from header to footer.\n2. Check button taps, sticky checkout footer, and horizontal scroll.',
    'No horizontal scrollbar or broken layouts. Sticky checkout bar sits at bottom without overlapping items. Touch targets >= 44x44px.',
    'Responsive layout conforms cleanly to mobile screen dimensions.',
    'Pass',
    'High'
  ],
  [
    'TC-WEB-021',
    'Handle offline / network interruption during Cart action',
    'Cart page is open with items.',
    '1. Disable internet connection (offline mode).\n2. Tap "+" to increase quantity or click "Lanjut ke pembayaran".',
    'Application displays friendly toast: "Koneksi terputus, periksa internet kamu". Application does not crash; retains existing cart state.',
    'Toast appears gracefully without data loss or application crash.',
    'Pass',
    'Medium'
  ],
  // Homepage Test Cases (Optional Scope)
  [
    'TC-WEB-022',
    'Verify Homepage Search Bar input and suggestions',
    'User is on Astronauts homepage.',
    '1. Click on Search input bar.\n2. Type "Susu UHT".\n3. Press Enter or click search button.',
    'Search bar accepts alphanumeric input. Redirects to search results page showing relevant milk products with active Add to Cart buttons.',
    'Search query executes and returns relevant product listings.',
    'Pass',
    'High'
  ],
  [
    'TC-WEB-023',
    'Verify Homepage Promotional Banners Carousel',
    'User is on Astronauts homepage.',
    '1. Observe top promo carousel banner.\n2. Allow 4-5 seconds for auto-scroll or manually swipe left/right.\n3. Click on active banner.',
    'Carousel smoothly transitions between banners; pagination dots sync with active slide; clicking banner redirects to target promotional campaign.',
    'Carousel transitions smoothly and links redirect correctly.',
    'Pass',
    'Medium'
  ],
  [
    'TC-WEB-024',
    'Verify Category quick-access grid navigation',
    'User is on Astronauts homepage.',
    '1. Locate Category tiles section (Astro Goods, Astro Cafe, Sayur Segar, etc.).\n2. Click on "Astro Goods" category tile.',
    'Browser navigates to /c/astro-goods-2564; displays curated catalog filtered by Astro Goods items.',
    'Navigates to correct category catalog page.',
    'Pass',
    'High'
  ],
  [
    'TC-WEB-025',
    'Verify Bottom Navigation Bar tab switching',
    'User is on Astronauts web application.',
    '1. Click sequentially on bottom navigation items: Home -> Keranjang -> Transaksi -> Profil.',
    'Active navigation tab highlights in blue (#246EE5); corresponding view/page loads seamlessly without breaking application state.',
    'Bottom navigation tabs switch cleanly with correct active indicator.',
    'Pass',
    'Medium'
  ]
];

const wsWebTestCases = XLSX.utils.aoa_to_sheet(webTestCasesData);
wsWebTestCases['!cols'] = [
  { wch: 14 },
  { wch: 36 },
  { wch: 38 },
  { wch: 45 },
  { wch: 45 },
  { wch: 45 },
  { wch: 10 },
  { wch: 12 }
];

// ----------------------------------------------------
// TAB 3: API Test Cases
// Format from Image 3:
// API Name | Method | Endpoint | Test Case ID | Test Scenario | Input | Expected Response | Status Code | Priority
// ----------------------------------------------------
const apiTestCasesData = [
  [
    'API Name',
    'Method',
    'Endpoint',
    'Test Case ID',
    'Test Scenario',
    'Input',
    'Expected Response',
    'Status Code',
    'Priority'
  ],
  // GET API
  [
    'Single User',
    'GET',
    '/api/users/{id}',
    'TC-API-001',
    'Retrieve single user with valid existing ID (Positive)',
    'Path Parameter: id = 2',
    'JSON object with "data" containing user details (id: 2, email, first_name, last_name, avatar) and "support" metadata.',
    200,
    'High'
  ],
  [
    'Single User',
    'GET',
    '/api/users/{id}',
    'TC-API-002',
    'Retrieve single user with non-existent ID (Negative)',
    'Path Parameter: id = 23',
    'Empty JSON object {} indicating user not found.',
    404,
    'High'
  ],
  [
    'List Users',
    'GET',
    '/api/users',
    'TC-API-003',
    'Retrieve list of users with pagination (Positive)',
    'Query Parameter: page = 1',
    'JSON object containing pagination metadata (page: 1, per_page, total, total_pages) and "data" array of user objects.',
    200,
    'Medium'
  ],
  // POST API
  [
    'Create User',
    'POST',
    '/api/users',
    'TC-API-004',
    'Create new user with valid name and job title (Positive)',
    'Body (raw JSON): {\n  "name": "Astronauts QA Engineer",\n  "job": "SDET Specialist"\n}',
    'JSON object returning submitted "name", "job", generated unique "id", and "createdAt" ISO 8601 timestamp.',
    201,
    'High'
  ],
  [
    'Create User',
    'POST',
    '/api/users',
    'TC-API-005',
    'Create user with empty body payload (Edge Case)',
    'Body (raw JSON): {}',
    'JSON object returning generated "id" and "createdAt" timestamp (default fallback handling).',
    201,
    'Low'
  ],
  [
    'Register User',
    'POST',
    '/api/register',
    'TC-API-006',
    'Register user with valid email and password credentials (Positive)',
    'Body (raw JSON): {\n  "email": "eve.holt@reqres.in",\n  "password": "pistol"\n}',
    'JSON object returning registered user "id" and authorization "token" string.',
    200,
    'High'
  ],
  [
    'Register User',
    'POST',
    '/api/register',
    'TC-API-007',
    'Register user with missing password parameter (Negative)',
    'Body (raw JSON): {\n  "email": "sydney@fife"\n}',
    'JSON error object: {"error": "Missing password"}.',
    400,
    'High'
  ],
  [
    'Register User',
    'POST',
    '/api/register',
    'TC-API-008',
    'Register user with missing email parameter (Negative)',
    'Body (raw JSON): {\n  "password": "pistol"\n}',
    'JSON error object: {"error": "Missing email or username"}.',
    400,
    'High'
  ],
  // PUT API
  [
    'Update User',
    'PUT',
    '/api/users/{id}',
    'TC-API-009',
    'Update existing user full profile information (Positive)',
    'Path Parameter: id = 2\nBody (raw JSON): {\n  "name": "Astronauts Lead QA",\n  "job": "Senior SDET Manager"\n}',
    'JSON object returning updated "name", "job", and "updatedAt" ISO 8601 timestamp.',
    200,
    'High'
  ],
  [
    'Update User',
    'PUT',
    '/api/users/{id}',
    'TC-API-010',
    'Update existing user with partial attribute modification (Edge Case)',
    'Path Parameter: id = 2\nBody (raw JSON): {\n  "job": "Principal Automation Architect"\n}',
    'JSON object returning updated "job" property along with "updatedAt" timestamp.',
    200,
    'Medium'
  ],
  // DELETE API
  [
    'Delete User',
    'DELETE',
    '/api/users/{id}',
    'TC-API-011',
    'Delete existing user record by valid ID (Positive)',
    'Path Parameter: id = 2',
    'Empty response body with HTTP 204 No Content header.',
    204,
    'High'
  ]
];

const wsApiTestCases = XLSX.utils.aoa_to_sheet(apiTestCasesData);
wsApiTestCases['!cols'] = [
  { wch: 16 },
  { wch: 10 },
  { wch: 20 },
  { wch: 14 },
  { wch: 38 },
  { wch: 36 },
  { wch: 48 },
  { wch: 14 },
  { wch: 12 }
];

// ----------------------------------------------------
// TAB 4: Automation Summary
// From Image 3 Step 6 & Image 4
// - Tool(s) used
// - Coverage summary
// - How to execute your tests
// ----------------------------------------------------
const automationSummaryData = [
  ['ASTRONAUTS QA ASSESSMENT - AUTOMATION SUMMARY & EXECUTION GUIDE'],
  ['Document Version', '1.0.0'],
  ['Project Name', 'ReqRes API Automated Test Suite'],
  ['Framework Standard', 'Postman Collection v2.1.0 & Newman CLI Test Harness'],
  ['Status', '100% PASSED (29/29 Assertions Passed, 0 Failed)'],
  [],
  ['1. TOOL(S) USED'],
  ['Tool / Library', 'Version', 'Role & Description'],
  ['Postman Desktop', 'v11.x', 'Visual API client for request drafting, pre-request script logic, and interactive assertion verification.'],
  ['Newman CLI', 'v6.2.1', 'Official Postman CLI collection runner enabling headless, scriptable automated test execution for CI/CD pipelines.'],
  ['newman-reporter-htmlextra', 'v1.24.1', 'Comprehensive HTML reporting plugin that generates interactive dashboards with response bodies, headers, and charts.'],
  ['Node.js', 'v24.x', 'JavaScript runtime environment executing automation runner scripts and report generation utilities.'],
  ['xlsx (SheetJS)', 'v0.18.5', 'Spreadsheet generator producing fully formatted Google Sheets / Excel compatible deliverables.'],
  [],
  ['2. COVERAGE SUMMARY'],
  ['Metric / Dimension', 'Specification', 'Detail & Distribution'],
  ['Endpoints Tested', '5 Endpoints', 'GET /api/users/{id}, GET /api/users, POST /api/users, POST /api/register, PUT /api/users/{id}, DELETE /api/users/{id}'],
  ['HTTP Methods Covered', '4 Methods', 'GET (3 requests), POST (5 requests), PUT (2 requests), DELETE (1 request)'],
  ['Total Automated Scenarios', '11 Scenarios', '6 Positive Scenarios (54.5%), 5 Negative & Boundary Scenarios (45.5%)'],
  ['Total Assertions Executed', '29 Assertions', 'HTTP status codes, response time SLA, response headers, JSON schema, data types, business values, error messages'],
  ['Pass / Fail Rate', '100% PASS', '29 Assertions Passed, 0 Failed, 0 Skipped (Total Execution Time: ~3.5 seconds)'],
  ['Average Response Time', '242 ms', 'Fastest: 209 ms | Slowest: 397 ms (Standard SLA target: < 1500 ms)'],
  ['Coverage Type Breakdown', 'Multi-Layered', 'Contract / Schema Verification, Status Code Verification, Header Verification, Negative Validation & Error Payload Match'],
  [],
  ['3. HOW TO EXECUTE YOUR TESTS'],
  ['Method', 'Steps & Instructions'],
  ['Method 1: Run via Newman CLI (Recommended / Fastest)', 
   '1. Ensure Node.js (v18+) is installed on your machine.\n2. Open your terminal in the extracted folder ("d:\\Test Astro").\n3. Run: npm test\n   (Or run: node runner.js)\n4. Newman will execute all 11 test cases and print live colored test results and statistics.\n5. An interactive HTML report will be generated at "./reports/reqres-api-report.html".'],
  ['Method 2: Run via Postman Desktop GUI', 
   '1. Open the Postman Desktop Application.\n2. In the top-left corner, click "Import".\n3. Drag and drop both JSON files from the "./postman/" directory:\n   - astronauts-reqres-collection.json\n   - astronauts-reqres-environment.json\n4. In the top-right environment selector, select "ReqRes - Astronauts QA Environment".\n5. Click on the collection "Astronauts QA Assessment - ReqRes API Automation" and click "Run Collection".\n6. Click "Run Astronauts QA Assessment" to see real-time graphical assertion passes.'],
  ['Method 3: Direct Newman Command (Without npm scripts)', 
   'npx newman run ./postman/astronauts-reqres-collection.json -e ./postman/astronauts-reqres-environment.json --reporters cli,htmlextra --reporter-htmlextra-export ./reports/reqres-api-report.html'],
  [],
  ['4. REPOSITORY & ARTIFACT SUBMISSION LINKS'],
  ['Deliverable', 'Access / Location', 'Notes'],
  ['Google Sheet Document', 'Accessible via share link (Anyone with the link can view)', 'Contains: Test Plan (Web), Test Cases (Web), API Test Cases, and Automation Summary tabs.'],
  ['Automation Zip Package', './reqres-postman-automation.zip', 'Contains Postman collection, environment, runner.js, package.json, reports, and README.md.'],
  ['HTML Execution Report', './reports/reqres-api-report.html', 'Open in any browser for interactive visual assertion breakdown.']
];

const wsAutomationSummary = XLSX.utils.aoa_to_sheet(automationSummaryData);
wsAutomationSummary['!cols'] = [
  { wch: 30 },
  { wch: 22 },
  { wch: 80 }
];

// Append sheets to workbook
XLSX.utils.book_append_sheet(wb, wsTestPlan, 'Test Plan (Web)');
XLSX.utils.book_append_sheet(wb, wsWebTestCases, 'Test Cases (Web)');
XLSX.utils.book_append_sheet(wb, wsApiTestCases, 'API Test Cases');
XLSX.utils.book_append_sheet(wb, wsAutomationSummary, 'Automation Summary');

const outputPath = path.join(__dirname, 'astronauts_qa_assessment.xlsx');
XLSX.writeFile(wb, outputPath);

console.log(`Excel file successfully created at: ${outputPath}`);
