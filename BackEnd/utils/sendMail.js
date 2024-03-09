const nodemailer = require("nodemailer");

const sendMail = async({email,token}) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: 587,
            secure: false,
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD,
            },
        });

        const info = await transporter.sendMail({
            from:`"Nike Clone" <${process.env.EMAIL}>`,
            to:email,
            subject:"Link to reset password",
            text: `Your link to reset password is ${process.env.HOST_BASE_URL}/reset-password/${token}`
        });
    } catch (error) {
        console.log(`${error}`);
    }
}