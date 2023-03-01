import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {

    let folder = req.body.folder;

    fs.readdir(folder, (err, files) => {
        if (err)
		return res.status(500).json(err);
        for (const file of files) {
          fs.unlink(path.join(folder, file), (err) => {
            if (err)
		return res.status(500).json(err);
            else
              console.log("file deleted successfully");
          });
        }
    });

    return res.status(200).json("done")
}
