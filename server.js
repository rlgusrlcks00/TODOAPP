const express = require('express');
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended : true}));

app.listen(8080, function(){
    console.log('listening on 8080')
});

app.get('/pet', function(요청, 응답){
    응답.send('pet shoping site');
});

app.get('/beauty', function(req,res){
    res.send('beauty shoping site');
});

app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html')
});

app.get('/write',function(req,res){
    res.sendFile(__dirname + '/write.html')
});

app.get('/write1',(req,res) => {res.sendFile(__dirname + '/write.html')});
//신문법, 실무에서는 이렇게 쓰지 않을까?

app.post('/add', function(req,res){
    res.send('전송완료')
    console.log(req.body.todo)
    console.log(req.body.date)
    
});