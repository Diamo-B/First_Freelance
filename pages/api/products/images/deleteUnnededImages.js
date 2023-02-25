import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    let folder = req.body.folder;
    let filesToDelete = req.body.imagenames;

    for (const file of filesToDelete) {
        fs.unlink(path.join(folder, file), (err) => {
            if (err) throw err;
            else
              console.log(`${file} deleted successfully`);
        });
    }
    
    return res.status(200).json("done");
}
