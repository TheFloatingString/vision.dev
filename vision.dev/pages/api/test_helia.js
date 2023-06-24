import { createHelia } from 'helia';
import { strings } from '@helia/strings';

export default async function handler(req, res) {

    const helia = await createHelia();
    const s = strings(helia);

    const myImmutableAddress = await s.add("hello world");

    console.log(myImmutableAddress);

    res.status(200).json({"data": myImmutableAddress});

}