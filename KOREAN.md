# Cloudbase ☁️

**CloudBase**는 REST API 기반의 데이터베이스 시스템입니다. 데이터베이스를 쉽게 생성 및 관리하고 데이터를 빠르고 쉽게 가져올 수 있습니다.

기존에는 사용자가 데이터베이스를 사용하기 위해 많은 프로그램을 설치해야 하고, 로그인과 등록 등 많은 사전 작업이 필요했습니다. 그래서 간편한 데이터베이스를 추구했습니다.
그래서 어떤 언어로든 사용할 수 있는 `REST API` 통신 방식을 선택했고, `.exe` 파일로 쉽게 배포할 수 있도록 개발했습니다.

### [다운로드](https://velo1203.github.io/cloudbase/webDownload/) 페이지(최신 버전)

# 설치

```bash
git clone https://github.com/velo1203/cloudbase
cd cloudbase
```

cloudbase.exe를 실행해야 합니다.

# config

포트를 변경하려면 `config.json`의 값을 변경하여 변경할 수 있습니다.

# REST API

REST API는 HTTP를 사용하여 데이터를 주고받는 방식입니다.

`GET`, `POST`, `DELETE`, `PATCH` 메서드가 있습니다.

1. [GET](#GET): 데이터를 가져옵니다.
2. [POST](#POST): 데이터를 추가합니다.
3. [DELETE](#delete): 데이터를 삭제합니다.
4. [PATCH](#patch): 데이터를 수정합니다.

# GET

```bash
GET localhost:[port]/[path]
```

가장 기본적인 요청 방법입니다.

다음은 예제입니다.
user/dev1에는 dev1에 대한 JSON 정보가 있습니다.
JSON의 특정 키 값이 일치하는지 확인하려면 `Query`를 사용합니다.

쿼리`는 다음과 같이 작성됩니다.

이름 속성이 devho이고 나이가 17세인 사람을 찾고자 한다면

```bash
GET localhost:[path]/user/?name="devho"&age=17
```

이렇게 URL을 구성할 수 있습니다.

또한 사용자에 많은 사람이 있을 수 있습니다. 모든 사용자를 출력하려면 다음과 같이 실행하면 됩니다.

```bash
GET localhost:[경로]/user/
```

다음과 같이 작성합니다.

# POST

```bash
POST localhost:[port]/[path]
```

JSON 데이터를 지정된 경로에 씁니다.

URL은 /로 끝날 수 없습니다.

```bash
POST localhost:[port]/[path]/
```

위는 잘못된 예입니다.

```json
{ "name": "devho", "age": 17 }
```

BODY는 이런 식으로 작성됩니다. 고유 ID가 부여됩니다.

ID는 자동으로 부여됩니다. 임의로 지정할 수 없습니다.

# 삭제

```bash
DELETE localhost:[포트]/[경로]
```

지정한 경로로 JSON 데이터를 삭제합니다.

또한 특정 데이터를 삭제하고 싶을 때 아래 요청을 사용할 수 있습니다.

```bash
DELETE localhost:[port]/[path]
```

바디 데이터는 다음과 같이 작성됩니다.

```
{ "key":["key1","key2"]}
```

# PATCH

```bash
PATCH localhost:[port]/[path]
```

지정한 경로로 JSON 데이터를 수정합니다.

```json
{ "age": 20 }
```

BODY는 다음과 같이 작성됩니다.
위 경로에서 데이터의 나이 속성은 20으로 수정됩니다.

Translated with DeepL.com (free version)
