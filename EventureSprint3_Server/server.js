const express = require("express");
const axios = require("axios");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { HttpsProxyAgent } = require("https-proxy-agent");

const app = express();
app.use(cors());
app.use(express.json());

const proxyAgent = new HttpsProxyAgent("http://127.0.0.1:7890"); // VPN代理

const eventsJson = path.join(__dirname, "data/events.json");
const attendeesJson = path.join(__dirname, "data/attendees.json");

app.get("/", (req, res) => res.send("Server running..."));

// get eventlist
app.get("/events", async (req, res) => {
  try {
    const response = await axios.get("https://unit-3-api-6b6268be0363.herokuapp.com/events", {
      httpsAgent: proxyAgent,
      proxy: false,
      timeout: 15000,
      params: { api_key: "1" }
    });
    res.json(response.data);
  } catch (err) {
    const localData = JSON.parse(fs.readFileSync(eventsJson, "utf-8"));
    res.json(localData);
  }
});

// get attend by email 
app.get("/attendees", async (req, res) => {
  try {
    const { email } = req.query; // 获取 query 参数 email
    const response = await axios.get(
      "https://unit-3-api-6b6268be0363.herokuapp.com/attendees",
      {
        httpsAgent: proxyAgent,
        proxy: false,
        timeout: 15000,
        params: { api_key: "2" },
      }
    );

    let attendees = response.data;

    if (email) {
      const attendee = attendees.find((a) => a.email === email);
      return res.json(attendee || null); 
    }

    res.json(attendees); 
  } catch (err) {
    const attendees = JSON.parse(fs.readFileSync(attendeesJson, "utf-8"));
    const { email } = req.query;
    if (email) {
      const attendee = attendees.find((a) => a.email === email);
      return res.json(attendee || null);
    }
    res.json(attendees);
  }
});

// get attendee
app.get("/attendees/:id", async (req, res) => {
  const id = req.params.id;
  const attendees = JSON.parse(fs.readFileSync(attendeesJson, "utf-8"));
  const attendee = attendees.find(a => a.id === id);
  res.json(attendee || {});
});

// updata attendee
app.patch("/attendees/:id", async (req, res) => {
  const id = req.params.id;
  const attendees = JSON.parse(fs.readFileSync(attendeesJson, "utf-8"));
  const index = attendees.findIndex(a => a.id === id);
  if (index !== -1) {
    attendees[index] = { ...attendees[index], ...req.body };
    fs.writeFileSync(attendeesJson, JSON.stringify(attendees, null, 2));
    res.json(attendees[index]);
  } else {
    res.status(404).json({ message: "Attendee not found" });
  }
});

// new attendee add
app.post("/attendees", async (req, res) => {
  const attendees = JSON.parse(fs.readFileSync(attendeesJson, "utf-8"));
  const newAttendee = { id: `${Date.now()}`, ...req.body };
  attendees.push(newAttendee);
  fs.writeFileSync(attendeesJson, JSON.stringify(attendees, null, 2));
  res.json(newAttendee);
});

const PORT = 5050;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));