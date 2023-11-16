const express = require('express');
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended : true}));
const MongoClient = require('mongodb').MongoClient;
app.set('view engine','ejs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(session({secret: '비밀코드', resave: true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

require('dotenv').config();
// MongoClient.connect('mongodb+srv://admin:gg0069759@cluster0.cnufat6.mongodb.net/?retryWrites=true&w=majority',function(error, client){
//     app.listen(8080, function(){
//         console.log('success connect DB')
//     });

// });
MongoClient.connect(process.env.DB_URL,{ useUnifiedTopology: true }, function(error, client){
    if (error) return console.log(error)
    
    db = client.db('todoapp');

    // db.collection('post').insertOne({_id: 1 ,data: 'saveData', 나이: 25}, function(error, res){
    //     console.log('save');
    // });

    app.listen(process.env.PORT, function(){
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

app.get('/', loginmain ,function(req,res){
    res.render('index.ejs');
    // res.sendFile(__dirname + '/index.html')
});

app.get('/write',function(req,res){
    res.render('write.ejs', { userID : req.user});
    // res.sendFile(__dirname + '/write.html')
});

app.get('/write1',(req,res) => {res.sendFile(__dirname + '/write.html')});
//신문법, 실무에서는 이렇게 쓰지 않을까?

app.post('/add', function(req,res){
    db.collection('counter').findOne({name : 'countPost'}, function(err,ret){
        console.log(ret.totalPost);
        var TotalPost = ret.totalPost;

        db.collection('post').insertOne({ _id : TotalPost, todo: req.body.todo, date: req.body.date, person: req.user.Username, userID : req.user._id}, function(error,ret){
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
        res.render('list.ejs', {posts: ret, userID : req.user});
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
        res.render('detail.ejs', { data : ret, userID : req.user});
    })
})


app.get('/update/:id', function(req, res){
    db.collection('post').findOne({_id : parseInt(req.params.id)}, function(err, ret){
        if (err) return console.log(err)
        console.log(ret)
        res.render('update.ejs', { data: ret, userID : req.user }); // 'data' 객체를 템플릿으로 전달
    })
})

app.post('/update/:id/set', function(req, res){
    db.collection('post').updateOne({ _id : parseInt(req.params.id) }, { $set : { todo : req.body.todo , date : req.body.date} },function(err, ret){
        console.log(err);
        db.collection('post').find().toArray(function(error, rest){
    
            console.log(rest);
            res.redirect('/list');
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



passport.use(new LocalStrategy({
  usernameField: 'id',
  passwordField: 'pw',
  session: true,
  passReqToCallback: false,
}, function (입력한아이디, 입력한비번, done) {
  db.collection('user').findOne({ Email: 입력한아이디 }, function (에러, 결과) {
    if (에러) return done(에러);
    if (!결과) return done(null, false, { message: '존재하지 않는 아이디요' });
    if (입력한비번 == 결과.Password) {
      return done(null, 결과);
    } else {
      return done(null, false, { message: '비번틀렸어요' });
    }
  })
}));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  db.collection('user').findOne({ _id: id }, function (err, user) {
    done(err, user);
  });
});

app.post('/login', passport.authenticate('local', { 
  failureRedirect : '/fail'
}), function(req, res){
  res.redirect('/mypage');
});

app.get('/fail', function(req, res) {
  res.send('로그인 실패');
});

app.get('/logout', function(req, res){
    // req.logout 메서드에 콜백 함수를 제공
    req.logout(function(err) {
        if (err) { return next(err); }
        // 로그아웃 후 세션을 파괴합니다.
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            }
            // 세션 파괴 후 홈페이지로 리다이렉트
            res.redirect('/');
        });
    });
});



app.get('/login', function(req,res){
    res.render(login.ejs)
});
//로그인 기능 실패

app.get('/mypage', logincheck, function(req, res) {
    console.log(req.user);
    res.render('mypage.ejs', { userID : req.user})
});

function logincheck(req, res, next){
    if(req.user){
        next()
    }
    else{
        res.send('로그인 안했는데')
    }
};

function loginmain(req, res, next){
    if(req.user){
       res.render('mypage.ejs', { userID : req.user}) 
    }
    else{
        next()
    }
}

//마이페이지에서 로그인 한 유저가 작성한 글들을 모아둔 인터페이스 개발하기
//검색기능 만들기
//이미지 업로드
//유저간 채팅 기능