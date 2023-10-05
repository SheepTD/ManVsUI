console.log("running...");

// set the default settings on installation
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ extensionEnabled: false });
  chrome.storage.sync.set({ mode: "dark" });
});

// website to check for
const manvsmaths = "https://manvsmaths.com/";
const chromeManvsmaths = "https://www.manvsmaths.com/";
// different sets of navigation buttons for each of the different pages
const juniorNavArray = [
  "Main",
  "Resources",
  "Algebra",
  "Videos",
  "Online",
  "Home",
];
const yr11NavArray = [
  "Main",
  "Externals",
  "Internals",
  "Videos",
  "Algebra",
  "Home",
];
const yr12yr13cNavArray = ["Main", "Externals", "Internals", "Videos", "Home"];
const yr13sNavArray = ["Main", "Externals", "Internals", "Home"];
const teachersNavArray = ["Main", "Links", "Matrix", "Home"];
const otherNavArray = ["Home"];
// send message to content.js with information about what to display
function msgContentJs(sendToTab, url, navArray, fileSysValOne, fileSysValTwo) {
  console.log("about to send message");
  chrome.tabs.sendMessage(sendToTab, {
    url: url,
    navArray: navArray,
    fileSysValOne: fileSysValOne,
    fileSysValTwo: fileSysValTwo,
  });
  console.log("message sent");
}
// activates every time the a page loads
chrome.webNavigation.onCompleted.addListener((details) => {
  console.log("page loaded");
  // check if page loaded is in the main frame
  if (details.frameId === 0) {
    // variables we'll need
    const url = details.url;
    // ping the url to make it easier to fix any errors
    console.log(url);
    const tabId = details.tabId;
    let navArray = "none";
    let fileSysValOne = "none";
    let fileSysValTwo = "none";
    // make sure that the page isn't a glitched page, the home page, the error page or a pdf file
    if (
      url === "https://manvsmaths.com/" ||
      url === "https://manvsmaths.com/home.html" ||
      url === "https://manvsmaths.com/home.html" ||
      url === "https://manvsmaths.com/404.html" ||
      url.endsWith(".pdf") === true
    ) {
      return "finished";
    }
    // for chrome make sure that the page isn't a glitched page, the home page or the error page
    if (
      url === "https://www.manvsmaths.com/" ||
      url === "https://www.manvsmaths.com/home.html" ||
      url === "https://www.manvsmaths.com/home.html" ||
      url === "https://www.manvsmaths.com/404.html"
    ) {
    }

    // check if the page is a manvsmaths page
    if (url.startsWith(manvsmaths) || url.startsWith(chromeManvsmaths)) {
      console.log("manvsmaths site === true");
      // grab the current settings from storage
      chrome.storage.sync.get(["extensionEnabled", "mode"], function (data) {
        const extensionEnabled = data.extensionEnabled;
        const mode = data.mode;
        // check if the extension is turned on
        if (extensionEnabled === true) {
          // find which page it is via the url
          let page = url.split("v")[1].split("/")[1];
          if (page === "teachers" || page === "main") {
            page = "other";
          }
          // apply styles
          if (mode === "light") {
            chrome.scripting.insertCSS({
              target: { tabId: tabId },
              files: ["styles/" + page + "-light-styles.css"],
            });
          } else {
            chrome.scripting.insertCSS({
              target: { tabId: tabId },
              files: ["styles/" + page + "-dark-styles.css"],
            });
          }
          // find which page we are on in order to set up the file system
          if (
            url.startsWith(manvsmaths + "09") ||
            url.startsWith(chromeManvsmaths + "09")
          ) {
            fileSysValOne = "Year 9";
            navArray = juniorNavArray;
            fileSysValTwo =
              url.split("_")[1].split(".")[0].charAt(0).toUpperCase() +
              url.split("_")[1].split(".")[0].slice(1);
          } else if (
            url.startsWith(manvsmaths + "10") ||
            url.startsWith(chromeManvsmaths + "10")
          ) {
            fileSysValOne = "Year 10";
            navArray = juniorNavArray;
            fileSysValTwo =
              url.split("_")[1].split(".")[0].charAt(0).toUpperCase() +
              url.split("_")[1].split(".")[0].slice(1);
          } else if (
            url.startsWith(manvsmaths + "11") ||
            url.startsWith(chromeManvsmaths + "11")
          ) {
            fileSysValOne = "Year 11";
            navArray = yr11NavArray;
            fileSysValTwo =
              url.split("_")[1].split(".")[0].charAt(0).toUpperCase() +
              url.split("_")[1].split(".")[0].slice(1);
          } else if (
            url.startsWith(manvsmaths + "12") ||
            url.startsWith(chromeManvsmaths + "12")
          ) {
            fileSysValOne = "Year 12";
            navArray = yr12yr13cNavArray;
            fileSysValTwo =
              url.split("_")[1].split(".")[0].charAt(0).toUpperCase() +
              url.split("_")[1].split(".")[0].slice(1);
          } else if (
            url.startsWith(manvsmaths + "13c") ||
            url.startsWith(chromeManvsmaths + "13c")
          ) {
            fileSysValOne = "Calculus";
            navArray = yr12yr13cNavArray;
            fileSysValTwo =
              url.split("_")[1].slice(8).split(".")[0].charAt(0).toUpperCase() +
              url.split("_")[1].slice(8).split(".")[0].slice(1);
          } else if (
            url.startsWith(manvsmaths + "13s") ||
            url.startsWith(chromeManvsmaths + "13s")
          ) {
            fileSysValOne = "Statistics";
            navArray = yr13sNavArray;
            fileSysValTwo =
              url
                .split("_")[1]
                .slice(10)
                .split(".")[0]
                .charAt(0)
                .toUpperCase() +
              url.split("_")[1].slice(10).split(".")[0].slice(1);
          } else if (
            url.startsWith(manvsmaths + "teachers") ||
            url.startsWith(chromeManvsmaths + "teachers")
          ) {
            fileSysValOne = "Teachers";
            navArray = teachersNavArray;
            fileSysValTwo =
              url
                .split("o")[1]
                .split("/")[2]
                .split(".")[0]
                .split("s")[1]
                .charAt(0)
                .toUpperCase() +
              url
                .split("o")[1]
                .split("/")[2]
                .split(".")[0]
                .split("s")[1]
                .slice(1);
          } else if (
            url.startsWith(manvsmaths + "main/lollipop") ||
            url.startsWith(chromeManvsmaths + "main/lollipop")
          ) {
            fileSysValOne = "Rewards";
            navArray = otherNavArray;
            fileSysValTwo = "Main";
          } else if (
            url.startsWith(manvsmaths + "main/plus") ||
            url.startsWith(chromeManvsmaths + "main/plus")
          ) {
            fileSysValOne = "Extra";
            navArray = otherNavArray;
            fileSysValTwo = "Main";
          } else if (
            url.startsWith(manvsmaths + "main/ncea") ||
            url.startsWith(chromeManvsmaths + "main/ncea")
          ) {
            fileSysValOne = "NCEA";
            navArray = otherNavArray;
            fileSysValTwo = "Main";
          }
          // send message to content.js with info about the page
          msgContentJs(tabId, url, navArray, fileSysValOne, fileSysValTwo);
          console.log("finished");
        }
      });
    }
  }
});
