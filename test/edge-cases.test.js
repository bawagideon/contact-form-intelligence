const test = require('node:test');
const assert = require('node:assert/strict');
const { ContactFormIntelligenceEngine } = require('../src/index.js');

test('FormIntelligence Edge Cases: handles empty message and email safely', () => {
  const parsed = ContactFormIntelligenceEngine.parseInquiry({});
  assert.equal(parsed.serviceCategory, 'GENERAL_INQUIRY');
  assert.equal(parsed.isUrgent, false);
  assert.equal(parsed.budgetTier, 'UNKNOWN');
  assert.ok(parsed.qualificationScore >= 0);
});

test('FormIntelligence Edge Cases: rejects null input', () => {
  assert.throws(() => ContactFormIntelligenceEngine.parseInquiry(null), /Expected raw inquiry object/);
});
