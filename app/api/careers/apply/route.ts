import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { email, fullName } = await request.json();

    if (!email || !fullName) {
      return NextResponse.json(
        { error: "Email and Full Name are required" },
        { status: 400 }
      );
    }

    const host = process.env.SMTP_HOST || "smtpout.secureserver.net";
    const port = parseInt(process.env.SMTP_PORT || "465");
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const fromName = process.env.SMTP_FROM_NAME || "Codemates India";

    if (!user || !pass) {
      console.warn("SMTP credentials are not configured in environment variables.");
      return NextResponse.json(
        { error: "Mail configuration error: SMTP credentials are not configured." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465, false for other ports
      auth: {
        user,
        pass,
      },
    });

    const mailOptions = {
      from: `"${fromName}" <${user}>`,
      to: email,
      subject: "Application Received - Codemates India",
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1a202c;">
          <div style="text-align: center; border-bottom: 2px solid #edf2f7; padding-bottom: 20px; margin-bottom: 20px;">
            <h1 style="color: #06b6d4; margin: 0; font-size: 28px; font-weight: 800;">Codemates India</h1>
            <p style="color: #718096; margin: 5px 0 0 0; font-size: 14px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">Application Acknowledgment</p>
          </div>
          
          <div style="line-height: 1.6; font-size: 16px;">
            <p>Dear <strong>${fullName}</strong>,</p>
            <p>Thank you for submitting your application to join <strong>Codemates India</strong> as a Founding Growth Partner.</p>
            <p>We have received your application and resume successfully. Our team is currently reviewing your profile, answers, and vision to see how they align with our goals.</p>
            
            <div style="background-color: #f7fafc; border-left: 4px solid #06b6d4; padding: 15px; margin: 25px 0; border-radius: 0 8px 8px 0;">
              <h3 style="margin: 0 0 8px 0; color: #2d3748; font-size: 16px;">What's next?</h3>
              <ul style="margin: 0; padding-left: 20px; color: #4a5568;">
                <li style="margin-bottom: 6px;"><strong>Application Review:</strong> We analyze alignment with our partner framework.</li>
                <li style="margin-bottom: 6px;"><strong>Introductory Sync:</strong> If there's an initial match, we will invite you to a short call.</li>
              </ul>
            </div>
            
            <p>We appreciate the time and effort you put into sharing your details with us.</p>
            <p style="margin-top: 30px;">Best regards,</p>
            <p style="margin: 0; font-weight: 700; color: #2d3748;">The Codemates Team</p>
          </div>
          
          <div style="text-align: center; border-top: 1px solid #edf2f7; padding-top: 20px; margin-top: 30px; font-size: 12px; color: #a0aec0;">
            <p style="margin: 0;">&copy; 2026 Codemates India. All rights reserved.</p>
            <p style="margin: 5px 0 0 0;">This is an automated confirmation of your application.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Confirmation email sent successfully" });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send confirmation email" },
      { status: 500 }
    );
  }
}
