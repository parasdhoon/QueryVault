import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello from the backend!");
})

app.listen(4000, () => {
    console.log("Backend running on http://localhost:4000");
});