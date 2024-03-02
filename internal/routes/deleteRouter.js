const express = require("express");
const router = express.Router();
const deleteController = require("../controllers/deleteController");
const RouterVerification = require("../middleware/RouterRequest");

router.delete("*", RouterVerification, (req, res) => {
    deleteController.delete(req, res);
});

module.exports = router; // 정의된 라우터 모듈을 내보냅니다.
