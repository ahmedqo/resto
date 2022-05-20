const nodeMailer = require("nodemailer");
const Handlebars = require("handlebars");
const fs = require("fs");

Handlebars.registerHelper("add", function(n1, n2) {
    return n1 * n2;
});

Handlebars.registerHelper("com", function(com) {
    return !com && "border-bottom-right-radius: 0.75rem;border-top-right-radius: 0.75rem;";
});

const sendEmail = async(options) => {
    const transporter = nodeMailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    if (options.path) {
        const template = fs.readFileSync(global.root + "\\" + options.path, "utf8");
        const render = Handlebars.compile(template);
        options.html = render(options.data);
    }

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.sub || "",
        html: options.html,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;