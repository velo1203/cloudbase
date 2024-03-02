const express = require("express");
const router = express.Router();
const patchController = require("../controllers/patchController");
const RouterVerification = require("../middleware/RouterRequest");

router.patch("*", RouterVerification, (req, res) => {
    patchController.patch(req, res);
});

module.exports = router; // 정의된 라우터 모듈을 내보냅니다.
