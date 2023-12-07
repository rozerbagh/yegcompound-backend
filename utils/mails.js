const { default: axios } = require("axios");
const nodemailer = require("nodemailer");
const { emailTypes, valayDetails } = require("./params");
let frontendbaseurl = "https://admin.yegcompounding.com";
console.log(process.env.NODE);
if (process.env.NODE === "dev") {
  frontendbaseurl = "https://admin.yegcompounding.com";
}
// Create a transporter using your SMTP configuration
let transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com", // Replace with your SMTP host
  port: 587, // Replace with your SMTP port (e.g., 587 for TLS, 465 for SSL)
  secure: false, // true for 465, false for other ports
  auth: {
    user: "valayrajgor@gmail.com", // Replace with your email address
    pass: "JsbdktzpLM1NjcY2", // Replace with your email password or an app-specific password
  },
});

async function sendMail({ fromEmail, toEmail, subject, text }) {
  // Email content
  let mailOptions = {
    from: fromEmail, // Replace with your email address
    to: toEmail, // Replace with the recipient's email address
    subject: subject,
    text: text, // You can use HTML for the email content as well
  };

  // Send email
  try {
    const data = await transporter.sendMail(mailOptions);
    return {
      data: data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error,
    };
  }
}

const brevoAPIKey =
  "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";
