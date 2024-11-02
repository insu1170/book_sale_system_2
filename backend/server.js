const express = require('express')
const connection = require('./config/db')
const cors = require('cors');
const bodyParser = require('body-parser')
const http = require("http");
const app = express()
app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({extended: true})); // 이거 있어야 함 주소 검색 결과를 받을 수 있음

app.use(cors({
    origin: 'http://localhost:3000', // 클라이언트의 주소
    credentials: true
}));

app.post('/select', (req, res) => {
    const data = req.body;
    console.log(data)
    connection.query(data.sql, data.filterVal, (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({success: false, error: 'Database query error'});
        }
        // 결과가 빈 배열인지 확인
        console.log(result.length)
        if (result.length === 0) {
            console.log('No matching records found');
            return res.json({success: false});
        } else {
            console.log('Query result:', JSON.stringify(result));
            return res.json({success: true});
        }
    });
});


app.post('/returnList', (req, res) => {
    const data = req.body;
    connection.query(data.sql, (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({success: false, error: 'Database query error'});
        } else {
            if (result.length === 0) {
                console.log('No matching records found');
                return res.json({});
            } else {
                console.log('Query result:', JSON.stringify(result));
                return res.json(result);
            }
        }
    })

})

let clintRes = '';

app.post('/address', (req, res) => {
    console.log('주소 요청', req.body.zipNo);
    if (!req.body.zipNo) {
        console.log('첫 시도')

        clintRes = res; // 초기 요청에서 클라이언트의 응답 객체 저장
    } else {// 주소 데이터가 전달된 경우
        console.log('두 번째')
        const address = req.body;
        console.log(address, address.zipNo);
        clintRes.json({
            data: [address.zipNo, address.roadFullAddr, address.addrDetail]
        });

        clintRes = null;
    }
});


app.post('/user/login', (req, res) => {
    const data = req.body
    // console.log(data, '로그인 요청이 왔어요')
    sqlSelect('user', data, res)
})
// userPostApi('login', ['*'], ['userId', 'passWord'], [inputValue.idValue, inputValue.pwValue])
app.post('/user/cart', (req, res) => {
    const data = req.body
    console.log(data)
    sqlSelect('cart', data, res)

})

app.post('/user/card', (req, res) => {
    const data = req.body
    sqlSelect('card', data, res)
})
app.post('/user/address', (req, res) => {
    const data = req.body
    sqlSelect('address', data, res)
})

app.post('/user/order', (req, res) => {
    const data = req.body
    sqlSelect('order', data, res)
})

app.post('/user/orderList', (req, res) => {
    const data = req.body
    sqlSelect('orderList', data, res)
})

app.post('/user/insert', (req, res) => {
    const data = req.body
    console.log(data, '요청이 왔어요')

    const tableName = data[0]
    const columns = data[1]
    const values = data[2]
    console.log(tableName, columns, values)
    const sql = `INSERT INTO \`${tableName}\` (\`${columns.join('`, `')}\`) VALUES ('${values.join("', '")}')`;
    connection.query(sql, (err, result) => {
        if (err) {
            console.error(err)
            return res.json(false)
        } else {
            return res.json(result)
        }
    })
})


app.post('/insert', (req, res) => {

    const data = req.body;
    console.log('sql=:', data.sql, data.value)

    // connection.query(data.sql, data.value, (err) => {
    //     if (err) {
    //         res.json({success: false})
    //     } else {
    //         res.json({success: true})
    //     }
    // })
    sqlInsert()
})


app.get('/user/bookselect', (req, res) => {
    const data = req.query
    console.log(data, 'd')
    connection.query(`select ${data[1]} from ${data[0]}`, (err, result) => {
        if (err) {
            console.error(err)
            res.json(false)
        } else {
            res.json(result)
        }
    })
})

const sqlSelect = (tableName, useValue, res) => {
    const [findValue, attributeName, attributeValue] = useValue;
    console.log('findValue:', findValue, 'attributeName:', attributeName, 'attributeValue:', attributeValue);

    const queryMark = attributeName.map((data) => `${data} = ?`).join(' AND ');
    const sql = `select ${findValue} from \`${tableName}\` where ${queryMark}`;
    console.log(sql, attributeValue, 'sqlSelect 입니다');

    connection.query(sql, attributeValue, (err, result) => {
        if (err) {
            console.error(err);
            return res.json(false);
        } else if (!result || result.length === 0) { // result가 undefined이거나 빈 배열일 경우
            console.log('No results found');
            return res.json([false, []]); // 결과가 없을 때 false와 빈 배열 반환
        } else {
            console.log(result.length, '길이');
            console.log('result:', result);
            return res.json([true, result]);
        }
    });
};


const sqlInsert = (tableName, useName, useValue, res) => {
//
// const quertMark = useName.map((data)=>)
    const name = useName.map(data => `'${data}'`)
    const value = useValue.map(data => `'${data}'`)
    const sql = `insert into "${tableName}" (${name}) values (${value})`

    console.log(sql, 'sql완성')
    connection.query(sql, (err, result) => {
        if (err && result.length === 0) {
            console.log(err);
            res.json(false)
        } else {
            res.json(true)
        }
    })

}
//userPostApi('update', `book`, [[`quantity`, data.quantity - count]], [`bookId`, data.bookId])
app.post('/user/update', (req, res) => {
    const data = req.body; //[ 'book', [ [ 'quantity', 40 ] ], [ 'bookId', 13 ] ]

    const tableName = data[0];
    const updateData = data[1]; // [['quantity', 10]] 무엇을?
    const targetData = data.slice(2); // [['bookId', 1]] 기준
    console.log('ss:', data)

    const updateFields = updateData.map(([column, value]) => `\`${column}\` = '${value}'`).join(', ');
    const targetFields = targetData.map(([column, value]) => `\`${column}\` = '${value}'`).join(' AND ');
    // SQL 쿼리 완성
    const sql = `UPDATE \`${tableName}\` SET ${updateFields} WHERE ${targetFields}`;
    // SQL 쿼리 실행
    connection.query(sql, (error, results) => {
        console.log(results.length)
        if (error && results.length === 0) {
            console.error('쿼리 에러', error);
            res.json(false)
        } else {
            res.json(true)
        }
    });
});

app.post('/user/delete', (req, res) => {
    data = req.body
    console.log(req.body, data)
    const sql = `DELETE FROM \`${data[0]}\` WHERE \`${data[1]}\` = '${data[2]}'`;

    console.log(sql)
    connection.query(sql, (error, result) => {
        if (error && result.length === 0) {
            console.error('쿼리 에러', error);
            res.json(false)
        } else {
            res.json(true)
        }
    })

})


app.set('port', process.env.PORT || 3001);
const server = http.createServer(app).listen(app.get('port'), () => {
    console.log('서버 시작: ' + app.get('port'));
});