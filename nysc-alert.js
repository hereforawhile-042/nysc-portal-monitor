const https = require("https");
const notifier = require("node-notifier");
const { exec } = require("child_process");

const url = "https://portal.nysc.org.ng/nysc4/";
const interval = 60 * 1000;
let notified = false;

function openInBrowser() {
  exec(`start ${url}`);
}

function checkSite() {
  const options = new URL(url);
  options.method = "HEAD";

  const req = https.request(options, (res) => {
    const isUp = res.statusCode >= 200 && res.statusCode < 400;

    if (isUp && !notified) {
      notifier.notify({
        title: "NYSC Portal Monitor",
        message: "✅The NYSC portal is now ACTIVE! Opening in browser...",
        sound: true,
      });
      console.log(`${new Date().toLocaleTimeString()} - ✅ NYSC portal is UP`);
      openInBrowser();
      notified = true;
    } else if (!isUp) {
      console.log(`${new Date().toLocaleTimeString()} - ❌ Portal still down (status: ${res.statusCode})`);
    }
  });

  req.on("timeout", () => {
    req.destroy();
    console.log(`${new Date().toLocaleTimeString()} - ⚠️ Timeout while checking site`);
  });

  req.on("error", (e) => {
    console.log(`${new Date().toLocaleTimeString()} - ⚠️ Error checking site: ${e.message}`);
  });

  req.setTimeout(5000);
  req.end();
}

console.log("🔍 Monitoring NYSC portal... will alert and open browser when it’s live.");
checkSite();
setInterval(checkSite, interval);
