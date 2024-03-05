const logger = require("../config/Logger");
const log = new logger();

class Post {
    constructor(db) {
        this.db = db;
    }

    post(path, data) {
        const query = `INSERT INTO entities (path, data) VALUES (?, ?)
        ON CONFLICT(path) DO UPDATE SET data = excluded.data;`;
        return new Promise((resolve, reject) => {
            this.db.run(query, [path, data], function (err) {
                if (err) {
                    log.error("Error saving data", { path: path });
                    return reject(err);
                }
                log.success("Data saved", { path: path });
                return resolve({ message: "Data saved successfully" });
            });
        });
    }
}

module.exports = Post;
