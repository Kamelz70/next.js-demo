import React from "react";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

export default function HomePage(props) {
  console.log(props.meetups);

  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Meetup with amazing people" />
      </Head>
      <MeetupList meetups={props.meetups}></MeetupList>
    </>
  );
}

export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;
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
  const result = await meetupCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: result.map((meetup) => {
        console.log(meetup.title);
        console.log(meetup.title);
        console.log(meetup._id.toString());

        return { ...meetup, id: meetup._id.toString(), _id: null };
      }),
    },
  };
}
// export async function getStaticProps() {
//   await new Promise((r) => setTimeout(r, 5000));
//   console.log("waited");
//   return {
//     props: {
//       meetups: DUMMY_LIST,
//       revalidate: 10,
//     },
//   };
// }
