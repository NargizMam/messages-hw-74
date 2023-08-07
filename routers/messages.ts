import express from "express";
import fileDb from "../fileDb";
import fsMessages from "fs";
import {Post} from "../type";
const path = './messages';
const messagesRouter = express.Router();


messagesRouter.get('/', (req, res) => {
    let messages: Post[] = [];

    fsMessages.readdir(path, (err, files) => {
        files.forEach(file => {
            const filePath = path + '/' + file;
            let data = fsMessages.readFileSync(filePath);
            messages.push(JSON.parse(data.toString()));
        });
        let fiveMessages = messages.slice(messages.length-5, messages.length);
        res.send(fiveMessages);
    });

});

messagesRouter.post('/', async (req, res) => {
    if (!req.body.message){
        res.status(400).send({error: 'Data not valid!'});
    }

    let currentDate = new Date().toISOString();
    let postData = {
        message: req.body.message,
        datetime: currentDate,
    };
    const savedPost = await fileDb.addPost(postData);
    res.send(savedPost);
});
export default messagesRouter;
