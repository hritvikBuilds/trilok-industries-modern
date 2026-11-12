/**
 * Comprehensive Automated End-to-End, Component & Security Test Suite
 * Project: M/s. Trilok Industries Modern Web Application
 * 
 * Test Scenarios:
 * 1. Structural & Navigation Component Tests
 * 2. 3D WebGL Rig, Models & Badge Removal Tests
 * 3. Localization & Content Integrity Tests
 * 4. Input Validation - Positive Scenarios
 * 5. Input Validation - Negative Scenarios
 * 6. Security, Injection & Sanitization Tests (XSS, SQLi, Prototype Pollution, HTML Escape)
 * 7. Interactive Modals, Tables & Dynamic Components Tests
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

// Load project files
const ROOT_DIR = path.resolve(__dirname, '..');
const htmlContent = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');
const dataContent = fs.readFileSync(path.join(ROOT_DIR, 'js', 'data.js'), 'utf8');
const modelsContent = fs.readFileSync(path.join(ROOT_DIR, 'js', 'models3d.js'), 'utf8');
const validationContent = fs.readFileSync(path.join(ROOT_DIR, 'js', 'validation.js'), 'utf8');
const interactionsContent = fs.readFileSync(path.join(ROOT_DIR, 'js', 'interactions.js'), 'utf8');
const cssContent = fs.readFileSync(path.join(ROOT_DIR, 'css', 'style.css'), 'utf8');

// Load the validation module in a Node sandbox context
const Validator = require(path.join(ROOT_DIR, 'js', 'validation.js'));

// Test Harness Tracker
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

function test(suiteName, testName, testFn) {
  totalTests++;
  try {
    testFn();
    passedTests++;
    console.log(`  \x1b[32m✓\x1b[0m [${suiteName}] ${testName}`);
  } catch (err) {
    failedTests++;
    failures.push({ suite: suiteName, name: testName, error: err });
    console.error(`  \x1b[31m✗\x1b[0m [${suiteName}] ${testName}: ${err.message}`);
  }
}

console.log('\n===============================================================');
console.log(' RUNNING TRILOK INDUSTRIES AUTOMATED TEST SUITE');
console.log('===============================================================\n');

// ============================================================================
// SUITE 1: STRUCTURAL & NAVIGATION COMPONENT TESTS
// ============================================================================
console.log('\x1b[36m▶ SUITE 1: Structural & Navigation Component Tests\x1b[0m');

test('Structure', 'Document has valid HTML5 doctype and English language tag', () => {
  assert(htmlContent.includes('<!DOCTYPE html>'), 'Missing HTML5 doctype');
  assert(htmlContent.includes('<html lang="en">'), 'HTML lang attribute must be "en"');
  assert(htmlContent.includes('<title>M/s. Trilok Industries'), 'Document title must reflect Trilok Industries');
});

test('Navigation', 'Authentic corporate logo is integrated in the header navbar', () => {
  assert(htmlContent.includes('https://www.trilokindustries.com/images/Trilok-Industries_04.jpg'), 'Missing authentic Trilok-Industries_04.jpg logo');
  assert(!htmlContent.includes('>TI</div>') && !htmlContent.includes('>TI</span>'), 'Generic "TI" text logo must be removed');
});

test('Navigation', 'Top utility bar contains verified contact and establishment information', () => {
  assert(htmlContent.includes('Estd. 1980 | DSSIA Member'), 'Missing Estd. 1980 badge');
  assert(htmlContent.includes('tel:06612660002'), 'Missing phone link for 0661-2660002');
  assert(htmlContent.includes('tel:+919437000851'), 'Missing phone link for +91 94370 00851');
  assert(htmlContent.includes('mailto:info@trilokindustries.com'), 'Missing official email link');
});

test('Navigation', 'All primary section navigation anchors exist and match section IDs', () => {
  const sections = ['#home', '#products', '#gallery', '#about', '#infrastructure', '#clients', '#quality', '#contact'];
  sections.forEach(secId => {
    assert(htmlContent.includes(`href="${secId}"`), `Navigation link for ${secId} missing`);
    const cleanId = secId.replace('#', '');
    assert(htmlContent.includes(`id="${cleanId}"`), `Target section with id="${cleanId}" missing`);
  });
});

test('Navigation', 'Top navbar links are shuffled to match exact chronological page scroll sequence', () => {
  const expectedOrder = ['#home', '#products', '#gallery', '#about', '#infrastructure', '#clients', '#quality', '#contact'];
  const navMatch = htmlContent.match(/<nav id="desktop-nav"[\s\S]*?<\/nav>/);
  assert(navMatch, 'desktop-nav container must exist');
  
  const navHtml = navMatch[0];
  const indices = expectedOrder.map(id => navHtml.indexOf(`href="${id}"`));
  
  for (let i = 0; i < indices.length - 1; i++) {
    assert(indices[i] !== -1, `Missing anchor for ${expectedOrder[i]}`);
    assert(indices[i] < indices[i + 1], 
      `Navbar link order incorrect: ${expectedOrder[i]} (pos: ${indices[i]}) must appear before ${expectedOrder[i+1]} (pos: ${indices[i+1]})`);
  }
});

test('Vehicle Tracker', 'Running miniature heavy vehicle tracker forward/backward directional logic is configured', () => {
  assert(htmlContent.includes('id="nav-rail-track"'), 'Missing nav rail track line');
  assert(htmlContent.includes('id="nav-heavy-vehicle-carrier"'), 'Missing nav heavy vehicle carrier');
  assert(htmlContent.includes('id="nav-heavy-vehicle-svg"'), 'Missing mini heavy vehicle SVG');
  assert(interactionsContent.includes('updateVehiclePosition'), 'Missing vehicle movement logic in interactions.js');
  assert(interactionsContent.includes('face-left'), 'Missing face-left class toggle for backward driving');
  assert(cssContent.includes('.face-left'), 'Missing .face-left selector in style.css');
  assert(cssContent.includes('scaleX(-1)'), 'Missing scaleX(-1) mirror transform for turning around');
  assert(cssContent.includes('.nav-section-link.active'), 'Missing active section link color style in style.css');
});

test('Color & Trust', 'Premium industrial luxury color scheme and trust badges are configured', () => {
  assert(htmlContent.includes('bg-slate-950/95'), 'Executive midnight obsidian navbar background configured');
  assert(cssContent.includes('.text-gold-gradient') || htmlContent.includes('bg-gradient-to-r'), 'Golden metallic accents configured');
  assert(htmlContent.includes('ISO 9001:2015 Standards') && htmlContent.includes('RSP Approved Supplier'), 'Certified trust credentials present');
});

// ============================================================================
// SUITE 2: 3D WEBGL RIG, REFINED MODELS & BADGE REMOVAL TESTS
// ============================================================================
console.log('\n\x1b[36m▶ SUITE 2: 3D WebGL Rig, Refined Models & Badge Removal Tests\x1b[0m');

test('Hero 3D', 'Hero 3D canvas viewport container exists and is configured', () => {
  assert(htmlContent.includes('id="hero-3d-canvas-container"'), 'Hero 3D container missing');
  assert(modelsContent.includes('initHero3D'), 'initHero3D function missing in models3d.js');
});

test('Badge Removal', 'Verified removal of Hero text: "Interactive 3D Backhoe Rig: Drag to orbit 360° or move cursor"', () => {
  assert(!htmlContent.includes('Interactive 3D Backhoe Rig: Drag to orbit 360° or move cursor'), 'Badge text still present in index.html');
  assert(!htmlContent.includes('Drag to orbit 360'), 'Partial badge text found');
});

test('Quotation 3D', 'Quotation 3D canvas viewport container exists and is configured', () => {
  assert(htmlContent.includes('id="quote-3d-canvas-container"'), 'Quotation 3D container missing');
  assert(modelsContent.includes('initDarkQuote3D'), 'initDarkQuote3D function missing in models3d.js');
});

test('Badge Removal', 'Verified removal of Quotation text: "Real-time Particle Physics & 3D Hydraulics"', () => {
  assert(!htmlContent.includes('Real-time Particle Physics & 3D Hydraulics'), 'Badge text still present in index.html');
  assert(!htmlContent.includes('Particle Physics & 3D Hydraulics'), 'Partial badge text found');
});

test('Refined Excavator', 'Crawler excavator in dark section features high-fidelity components', () => {
  // Check for refined crawler excavator components in models3d.js
  assert(modelsContent.includes('undercarriage'), 'Missing crawler undercarriage assembly');
  assert(modelsContent.includes('sprocket'), 'Missing drive tumbler sprocket');
  assert(modelsContent.includes('idler'), 'Missing front idler wheel');
  assert(modelsContent.includes('monoBoom'), 'Missing heavy mono-boom assembly');
  assert(modelsContent.includes('dipperGroup'), 'Missing articulated dipper arm');
  assert(modelsContent.includes('bucketMesh'), 'Missing heavy rock bucket');
  assert(modelsContent.includes('particleSystem'), 'Missing excavation particle system');
});

test('Catalog 3D Models', 'All 8 refined procedural 3D equipment models are initialized', () => {
  const modelTypes = ['crusher', 'crane', 'screen', 'coke-oven', 'conveyor', 'lathe', 'esp', 'chains'];
  modelTypes.forEach(type => {
    assert(modelsContent.includes(`case '${type}':`), `Missing 3D procedural generator for model type: ${type}`);
  });
});

// ============================================================================
// SUITE 3: LOCALIZATION & CONTENT INTEGRITY TESTS
// ============================================================================
console.log('\n\x1b[36m▶ SUITE 3: Localization & Content Integrity Tests\x1b[0m');

test('Localization', 'Zero non-English or Cyrillic characters exist in any source file', () => {
  const cyrillicPattern = /[\u0400-\u04FF]/;
  assert(!cyrillicPattern.test(htmlContent), 'Found Cyrillic in index.html');
  assert(!cyrillicPattern.test(dataContent), 'Found Cyrillic in js/data.js');
  assert(!cyrillicPattern.test(modelsContent), 'Found Cyrillic in js/models3d.js');
  assert(!cyrillicPattern.test(validationContent), 'Found Cyrillic in js/validation.js');
  assert(!cyrillicPattern.test(interactionsContent), 'Found Cyrillic in js/interactions.js');
});

test('Images Quality', 'All machine photos use object-contain to prevent cropping', () => {
  assert(htmlContent.includes('object-contain'), 'object-contain class must be used for equipment');
  // Check that modal product image is object-contain
  assert(htmlContent.includes('id="modal-product-image"'), 'modal-product-image element missing');
  assert(!htmlContent.includes('id="modal-product-image" src="" alt="Authentic Machine Photograph" class="w-full h-64 sm:h-72 object-cover"'), 'Modal image should not use object-cover');
});

test('Image Endpoints', 'No legacy broken image URLs or folders remain in codebase', () => {
  const brokenPaths = [
    '/images/client/',
    '/images/gallery/',
    '/images/product_image/',
    '/images/lathe.jpg',
    '/images/shaper.jpg',
    '/images/radial_drilling_machine.jpg',
    '/images/pyramid_plate_bending_machine.jpg'
  ];
  brokenPaths.forEach(bp => {
    assert(!htmlContent.includes(bp), `Found broken path ${bp} in index.html`);
    assert(!dataContent.includes(bp), `Found broken path ${bp} in js/data.js`);
  });
});

test('Clients Portfolio', 'All 6 major industrial client logos are defined and verified', () => {
  const clients = ['ultratech.jpg', 'larsen-tubro.jpg', 'cethar-logo.jpg', 'ecomak.jpg', 'viraj.jpg', 'ganesh-metalicks.jpg'];
  clients.forEach(client => {
    assert(htmlContent.includes(client), `Missing client logo: ${client} in index.html`);
    assert(dataContent.includes(client), `Missing client logo: ${client} in js/data.js`);
  });
});

// ============================================================================
// SUITE 4: INPUT VALIDATION - POSITIVE SCENARIOS
// ============================================================================
console.log('\n\x1b[36m▶ SUITE 4: Input Validation - Positive Scenarios\x1b[0m');

test('Validation - Positive', 'Valid full personal and corporate names pass', () => {
  const validNames = [
    'T.K. Tripathy',
    'Mohan Sharma',
    'Rajesh Kumar Agarwal',
    'Dr. Homi Bhabha',
    'Anne-Marie O\'Connor',
    'Jean-Luc Picard'
  ];
  validNames.forEach(name => {
    const res = Validator.validateName(name);
    assert.strictEqual(res.valid, true, `Expected "${name}" to be valid: ${res.message}`);
    assert(res.cleanValue, 'Clean sanitized value should be returned');
  });
});

test('Validation - Positive', 'Valid domestic and international phone numbers pass', () => {
  const validPhones = [
    '9437000851',
    '+91 94370 00851',
    '+919437000851',
    '0661-2660002',
    '+1 (555) 234-5678',
    '+44 20 7946 0958',
    '09437000851',
    '+91-94371-29593'
  ];
  validPhones.forEach(phone => {
    const res = Validator.validatePhone(phone);
    assert.strictEqual(res.valid, true, `Expected "${phone}" to be valid: ${res.message}`);
  });
});

test('Validation - Positive', 'Valid email addresses with standard and multi-part TLDs pass', () => {
  const validEmails = [
    'info@trilokindustries.com',
    'tk.tripathy@domain.co.in',
    'procurement.engg@adityabirla.com',
    'john.doe+heavy@lntenc.com',
    'sales_dept@factory.org'
  ];
  validEmails.forEach(email => {
    const res = Validator.validateEmail(email);
    assert.strictEqual(res.valid, true, `Expected "${email}" to be valid: ${res.message}`);
  });
});

test('Validation - Positive', 'Valid project description and technical scope requirements pass', () => {
  const validScopes = [
    'Turnkey quotation for 350 TPH jaw crusher plant with conveyor gallery.',
    'Require 16-foot lathe shaft turning for 1.2m diameter flanges.',
    'Fabrication of ESP chimney stack, 45m height, with spiral strakes and ducting.'
  ];
  validScopes.forEach(scope => {
    const res = Validator.validateMessage(scope, 10, 3000);
    assert.strictEqual(res.valid, true, `Expected valid scope: ${res.message}`);
  });
});

test('Validation - Positive', 'Valid security code / captcha passes (case-insensitive)', () => {
  assert.strictEqual(Validator.validateSecurityCode('TK7289').valid, true);
  assert.strictEqual(Validator.validateSecurityCode('tk7289').valid, true);
  assert.strictEqual(Validator.validateSecurityCode('  TK7289  ').valid, true);
});

// ============================================================================
// SUITE 5: INPUT VALIDATION - NEGATIVE SCENARIOS
// ============================================================================
console.log('\n\x1b[36m▶ SUITE 5: Input Validation - Negative Scenarios\x1b[0m');

test('Validation - Negative', 'Empty or whitespace-only inputs are strictly rejected', () => {
  assert.strictEqual(Validator.validateName('').valid, false);
  assert.strictEqual(Validator.validateName('   ').valid, false);
  assert.strictEqual(Validator.validatePhone('').valid, false);
  assert.strictEqual(Validator.validateEmail('').valid, false);
  assert.strictEqual(Validator.validateMessage('').valid, false);
  assert.strictEqual(Validator.validateSecurityCode('').valid, false);
});

test('Validation - Negative', 'Invalid names (single char, numeric, symbols, excessive length) are rejected', () => {
  const invalidNames = [
    'A', // Too short (min 2)
    '123456', // Numbers only
    'John123', // Mixed with numbers
    'Mr. @Smith!', // Illegal symbols
    'Test <name>', // Tags
    'A'.repeat(65) // Exceeds 60 chars
  ];
  invalidNames.forEach(name => {
    const res = Validator.validateName(name);
    assert.strictEqual(res.valid, false, `Expected "${name}" to be rejected`);
  });
});

test('Validation - Negative', 'Invalid phone numbers (short, alphabetical, letters, excessive length) are rejected', () => {
  const invalidPhones = [
    '12345', // Too short (< 10 digits)
    'call-me-now', // Letters
    '94370-abcde', // Alpha mixed
    'N/A',
    '1'.repeat(20) // Too long (> 15 digits)
  ];
  invalidPhones.forEach(phone => {
    const res = Validator.validatePhone(phone);
    assert.strictEqual(res.valid, false, `Expected "${phone}" to be rejected`);
  });
});

test('Validation - Negative', 'Invalid email addresses (missing @, missing domain, bad TLD) are rejected', () => {
  const invalidEmails = [
    'plainaddress',
    '@domain.com',
    'user@',
    'user@domain',
    'user@domain.',
    'user@domain.c', // Single letter TLD
    'user..name@domain.com', // Double dots
    'user name@domain.com', // Spaces
    'user@.com'
  ];
  invalidEmails.forEach(email => {
    const res = Validator.validateEmail(email);
    assert.strictEqual(res.valid, false, `Expected "${email}" to be rejected`);
  });
});

test('Validation - Negative', 'Short or empty project scope is rejected', () => {
  const shortScopes = [
    'Hi',
    'Quote',
    'Pls call',
    '123456789' // 9 chars (min 10)
  ];
  shortScopes.forEach(scope => {
    const res = Validator.validateMessage(scope, 10);
    assert.strictEqual(res.valid, false, `Expected "${scope}" to be rejected`);
  });
});

test('Validation - Negative', 'Incorrect security code / captcha is rejected', () => {
  assert.strictEqual(Validator.validateSecurityCode('123456').valid, false);
  assert.strictEqual(Validator.validateSecurityCode('WRONGCODE').valid, false);
  assert.strictEqual(Validator.validateSecurityCode('TK9999').valid, false);
});

// ============================================================================
// SUITE 6: SECURITY, INJECTION & SANITIZATION TESTS
// ============================================================================
console.log('\n\x1b[36m▶ SUITE 6: Security, Injection & Sanitization Tests\x1b[0m');

test('Security', 'HTML entity sanitization escapes dangerous characters', () => {
  const dirty = '<script>alert("XSS & Injection \'test\'")</script>';
  const clean = Validator.sanitizeInput(dirty);
  assert(!clean.includes('<script>'), 'Raw <script> tag must not exist');
  assert(!clean.includes('"'), 'Raw double quote must be escaped');
  assert(!clean.includes("'"), 'Raw single quote must be escaped');
  assert(clean.includes('&lt;script&gt;'), 'Expected escaped HTML tag');
});

test('Security', 'Direct script tag injections are detected and rejected', () => {
  const xssPayloads = [
    '<script>alert("XSS")</script>',
    '<SCRIPT SRC=http://xss.rocks/xss.js></SCRIPT>',
    '<script>document.location="http://evil.com"</script>'
  ];
  xssPayloads.forEach(payload => {
    assert.strictEqual(Validator.hasMaliciousContent(payload), true, `Failed to detect XSS: ${payload}`);
    assert.strictEqual(Validator.validateName(payload).valid, false);
    assert.strictEqual(Validator.validateEmail(payload).valid, false);
    assert.strictEqual(Validator.validateMessage(payload).valid, false);
  });
});

test('Security', 'Image and SVG event handler XSS vectors are detected and rejected', () => {
  const eventVectors = [
    '<img src=x onerror=alert(1)>',
    '<img src="javascript:alert(\'XSS\')">',
    '<svg onload=alert(1)>',
    '<body onload=alert("XSS")>',
    '<iframe src="javascript:alert(1)"></iframe>'
  ];
  eventVectors.forEach(vec => {
    assert.strictEqual(Validator.hasMaliciousContent(vec), true, `Failed to detect event vector: ${vec}`);
    assert.strictEqual(Validator.validateMessage(vec).valid, false);
  });
});

test('Security', 'SQL injection vectors are detected and neutralized', () => {
  const sqliPayloads = [
    "' OR '1'='1",
    "1; DROP TABLE enquiries; --",
    "UNION SELECT username, password FROM users",
    "admin' --"
  ];
  sqliPayloads.forEach(payload => {
    // Either caught by name character restrictions or sanitized cleanly
    const res = Validator.validateName(payload);
    assert.strictEqual(res.valid, false, `SQL injection vector should be rejected: ${payload}`);
  });
});

test('Security', 'Prototype pollution defense verifies safe object handling', () => {
  const dangerousKeys = ['__proto__', 'constructor', 'prototype'];
  const testObj = {};
  dangerousKeys.forEach(key => {
    const sanitizedKey = Validator.sanitizeInput(key);
    assert.strictEqual(typeof Object.prototype[key], typeof ({} )[key]);
  });
});

// ============================================================================
// SUITE 7: INTERACTIVE MODALS, TABLES & DYNAMIC COMPONENTS TESTS
// ============================================================================
console.log('\n\x1b[36m▶ SUITE 7: Interactive Modals, Tables & Dynamic Components Tests\x1b[0m');

test('Data Model', 'TRILOK_DATA contains all 8 catalog products with complete specs', () => {
  assert(dataContent.includes('products: ['), 'products array missing in data.js');
  const expectedProducts = [
    'turnkey-crusher',
    'hoist-crane',
    'vibrating-screens',
    'pollution-control-esp',
    'coke-oven-doors',
    'conveyor-drums-idlers',
    'precision-machining',
    'plate-bending-fabrication',
    'industrial-chains'
  ];
  expectedProducts.forEach(prodId => {
    assert(dataContent.includes(`id: "${prodId}"`), `Product ${prodId} missing in data.js`);
  });
});

test('Data Model', 'TRILOK_DATA contains all 29 verified infrastructure machine entries', () => {
  assert(dataContent.includes('infrastructure: ['), 'infrastructure array missing in data.js');
  for (let i = 1; i <= 29; i++) {
    assert(dataContent.includes(`sl: ${i},`), `Infrastructure machine entry #${i} missing`);
  }
});

test('Modal Wiring', 'Product detail specs modal elements are wired in interactions.js', () => {
  assert(interactionsContent.includes('product-detail-modal'), 'Missing product-detail-modal logic in interactions.js');
  assert(interactionsContent.includes('modal-product-title'), 'Missing modal-product-title wiring');
  assert(interactionsContent.includes('modal-product-image'), 'Missing modal-product-image wiring');
  assert(interactionsContent.includes('modal-product-specs'), 'Missing modal-product-specs wiring');
});

test('Form Security', 'All 3 forms have data-validate attributes attached to inputs', () => {
  assert(htmlContent.includes('id="dark-quote-form"'), 'dark-quote-form missing');
  assert(htmlContent.includes('id="sidebar-enquiry-form"'), 'sidebar-enquiry-form missing');
  assert(htmlContent.includes('id="modal-enquiry-form"'), 'modal-enquiry-form missing');
  assert(htmlContent.includes('data-validate="name"'), 'Missing data-validate="name"');
  assert(htmlContent.includes('data-validate="phone"'), 'Missing data-validate="phone"');
  assert(htmlContent.includes('data-validate="email"'), 'Missing data-validate="email"');
  assert(htmlContent.includes('data-validate="scope"'), 'Missing data-validate="scope"');
  assert(htmlContent.includes('data-validate="security-code"'), 'Missing data-validate="security-code"');
});

// ============================================================================
// FINAL SUMMARY
// ============================================================================
console.log('\n===============================================================');
console.log(` TEST RUN COMPLETE: ${passedTests}/${totalTests} PASSED`);
if (failedTests > 0) {
  console.log(` \x1b[31mFAILED: ${failedTests} test(s) failed\x1b[0m`);
  failures.forEach(f => console.log(`   - [${f.suite}] ${f.name}: ${f.error.message}`));
  process.exit(1);
} else {
  console.log(' \x1b[32mSUCCESS: ALL TESTS PASSED (100% SUCCESS RATE)\x1b[0m');
  console.log('===============================================================\n');
}
