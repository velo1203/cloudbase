const logger = require("../config/Logger");
const log = new logger();

class Patch {
    constructor(db) {
        this.db = db;
    }

    patch(path, newData, res) {
        // 먼저 기존 데이터를 조회
        this.db.get(
            `SELECT data FROM entities WHERE path = ?`,
            [path],
            (err, row) => {
                if (err) {
                    log.error("Error fetching data", { path: path });
                    return res.status(500).json({ error: err.message });
                }
                if (!row) {
                    log.error("No data found", { path: path });
                    return res.status(404).json({ error: "No data found" });
                }

                // 기존 데이터를 JSON 객체로 변환
                let currentData = JSON.parse(row.data);
                const pastData = JSON.parse(newData);
                // 새 데이터로 기존 데이터를 업데이트
                let updatedData = { ...currentData, ...pastData };

                // 업데이트된 데이터를 문자열로 변환
                let updatedDataString = JSON.stringify(updatedData);

                // 데이터베이스에 업데이트된 데이터 저장
                const query = `UPDATE entities SET data = ? WHERE path = ?`;
                this.db.run(query, [updatedDataString, path], function (err) {
                    if (err) {
                        log.error("Error updating data", { path: path });
                        return res.status(500).json({ error: err.message });
                    }
                    log.success("Data updated", { path: path });
                    res.status(200).json({
                        message: "Data updated successfully",
                        path: path,
                    });
                });
            }
        );
    }
}

module.exports = Patch;
