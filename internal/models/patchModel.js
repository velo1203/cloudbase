const logger = require("../config/Logger");
const Read = require("./readModel.js"); // Read 모듈을 임포트합니다.
const log = new logger();

class Patch {
    constructor(db) {
        this.db = db;
        this.readInstance = new Read(db); // Read 클래스의 인스턴스를 생성합니다.
    }

    patch(path, newData) {
        return new Promise((resolve, reject) => {
            // Read 클래스의 read 메소드를 사용하여 기존 데이터를 조회합니다.
            this.readInstance
                .read(path)
                .then((result) => {
                    // 콜백 함수에서 응답을 처리합니다.
                    let currentData = result; // 기존 데이터
                    const pastData = JSON.parse(newData); // 새 데이터를 JSON 객체로 변환
                    let updatedData = { ...currentData, ...pastData }; // 새 데이터로 기존 데이터를 업데이트

                    let updatedDataString = JSON.stringify(updatedData); // 업데이트된 데이터를 문자열로 변환

                    // 데이터베이스에 업데이트된 데이터를 저장합니다.
                    const query = `UPDATE entities SET data = ? WHERE path = ?`;
                    this.db.run(
                        query,
                        [updatedDataString, path],
                        function (err) {
                            if (err) {
                                log.error("Error updating data", {
                                    path: path,
                                });
                                return reject(err);
                            }
                            log.success("Data updated", { path: path });
                            return resolve({
                                message: "Data updated successfully",
                            });
                        }
                    );
                })
                .catch((err) => {
                    return reject(err);
                });
        });
    }
}

module.exports = Patch;
