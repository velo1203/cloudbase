const Post = require("../models/postModel");
const db = require("../database/db");
const postModel = new Post(db);

exports.post = (req, res) => {
    const path = req.params[0];
    const data = JSON.stringify(req.body);
    postModel
        .post(path, data, res)
        .then((result) => {
            if (result) {
                res.status(201).json(result);
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
};
