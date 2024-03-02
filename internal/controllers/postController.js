const Post = require("../models/post");
const db = require("../database/db");
const postModel = new Post(db);

exports.post = (req, res) => {
    const path = req.params[0];
    const data = JSON.stringify(req.body);
    if (JSON.parse(data)["id"]) {
        // ID가 포함되어 있는지 확인
        return res.status(400).json({ error: "ID cannot be posted" });
    }
    if (req.path[req.path.length - 1] === "/") {
        return res.status(400).json({ error: "Invalid path" });
    }
    postModel.post(path, data, res, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
    });
};
