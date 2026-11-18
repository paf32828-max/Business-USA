import { NextRequest, NextResponse } from 'next/server';

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  serviceInterest?: string;
  message?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid request payload.' },
      { status: 400 }
    );
  }

  const name = (body.name ?? '').trim();
  const email = (body.email ?? '').trim();
  const phone = (body.phone ?? '').trim();
  const serviceInterest = (body.serviceInterest ?? '').trim();
  const message = (body.message ?? '').trim();

  const fieldErrors: Record<string, string> = {};

  if (name.length < 2) {
    fieldErrors.name = 'Please enter your full name (at least 2 characters).';
  }
  if (!EMAIL_REGEX.test(email)) {
    fieldErrors.email = 'Please provide a valid email address.';
  }
  if (phone.replace(/\D/g, '').length < 7) {
    fieldErrors.phone = 'Please enter a valid phone number.';
  }
  if (!serviceInterest) {
    fieldErrors.serviceInterest = 'Please select a service interest.';
  }
  if (message.length < 10) {
    fieldErrors.message = 'Please share a brief overview (at least 10 characters).';
  }

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Please review the highlighted fields before submitting.',
        fieldErrors,
      },
      { status: 422 }
    );
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const forwardRes = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'Business USA Website',
          submittedAt: new Date().toISOString(),
          name,
          email,
          phone,
          serviceInterest,
          message,
        }),
      });

      if (!forwardRes.ok) {
        return NextResponse.json(
          {
            ok: false,
            error:
              'Automated email delivery could not be completed right now. Please connect directly via WhatsApp or phone below.',
          },
          { status: 502 }
        );
      }

      return NextResponse.json({
        ok: true,
        delivered: true,
        mode: 'webhook_delivered',
        summary: { name, email, phone, serviceInterest, message },
      });
    } catch {
      return NextResponse.json(
        {
          ok: false,
          error:
            'Unable to reach the configured delivery endpoint. Please use WhatsApp or direct phone support below.',
        },
        { status: 502 }
      );
    }
  }

  // No automated email/SMTP/webhook integration is configured yet:
  // Be transparent and never claim an email was sent.
  return NextResponse.json({
    ok: true,
    delivered: false,
    mode: 'direct_handoff_required',
    summary: { name, email, phone, serviceInterest, message },
  });
}
