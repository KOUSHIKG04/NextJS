import nodemailer from "nodemailer";
import User from "@/model/userModel";
import bcrypt from "bcryptjs";


export const sendEmail = async ({ email, emailType, userID }: any) => {
    try {

        const hashedValue =
            await bcrypt.hash(userID.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(
                userID,
                {
                    verifyToken: hashedValue,
                    verifyTokenExpiry: Date.now() + 3600000
                }
            )
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(
                userID,
                {
                    forgotPasswordToken: hashedValue,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                })
        }


        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS
            }
        });


        const domain = process.env.DOMAIN || "http://localhost:3000";
        const link = `${domain}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashedValue}`;

        const mailOptions = {
            from: 'koushikgdatta5@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `
        <p>
            Click 
            <a href="${link}"> here </a> 
            to ${ emailType === "VERIFY" ? "verify your email" : "reset your password" }  
            or copy and paste the link below in your browser.<br><Strong>${link}</Strong>
        </p>
    `
        };

        const mailresponse = await transport.sendMail(mailOptions); return mailresponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}


