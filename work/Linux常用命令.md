******任何mongo命令操作，需要启动mongod


删除文件：rm -f 文件名
删除文件夹及其文件：rm -rf 目录名字


//查看端口是否占用
lsof -i :端口  


启动本地mongo：ulimit -n 1024 && sudo mongod   此方法基本不掉mongo


远端mongo重启方法：
1、ssh 地址
2、输入密码
3、sudo su -
4、systemctl restart mongod.service


:wq保存并退出


使用ulimit -a 可以查看当前系统的所有限制值，使用ulimit -n 可以查看当前的最大打开文件数。
新装的linux默认只有1024，当作负载较大的服务器时，很容易遇到error: too many open files。因此，需要将其改大。
使用 ulimit -n 65535 可即时修改，但重启后就无效了。（注ulimit -SHn 65535 等效 ulimit -n 65535，-S指soft，-H指hard)

导入mongo临时加大空间 ulimit -n 9999


//杀nginx
ll
sudo su -
ps aux | grep nginx
kill 1665
nginx -c /xxxx.xxx.conf

//停止nginx
nginx -c 配置文件 -s stop


control + r  终端快捷搜索历史命令


netstat -anL 看地址，数据库监听的地址


//配置nginx
vim 公司地址
vim standlone_web.yaml
公司名
cd standlone_web.yaml
vim standlone_web.yaml
公司名 -l standlone_web.yaml
vim ~/Desktop/nginx.development.conf
sudo pkill -g nginx
sudo nginx -c ~/Desktop/nginx.development.conf





//启动/停止本地mongo
  brew services list
  brew services stop mongodb-community@4.2
  brew services start mongodb-community@4.2






//清空数据库
db.dropDatabase();

//在mongo里执行命令，生成mongoID
方法一：
ObjectId()
方法二：
new ObjectId().str


//把数据库2放到数据库1中
mongorestore -d xxx1   xxx2


//node版本切换，使用nvm
nvm list
nvm install v12.4.0
nvm list
node -v

nvm list
nvm use v8.17.0


//node安装指定版本
npm install -g n
或
sudo npm i -g n
n 8.11.4
或
sudo n 8.11.4


//写入文件
import fs from 'fs';
fs.writeFileSync(`datas/aaa.html`, html)


//启动mongo
sudo mongod

//查看数据库
mongo
show dbs
use 数据库
show collections
db.表名.find().pretty()  //pretty数据格式化    db.getCollection('表名').find({}).pretty
db.表名.findOne({_id: ObjectId('34343434343434232')})

//删除数据库表
mongo
show dbs
use 数据库
show collections
db.表名.remove({})


//导入数据库
mongorestore -h 192.168.x.xxx  --drop 数据库父级目录
或
mongorestore --host ip --drop 数据库父级目录
或
mongorestore --uri=mongodb://root:xxxx 27017 数据库父级目录 --drop
mongorestore --uri=ip 数据库父级目录 --drop


//打包数据库
mongodump -d 数据库id -o .
或   通过命令行进入桌面，就会打包到桌面上了
mongodump --uri=mongodb://root:xxxx 27017/webservice_db    //导出表
mongodump 地址 


//进入远端mongo
mongo 地址
mongo mongodb://root:xxxx:27017/admin


echo $?    //判断命令是否成功，返回0就代表导入成功


//会“导出”数据库到的当前目录下eport_payload.json
mongoexport -d 数据库名 -c 表名 -q '{"payload.test_conclusion":{"$exists": true}}' -o report_payload.json
//导入
mongoimport -d 数据库名 -c 表名 --file report_payload.json


//pgsql命令
//创建自己的数据库
psql --version
sudo adduser mydb
sudo su -postgres
psql -d postgres
psql -d xiaoxue