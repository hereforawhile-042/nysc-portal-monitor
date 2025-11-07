
const https = require("https");
const notifier = require("node-notifier");
const { exec } = require("child_process");

const urls = [
  "https://portal.nysc.org.ng/nysc1/",
  "https://portal.nysc.org.ng/nysc2/",
  "https://portal.nysc.org.ng/nysc3/",
  "https://portal.nysc.org.ng/nysc4/",
];

const interval = 60 * 1000;
const timeout = 5000;      
let notified = false;       

function openInBrowser(url) {
  exec(`start ${url}`);
}

function checkSite(url) {
  const options = new URL(url);
  options.method = "HEAD";

  const req = https.request(options, (res) => {
    const isUp = res.statusCode >= 200 && res.statusCode < 400;

    if (isUp && !notified) {
      notifier.notify({
        title: "NYSC Portal Monitor",
        message: `✅ ${url} is now ACTIVE! Opening in browser...`,
        sound: true,
      });

      console.log(`${new Date().toLocaleTimeString()} - ✅ ${url} is UP`);
      openInBrowser(url);
      notified = true;
    } else if (!isUp) {
      console.log(`${new Date().toLocaleTimeString()} - ❌ ${url} still down (status: ${res.statusCode})`);
    }
  });

  req.on("timeout", () => {
    req.destroy();
    console.log(`${new Date().toLocaleTimeString()} - ⚠️ Timeout while checking ${url}`);
  });

  req.on("error", (e) => {
    console.log(`${new Date().toLocaleTimeString()} - ⚠️ Error checking ${url}: ${e.message}`);
  });

  req.setTimeout(timeout);
  req.end();
}

function checkAllSites() {
  if (notified) return;
  console.log(`\n🔍 Checking ${urls.length} NYSC portals...`);
  urls.forEach(checkSite);
}

console.log("🕵️Monitoring NYSC portals... will alert and open browser when any goes live.");
checkAllSites();
setInterval(checkAllSites, interval);
