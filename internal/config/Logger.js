const chalk = require("chalk");
const path = require("path");

class Logger {
    constructor() {
        this.log = console.log;
    }
    info(msg, info = {}) {
        // 파란색은 정보 메시지에 적합합니다.
        this.log(chalk.blueBright(this.format(msg, "INFO", info)));
    }
    fail(msg, info = {}) {
        // 회색은 실패 또는 중요하지 않은 메시지에 적합합니다.
        this.log(chalk.dim(this.format(msg, "FAIL", info)));
    }
    error(msg, info = {}) {
        // 밝은 빨간색은 오류 메시지에 더욱 눈에 띄게 만듭니다.
        this.log(chalk.bold.red(this.format(msg, "ERROR", info)));
    }
    warning(msg, info = {}) {
        // 주황색은 경고 메시지에 자주 사용됩니다.
        this.log(chalk.hex("#FFA500")(this.format(msg, "WARNING", info))); // chalk.hex를 사용하여 주황색 지정
    }
    success(msg, info = {}) {
        // 밝은 녹색은 성공 메시지를 강조하는데 효과적입니다.
        this.log(chalk.greenBright(this.format(msg, "SUCCESS", info)));
    }
    custom(msg, color, info = {}) {
        // 사용자 지정 색상을 위해 chalk.keyword 또는 chalk.hex 사용
        if (chalk[color]) {
            this.log(chalk[color](this.format(msg, color.toUpperCase(), info)));
        } else {
            // 지정된 색상이 없는 경우 기본 텍스트 색상을 사용합니다.
            this.log(this.format(msg, color.toUpperCase(), info));
        }
    }
    format(msg, level, info) {
        const date = new Date().toISOString();
        const fileName = info.fileName ? path.basename(info.fileName) : "";
        const lineNumber = info.lineNumber ? info.lineNumber : "";
        return `${date} [${level}] ${fileName}:${lineNumber} - ${msg}`;
    }
}

module.exports = Logger;
