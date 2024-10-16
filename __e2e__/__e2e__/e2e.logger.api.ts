import fetch, { Headers, RequestInit, RequestRedirect } from "node-fetch";

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  level: "info",
  message: "This is an informational message",
  timestamp: "2022-03-01T12:00:00Z",
});

const requestOptions: RequestInit = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow" as RequestRedirect,
};

const e2eTest = async () => {
  const id = 1; // Example ID for e2e test
  try {
    const response = await fetch(
      `http://127.0.0.1:3000/add/log/${id}`,
      requestOptions,
    );
    if (response.ok) {
      console.log(`e2e Test Passed for ID: ${id}`);
    } else {
      console.error(
        `e2e Test Failed for ID: ${id}, Status: ${response.status}`,
      );
    }
  } catch (error) {
    console.error(`e2e Test Error for ID: ${id}, Error: ${error}`);
  }
};

e2eTest();
