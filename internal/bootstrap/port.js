const fs = require("fs");

function setPort() {
    let config = null;

    try {
        const data = fs.readFileSync("./config.json");
        config = JSON.parse(data);
        return config.port;
    } catch (err) {
        console.log(err);
        return 3000;
    }
}

module.exports = setPort;
