import {promises as fs} from 'fs';
import {Post, PostWithoutId} from "./type";

const path = '../messages';
let data: Post[] = [];

const fileDb = {
    async init() {
        try {
            const fileContents = await fs.readFile(path);
            data = JSON.parse(fileContents.toString());
        }catch (e) {
            data = [];
        }
    },
    async addPost(post: PostWithoutId){
        let createDatetime = new Date().toISOString();

        let newPost = {
            ...post,
            datetime: post.datetime,
            id: createDatetime
        }
        data.push(newPost);
        let fileName = `${path}/${post.datetime}.txt`;
        await this.save(fileName);
        return newPost;
    },
    async save(fileName: string){
        return fs.writeFile(fileName, JSON.stringify(data));
    }
};
export default fileDb;