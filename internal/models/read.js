const logger = require("../config/Logger");
const log = new logger();

class Read {
    constructor(db) {
        this.db = db;
    }

    read(path, res) {
        try {
            const query = `SELECT data,id FROM entities WHERE path = ?;`;

            this.db.get(query, [path], (err, row) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                if (row) {
                    log.success("Data found", { path: path });
                    row.data = JSON.parse(row.data);
                    row.data.id = row.id;
                    res.json(row.data);
                } else {
                    log.fail("Data not found", { path: path });
                    res.status(404).json({ message: "Data not found" });
                }
            });
        } catch (err) {
            log.error("Error reading data", { path: path });
            return res.status(500).json({ error: err.message });
        }
    }

    // search 메서드 수정
    search(queryParams, path, res) {
        try {
            let sqlQuery = `SELECT data,id FROM entities`; // 변수명을 sqlQuery로 변경하여 중복을 피함
            const conditions = [];
            const params = [];

            // 'path' 조건을 추가
            conditions.push(`path LIKE ?`);
            params.push(`${path}%`); // path 파라미터를 사용하여 LIKE 조건 설정
            // queryParams 객체를 순회하며, 조건과 파라미터를 추가
            Object.keys(queryParams).forEach((key) => {
                if (key === "id") {
                    // id는 별도로 처리
                    conditions.push(`id = ?`);
                    params.push(queryParams[key]); // JSON.parse를 사용하지 않고 직접 값을 추가합니다.
                } else {
                    conditions.push(`json_extract(data, '$.${key}') = ?`);
                    params.push(queryParams[key]);
                }
            });

            // 조건이 하나 이상 있는 경우, WHERE 절 추가
            if (conditions.length > 0) {
                sqlQuery += ` WHERE ${conditions.join(" AND ")}`;
            }
            // 동적으로 생성된 쿼리 실행
            this.db.all(sqlQuery, params, (err, rows) => {
                if (err) {
                    log.error("Error searching data", { path: path });
                    return res.status(500).json({ error: err.message });
                }
                if (rows.length > 0) {
                    // 모든 결과의 data 필드를 JSON으로 파싱하여 응답
                    const results = rows.map((row) => {
                        row.data = JSON.parse(row.data);
                        row.data.id = row.id;
                        return row.data;
                    });
                    log.success("Data found", { path: path });
                    res.json(results);
                } else {
                    log.fail("No matching data found", { path: path });
                    res.status(404).json({ message: "No matching data found" });
                }
            });
        } catch (err) {
            log.error("Error searching data", { path: path });
            return res.status(500).json({ error: err.message });
        }
    }
}

module.exports = Read;
