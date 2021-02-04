
const express = require("express")
const path = require("path")
const fs = require("fs")
const uuidv1 = require("uuidv1");
const app = express()

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static("public"))


//HTML Route
app.get('/notes', (req, res) => {
    res.sendFile(path.join (__dirname, "/public/notes.html"))

    // app.get('*', function (req, res) {
    //     res.sendFile(path.join (__dirname, "/public/index.html"))
    // })
})

//Api Route
app.get("/api/notes", (req, res) => {
    const getNotes = JSON.parse(fs.readFileSync(path.join(__dirname, "./db/db.json")));
        res.json(getNotes);
        console.log(getNotes)
})

//Sends input information to the server
app.post("/api/notes", (req, res) => {

    let pushNote = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let uniqueId = uuidv1()
    let createdNote = req.body;
        createdNote.id = uniqueId;
        pushNote.push(createdNote);

    fs.writeFile( "./db/db.json", JSON.stringify(pushNote), (err) => {
        if (err) throw err;
             res.json(pushNote);
          });
     console.log(pushNote)
     return pushNote;
});



//gets note by uniquely generated ID param and filters array to select proper ID for deletion
app.delete("/api/notes/:id", (req, res) => {

    const noteId = req.params.id;
    let pushNote = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    const delNote = pushNote.filter(deletedNote => deletedNote.id != noteId);

    fs.writeFile("./db/db.json", JSON.stringify(delNote), (err) => {
        if (err) throw err;
        res.json(pushNote);
    })
});

app.listen(PORT, function () {
    console.log("App listening to PORT " + PORT)
});






