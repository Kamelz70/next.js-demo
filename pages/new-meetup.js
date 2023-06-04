import React from "react";
import NewMeetupForm from "../components/meetups/NewMeetupForm.js";
import { useRouter } from "next/router";
import { Head } from "next/head";
export default function NewMeetupPage() {
  const router = useRouter();
  async function addMeetupHandler(meetupData) {
    console.log(meetupData);
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
    router.push("/");
  }

  // import { Head } from "next/head";
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Meetup with amazing people" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
}
