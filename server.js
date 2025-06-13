/********************************************************************************
* WEB322 – Assignment 03
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Karthika Krishnan  Student ID: 101801231 Date: 13/06/25
*
********************************************************************************/

const express = require("express");
const path = require("path");
const projectData = require("./modules/projects");

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/about.html"));
});

app.get("/solutions/projects", async (req, res) => {
  try {
    const data = await projectData.getAllProjects();
    const sector = req.query.sector;
    const result = sector ? data.filter(p => p.sector.toLowerCase() === sector.toLowerCase()) : data;
    res.json(result);
  } catch (err) {
    res.status(404).send("Projects not found.");
  }
});

app.get("/solutions/projects/:id", async (req, res) => {
  try {
    const data = await projectData.getProjectById(parseInt(req.params.id));
    res.json(data);
  } catch (err) {
    res.status(404).send("Project not found.");
  }
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "/views/404.html"));
});

app.listen(HTTP_PORT, () => {
  console.log(`Server running on port ${HTTP_PORT}`);
});

