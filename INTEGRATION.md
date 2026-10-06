# Integration & Deployment Guide: Contact Form Intelligence

## 1. Intake & Routing Architecture
* **Intake Endpoint:** REST API endpoint receiving form submissions (`POST /api/intake`).
* **Entity Extraction:** Sub-millisecond rule-based NLP parser extracting budget signals, timelines, and business domain status.
* **Smart Routing:**
  - Corporate domains (`@company.com`) + high budget -> Founder calendar embed on confirmation page.
  - Personal domains (`@gmail.com`) + small scope -> Standard SDR review queue.
  - Spam / unsolicited pitches -> Automated suppression.

## 2. Environment Configuration
```env
PORT=3009
VIP_CALENDAR_URL=https://cal.com/founder/vip-inbound
SLACK_ALERT_WEBHOOK=https://hooks.slack.com/services/xxx
CRM_ENDPOINT=https://api.hubspot.com/crm/v3/objects/contacts
ENFORCE_CORPORATE_EMAIL=false
```

## 3. Resilience & Invariants
* **Fallback Routing:** If parsing fails or yields low confidence, defaults gracefully to standard sales queue without dropping lead.
* **Rate Limiting:** IP-based token bucket prevents automated form spamming.
