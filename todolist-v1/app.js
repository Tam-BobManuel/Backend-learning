    // My npm and local modules
const express = require('express')
const bodyParser = require('body-parser')
const date = require(__dirname + "/date.js");

    // using express.js
const app = express();

    // users's passed date
const items = [];
const workItems = [];

                // EJS
app.set('view engine', 'ejs');

            // Body parser
app.use(bodyParser.urlencoded({ extended: true }));

    // Static files
app.use(express.static("Public"));

        // home route

app.get('/', (req, res, next) => {

    let day = date.getDate();

    res.render('list', {listTitle: day, newListItems: items});

});

app.post("/", (req, res) => {
    let item = req.body.newItem;

    if (req.body.list === "work") {
        workItems.push(items);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect('/');
    }


})

        // work page

app.get(`/work`, function(req,res) {
    res.render(`list`, {listTitle: "Work List", newListItems: workItems})
});

app.post(`/work`, (req,res) => {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect('/work');
})


            // about page
app.get(`/about`, (req, res) => {
    res.render("about");
})

        // server location

app.listen(3000, () => {
    console.log('server running on port 3000...');
});