const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const logger = require("../config/Logger");
const log = new logger();
const fs = require("fs");

log.info("Database module loaded");

// 실행 파일의 디렉토리를 가져옵니다.
let exeDir = "";
if (process.pkg) {
    exeDir = path.dirname(process.execPath);
} else {
    exeDir = __dirname;
}
// 'data' 폴더의 경로를 설정합니다.
const dataDir = path.join(exeDir, "data");

// 'data' 폴더가 없으면 생성합니다.
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// 데이터베이스 파일의 전체 경로를 설정합니다.
const dbPath = path.join(dataDir, "database.db");

log.info(`Database path: ${dbPath}`);

// 데이터베이스를 초기화합니다.
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        log.error("Error connecting to database", { error: err.message });
    } else {
        db.serialize(() => {
            db.run(
                `
                CREATE TABLE IF NOT EXISTS entities (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    path TEXT NOT NULL UNIQUE,
                    data TEXT,
                    parentId INTEGER,
                    FOREIGN KEY(parentId) REFERENCES entities(id) ON DELETE CASCADE
                );
                `
            );
        });
        log.success("Connected to database");
    }
});

module.exports = db;
