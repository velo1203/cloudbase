function RouterVerification(req, res, next) {
    // 라우터 요청을 검증하는 미들웨어
    const data = JSON.stringify(req.body); // 요청의 본문을 문자열로 변환
    const path = req.params[0]; // 요청의 경로를 가져옴
    if (JSON.parse(data)["id"]) {
        // ID가 포함되어 있는지 확인
        return res.status(400).json({ error: "ID cannot be updated" });
    }
    if (path[path.length - 1] === "/") {
        // 경로가 /로 끝나는지 확인
        return res.status(400).json({ error: "paths must not end in /." });
    }
    next();
}

module.exports = RouterVerification; // 정의된 미들웨어 모듈을 내보냅니다.
