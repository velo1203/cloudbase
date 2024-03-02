class Delete {
    constructor(db) {
        this.db = db;
    }

    delete(path, res) {
        const query = `DELETE FROM entities WHERE path = ?;`;

        this.db.run(query, [path], function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes > 0) {
                res.json({ message: "Data deleted successfully" });
            } else {
                res.status(404).json({ message: "Data not found" });
            }
        });
    }
}

module.exports = Delete;
