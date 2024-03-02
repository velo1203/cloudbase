# Cloudbase

![CloudBase Logo](https://github.com/velo1203/cloudbase/raw/main/asset/cloudbase.png)

**CloudBase** is a REST API-based database system. You can easily create and manage databases and get data quickly and easily.

Previously, users had to install many programs to use the database, and many preliminary operations such as login and registration were required. Therefore, we pursued a simple database.
We chose to use a `REST API` communication system that can be used in any language, and we developed it to be easily deployed as an `.exe` file.

# Language

[한국어](KOREAN.md)

# Install

```bash
git clone https://github.com/velo1203/cloudbase
cd cloudbase
```

You need to run cloudbase.exe.

# config

If you want to change the port, you can do so by changing the value in `config.json`.

# REST API

The REST API is a way to send and receive data using HTTP.

There are the following methods: `GET`, `POST`, `DELETE`, and `PATCH`.

1. [GET](#GET): Gets data.
2. [POST](#post): Adds data.
3. [DELETE](#delete): Deletes data.
4. [PATCH](#patch): Modify data.

# GET

```bash
GET localhost:[port]/[path]
```

This is the most basic request method.

Here's an example.
user/dev1 has JSON information about dev1.
If you want to see if a particular key value in the JSON matches, you use `Query`.

A `Query` is written like this

If we want to find people whose name attribute is devho and whose age is 17, we would use

```bash
GET localhost:[path]/user/?name="devho"&age=17
```

This is how you would construct the URL.

Also, there can be many people in user. If you want to print out all users, you can run

```bash
GET localhost:[path]/user/
```

Write something like this

# POST

```bash
POST localhost:[port]/[path]
```

Writes JSON data to the specified path.

The URL cannot end with a /.

```bash
POST localhost:[port]/[path]/
```

The above is an incorrect example.

```json
{ "name": "devho", "age": 17 }
```

BODY is written this way You will be given a unique ID.

The ID is given automatically. It cannot be arbitrary.

# Delete

```bash
DELETE localhost:[port]/[path]
```

Deletes JSON data to the specified path.

# PATCH

```bash
PATCH localhost:[port]/[path]
```

Modifies JSON data with the specified path.

```json
{ "age": 20 }
```

BODY is written like this.
The age attribute of the data in the above route is modified to 20.
