import fs from 'fs';

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb' // Set desired value here
        }
    }
}

export default async function handler(req, res) {
    let data = req.body.file.replace(/^data:image\/\w+;base64,/, "");
    let buff = Buffer.from(data, 'base64');
    fs.writeFileSync(req.body.folder+req.body.name, buff);

    return res.json("done");
}