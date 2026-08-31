import sendEmail from "../config/email.js";

export const sendOTPEmail = async (to, otp) => {
  const subject = "Reset Your CraveIt Password";

  const message = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>CraveIt OTP</title>
      </head>

      <body style="margin:0; padding:0; background-color:#FBF3E7; font-family:Arial, Helvetica, sans-serif;">

        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#FBF3E7;">
          <tr>
            <td align="center">

              <table width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px; background-color:#FFFFFF;">

                <!-- Header -->
                <tr>
                  <td style="background-color:#1F1811; padding:25px; text-align:center; border-bottom:4px solid #E8491D;">
                    <h1 style="margin:0; color:#FBF3E7; font-size:26px; font-weight:bold;">
                      Crave<span style="color:#E8491D;">It</span>
                    </h1>

                    <p style="margin:6px 0 0; color:#8A7C6A; font-size:10px; letter-spacing:1.5px; text-transform:uppercase;">
                      Password Reset
                    </p>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:30px; color:#1F1811;">

                    <h2 style="margin:0 0 15px; font-size:22px;">
                      Verify your identity
                    </h2>

                    <p style="margin:0 0 20px; font-size:14px; line-height:22px; color:#5F5143;">
                      Use the OTP below to reset your CraveIt password.
                    </p>

                    <!-- OTP -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center" style="background-color:#FBF3E7; padding:22px;">
                          <p style="margin:0 0 8px; font-size:10px; font-weight:bold; letter-spacing:1.5px; color:#8A7C6A; text-transform:uppercase;">
                            Your OTP
                          </p>

                          <p style="margin:0; font-size:30px; font-weight:bold; letter-spacing:8px; color:#E8491D;">
                            ${otp}
                          </p>
                        </td>
                      </tr>
                    </table>

                    <p style="margin:20px 0 0; font-size:12px; line-height:20px; color:#8A7C6A;">
                      This OTP is valid for <strong style="color:#1F1811;">5 minutes</strong>. Do not share it with anyone.
                    </p>

                    <p style="margin:12px 0 0; font-size:12px; line-height:20px; color:#8A7C6A;">
                      If you didn't request this, you can safely ignore this email.
                    </p>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color:#1F1811; padding:16px; text-align:center;">
                    <p style="margin:0; font-size:10px; color:#8A7C6A;">
                      © ${new Date().getFullYear()} CraveIt. All rights reserved.
                    </p>
                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>

      </body>
    </html>
  `;

  await sendEmail(to, subject, message);
};
