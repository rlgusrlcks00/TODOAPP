# Node.js 알아야될 것들

**Part1**

1. **라이브러리를 설치하기 전에 npm 초기화**
    ```
    npm init
    ```
    이 명령은 설치한 라이브러리들을 기록하기 위한 `package.json` 파일을 생성합니다.

2. **Express 라이브러리 설치**
    ```
    npm install express
    ```
    Express는 Node.js에서 웹 서버를 띄우기 위한 기본적인 라이브러리입니다.

3. **서버 기본 코드**
    ```javascript
    const express = require('express');
    const app = express();
    app.listen();
    ```
    이 코드는 서버를 띄우기 위한 기본 문법으로, 작업을 시작하기 전에 먼저 작성해둡니다.

4. **GET 요청 처리**
    ```javascript
    app.get('경로', function(요청, 응답){
        응답.send('반갑습니다.');
    });
    ```
    이 코드는 클라이언트로부터 GET 요청이 오면 '반갑습니다.'라는 메시지를 응답으로 보냅니다.

5. **Nodemon 라이브러리**
    ```
    npm install nodemon
    ```
    Nodemon은 파일이 수정될 때마다 서버를 자동으로 재시작해주는 라이브러리입니다.

6. **HTML 파일 응답 보내기**
    ```javascript
    app.get('/', function(req, res){
        res.sendFile(__dirname + '/index.html');
    });
    ```
    이 코드는 클라이언트로부터 루트 경로('/')로의 GET 요청이 오면 'index.html' 파일을 응답으로 보냅니다.

7. **POST 요청 처리**
    ```javascript
    app.post('경로', function(){
        응답.send('전송완료')
    });
    ```
    이 코드는 클라이언트로부터 특정 경로로의 POST 요청이 오면 '전송완료'라는 메시지를 응답으로 보냅니다.

8. **Body-parser 라이브러리**
    ```
    npm install body-parser
    ```
    Body-parser는 POST 요청으로 전달된 데이터를 파싱하는 라이브러리입니다. 이 라이브러리를 사용하려면 아래의 두 라인을 추가해야 합니다.
    ```javascript
    const bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({extended : true}));
    ```

9. **POST 요청 데이터 확인하기**
    ```javascript
    console.log(요청.body.name)
    ```
    이 코드는 클라이언트로부터 전달된 POST 요청 데이터 중 'name' 속성의 값을 콘솔에 출력합니다.

10. **API와 REST API**
    API(Application Programming Interface)는 웹 서버와 클라이언트 간의 요청 방식을 정의하는 것을 의미합니다. REST API는 이러한 API를 REST 원칙에 따라 설계한 것을 의미합니다. REST 원칙에는 6개의 원칙이 있습니다.



**Part2**
MongoDB를 연결하는 방법은 다음과 같습니다:

```javascript
MongoClient.connect('mongodb+srv://admin:<UrPW>@cluster0.cnufat6.mongodb.net/?retryWrites=true&w=majority',{ useUnifiedTopology: true }, function(error, client){
    if (error) return console.log(error)
    
    app.listen(8080, function(){
        console.log('listening on 8080')
    });
});
```
이것이 DB를 연결하는 법입니다.

위의 코드 중간에 아래와 같이 코드를 추가하면 데이터를 저장할 수 있습니다. 꼭 중간에 넣을 필요는 없습니다. MongoDB에 연결만 되어 있다면 어느 곳에서든 선언할 수 있습니다.

```javascript
db = client.db('todoapp');
db.collection('post').insertOne({data: 'saveData'}, function(error, res){
    console.log('success save');
});
```
기본 키를 직접 입력해주는 경우에는 아래와 같이 선언하면 됩니다:

```javascript
db = client.db('todoapp');
db.collection('post').insertOne({_id:1,data: 'saveData'}, function(error, res){
    console.log('success save');
});
```
