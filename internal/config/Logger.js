const chalk = require("chalk");
const path = require("path");

class Logger {
    constructor() {
        this.log = console.log;
    }
    info(msg, info = {}) {
        this.log(chalk.blue(this.format(msg, "INFO", info)));
    }
    fail(msg, info = {}) {
        this.log(chalk.grey(this.format(msg, "FAIL", info)));
    }
    error(msg, info = {}) {
        this.log(chalk.red(this.format(msg, "ERROR", info)));
    }
    warning(msg, info = {}) {
        this.log(chalk.yellow(this.format(msg, "WARNING", info)));
    }
    success(msg, info = {}) {
        this.log(chalk.green(this.format(msg, "SUCCESS", info)));
    }
    custom(msg, color, info = {}) {
        this.log(chalk[color](this.format(msg, color.toUpperCase(), info)));
    }
    format(msg, level, info) {
        const date = new Date().toISOString();
        const fileName = info.fileName ? path.basename(info.fileName) : "";
        const lineNumber = info.lineNumber ? info.lineNumber : "";
        return `${date} [${level}] ${fileName}:${lineNumber} - ${msg}`;
    }
}

module.exports = Logger;
