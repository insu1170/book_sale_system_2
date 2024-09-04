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
app.use(cors());

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
        clintRes = res; // 초기 요청에서 클라이언트의 응답 객체 저장
    } else {// 주소 데이터가 전달된 경우
        const address = req.body;
        console.log(address, address.zipNo);
        if (clintRes) {
            clintRes.json({
                data: [address.zipNo, address.roadFullAddr, address.addrDetail]
            });
        }
        clintRes = null;
    }
});
app.post('/insert', (req, res) => {

    const data = req.body;
    console.log('sql=:', data.sql, data.value)

    connection.query(data.sql, data.value, (err) => {
        if (err) {
            res.json({success: false})
        } else {
            res.json({success: true})
        }
    })
})


app.post('/user/login', (req, res) => {
    const data = req.body
    // console.log(data, '로그인 요청이 왔어요')
    const sql = sqlSelect('user', data, res)
})

const sqlSelect = (tableName, useValue, res) => {
    const [findValue, attributeName, attributeValue] = useValue
    console.log('finValue:', findValue, 'attributeName:', attributeName, 'attributeValue:', attributeValue)
    const queryMark = attributeName.map((data) => `${data} = ?`).join(' AND ')
    const sql = `select ${findValue} from ${tableName} where ${queryMark} `
    connection.query(sql, attributeValue, (err, result) => {
        if (err) {
            console.error(err)
            res.json(false)
        } else {
            res.json(result)
        }
    })
}

app.set('port', process.env.PORT || 3001);
const server = http.createServer(app).listen(app.get('port'), () => {
    console.log('서버 시작: ' + app.get('port'));
});