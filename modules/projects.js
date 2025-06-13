/********************************************************************************
* WEB322 – Assignment 02
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Karthika Krishnan  Student ID: 101801231 Date: 30/05/25
*
********************************************************************************/
const projectData = require("../data/projectData");
const sectorData = require("../data/sectorData");

let projects = [];

function initialize() {
    return new Promise((resolve, reject) => {
        try {
            projects = [];

            projectData.forEach(proj => {
                const sectorMatch = sectorData.find(sec => sec.id === proj.sector_id);
                if (sectorMatch) {
                    projects.push({
                        ...proj,
                        sector: sectorMatch.sector_name
                    });
                } else {
                    projects.push({ ...proj, sector: "Unknown" });
                }
            });

            resolve();
        } catch (err) {
            reject("Unable to initialize project data");
        }
    });
}

function getAllProjects() {
    return new Promise((resolve, reject) => {
        if (projects.length === 0) {
            reject("No projects available");
        } else {
            resolve(projects);
        }
    });
}

function getProjectById(projectId) {
    return new Promise((resolve, reject) => {
        const result = projects.find(p => p.id === projectId);
        result ? resolve(result) : reject("Project not found");
    });
}

function getProjectsBySector(sector) {
    return new Promise((resolve, reject) => {
        const match = projects.filter(p =>
            p.sector.toLowerCase().includes(sector.toLowerCase())
        );
        match.length > 0
            ? resolve(match)
            : reject("No projects found for given sector");
    });
}

module.exports = {
    initialize,
    getAllProjects,
    getProjectById,
    getProjectsBySector
};
