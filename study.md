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

# EJS로 HTML 사용법

EJS(Embedded JavaScript)는 JavaScript 템플릿 엔진입니다. 서버에서 데이터를 가져와 HTML로 변환하여 클라이언트에게 보냅니다.

## EJS 설치 및 설정

1. EJS 설치:

   ```bash
   npm install ejs
   ```

2. Express 앱에서 EJS를 뷰 엔진으로 설정:

   ```javascript
   app.set('view engine', 'ejs');
   ```

## 서버에서 데이터 가져오기

HTML 내에서 `<%= (서버에서 보낸 변수 이름) %>`와 같이 작성하면 서버에서 데이터를 가져올 수 있습니다.

## EJS 파일 렌더링

GET 방식으로 EJS 파일을 접근하는 방법:

```javascript
app.get('/list', function(req, res){
    res.render('list.ejs');
});
```

## MongoDB에서 데이터 가져오기

다음은 'post'라는 콜렉션에서 데이터를 다루는 예시입니다.

```javascript
db.collection('post')
```

모든 데이터를 가져오려면 다음과 같이 작성합니다:

```javascript
db.collection('post').find().toArray();
```

데이터를 가져온 후 EJS 파일을 렌더링하는 방법:

```javascript
app.get('/list', function(req, res){
    db.collection('post').find().toArray(function(err, ret){
        console.log(ret);
        res.render('list.ejs', {posts: ret}); 
    });
});
```

## 데이터 출력

HTML 내에서 서버에서 받은 데이터를 출력하는 방법:

```html
<p class="lead">할일 제목 : <%= posts[0].todo %></p>
<hr class="my-4">
<p>할일 마감 날짜 : <%= posts[0].date %></p>
```

## JavaScript 문법 사용

EJS는 JSP처럼 `<% %>` 태그를 사용해 HTML 내에서 JavaScript 문법을 사용할 수 있습니다.

```html
<% for (var i=0; i < posts.length; i++){ %>
  <div class="jumbotron">
    <h1 class="display-4">저장된 데이터</h1>
    <p class="lead">할일 제목 : <%= posts[i].todo %></p>
    <hr class="my-4">
    <p>할일 마감 날짜 : <%= posts[i].date %></p>
    <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
  </div>
<% } %>
```

## 데이터 관리

데이터 ID를 관리하는 방법:

```javascript
db.collection('counter').findOne({name : 'countPost'}, function(err, ret){
    console.log(ret.totalPost);
    var TotalPost = ret.totalPost;
});
```

데이터를 수정하는 방법:

```javascript
db.collection('counter').updateOne()  // 하나의 데이터를 수정
db.collection('counter').updateAny()  // 여러 데이터를 수정
```

데이터를 수정할 때 필요한 연산자:

```javascript
{$set : {totalPost : 바꿀 값}}  // 어떠한 값을 바꿈
{$inc : {totalPost : 기존값에 더해줄 값}}  // 기존 값에 더함
```

## DELETE 요청 보내기

DELETE 요청을 보내는 두 가지 방법:

1. `method-override` 라이브러리 사용
2. AJAX 사용

AJAX는 서버와 클라이언트 간의 비동기 통신을 가능하게 해주는 JavaScript 문법입니다.


AJAX의 장점은 새로고침 없이 서버에 요청하는 것을 도와주는 것입니다. 이를 통해 웹 페이지의 일부분만 업데이트하여 사용자 경험을 향상시킬 수 있습니다.

먼저, AJAX를 사용하기 위해서는 jQuery를 포함시켜야 합니다. jQuery는 브라우저에서 JavaScript 코드를 간편하게 작성하고 DOM 조작 및 AJAX 요청을 보다 쉽게 처리할 수 있게 도와주는 라이브러리입니다.

```html
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
```

AJAX를 간단하게 사용하려면 위와 같이 jQuery를 로드해야 합니다. 이후 아래와 같이 `$.ajax()` 함수를 호출하여 AJAX 요청을 보낼 수 있습니다.

```html
<script>
  $.ajax({
    // AJAX 요청을 보내는 코드
  });
</script>
```

AJAX의 기본 문법은 다음과 같습니다.

```html
<script>
  $.ajax({
    method: 'DELETE', // 요청 방식 (GET, POST, PUT, DELETE 등)
    url: '경로', // 요청을 보낼 서버의 주소
    data: '요청과 함께 보낼 데이터', // 서버에 전달할 데이터 (옵션이므로 필요에 따라 사용)
  });
</script>
```

서버 측에서는 AJAX 요청을 받아서 처리하는 부분을 작성해야 합니다. 예를 들어, 삭제 기능을 구현하기 위해 다음과 같이 `app.delete()` 메서드를 사용합니다. 그리고 `res.body`로 받아오는 데이터가 문자열이므로 숫자로 변환해야 합니다.

```javascript
app.delete('/delete', function (req, res) {
  req.body._id = parseInt(req.body._id);
  db.collection('post').deleteOne(req.body, function (err, ret) {
    console.log('삭제완료');
  });
});
```

클라이언트 측에서는 삭제 버튼 클릭 시 AJAX를 통해 서버로 삭제 요청을 보내고, 성공적으로 처리된 경우 해당 글의 div 태그를 서서히 안보이게(fadeOut) 할 수 있습니다.

```html
<script>
  $(document).ready(function () {
    $('.delete').click(function (e) {
      e.preventDefault();
      var postNum = $(this).data('id');
      var pushedBTN = $(this);
      $.ajax({
        method: 'DELETE',
        url: '/delete',
        data: { _id: postNum }
      }).done(function (ret) {
        console.log('성공했습니다.');
        pushedBTN.parent('div').fadeOut();
      }).fail(function(xhr, textStatus, errorThrown){
        console.log('실패하셨습니다.');
        console.log(xhr, textStatus, errorThrown);
      });
    });
  });
</script>
```

또한, 상세 페이지는 여러개를 준비하는 것이 아니라 하나의 상세 페이지에서 데이터베이스로 관리합니다. 이를 위해 URL의 파라미터를 사용하여 해당 글의 정보를 동적으로 가져옵니다.

```javascript
app.get('/detail/:id', function(req, res){
    db.collection('post').findOne({_id : parseInt(req.params.id)}, function(err, ret){
        if (err) return console.log(err)
        console.log(ret);
        res.render('detail.ejs', { data : ret});
    })
})
```

이렇게 하면 해당 글의 정보를 상세 페이지에 보여주며, 동적인 페이지를 구현할 수 있습니다.