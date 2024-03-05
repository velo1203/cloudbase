const logger = require("../config/Logger");
const log = new logger();

class Delete {
    constructor(db) {
        this.db = db;
    }

    delete(path) {
        const query = `DELETE FROM entities WHERE path = ?;`;

        return new Promise((resolve, reject) => {
            this.db.run(query, [path], function (err) {
                if (err) {
                    log.error("Error deleting data", { path: path });
                    return reject(err);
                }
                if (this.changes > 0) {
                    log.success("Data deleted", { path: path });
                    return resolve({ message: "Data deleted successfully" });
                } else {
                    log.fail("Data not found", { path: path });
                    return reject(new Error("Data not found"));
                }
            });
        });
    }

    specificDelete(path, key) {
        const query = `SELECT data FROM entities WHERE path = ?;`;

        return new Promise((resolve, reject) => {
            this.db.get(query, [path], (err, row) => {
                if (err) {
                    return reject({ status: 500, error: err.message });
                }
                if (row) {
                    let data = JSON.parse(row.data);
                    if (data[key]) {
                        delete data[key];
                        const updateQuery = `UPDATE entities SET data = ? WHERE path = ?;`;
                        this.db.run(
                            updateQuery,
                            [JSON.stringify(data), path],
                            function (err) {
                                if (err) {
                                    log.error("Error deleting data", {
                                        path: path,
                                    });
                                    return reject({
                                        status: 500,
                                        error: err.message,
                                    });
                                }
                                if (this.changes > 0) {
                                    log.success("Data deleted", { path: path });
                                    return resolve({
                                        message: "Data deleted successfully",
                                    });
                                } else {
                                    log.fail("Data not found", { path: path });
                                    return reject({
                                        status: 404,
                                        message: "Data not found",
                                    });
                                }
                            }
                        );
                    } else {
                        log.fail("Key not found", { path: path, key: key });
                        return reject({
                            status: 404,
                            message: "Key not found",
                        });
                    }
                } else {
                    log.fail("Data not found", { path: path });
                    return reject({ status: 404, message: "Data not found" });
                }
            });
        });
    }
}

module.exports = Delete;
