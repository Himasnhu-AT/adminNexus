import fetch, { Headers, RequestInit, RequestRedirect } from "node-fetch";
import chalk from "chalk"; // Use ES module import
import os from "os"; // Import the os module

// Define the configuration interface
interface TestConfig {
  endpoint: string;
  batchSize: number;
  duration: number; // in seconds
  totalRequests?: number; // Optional: limit on total requests
}

// Default request options
const defaultHeaders = new Headers({
  "Content-Type": "application/json",
});

// Function to send a request
const sendRequest = async (
  id: number,
  endpoint: string,
  raw: string,
): Promise<string> => {
  try {
    const response = await fetch(`${endpoint}/${id}`, {
      method: "POST",
      headers: defaultHeaders,
      body: raw,
      redirect: "follow" as RequestRedirect,
    });
    if (!response.ok) {
      return "noResponse"; // Return a string instead of an object
    }
    return "success"; // Return a string instead of an object
  } catch {
    return "error"; // Return a string instead of an object
  }
};

// Function to get CPU usage
const getCpuUsage = () => {
  const cpus = os.cpus();
  let user = 0;
  let nice = 0;
  let sys = 0;
  let idle = 0;
  let irq = 0;
  for (let cpu of cpus) {
    user += cpu.times.user;
    nice += cpu.times.nice;
    sys += cpu.times.sys;
    idle += cpu.times.idle;
    irq += cpu.times.irq;
  }
  const total = user + nice + sys + idle + irq;
  return {
    user: ((user / total) * 100).toFixed(2),
    sys: ((sys / total) * 100).toFixed(2),
    idle: ((idle / total) * 100).toFixed(2),
  };
};

// Function to get RAM usage
const getRamUsage = () => {
  const total = os.totalmem();
  const free = os.freemem();
  const used = total - free;
  return {
    total: (total / (1024 * 1024)).toFixed(2), // Convert to MB
    used: (used / (1024 * 1024)).toFixed(2), // Convert to MB
    free: (free / (1024 * 1024)).toFixed(2), // Convert to MB
  };
};

// Function to run the stress test with batch processing
const stressTest = async (config: TestConfig) => {
  const { endpoint, batchSize, duration, totalRequests } = config;

  const raw = JSON.stringify({
    level: "info",
    message: "This is an informational message",
    timestamp: new Date().toISOString(),
  });

  let error = 0;
  let noResponse = 0;
  let success = 0;

  const startTime = Date.now();
  const endTime = startTime + duration * 1000; // Calculate end time
  let currentId = 0;

  // Capture initial CPU and RAM usage
  const initialCpuUsage = getCpuUsage();
  const initialRamUsage = getRamUsage();

  // Periodically capture CPU and RAM usage during the test
  const usageInterval = 1000; // Capture every second
  const usageData: { time: number; cpu: any; ram: any }[] = [];

  const usageCapture = setInterval(() => {
    const currentTime = Date.now();
    if (currentTime >= endTime) {
      clearInterval(usageCapture);
    } else {
      usageData.push({
        time: currentTime - startTime,
        cpu: getCpuUsage(),
        ram: getRamUsage(),
      });
    }
  }, usageInterval);

  while (Date.now() < endTime) {
    const promises: Promise<string>[] = []; // Change the type to string array

    for (let i = 0; i < batchSize; i++) {
      if (totalRequests && currentId >= totalRequests) {
        break; // Exit if we've sent the maximum requests
      }
      promises.push(sendRequest(currentId, endpoint, raw));
      currentId++;
    }

    const results = await Promise.all(promises);

    results.forEach((result) => {
      if (result === "noResponse") {
        noResponse++;
      } else if (result === "error") {
        error++;
      } else {
        success++;
      }
    });
  }

  // Capture final CPU and RAM usage
  const finalCpuUsage = getCpuUsage();
  const finalRamUsage = getRamUsage();

  // Output results
  console.log(
    chalk.green(`Stress Test Time taken: ${Date.now() - startTime} ms`),
  );
  console.log(chalk.blue(`Success: ${success}`));
  console.log(chalk.yellow(`No Response: ${noResponse}`));
  console.log(chalk.red(`Error: ${error}`));

  // Output initial CPU and RAM usage
  console.log(
    chalk.magenta(
      `Initial CPU Usage: User: ${initialCpuUsage.user}%, System: ${initialCpuUsage.sys}%, Idle: ${initialCpuUsage.idle}%`,
    ),
  );
  console.log(
    chalk.cyan(
      `Initial RAM Usage: Total: ${initialRamUsage.total} MB, Used: ${initialRamUsage.used} MB, Free: ${initialRamUsage.free} MB`,
    ),
  );

  // Output periodic CPU and RAM usage during the test
  console.log(chalk.magenta(`Periodic CPU and RAM Usage during the test:`));
  usageData.forEach((data) => {
    console.log(
      chalk.magenta(
        `Time: ${data.time} ms, CPU: User: ${data.cpu.user}%, System: ${data.cpu.sys}%, Idle: ${data.cpu.idle}%, RAM: Total: ${data.ram.total} MB, Used: ${data.ram.used} MB, Free: ${data.ram.free} MB`,
      ),
    );
  });

  // Output final CPU and RAM usage
  console.log(
    chalk.magenta(
      `Final CPU Usage: User: ${finalCpuUsage.user}%, System: ${finalCpuUsage.sys}%, Idle: ${finalCpuUsage.idle}%`,
    ),
  );
  console.log(
    chalk.cyan(
      `Final RAM Usage: Total: ${finalRamUsage.total} MB, Used: ${finalRamUsage.used} MB, Free: ${finalRamUsage.free} MB`,
    ),
  );
};

// Export the stressTest function
export default stressTest;
