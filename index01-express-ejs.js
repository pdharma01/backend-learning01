import express from "express";
import bodyParser from "body-parser";

//              -------- SETUP ------
//#region ============================================== 
const app = express();
app.use(express.static("public"))
let port = 3000;
let isAuthenticated = false;
let userName = null
let homepageMessage = null

// local paths ------
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

// utilities -----
const getDateTimeNow = () => {
    let now = new Date();
    let date = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    let time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    return date + ' ' + time
}

const routeLogger = (req, res, next) => {
    console.log(`Route Log:
    time: ${getDateTimeNow()},
    status: ${res.statusCode},
    method: ${req.method},
    url: ${req.url}`);
    next()
}

const checkPassword = (req, res, next) => {
    let { password } = req.body;
    console.log("password: " + password);
    if (password === "rrr") {
        isAuthenticated = true;
        userName = "Joe Legit"
    } else {
        isAuthenticated = false
        homepageMessage = "Sorry, wrong password!"
    }
    next()
}

// mount middleware -----
app.use(routeLogger)
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/check", checkPassword)
//#endregion



//              -------- ROUTES ------
//#region ============================================== 

app.get("/", (req, res) => {
    res.render(__dirname + "/views/homepage.ejs",
        res.locals = {
            time: getDateTimeNow(),
            message: homepageMessage
        })
})

app.post("/check", (req, res) => {
    isAuthenticated ? (
        res.redirect("/welcome")
    ) : (
        res.redirect("/")
    )
})

app.get("/welcome", (req, res) => {

    isAuthenticated ? (
        res.render(__dirname + "/views/welcome.ejs",
            res.locals = { time: getDateTimeNow(), name: userName })
    ) : (
        res.redirect("/")
    )
})

app.listen(port, (req, res) => {
    console.log("Yes, listening on port: " + port);
})
//#endregion