// database/db.js
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("internal/database/database.db"); // 데이터베이스 파일 생성 및 연결

db.serialize(() => {
    // 사용자 테이블 생성
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

module.exports = db;
