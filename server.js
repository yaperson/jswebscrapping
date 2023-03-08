import express from "express";
import WpRocket from "./src/wp-rocket/index.js";
import Gravityform from "./src/gravityform/index.js";

const host = '127.0.0.1';
const port = 8900;

let app = express()

// SERVER
// app.listen( process.env.PORT,
//             process.env.IP,() => {
//             console.log(`Server is runing on http://${process.env.IP}:${process.env.PORT}`);
// })

// LOCAL
app.listen(port, host, () => {
    console.log(`Server is runing on http://${host}:${port}`)
})

app.get('/wp-rocket', async function (req, res) {
    await WpRocket.getWPRocketChangelog().then(results => {
        res.status(200);
        res.send(results);
    });
});

app.get('/gravityform', async function (req, res) {
    await Gravityform.getGravityformChangelog().then(results => {
        res.status(200);
        res.send(results);
    });
});