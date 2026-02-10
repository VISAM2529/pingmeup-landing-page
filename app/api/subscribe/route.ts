import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import clientPromise from "../../../lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 },
      );
    }

    const smtpUser = (process.env.SMTP_USER || "info@pingmeup.in").trim();
    const smtpPass = (process.env.SMTP_PASS || "").trim();
    const smtpHost = (process.env.SMTP_HOST || "smtp.hostinger.com").trim();
    const smtpPort = Number(process.env.SMTP_PORT) || 587;

    console.log("SMTP Config:", {
      host: smtpHost,
      port: smtpPort,
      user: smtpUser,
      passLength: smtpPass.length,
    });

    try {
      const client = await clientPromise;
      const db = client.db(process.env.MONGODB_DB || "pingmeup");
      const waitlist = db.collection("waitlist");

      await waitlist.updateOne(
        { email: email.toLowerCase().trim() },
        {
          $setOnInsert: {
            email: email.toLowerCase().trim(),
            createdAt: new Date(),
            source: "landing_page",
          },
        },
        { upsert: true },
      );

      console.log("Stored subscriber in MongoDB:", email);
    } catch (dbError) {
      console.error("Failed to store subscriber in MongoDB:", dbError);
      return NextResponse.json(
        { error: "Failed to store subscriber. Please try again." },
        { status: 500 },
      );
    }

    // Create transporter using business email
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      ...(smtpPort === 587 && {
        tls: { rejectUnauthorized: false },
      }),
    });

    // Send acknowledgment email to the subscriber
    await transporter.sendMail({
      from: '"PingMeUp" <info@pingmeup.in>',
      to: email,
      subject: "🎉 Welcome to PingMeUp — You're In!",
      html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f3f4f6;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #4F46E5, #7C3AED); padding: 40px 40px 30px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0 0 8px; font-size: 28px; font-weight: 700;">Welcome to PingMeUp! 🚀</h1>
                            <p style="color: rgba(255,255,255,0.85); margin: 0; font-size: 16px;">You've taken the first step to never miss a customer date.</p>
                        </td>
                    </tr>
                    <!-- Body -->
                    <tr>
                        <td style="padding: 40px;">
                            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                                Hey there! 👋
                            </p>
                            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                                Thank you for subscribing to <strong>PingMeUp</strong> — the smartest way to automate customer reminders via WhatsApp.
                            </p>
                            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
                                Here's what you can look forward to:
                            </p>
                            <!-- Features -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                                <tr>
                                    <td style="padding: 12px 16px; background: #EEF2FF; border-radius: 12px;">
                                        <p style="margin: 0; color: #4338CA; font-size: 14px;">✅ Passport & visa expiry tracking</p>
                                    </td>
                                </tr>
                                <tr><td style="height: 8px;"></td></tr>
                                <tr>
                                    <td style="padding: 12px 16px; background: #EEF2FF; border-radius: 12px;">
                                        <p style="margin: 0; color: #4338CA; font-size: 14px;">✅ WhatsApp broadcast messages</p>
                                    </td>
                                </tr>
                                <tr><td style="height: 8px;"></td></tr>
                                <tr>
                                    <td style="padding: 12px 16px; background: #EEF2FF; border-radius: 12px;">
                                        <p style="margin: 0; color: #4338CA; font-size: 14px;">✅ Web + Mobile app access</p>
                                    </td>
                                </tr>
                                <tr><td style="height: 8px;"></td></tr>
                                <tr>
                                    <td style="padding: 12px 16px; background: #EEF2FF; border-radius: 12px; margin-bottom: 8px;">
                                        <p style="margin: 0; color: #4338CA; font-size: 14px;">✅ Automated birthday & anniversary reminders</p>
                                    </td>
                                </tr>
                            </table>
                            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 28px;">
                                We'll keep you posted on updates, early access, and exclusive offers. Stay tuned!
                            </p>
                           
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 24px 40px; background: #F9FAFB; border-top: 1px solid #E5E7EB; text-align: center;">
                            <p style="color: #9CA3AF; font-size: 13px; margin: 0 0 4px;">
                                © ${new Date().getFullYear()} PingMeUp. All rights reserved.
                            </p>
                            <p style="color: #9CA3AF; font-size: 13px; margin: 0;">
                                <a href="https://pingmeup.in" style="color: #6366F1; text-decoration: none;">pingmeup.in</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
            `,
    });

    // Send notification to business email
    await transporter.sendMail({
      from: '"PingMeUp Website" <info@pingmeup.in>',
      to: "info@pingmeup.in",
      subject: `📬 New Subscriber: ${email}`,
      html: `
                <div style="font-family: sans-serif; padding: 20px;">
                    <h2 style="color: #4F46E5;">New Subscription!</h2>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Time:</strong> ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
                    <p><strong>Source:</strong> Landing Page</p>
                </div>
            `,
    });

    return NextResponse.json({
      success: true,
      message: "Subscription successful!",
    });
  } catch (error: any) {
    console.error("Subscription error:", error);
    return NextResponse.json(
      { error: "Failed to process subscription. Please try again." },
      { status: 500 },
    );
  }
}
