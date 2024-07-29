const nodeMailer = require("nodemailer");

// const options
const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        host: process.env.SMPT_HOST,
        // host: 'smtp.gmail.com',
        // service: 'smtp.gmail.com',
        // address: '127.0.0.1', 
        port: "587",//process.env.SMPT_PORT,
        secure: false, // Use SSL
        auth: {
            user: 'aghoriyt01@gmail.com',//process.env.SMPT_MAIL,
            pass: "svqaotgyghtujyzq" //process.env.SMPT_APP_PASS,
        },
        // authMethod: 'LOGIN', // Specify the authentication method
    });
 
    const mailOptions = {
        from: process.env.SMPT_MAIL,
        // to: options.to,
        // subject: options.subject,
        // html: options.message,
        // from: '"Maddison Foo Koch 👻" <aghoriyt01@gmail.com>', // sender address
              to: "testingperpose64@gmail.com, rch231198@gmail.com", // list of receivers
              subject: "Hello ✔", // Subject line
              text: "Hello world?", // plain text body
              html: "<b>Hello world?</b>", // html body
    };

    await transporter.sendMail(mailOptions);
};

module.exports = {sendEmail};



// async function main() {
//     // send mail with defined transport object
//     const info = await transporter.sendMail({
//       from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
//       to: "bar@example.com, baz@example.com", // list of receivers
//       subject: "Hello ✔", // Subject line
//       text: "Hello world?", // plain text body
//       html: "<b>Hello world?</b>", // html body
//     });
  
//     console.log("Message sent: %s", info.messageId);
//     // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
//   }
  
//   main().catch(console.error);