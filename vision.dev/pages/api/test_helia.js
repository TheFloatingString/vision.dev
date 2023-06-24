import { createHelia } from 'helia';
import { strings } from '@helia/strings';
import { reactStrictMode } from '@/next.config';
// import multer from 'multer';

import formidable from 'formidable';
import fs from 'fs';


export const config = {
    api: {
        bodyParser: false
    }
};


// const upload = multer({ dest: '/uploads' })


export default async function handler(req, res) {
    // const form = new formidable.IncomingForm();

    // form.parse(req, (error, fields,files) => {
    //     if (error) {
    //         return res.status(400).json({error: "Upload failed"});
    //     }
    // })

    // const file = files.file;
    // const fileContent = fs.readFileSync(file.path, 'utf-8');

    // console.log(fileContent);




    // const helia = await createHelia();
    // const s = strings(helia);

    // const myImmutableAddress = await s.add("hello world");

    // console.log(myImmutableAddress);

    // console.log(await s.get(myImmutableAddress));

    // console.log(req.body);

    // console.log(await req.body);

    const file = await req.body.file;

    const fileContent = fs.readFileSync(file.path, "utf-8")

    // console.log(fileContent);

    // const { file } = await req.body;

    // console.log(file);

    res.status(200).json({"data": myImmutableAddress});

}