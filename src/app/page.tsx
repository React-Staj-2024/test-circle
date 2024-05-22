import { API_URL, TOKEN } from "@/constants/constants";
import { CreateTokenResponse } from "@/models/CreateTokenResponse";
import { CreateUserIdResponse } from "@/models/CreateUserIdResponse";
import { GetAppIdResponse } from "@/models/GetAppIdResponse";
import { InitializeUserResponse } from "@/models/InitializeUserResponse";
import { v4 as uuidv4 } from "uuid";

const USER_TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoTW9kZSI6IlBJTiIsImRldmVsb3BlckVudGl0eUVudmlyb25tZW50IjoiVEVTVCIsImVudGl0eUlkIjoiMjc4Y2U3MDEtNWZlMy00MzA5LTkzZGEtOTQyYzI4NWM0NDMyIiwiZXhwIjoxNzE2NDEyNjc2LCJpYXQiOjE3MTY0MDkwNzYsImludGVybmFsVXNlcklkIjoiZjVlNjczODMtZjlmZi01YmQ5LTkxNGUtMjdhMGYzYTlkOTVkIiwiaXNzIjoiaHR0cHM6Ly9wcm9ncmFtbWFibGUtd2FsbGV0LmNpcmNsZS5jb20iLCJqdGkiOiJlMjM2N2ZlNy1jODZiLTQxYTAtOWExMi1iYWUwYzI4NWI2ZWIiLCJzdWIiOiJjMDFkOTNhMS1kZWYzLTQwZDMtOTg0MS03NjdmNzBmMzEwNDgifQ.ALQsF0hq0W42OAnv3AnaCbMSqoWq3fbNkvg8Fzf0WkYW-8Gi6Q9OAPNrzEwNzqTY0beeJRaMVK7wyYgHhRgVgetO24Z7o95xvl_hDysjntRm6gznQXpyW4Zu2BUR-4WUTHBhhvvnSrAl8WztVafI_b3A8TeHkktxsBiLt0tBTV74zJn48xPBsEfuGoKpfH0tJAuYHcYFDSrmlfQvyJqznQwj2Pnq1vTddGjfWtIc3-rEfx8f5JOjEpPDJ07zbkPHduTEG-VoYapmfzfpkLfzCIGc_jWeVBSqqhxL_XGPPePRtPG7Xf_a64e5-K8hBcAeBLGChoS5kBXxhAqkbs5Vhg";

const ENCRYPTION_KEY = "Nf18trJgc/clLgudHXlkEfeG6Pq7Z7RnYFdSruLzs9U=";

const USER_ID = "c01d93a1-def3-40d3-9841-767f70f31048";

const WALLET_ID = "8fcf412d-f303-589e-82d7-3d3ba13b5551";

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

    const userId = USER_ID;
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
    const userId = USER_ID;
    const userToken = USER_TOKEN;
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

  async function getUserStatus() {
    "use server";
    const idempotencyKey = uuidv4();
    const blockchains = ["MATIC-AMOY"];
    const userId = USER_ID;
    const userToken = USER_TOKEN;
    const res = await fetch(`${API_URL}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
        "X-User-Token": userToken,
      },
    });
    const data = await res.json();
    console.log("DATA", data);
  }

  async function getWallets() {
    "use server";
    const userToken = USER_TOKEN;
    const res = await fetch(`${API_URL}/wallets`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
        "X-User-Token": userToken,
      },
    });
    const data = await res.json();
    console.log("WALLETS", data.data.wallets);
  }

  async function transactions() {
    "use server";
    const userToken = USER_TOKEN;
    const res = await fetch(`${API_URL}/transactions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
        "X-User-Token": userToken,
      },
    });
    const data = await res.json();
    console.log("TRANSACTIONS", data.data);
  }
  async function balances() {
    "use server";
    const userToken = USER_TOKEN;
    const res = await fetch(`${API_URL}/wallets/${WALLET_ID}/balances`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
        "X-User-Token": userToken,
      },
    });
    const data = await res.json();
    console.log("BALANCES", data.data);
  }

  async function estimateFee() {
    "use server";
    const idempotencyKey = uuidv4();
    const blockchains = ["MATIC-AMOY"];
    const userId = USER_ID;
    const userToken = USER_TOKEN;
    const body = {
      amounts: [".01"],
      destinationAddress: "0x48520ff9b32d8b5bf87abf789ea7b3c394c95ebe",
      tokenId: "36b6931a-873a-56a8-8a27-b706b17104ee",
      walletId: "8fcf412d-f303-589e-82d7-3d3ba13b5551",
    };
    const res = await fetch(`${API_URL}/transactions/transfer/estimateFee`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
        "X-User-Token": userToken,
      },
      body: JSON.stringify(body),
    });
    const data: InitializeUserResponse = await res.json();
    console.log("Estimation", data.data);
  }
  async function transfer() {
    "use server";
    const idempotencyKey = uuidv4();
    const blockchains = ["MATIC-AMOY"];
    const userId = USER_ID;
    const userToken = USER_TOKEN;
    const body = {
      userId: USER_ID,
      idempotencyKey: idempotencyKey,
      amounts: [".01"],
      destinationAddress: "0x48520ff9b32d8b5bf87abf789ea7b3c394c95ebe",
      tokenId: "36b6931a-873a-56a8-8a27-b706b17104ee",
      walletId: "8fcf412d-f303-589e-82d7-3d3ba13b5551",
      feeLevel: "MEDIUM",
    };
    const res = await fetch(`${API_URL}/user/transactions/transfer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
        "X-User-Token": userToken,
      },
      body: JSON.stringify(body),
    });
    const data: InitializeUserResponse = await res.json();
    console.log("transfer", data);
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
      <form action={getUserStatus}>
        <button className="bg-blue-500 px-4 py-2 rounded-lg" type="submit">
          Get User Status
        </button>
      </form>
      <form action={getWallets}>
        <button className="bg-blue-500 px-4 py-2 rounded-lg" type="submit">
          Get Wallets
        </button>
      </form>
      <form action={transactions}>
        <button className="bg-blue-500 px-4 py-2 rounded-lg" type="submit">
          Transactions
        </button>
      </form>
      <form action={balances}>
        <button className="bg-blue-500 px-4 py-2 rounded-lg" type="submit">
          Balances
        </button>
      </form>
      <form action={estimateFee}>
        <button className="bg-blue-500 px-4 py-2 rounded-lg" type="submit">
          EstimateFee
        </button>
      </form>
      <form action={transfer}>
        <button className="bg-blue-500 px-4 py-2 rounded-lg" type="submit">
          Transfer
        </button>
      </form>
      <hr />
      <h1>Client kısmı</h1>
    </>
  );
}
