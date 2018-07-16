const CONF={
    port:'5757',// 服务器的端口
    db:{
        client: 'mysql', //指明数据库类型，还可以是mysql，sqlite3等等
        connection: { //指明连接参数
            host : 'localhost',
            user : 'root',
            port:3306,// 数据库的端口
            password : 'zheng',
            database : 'xiangmubu'
        }
    },
    cdbName:'checkModel',
    fdbName:'feedbackModel',
    mdbName:'mapinfoModel'
};
module.exports=CONF;