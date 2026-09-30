# Contact delivery setup

The form posts to `/api/contact`. All fields are validated in the browser and again on the server. The endpoint bounds the request body to 24KB, rejects unexpected origins, validates opportunity types, prevents header injection, escapes HTML, and checks a honeypot. A bounded per-instance in-memory rate limiter permits five valid attempts per ten minutes per IP hash. It is a best-effort guard, not a distributed limiter; use Vercel Firewall or shared storage for higher-volume abuse control. Messages are not stored by this application.

## Production configuration

In Vercel → azqa-jafar-portfolio → Settings → Environment Variables, add these for Production:

- `RESEND_API_KEY`: the private Resend sending key.
- `CONTACT_FROM`: a sender on a verified Resend domain, for example `Azqa Portfolio <portfolio@your-verified-domain.example>`.
- `CONTACT_TO`: `azqajafar@gmail.com` (the supplied CV address).

`CONTACT_EMAIL` is supported as an alternative recipient variable. No key should use a `NEXT_PUBLIC_` prefix. Do not commit `.env.local` or paste keys into chat. Redeploy after adding or changing environment variables. The site URL automatically uses Vercel's production domain unless explicitly overridden.

Emails contain the visitor's name, email, optional company, opportunity type, subject, message, source path, and UTC timestamp. The subject is `Portfolio Inquiry — [Opportunity Type] — [Visitor Name]`; Reply-To is the validated visitor email. Both plain-text and escaped HTML bodies are sent.

The server only returns success after Resend accepts the message and returns an email ID. Acceptance is not a guarantee that the recipient has received or read it. Verify the provider's delivered event and the recipient inbox for a real delivery test. A failed or unconfigured request displays an honest error plus a prefilled direct-email draft.

Provider references: [send email](https://resend.com/docs/api-reference/emails/send-email), [retrieve email and delivery status](https://resend.com/docs/api-reference/emails/retrieve-email).

## Delivery verification

The session initially found no production environment variables. CONTACT_TO was subsequently configured with the supplied professional address. A real production delivery test remains dependent on configuring the private key and verified sender. Automated UI success/error tests use mocks; they do not send mail and are not evidence of inbox delivery.
