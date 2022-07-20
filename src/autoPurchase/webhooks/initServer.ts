import express from 'express';
import { routes } from './routes';

const app = express();

app.all(["*"], (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});


app.use(routes);

app.listen(process.env.PORT, () => {
    console.log(`started on https://localhost:${process.env.PORT}`)
})