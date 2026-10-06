/**
 * @gideon/contact-form-intelligence
 * Project #09 in the Master 50 Business Problem & Revenue Leak Weapons
 * 
 * Commercial Mission:
 * Replaces dumb contact forms by parsing inquiries into structured intent,
 * extracting urgency and budget tiers, and routing high-value prospects instantly.
 */

class ContactFormIntelligenceEngine {
  static parseInquiry(raw) {
    if (!raw || typeof raw !== 'object') {
      throw new Error('Expected raw inquiry object');
    }

    const message = (raw.message || '').toLowerCase();
    const email = (raw.email || '').toLowerCase();
    const name = (raw.name || 'Anonymous').trim();

    // 1. Detect Urgency
    const urgentKeywords = ['urgent', 'emergency', 'asap', 'today', 'immediately', 'critical', 'now'];
    const isUrgent = urgentKeywords.some(k => message.includes(k));

    // 2. Detect Service Intent
    let serviceCategory = 'GENERAL_INQUIRY';
    if (message.includes('roof') || message.includes('leak') || message.includes('shingle')) serviceCategory = 'ROOFING_INSPECTION';
    else if (message.includes('teeth') || message.includes('implant') || message.includes('dental')) serviceCategory = 'DENTAL_CARE';
    else if (message.includes('app') || message.includes('software') || message.includes('api') || message.includes('automation')) serviceCategory = 'ENGINEERING_SERVICES';
    else if (message.includes('legal') || message.includes('contract') || message.includes('dispute')) serviceCategory = 'LEGAL_MATTER';

    // 3. Detect Budget / Scale
    let budgetTier = 'UNKNOWN';
    if (message.includes('enterprise') || message.includes('50k') || message.includes('100k') || message.includes('large team')) {
      budgetTier = 'ENTERPRISE';
    } else if (message.includes('5k') || message.includes('10k') || message.includes('premium')) {
      budgetTier = 'MID_MARKET';
    } else if (message.includes('cheap') || message.includes('free') || message.includes('lowest price')) {
      budgetTier = 'BUDGET_CONSTRAINED';
    }

    // 4. Calculate Qualification Score (0-100)
    let score = 50; // baseline
    const isBusinessEmail = email && !['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'].some(d => email.endsWith(d));
    if (isBusinessEmail) score += 20;
    if (budgetTier === 'ENTERPRISE') score += 25;
    else if (budgetTier === 'MID_MARKET') score += 15;
    else if (budgetTier === 'BUDGET_CONSTRAINED') score -= 25;
    if (isUrgent) score += 10;
    if (message.length > 50) score += 10;

    const finalScore = Math.min(100, Math.max(0, score));

    // 5. Intelligent Routing
    let routeDestination = 'STANDARD_INBOUND_QUEUE';
    if (finalScore >= 80 || budgetTier === 'ENTERPRISE') {
      routeDestination = 'VIP_CALENDAR_INSTANT_DISPATCH';
    } else if (isUrgent) {
      routeDestination = 'ON_CALL_DISPATCHER';
    }

    return {
      name,
      email,
      serviceCategory,
      isUrgent,
      budgetTier,
      isBusinessEmail,
      qualificationScore: finalScore,
      routeDestination,
      suggestedFirstTouchAction: routeDestination === 'VIP_CALENDAR_INSTANT_DISPATCH' 
        ? 'Send instant calendar link to Founder VIP link with priority booking'
        : (isUrgent ? 'Trigger instant SMS notification to on-call technician' : 'Queue in CRM standard follow-up')
    };
  }
}

module.exports = {
  ContactFormIntelligenceEngine
};
