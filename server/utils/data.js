const fs = require("fs");
const Handlebars = require("handlebars");

Handlebars.registerHelper("com", function(com) {
    return !com && "border-bottom-right-radius: 0.75rem;border-top-right-radius: 0.75rem;";
});

function gettable(items) {
    var data = "";
    items.forEach((item) => {
        data += `
            <tr style="background: #faf9f9">
                <td style="padding: 10px 20px;vertical-align: middle;text-align: center;border-top-left-radius: 0.5rem;border-bottom-left-radius: 0.5rem;">
                    <div style="width: 60px;height: 60px;border-radius: 0.5rem;background-size: cover;background-image: url(${item.image})"></div>
                </td>
                <td style="font-family: 'Roboto', sans-serif;padding: 14px 20px;vertical-align: middle;">
                    <h1 style="font-family: 'Roboto', sans-serif;margin: 0;line-height: 1;word-break: break-word;font-weight: 800;font-size: 1rem;color: #1d1d1d;">
                        ${item.name}
                    </h1>
                </td>
                <td style="font-family: 'Roboto', sans-serif;padding: 14px 20px;vertical-align: middle;text-align: center;">
                    <h1 style="font-family: 'Roboto', sans-serif;width: max-content;margin: auto;line-height: 1;word-break: break-word;font-weight: 800;font-size: 1rem;color: #1d1d1d;">
                        ${item.quantity}
                    </h1>
                </td>
                <td style="font-family: 'Roboto', sans-serif;padding: 14px 20px;vertical-align: middle;text-align: center;border-bottom-right-radius: 0.75rem;border-top-right-radius: 0.75rem;">
                    <h1 style="font-family: 'Roboto', sans-serif;width: max-content;margin: auto;line-height: 1;word-break: break-word;font-weight: 800;font-size: 1rem;color: #1d1d1d;">
                        ${item.quantity * item.price} MAD
                    </h1>
                </td>
            </tr>
        `;
    });
    return data;
}

function getMail(options) {
    const template = fs.readFileSync(global.root + "\\" + options.path, "utf8");
    const render = Handlebars.compile(template);
    const html = render(options.data);
    return html.replace("[[[[data]]]]", gettable(options.data.items));
}

module.exports = getMail;