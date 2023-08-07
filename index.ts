import express from 'express';
import messagesRouter from "./routes/messages";
import fileDb from "./fileDb";

const app = express();
const port = 8000;

app.use(express.json());
app.use('/messages', messagesRouter)


const run =async () => {
    await fileDb.init();
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
};

run().catch((e) => console.error(e));