const express = require('express');
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended : true}));
const MongoClient = require('mongodb').MongoClient;


// MongoClient.connect('mongodb+srv://admin:gg0069759@cluster0.cnufat6.mongodb.net/?retryWrites=true&w=majority',function(error, client){
//     app.listen(8080, function(){
//         console.log('success connect DB')
//     });

// });
MongoClient.connect('mongodb+srv://admin:<PW>@cluster0.cnufat6.mongodb.net/?retryWrites=true&w=majority',{ useUnifiedTopology: true }, function(error, client){
    if (error) return console.log(error)
    
    db = client.db('todoapp');

    // db.collection('post').insertOne({_id: 1 ,data: 'saveData', 나이: 25}, function(error, res){
    //     console.log('save');
    // });

    app.listen(8080, function(){
        console.log('listening on 8080')
    });
});


// app.listen(8080, function(){
//     console.log('listening on 8080')
// });

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
    db.collection('post').insertOne({todo: req.body.todo, date: req.body.date}, function(error,res){
        console.log('save data');
    });
    console.log(req.body.todo)
    console.log(req.body.date)

});