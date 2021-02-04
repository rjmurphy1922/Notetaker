
const express = require("express")
const path = require("path")
const fs = require("fs")
const uuidv1 = require("uuidv1");
const app = express()

// const router = express.Router()
// const cors = require("cors");

const PORT = process.env.PORT || 3001;



app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static("public"))
// app.use(cors());




app.get('/notes', (req, res) => {
    res.sendFile(path.join (__dirname, "/public/notes.html"))
})

// app.get('*', function (req, res) {
//     res.sendFile(path.join (__dirname, "/public/index.html"))
// })

//Api Route
app.get("/api/notes", (req, res) => {
    const getNotes = JSON.parse(fs.readFileSync(path.join(__dirname, "./db/db.json")));
        res.json(getNotes);
        console.log(getNotes)

})


app.post("/api/notes", (req, res) => {

    let pushNote = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let createdNote = req.body;
    let uniqueId = uuidv1()
        createdNote.id = uniqueId;
        pushNote.push(createdNote);

    fs.writeFile( "./db/db.json", JSON.stringify(pushNote), (err) => {
        if (err) throw err;
             res.json(pushNote);
          });
     console.log(pushNote)
     return pushNote;
});

app.listen(PORT, function () {
    console.log("App listening to PORT " + PORT)
});






