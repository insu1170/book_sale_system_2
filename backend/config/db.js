const mysql = require('mysql');

// 데이터베이스 연결 설정
const connection = mysql.createConnection({
    host: '127.0.0.1', user: 'root', password: '1234', database: 'booksalesystem'
});

// 데이터베이스 연결
connection.connect(err => {
    if (err) {
        console.error('데이터베이스 연결 오류:', err);
        return;
    }
    console.log('데이터베이스 연결 성공');
});

module.exports = connection;
