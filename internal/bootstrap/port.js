const fs = require("fs");
const logger = require("../config/Logger");
const log = new logger();

function setPort() {
    // 포트 설정을 위한 함수
    let config = null;

    try {
        const data = fs.readFileSync("./config.json");
        config = JSON.parse(data);
        log.info("Config file read successfully");
        return config.port;
    } catch (err) {
        log.error("Error reading config file", { error: err.message });
        log.info("Using default port 3000");
        return 3000;
    }
}

module.exports = setPort;
