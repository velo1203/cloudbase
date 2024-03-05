const logger = require("../config/Logger");
const log = new logger();

class Read {
    constructor(db) {
        this.db = db;
    }

    read(path) {
        return new Promise((resolve, reject) => {
            const query = `SELECT data,id FROM entities WHERE path = ?;`;

            this.db.get(query, [path], (err, row) => {
                if (err) {
                    log.error("Error reading data", { path: path });
                    return reject(err);
                }
                if (row) {
                    log.success("Data found", { path: path });
                    row.data = JSON.parse(row.data);
                    row.data.id = row.id;
                    return resolve(row.data);
                } else {
                    log.fail("Data not found", { path: path });
                    return reject(new Error("Data not found"));
                }
            });
        });
    }

    getAll(path) {
        return new Promise((resolve, reject) => {
            const query = `SELECT data,id FROM entities WHERE path LIKE ?;`;

            this.db.all(query, [`${path}%`], (err, rows) => {
                if (err) {
                    log.error("Error reading data", { path: path });
                    return reject(err);
                }
                if (rows.length > 0) {
                    const results = rows.map((row) => {
                        row.data = JSON.parse(row.data);
                        row.data.id = row.id;
                        return row.data;
                    });
                    log.success("Data found", { path: path });

                    return resolve(results);
                } else {
                    log.fail("No matching data found", { path: path });
                    return reject(new Error("No matching data found"));
                }
            });
        });
    }

    // search 메서드 수정
    search(queryParams, path) {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT data,id FROM entities`;
            const conditions = [];
            const params = [];
            conditions.push(`path LIKE ?`);
            params.push(`${path}%`);
            Object.keys(queryParams).forEach((key) => {
                if (key === "id") {
                    conditions.push(`id = ?`);
                    params.push(queryParams[key]);
                } else {
                    conditions.push(`json_extract(data, '$.${key}') = ?`);
                    params.push(JSON.parse(queryParams[key]));
                }
            });

            if (conditions.length > 0) {
                sqlQuery += ` WHERE ${conditions.join(" AND ")}`;
            }
            this.db.all(sqlQuery, params, (err, rows) => {
                if (err) {
                    log.error("Error searching data", { path: path });
                    return reject(err);
                }
                if (rows.length > 0) {
                    const results = rows.map((row) => {
                        row.data = JSON.parse(row.data);
                        row.data.id = row.id;
                        return row.data;
                    });
                    log.success("Data found", { path: path });
                    return resolve(results);
                } else {
                    log.fail("No matching data found", { path: path });

                    return reject(new Error("No matching data found"));
                }
            });
        });
    }
}

module.exports = Read;
