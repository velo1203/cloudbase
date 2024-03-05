const logger = require("../config/Logger");
const log = new logger();

class Delete {
    constructor(db) {
        this.db = db;
    }

    delete(path, res) {
        const query = `DELETE FROM entities WHERE path = ?;`;

        this.db.run(query, [path], function (err) {
            if (err) {
                log.error("Error deleting data", { path: path });
                return res.status(500).json({ error: err.message });
            }
            if (this.changes > 0) {
                log.success("Data deleted", { path: path });
                res.json({ message: "Data deleted successfully" });
            } else {
                log.fail("Data not found", { path: path });
                res.status(404).json({ message: "Data not found" });
            }
        });
    }

    specificDelete(path, key, res) {
        const query = `SELECT data FROM entities WHERE path = ?;`;
        this.db.get(query, [path], (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message });
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
                                return res
                                    .status(500)
                                    .json({ error: err.message });
                            }
                            if (this.changes > 0) {
                                log.success("Data deleted", { path: path });
                                res.json({
                                    message: "Data deleted successfully",
                                });
                            } else {
                                log.fail("Data not found", { path: path });
                                res.status(404).json({
                                    message: "Data not found",
                                });
                            }
                        }
                    );
                } else {
                    log.fail("Key not found", { path: path, key: key });
                    res.status(404).json({ message: "Key not found" });
                }
            } else {
                log.fail("Data not found", { path: path });
                res.status(404).json({ message: "Data not found" });
            }
        });
    }
}

module.exports = Delete;
