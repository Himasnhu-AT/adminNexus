const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  level: "info",
  message: "This is an informational message",
  timestamp: "2022-03-01T12:00:00Z",
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow",
};

const startTime = Date.now();

const fetchLog = async (id) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:3000/add/log/${id}`,
      requestOptions,
    );
    console.log(id);
  } catch (error) {
    console.error(`ID: ${id}, Error: ${error}`);
  }
};

const runTests = async () => {
  for (let id = 0; id <= 1000000; id++) {
    await fetchLog(id);
  }
  const endTime = Date.now();
  console.log(`Time taken: ${endTime - startTime} ms`);
};

runTests();
