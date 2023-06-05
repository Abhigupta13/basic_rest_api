const express =require('express');
const bodyParser =require('body-parser');

const app =express();
const PORT=3000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//mimic the db using an array 
let blogsList=[];
app.get('/blogs',function(req,res){
   return res.status(200).json({
    data: blogsList,
    success : true
   })
});

app.post('/blogs',function(req,res){
    blogsList.push({
        title : req.body.title,
        content: req.body.content,
        id: Math.floor(Math.random()*100)
    });
    return res.status(201).json({
        success: true,
    });
});
app.get('/blogs/:id',function(req,res){
    // console.log(req.params);
    const result =blogsList.filter((blog)=> blog.id==req.params.id);
    return res.status(200).json({
        data : result,
        success :true
    })
})
app.delete('/blogs/:id',function(req,res){
    // console.log(req.params);
    // blogsList.delete(req.params.id);
    const remains =blogsList.filter((blog)=> blog.id!=req.params.id);
    return res.status(200).json({
        data : remains,
        success :true
    })
})


app.listen(PORT, ()=>{
    console.log("server Started on port",PORT);
})