const approvingEmailbody = (senderBodyData, recieverBodyData, token) => {
  const htmlcontent = `
<!DOCTYPE html>
<html
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  lang="en"
>
  <head>
    <title>${senderBodyData.username} Approval of Registration</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!--[if mso
      ]><xml
        ><o:OfficeDocumentSettings
          ><o:PixelsPerInch>96</o:PixelsPerInch
          ><o:AllowPNG /></o:OfficeDocumentSettings></xml
    ><![endif]-->
    <!--[if !mso]><!-->
    <link
      href="https://fonts.googleapis.com/css2?family=Lato:wght@100;200;300;400;500;600;700;800;900"
      rel="stylesheet"
      type="text/css"
    />
    <!--<![endif]-->
    <style>
      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        padding: 0;
      }

      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: inherit !important;
      }

      #MessageViewBody a {
        color: inherit;
        text-decoration: none;
      }

      p {
        line-height: inherit;
      }

      .desktop_hide,
      .desktop_hide table {
        mso-hide: all;
        display: none;
        max-height: 0px;
        overflow: hidden;
      }

      .image_block img + div {
        display: none;
      }

      @media (max-width: 520px) {
        .mobile_hide {
          display: none;
        }

        .row-content {
          width: 100% !important;
        }

        .stack .column {
          width: 100%;
          display: block;
        }

        .mobile_hide {
          min-height: 0;
          max-height: 0;
          max-width: 0;
          overflow: hidden;
          font-size: 0px;
        }

        .desktop_hide,
        .desktop_hide table {
          display: table !important;
          max-height: none !important;
        }
      }
    </style>
  </head>

  <body
    style="
      margin: 0;
      background-color: #fff;
      padding: 0;
      -webkit-text-size-adjust: none;
      text-size-adjust: none;
    "
  >
    <table
      class="nl-container"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        background-color: #fff;
      "
    >
      <tbody>
        <tr>
          <td>
            <table
              class="row row-1"
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      class="row-content stack"
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        color: #000;
                        width: 500px;
                        margin: 0 auto;
                      "
                      width="500"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            width="100%"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              padding-top: 5px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                          >
                            <table
                              class="image_block block-1"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                            >
                              <tr>
                                <td class="pad" style="width: 100%">
                                  <div
                                    class="alignment"
                                    align="center"
                                    style="line-height: 10px"
                                  >
                                    <img
                                      src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/1100626_1086052/logo.png"
                                      style="
                                        display: block;
                                        height: auto;
                                        border: 0;
                                        max-width: 500px;
                                        width: 100%;
                                      "
                                      width="500"
                                    />
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              class="paragraph_block block-2"
                              width="100%"
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                            >
                              <tr>
                                <td class="pad">
                                  <div
                                    style="
                                      color: #101112;
                                      direction: ltr;
                                      font-family: 'Lato', Tahoma, Verdana,
                                        Segoe, sans-serif;
                                      font-size: 22px;
                                      font-weight: 700;
                                      letter-spacing: 0px;
                                      line-height: 120%;
                                      text-align: left;
                                      mso-line-height-alt: 26.4px;
                                    "
                                  >
                                    <p style="margin: 0">
                                      The user name as ${senderBodyData.fullname} has signed
                                      newly.<br />Access the Permission for the
                                      completion of the user registration !
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              class="row row-2"
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      class="row-content stack"
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        color: #000;
                        width: 500px;
                        margin: 0 auto;
                      "
                      width="500"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            width="50%"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              padding-top: 5px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                          >
                            
                            <table
                              class="button_block block-2"
                              width="100%"
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                            >
                              <tr>
                                <td class="pad">
                                  <div class="alignment" align="center">
                                    <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://admin.yegcompounding.com/" style="height:42px;width:112px;v-text-anchor:middle;" arcsize="10%" stroke="false" fillcolor="#3c9405"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Tahoma, Verdana, sans-serif; font-size:16px"><!
                                    [endif]--><a
                                      href="${frontendbaseurl}/user-approved?token=${token}"
                                      target="_blank"
                                      style="
                                        text-decoration: none;
                                        display: inline-block;
                                        color: #ffffff;
                                        background-color: #3c9405;
                                        border-radius: 4px;
                                        width: auto;
                                        border-top: 0px solid transparent;
                                        font-weight: undefined;
                                        border-right: 0px solid transparent;
                                        border-bottom: 0px solid transparent;
                                        border-left: 0px solid transparent;
                                        padding-top: 5px;
                                        padding-bottom: 5px;
                                        font-family: 'Lato', Tahoma, Verdana,
                                          Segoe, sans-serif;
                                        font-size: 16px;
                                        text-align: center;
                                        mso-border-alt: none;
                                        word-break: keep-all;
                                      "
                                      ><span
                                        style="
                                          padding-left: 20px;
                                          padding-right: 20px;
                                          font-size: 16px;
                                          display: inline-block;
                                          letter-spacing: normal;
                                        "
                                        ><span
                                          style="
                                            margin: 0;
                                            word-break: break-word;
                                            line-height: 32px;
                                          "
                                          >APPROVE</span
                                        ></span
                                      ></a>
                                    <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td
                            class="column column-2"
                            width="50%"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              padding-top: 5px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                          >
                            
                            <table
                              class="button_block block-2"
                              width="100%"
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                            >
                              <tr>
                                <td class="pad">
                                  <a class="alignment" align="center" href="${frontendbaseurl}/user-decline?token=${token}">
                                    <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" style="height:42px;width:106px;v-text-anchor:middle;" arcsize="10%" stroke="false" fillcolor="#e0613a"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Tahoma, Verdana, sans-serif; font-size:16px"><![endif]-->
                                    <div
                                      style="
                                        text-decoration: none;
                                        display: inline-block;
                                        color: #ffffff;
                                        background-color: #e0613a;
                                        border-radius: 4px;
                                        width: auto;
                                        border-top: 0px solid transparent;
                                        font-weight: undefined;
                                        border-right: 0px solid transparent;
                                        border-bottom: 0px solid transparent;
                                        border-left: 0px solid transparent;
                                        padding-top: 5px;
                                        padding-bottom: 5px;
                                        font-family: 'Lato', Tahoma, Verdana,
                                          Segoe, sans-serif;
                                        font-size: 16px;
                                        text-align: center;
                                        mso-border-alt: none;
                                        word-break: keep-all;
                                      "
                                    >
                                      <span
                                        style="
                                          padding-left: 20px;
                                          padding-right: 20px;
                                          font-size: 16px;
                                          display: inline-block;
                                          letter-spacing: normal;
                                        "
                                        ><span
                                          style="
                                            margin: 0;
                                            word-break: break-word;
                                            line-height: 32px;
                                          "
                                          >DECLINE</span
                                        ></span
                                      >
                                    </div>
                                    <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              class="row row-3"
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                background-color: #ffffff;
              "
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      class="row-content stack"
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        background-color: #fff;
                        color: #000;
                        width: 500px;
                        margin: 0 auto;
                      "
                      width="500"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            width="100%"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              padding-top: 5px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                          >
                            <table
                              class="empty_block block-1"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                            >
                              <tr>
                                <td class="pad">
                                  <div></div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- End -->
  </body>
</html>

`;
  const body = {
    sender: {
      email: recieverBodyData.email,
      name: recieverBodyData.fullname,
    },
    to: [
      {
        email: recieverBodyData.email,
        name: recieverBodyData.fullname,
      },
    ],
    subject: senderBodyData.subject,
    htmlContent: htmlcontent,
  };

  return body;
};
async function transactionalEmails(
  senderBodyData,
  recieverBodyData,
  token,
  type
) {
  try {
    console.log(senderBodyData, recieverBodyData, token, type);
    var body = approvingEmailbody(senderBodyData, recieverBodyData, token);
    if (type === emailTypes.decline) {
      body = approvingEmailbody(senderBodyData, recieverBodyData, token);
    }
    const data = await axios.post("https://api.brevo.com/v3/smtp/email", body, {
      headers: {
        "api-key": brevoAPIKey,
      },
    });
    console.log("succes mail send");
    return { data: data, error: null };
  } catch (error) {
    console.log("failed mail send", error);
    return { data: null, error: error };
  }
}

module.exports = { sendMail, transactionalEmails };
