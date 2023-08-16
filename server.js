const express = require('express');
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended : true}));
const MongoClient = require('mongodb').MongoClient;
app.set('view engine','ejs');

// MongoClient.connect('mongodb+srv://admin:gg0069759@cluster0.cnufat6.mongodb.net/?retryWrites=true&w=majority',function(error, client){
//     app.listen(8080, function(){
//         console.log('success connect DB')
//     });

// });
MongoClient.connect('mongodb+srv://admin:poiu0987@cluster0.cnufat6.mongodb.net/?retryWrites=true&w=majority',{ useUnifiedTopology: true }, function(error, client){
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
    res.render('index.ejs');
    // res.sendFile(__dirname + '/index.html')
});

app.get('/write',function(req,res){
    res.render('write.ejs');
    // res.sendFile(__dirname + '/write.html')
});

app.get('/write1',(req,res) => {res.sendFile(__dirname + '/write.html')});
//신문법, 실무에서는 이렇게 쓰지 않을까?

app.post('/add', function(req,res){
    db.collection('counter').findOne({name : 'countPost'}, function(err,ret){
        console.log(ret.totalPost);
        var TotalPost = ret.totalPost;

        db.collection('post').insertOne({ _id : TotalPost, todo: req.body.todo, date: req.body.date}, function(error,ret){
            console.log('save data');

            db.collection('counter').updateOne({name : 'countPost'},{ $inc : {totalPost : 1} },function(error,ret){
                if(error){return console.log(error)};
                res.render('sendcheck.ejs');
            });
            if(error){return console.log(error)};
        });

    });

    console.log(req.body.todo)
    console.log(req.body.date)
});


app.get('/list', function(req, res){

    db.collection('post').find().toArray(function(err, ret){
        console.log(ret.length)


        console.log(ret);
        res.render('list.ejs', {posts: ret});
    });
});


app.delete('/delete',function(req,res){
    console.log(req.body)
    req.body._id = parseInt(req.body._id)
    db.collection('post').deleteOne(req.body, function(err,ret){
        console.log('삭제완료');
        res.status(200).send({ message : '성공했습니다.' });
    })

});

app.get('/detail/:id', function(req, res){
    db.collection('post').findOne({_id : parseInt(req.params.id)}, function(err, ret){
        if (err) return console.log(err)
        console.log(ret);
        res.render('detail.ejs', { data : ret});
    })
})


app.get('/update/:id', function(req, res){
    db.collection('post').findOne({_id : parseInt(req.params.id)}, function(err, ret){
        if (err) return console.log(err)
        console.log(ret)
        res.render('update.ejs', { data: ret }); // 'data' 객체를 템플릿으로 전달
    })
})

app.post('/update/:id/set', function(req, res){
    db.collection('post').updateOne({ _id : parseInt(req.params.id) }, { $set : { todo : req.body.todo , date : req.body.date} },function(err, ret){
        console.log(err);
        db.collection('post').find().toArray(function(error, rest){
    
            console.log(ret);
            res.render('list.ejs', {posts: rest});
        });
    });
});

app.get('/join', function(req,res){
    console.log(res);
    res.render('join.ejs');
});

app.get('/login', function(req,res){
    console.log(res);
    res.render('login.ejs');
});


app.post('/welcome',function(req,res){
    db.collection('userCounter').findOne({name : 'countUser'}, function(err,ret){
        console.log(ret.totalUser);
        var TotalUser = ret.totalUser;

        db.collection('user').insertOne({_id : TotalUser, Username: req.body.Username, Email: req.body.email, Password: req.body.password}, function(error,ret){
            console.log('insert User');
            db.collection('userCounter').updateOne({name: 'countUser'}, {$inc:{totalUser : 1}}, function(error,ret){
                if(error){return console.log(error)};
                console.log(ret)
                res.render('joincheck.ejs');
            });
            if(error){return console.log(error)};
        });
    });
    console.log(req.body);
});



