import { API_URL, TOKEN } from "@/constants/constants";
import { CreateTokenResponse } from "@/models/CreateTokenResponse";
import { CreateUserIdResponse } from "@/models/CreateUserIdResponse";
import { GetAppIdResponse } from "@/models/GetAppIdResponse";
import { InitializeUserResponse } from "@/models/InitializeUserResponse";
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

  async function createToken() {
    "use server";

    const userId = "c01d93a1-def3-40d3-9841-767f70f31048";
    const res = await fetch(`${API_URL}/users/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        userId,
      }),
    });
    const data: CreateTokenResponse = await res.json();
    console.log("Created Token", data);
  }

  async function initializeUser() {
    "use server";
    const idempotencyKey = uuidv4();
    const blockchains = ["MATIC-AMOY"];
    const userId = "c01d93a1-def3-40d3-9841-767f70f31048";
    const userToken =
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoTW9kZSI6IlBJTiIsImRldmVsb3BlckVudGl0eUVudmlyb25tZW50IjoiVEVTVCIsImVudGl0eUlkIjoiMjc4Y2U3MDEtNWZlMy00MzA5LTkzZGEtOTQyYzI4NWM0NDMyIiwiZXhwIjoxNzE2MjQwNTYyLCJpYXQiOjE3MTYyMzY5NjIsImludGVybmFsVXNlcklkIjoiZjVlNjczODMtZjlmZi01YmQ5LTkxNGUtMjdhMGYzYTlkOTVkIiwiaXNzIjoiaHR0cHM6Ly9wcm9ncmFtbWFibGUtd2FsbGV0LmNpcmNsZS5jb20iLCJqdGkiOiIxYzJhYjVlNS0yNjZjLTQ4Y2QtYmI4Yy05ZTAxZDJiMjJhYjIiLCJzdWIiOiJjMDFkOTNhMS1kZWYzLTQwZDMtOTg0MS03NjdmNzBmMzEwNDgifQ.eVKZoRD8TNoXBEKBObjKE-oH23quJLuMeLBcxwkT7jj2uWTg6yLwCP6WFCJ0ONKGSIsgxYUA6OLarU4x_Xqn0WK6UVTXdhCjbGmXk_qrLJah3oK6bPkprCOP7wMNocxvW6HWEofm95LYdmi3MeNuD2rymA8KC2T28AHMKT2ezEdoVK1q_Qu0ZPd7xGW2LFvZC9Eik0cUxvgDs-jDsIkZvyIV3rtXraP20YLqyRl_b6dbGVbH2bpBDI2kqyzM0o9vgY2u82ot791GAqXnsMPfJyiKUKQrb975cNIn55HtzNW7C9BM2q0Nbb-SB0WRhYtSIIzDA0R4cE5MaafBIeQ1hA";
    const res = await fetch(`${API_URL}/user/initialize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
        "X-User-Token": userToken,
      },
      body: JSON.stringify({
        idempotencyKey,
        blockchains,
      }),
    });
    const data: InitializeUserResponse = await res.json();
    console.log("ChallengeId", data.data.challengeId);
    const challengeId = "7a178c71-18b5-5478-8180-426462329bc6";
  }

  const appId = await getAppId();

  return (
    <>
      <h1>Server kısmı</h1>
      <h2>APPID: {appId}</h2>
      <form action={createUserId}>
        <button className="bg-blue-500 px-4 py-2 rounded-lg" type="submit">
          Create USER
        </button>
      </form>
      <form action={createToken}>
        <button className="bg-blue-500 px-4 py-2 rounded-lg" type="submit">
          Create Token
        </button>
      </form>
      <form action={initializeUser}>
        <button className="bg-blue-500 px-4 py-2 rounded-lg" type="submit">
          InitializeUser
        </button>
      </form>
      <hr />
      <h1>Client kısmı</h1>
    </>
  );
}
