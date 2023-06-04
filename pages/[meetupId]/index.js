import React from "react";
import { MongoClient, ObjectId } from "mongodb";
export default function MeetupDetailsPage(props) {
  const { id, title, image, address, description } = props.meetup;
  return (
    <>
      <h1>{title}</h1>
      <h1>{id}</h1>

      <img src={image} alt="" />
      <address>{address}</address>
      <h2>{description}</h2>
    </>
  );
}
export async function getStaticPaths() {
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
  const result = await meetupCollection
    .find({}, { projection: { _id: 1 } })
    .toArray();
  client.close();
  const meetupIds = result.map((meetup) => {
    return {
      params: {
        meetupId: meetup._id.toString(),
      },
    };
  });

  return {
    fallback: "blocking",
    paths: meetupIds,
  };
}
export async function getStaticProps(context) {
  const { meetupId } = context.params;

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
  const result = await meetupCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();
  return {
    props: {
      meetup: { ...result, id: result._id.toString(), _id: null },
    },
  };
}
