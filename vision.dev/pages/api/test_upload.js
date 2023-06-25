import fs from 'fs';
import multer from 'multer';


const upload = multer({ dest: 'uploads/' });

export const config = {
    api: {
      bodyParser: false,
    },
  };

export default async function handler(req, res) {

    // console.log(req.body);

    // console.log(req.body.file);

    return upload.single('file')(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: err.message });
        } else if (err) {
            return res.status(500).json({ message: 'Something went wrong' });
        }

        // console
        console.log(req.file);

        const data = fs.readFileSync(req.file.path);
        // console.log(data.toString());

        
         res.status(200).json({ message: 'File uploaded successfully' });
      return
    });
}