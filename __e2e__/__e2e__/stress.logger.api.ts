// runTest.ts
import stressTest from "./stressTest.js";

// Define the configuration
const config = {
  endpoint: "http://127.0.0.1:3000/add/log", // Define the endpoint
  batchSize: 300, // Number of simultaneous requests
  duration: 60, // Duration in seconds
  totalRequests: 10000, // Optional: total number of requests to send
};

// Run the stress test
stressTest(config);

// import fetch, { Headers, RequestInit, RequestRedirect } from "node-fetch";

// const myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");

// const raw = JSON.stringify({
//   level: "info",
//   message: "This is an informational message",
//   timestamp: "2022-03-01T12:00:00Z",
// });

// const requestOptions: RequestInit = {
//   method: "POST",
//   headers: myHeaders,
//   body: raw,
//   redirect: "follow" as RequestRedirect,
// };

// let error = 0;
// let noReponse = 0;
// let success = 0;

// const sendRequest = async (id: number): Promise<void> => {
//   try {
//     const response = await fetch(
//       `http://127.0.0.1:3000/add/log/${id}`,
//       requestOptions,
//     );
//     if (!response.ok) {
//       // console.error(`Request failed for ID: ${id}, Status: ${response.status}`);
//       noReponse++;
//     }
//     success++;
//   } catch (e) {
//     // console.error(`Request error for ID: ${id}, Error: ${e}`);
//     error++;
//   }
// };

// const stressTest = async () => {
//   const startTime = Date.now();

//   const promises: Promise<void>[] = []; // Explicitly declare the type as Promise<void>[]

//   for (let id = 0; id < 1000; id++) {
//     promises.push(sendRequest(id));
//   }

//   // Wait for all requests to complete
//   await Promise.all(promises);

//   const endTime = Date.now();
//   console.log(`Stress Test Time taken: ${endTime - startTime} ms`);
//   console.log(
//     `Success: ${success} \nnoReponse: ${noReponse} \nError: ${error}`,
//   );
// };

// stressTest();
