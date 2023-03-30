import * as dotenv from 'dotenv';
import express from 'express';
import router from "./routes/users.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use('/api', router)

app.get('/', (req, res) => {
    // console.log(req.body);
    res.json('Server works online')
})

async function startApp () {
    try {
        app.listen(PORT, () => {console.log("Work on port " + PORT)})
    } catch (error) {
        console.log('App start error', error)
    }
}

startApp();