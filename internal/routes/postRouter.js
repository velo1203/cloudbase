const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.post("*", (req, res) => {
    postController.post(req, res);
});

module.exports = router; // 정의된 라우터 모듈을 내보냅니다.
