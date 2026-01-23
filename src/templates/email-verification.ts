import config from "../config";
import { IEmailTemplatePayload } from "../types/email";

export const emailVerification = (data: IEmailTemplatePayload) => {
  const { token, name } = data;
  return `
        <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Verification</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f3f4f6;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto, Helvetica, Arial, sans-serif;
    }

    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    }

    .header {
      background: linear-gradient(135deg, #2563eb, #1e40af);
      padding: 28px 20px;
      text-align: center;
      color: #ffffff;
    }

    .header img {
      max-width: 110px;
      margin-bottom: 12px;
    }

    .header h2 {
      margin: 0;
      font-size: 22px;
      font-weight: 600;
      letter-spacing: 0.3px;
    }

    .content {
      padding: 40px 32px;
      text-align: center;
      color: #1f2937;
    }

    .content h1 {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 16px;
    }

    .content p {
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 28px;
      color: #4b5563;
    }

    .btn {
      display: inline-block;
      padding: 14px 34px;
      font-size: 15px;
      font-weight: 600;
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 8px;

      background: linear-gradient(180deg, #2563eb 0%, #1e40af 100%);
      box-shadow: 0 6px 14px rgba(37, 99, 235, 0.35);

      letter-spacing: 0.4px;
    }

    .btn:hover {
      opacity: 0.95;
    }

    .link-fallback {
      margin-top: 32px;
      font-size: 14px;
      color: #6b7280;
      word-break: break-all;
    }

    .link-fallback a {
      color: #2563eb;
      text-decoration: none;
    }

    .footer {
      padding: 24px;
      text-align: center;
      font-size: 12px;
      color: #9ca3af;
      background-color: #f9fafb;
    }

    @media (max-width: 600px) {
      .content {
        padding: 28px 20px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <!-- Optional logo -->
      <img src=${config.app_logo} alt="Logo" />
      <h2>Verify Your Email</h2>
    </div>

    <!-- Content -->
    <div class="content">
      <h1>Hello ${name}👋</h1>
      <p>
        Thank you for signing up. To keep your account secure and activate
        all features, please verify your email address by clicking the button
        below.
      </p>

      <a
        href="${config.frontend_url}/verify-email?token=${token}"
        class="btn"
      >
        Verify Email Address
      </a>

      <div class="link-fallback">
        <p>
          If the button doesn’t work, copy and paste this link into your browser:
        </p>
        <a href="${config.frontend_url}/verify-email?token=${token}">
          ${config.frontend_url}/verify-email?token=${token}
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      &copy; 2026 ${config.app_name}. All rights reserved.<br />
      If you didn’t create an account, you can safely ignore this email.
    </div>
  </div>
</body>
</html>
`;
};
