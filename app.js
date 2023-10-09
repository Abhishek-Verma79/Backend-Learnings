const express = require('express');

const app = express();

app.listen(3000);

app.get('/', (req,res) => {
    res.sendFile("C:/Users/hp/Desktop/WEbD/Back-End/views/index.html");
});

app.get('/about', (req,res) => {
    res.sendFile('./views/About-us.html',{root: __dirname});
});

//redirect

app.get('/about-us', (req,res) => {
    res.redirect('/about');
});

//404 page
app.use((req,res) => {
    res.status(404).sendFile('./views/Four04.html',{root: __dirname});
});