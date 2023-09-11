// To DO
// set up post 
// authentificatin middle wear
// forms and pass from client to server
// routes to different pages
//  add ejs footer



import express from "express";
import bodyParser from "body-parser";

//              -------- SETUP ------
//#region ============================================== 
const app = express();
app.use(express.static("public")) 
let port = 3000

// local paths ------
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

// utilities -----
const getDateTimeNow = () => {
    let now = new Date();
    let date = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    let time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    return  date + ' ' + time
}

const routeLogger = (req, res, next) => {
    console.log(`Route Log:
    time: ${getDateTimeNow()},
    status: ${res.statusCode},
    method: ${req.method},
    url: ${req.url}`);
    next()
}

// mount middleware -----
app.use(routeLogger)
app.use(bodyParser.urlencoded({ extended: true }))
//#endregion



//              -------- ROUTES ------
//#region ============================================== 

app.get("/", (req, res) => {
    res.render(__dirname + "/views/homepage.ejs",
    res.locals = {time: getDateTimeNow()})
})

app.listen(port, (req, res) => {
    console.log("Yes, listening on port: " + port);
})
//#endregion