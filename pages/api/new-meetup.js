import { MongoClient } from "mongodb";
export default async function handler(req, res) {
  if (req.method == "POST") {
    const data = req.body;
    const uri =
      "mongodb+srv://kamel:kamel123@cluster0.gs4eovp.mongodb.net/meetups?retryWrites=true&w=majority";
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
      serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true,
      },
    });
    await client.connect();
    const db = client.db();
    const meetupCollection = db.collection("meetups");
    const result = await meetupCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({ message: "meetup inserted" });
  }
}
