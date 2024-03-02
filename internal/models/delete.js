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
}

module.exports = Delete;
