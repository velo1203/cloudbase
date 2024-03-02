const logger = require("../config/Logger");
const log = new logger();

class Post {
    constructor(db) {
        this.db = db;
    }

    post(path, data, res) {
        const query = `INSERT INTO entities (path, data) VALUES (?, ?)
        ON CONFLICT(path) DO UPDATE SET data = excluded.data;`;
        this.db.run(query, [path, data], function (err) {
            if (err) {
                log.error("Error saving data", { path: path });
                return res.status(500).json({ error: err.message });
            }
            log.success("Data saved", { path: path });
            res.status(201).json({
                message: "Data saved successfully",
                id: this.lastID,
            });
        });
    }
}

module.exports = Post;
