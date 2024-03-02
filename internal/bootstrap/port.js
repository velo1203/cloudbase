const fs = require("fs");
const logger = require("../config/Logger");
const log = new logger();

function setPort() {
    let config = null;

    try {
        const data = fs.readFileSync("./config.json");
        config = JSON.parse(data);
        log.info("Config file read successfully");
        return config.port;
    } catch (err) {
        log.error("Error reading config file", { error: err.message });
        return 3000;
    }
}

module.exports = setPort;
