// pass all recommendations for a specific user, once preferences are updated, or pet is updated (created?)

import {
  calculateMatch,
  pet,
  pet2,
  pet3,
  preferences,
  preferences2,
  weights,
} from "../../calculate-match";

// use threads to optimize the process
export {};

// const {
//   Worker,
//   isMainThread,
//   parentPort,
//   workerData,
// } = require("worker_threads");

const { Worker, isMainThread, parentPort } = require("node:worker_threads");

export const testThreads = () => {
  if (isMainThread) {
    const pets = [pet, pet2, pet3];
    const worker = new Worker(__filename, {
      workerData: { userPreferences: preferences, pets },
    });

    worker.on("online", (e: any) => console.log("online"));
    worker.on("message", (message: any) => console.log("message"));
    worker.on("messageerror", (message: any) => console.log("messageerror"));
    worker.on("exit", (e: any) => console.log("exit"));
    worker.on("error", (message: any) => console.log("error"));
    return;
  }
  parentPort.postMessage("Worker thread is running");
};

// export const testThreads = () => {
//   if (isMainThread) {
//     const pets = [pet, pet2, pet3];
//     const worker1 = new Worker(__filename, {
//       workerData: { userPreferences: preferences, pets },
//     });

//     worker1.postMessage("hi");

//     worker1.on("message", (message: any) =>
//       handleWorkerMessage(message, preferences)
//     );
//     // worker1.on("exit", () => handleWorkerExit(preferences));
//     // setInterval(() => {
//     //   worker.postMessage("hi");
//     //   console.log(worker.performance.eventLoopUtilization());
//     // }, 100).unref();
//     return;
//   }
//   parentPort.postMessage("Worker thread is running");

//   //   parentPort.on("message", () => console.log("msg"));
//   //   (function r(n) {
//   //     if (--n < 0) return;
//   //     const t = Date.now();
//   //     while (Date.now() - t < 300);
//   //     setImmediate(r, n);
//   //   })(10);
// };
