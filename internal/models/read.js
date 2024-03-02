class Read {
    constructor(db) {
        this.db = db;
    }

    read(path, res) {
        const query = `SELECT data FROM entities WHERE path = ?;`;

        this.db.get(query, [path], (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (row) {
                res.json(JSON.parse(row.data));
            } else {
                res.status(404).json({ message: "Data not found" });
            }
        });
    }
}

module.exports = Read;
