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

// const {
//   Worker,
//   isMainThread,
//   parentPort,
//   workerData,
// } = require("worker_threads");

const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");

export const testThreads = () => {
  // if (isMainThread) {
  //   const pets = [pet, pet2, pet3];
  //   const worker = new Worker(__filename, {
  //     workerData: { userPreferences: preferences, pets },
  //   });
  //   worker.on("online", (message: any) => console.log("online"));
  //   worker.on("message", (message: any) => console.log("message"));
  //   worker.on("messageerror", (message: any) => console.log("messageerror"));
  //   worker.on("exit", (message: any) => console.log("exit"));
  //   worker.on("error", (message: any) => console.log("error"));
  //   return;
  // }
  // console.log("not in main thread");
  // parentPort.postMessage("Worker thread is running");
};
