const test = require('node:test');
const assert = require('node:assert/strict');
const { ContactFormIntelligenceEngine } = require('../src/index.js');

test('FormIntelligence: routes enterprise urgent request to VIP calendar', () => {
  const inquiry = {
    name: 'VP of Technology',
    email: 'marcus@enterprise-corp.com',
    message: 'We have an urgent enterprise need to build a custom API automation system for our 200-person team.'
  };

  const parsed = ContactFormIntelligenceEngine.parseInquiry(inquiry);
  assert.equal(parsed.serviceCategory, 'ENGINEERING_SERVICES');
  assert.equal(parsed.isUrgent, true);
  assert.equal(parsed.budgetTier, 'ENTERPRISE');
  assert.equal(parsed.isBusinessEmail, true);
  assert.ok(parsed.qualificationScore >= 80);
  assert.equal(parsed.routeDestination, 'VIP_CALENDAR_INSTANT_DISPATCH');
});

test('FormIntelligence: identifies low-priority budget inquiries', () => {
  const inquiry = {
    name: 'Student',
    email: 'user123@gmail.com',
    message: 'Looking for a free or lowest price quote for basic setup.'
  };

  const parsed = ContactFormIntelligenceEngine.parseInquiry(inquiry);
  assert.equal(parsed.budgetTier, 'BUDGET_CONSTRAINED');
  assert.equal(parsed.isBusinessEmail, false);
  assert.ok(parsed.qualificationScore < 50);
  assert.equal(parsed.routeDestination, 'STANDARD_INBOUND_QUEUE');
});
