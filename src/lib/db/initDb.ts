import mongoose from "mongoose";

const initMongo = () => {
    mongoose
        .connect(process.env.db)
        .then((res) => console.log("Connected to DB"))
        .catch((err) => console.log(err));
};

export { initMongo as initDb };