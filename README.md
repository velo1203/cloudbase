# Cloud Base

CloudBase is a REST API-based database system. You can easily create a database, manage it, and get data quickly and easily

# installation

```bash
git clone https://github.com/velo1203/cloudbase
cd cloudbase
```

You need to run cloudbase.exe.

# config

If you want to change the port, you can do so by changing the value in `config.json.`

# REST API

```bash
GET localhost:[port]/[path]
```

Gets all results specified in path

```bash
POST localhost:[port]/[path]
```

Writes JSON data to the specified path.

```bash
DELETE localhost:[port]/[path]
```

Deletes json data to a specified path
