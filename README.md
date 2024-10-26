=== 在本機安裝此作品的方法

### 介紹
本作品:留言板，是前後端分離，後端用laravel框架，前端用vue，資料庫用mysql  
mysqlbulletin為後端資料夾，vuebulletin為前端資料夾

### 開發環境
php 8.3.13  
Node v20.18.0

### 工具
composer 2.8.1  
mysql 8.4.0

### 安裝流程
1.安裝php，Node，composer，mysql  
2.把php資料夾中php.ini的extension=pdo_mysql的註解打開(去掉;)  
3.下載此作品:留言板  
4.在mysqlbulletin資料夾開啟cmd，輸入指令composer install --ignore-platform-reqs  
5.輸入指令copy .env.example .env，在.env檔輸入資料庫帳號，密碼  
5.輸入指令php artisan migrate  
6.輸入指令php artisan serve(ctrl+c終止後端)  
7.在vuebulletin資料夾開啟cmd，輸入指令npm install  
8.輸入指令npm run serve(ctrl+c終止前端)  
9.在網址輸入localhost:8080即可  

