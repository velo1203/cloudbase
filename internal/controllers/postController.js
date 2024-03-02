const Post = require("../models/post");
const db = require("../database/db");
const postModel = new Post(db);

exports.post = (req, res) => {
    const path = req.params[0];
    const data = JSON.stringify(req.body);
    postModel.post(path, data, res, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            message: "Data saved successfully",
            id: result.lastID,
        });
    });
};
