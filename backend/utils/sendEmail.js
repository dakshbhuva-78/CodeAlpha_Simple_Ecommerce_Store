import nodemailer from "nodemailer";
import dns from "dns";

// Force Node.js to use IPv4 first
dns.setDefaultResultOrder("ipv4first");

const sendEmail = async (to, subject, html) => {
    try {

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false,
                family: 4,
            },
            connectionTimeout: 30000,
            greetingTimeout: 30000,
            socketTimeout: 30000,
        });

        await transporter.verify();
        console.log("✅ SMTP Connected");

        const info = await transporter.sendMail({
            from: `"AppleStore" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });

        console.log("✅ Email Sent");
        console.log(info.messageId);

    } catch (err) {

        console.error("❌ EMAIL ERROR");
        console.error(err);

        throw err;
    }
};

export default sendEmail;