const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const logger = require("../config/Logger");
const log = new logger();
const fs = require("fs");

log.info("Database module loaded");

// 실행 파일의 디렉토리를 가져옵니다.
let exeDir = "";
if (process.pkg) {
    //pkg로 빌드된 소프트웨어인지 확인, 경로 출ㄺ 에러발생
    exeDir = path.dirname(process.execPath); //배포 환경
} else {
    exeDir = __dirname; //개발환경에서의 경로
}
// 'data' 폴더의 경로를 설정합니다.
const dataDir = path.join(exeDir, "data");

// 'data' 폴더가 없으면 생성합니다.
if (!fs.existsSync(dataDir)) {
    // 폴더가 없으면
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
                // entities 테이블을 생성합니다.
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
