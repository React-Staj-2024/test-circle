import { API_URL, TOKEN } from "@/constants/constants";
import { CreateUserIdResponse } from "@/models/CreateUserIdResponse";
import { GetAppIdResponse } from "@/models/GetAppIdResponse";
import { v4 as uuidv4 } from "uuid";

export default async function Home() {
  async function getAppId() {
    const res = await fetch(`${API_URL}/config/entity`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    const data: GetAppIdResponse = await res.json();
    const appId = data.data.appId;
    return appId;
  }

  async function createUserId() {
    "use server";

    const userId = uuidv4();
    const res = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        userId,
      }),
    });
    const data: CreateUserIdResponse = await res.json();
    console.log("Created User", data.data.id);
  }

  const appId = await getAppId();

  return (
    <>
      <h1>APPID: {appId}</h1>
      <form action={createUserId}>
        <button className="bg-blue-500 px-4 py-2 rounded-lg" type="submit">
          Create USER
        </button>
      </form>
    </>
  );
}
