# 🕵️‍♂️ NYSC Portal Monitor

A lightweight Node.js script that automatically checks if the **NYSC portal**  
[`https://portal.nysc.org.ng/nysc3/`](https://portal.nysc.org.ng/nysc3/)  
is active — and notifies you **instantly** (with a Windows notification)  
once it’s live. It also **opens the portal in your default browser** the moment it becomes reachable.

---

## 🚀 Features

- ⚡ Periodically checks the NYSC portal every 60 seconds  
- 🔔 Sends a **Windows desktop notification** when the site is up  
- 🌐 Automatically **opens the portal** in your default browser  
- 🧘‍♂️ Quiet — no spam or repeated alerts once notified  
- 🛡️ Lightweight and safe (uses only built-in Node.js modules + one dependency)

---
## 🧩 Requirements

- **Windows OS** (tested on Windows 10 & 11)  
- **[Node.js](https://nodejs.org/)** (v16 or newer recommended)
- Internet connection

---

## ⚙️ Setup Instructions

1. **Clone or download** this repository (or just save the file `nysc-alert.js`).
2. Open the folder in **Command Prompt** or **PowerShell**.
3. Run this once to install the only dependency:
   ```bash
   npm install node-notifier
