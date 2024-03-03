import requests 
import pprint 

url = "http://localhost:3000"
user_name = "minwoo"
url_path = url + "/" + user_name

def init_data():
    response = requests.post(url_path, json={"name": "minwoo", "age": 20, "address": "Seoul"})
    if response.status_code == 200:
        print("Initialized successfully")

def get_data():
    response = requests.get(url_path)

    if response.status_code == 200:
        pprint.pprint(response.json())

def patch_data():
    new_age = 16
    response = requests.patch(url_path, json={"age": new_age}) 
    if response.status_code == 200:
        print("Updated successfully")

init_data()
get_data()
input(" 값을 업데이트 하시겠습니까?")
patch_data()
input(" 결과를 확인하시겠습니까?")
get_data() 
