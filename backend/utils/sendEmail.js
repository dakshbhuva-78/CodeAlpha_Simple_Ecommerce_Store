import nodemailer from "nodemailer";

const sendEmail = async (to, subject, html) => {
    try {

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            connectionTimeout: 30000,
            greetingTimeout: 30000,
            socketTimeout: 30000,
        });

        await transporter.verify();

        console.log("SMTP Connected");

        const info = await transporter.sendMail({
            from: `"AppleStore" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });

        console.log("EMAIL SENT");
        console.log(info);

    } catch (err) {

        console.error("EMAIL ERROR");
        console.error(err);

        throw err;
    }
};

export default sendEmail;