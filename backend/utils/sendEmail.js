import nodemailer from "nodemailer";

const sendEmail = async (to, subject, html) => {
    try {

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

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