export default async function handler(req, res) {

    const file = await req.body.file;
    const fileContent = fs.readFileSync(file.path, "utf-8")

	res.status(200).json({"data": "vision.dev Rest API home."})
}