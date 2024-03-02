class Post {
    constructor(db) {
        this.db = db;
    }

    post(path, data, res) {
        const query = `INSERT INTO entities (path, data) VALUES (?, ?)
        ON CONFLICT(path) DO UPDATE SET data = excluded.data;`;
        this.db.run(query, [path, data], function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({
                message: "Data saved successfully",
                id: this.lastID,
            });
        });
    }
}

module.exports = Post;
