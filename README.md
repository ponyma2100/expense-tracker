# expense-tracker
[HEROKU](https://peaceful-spire-26752.herokuapp.com/ "title text!")

## Test account:

Email	: root@example.com
Password : 12345678

## 相關環境變數
[env.example](https://github.com/ponyma2100/expense-tracker/blob/master/.env.example "title text!")

## 網頁示意圖

![示意圖](https://i.imgur.com/tbmVug6.png)

使用Node.js與Express打造的收支記帳本，提供使用者建立自己的記帳網頁。

## Features

 - 使用者可以新增新增支出
 - 使用者可以在首頁一次瀏覽所有支出的清單
 - 使用者可以在首頁看到所有支出清單的總金額
 - 使用者可以修改支出的所有欄位
 - 使用者可以刪除任何一筆支出
 - 使用者可以在首頁可以根據支出「類別」篩選支出金額

## Environment SetUp

 - [Node.js](https://nodejs.org/en/ "title text!")
 
## Installing 

1.打開Terminal，複製此專案至本地端

```
git clone https://github.com/ponyma2100/expense-tracker/
```

2.開啟Terminal，進入存放此專案的資料夾

```
cd expense-tracker
```

3.安裝 npm套件

```
npm install  //安裝套件
```

4.安裝 nodemon 套件

```
npm install -g nodemon
```

5.新增餐廳種子資料，運行npm run seed 腳本

```
npm run seed
```

6.透過nodemon 啟動伺服器，執行app.js

```
nodemon app.js
```

7.當 terminal 出現以下字樣，表示伺服器已啟動並成功連結

```
Express is listening on http://localhost:3000
```

## 開發環境

-Node.js: v10.15.0

-Express: v4.17.1

-Express-Handlebars: v5.1.0

-Body-parser: v1.19.0

-mongoose: v5.9.25


