const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const newRepo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(newRepo);

  return response.json(newRepo);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex(repository => repository.id === id);

  if (index < 0) {
    return response.status(400).json({ error: "Repository not found." });
  }

  const { url, title, techs } = request.body;

  repositories[index] = { 
    ...repositories[index], 
    url, 
    title,
    techs,
  }

  return response.status(200).json(repositories[index]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex(repository => repository.id === id);

  if (index < 0) {
    return response.status(400).json({});
  }

  console.log(index);

  repositories.splice(index, 1);
  console.log(repositories);

  return response.status(204).json({});
});
 
app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex(repository => repository.id === id);

  if (index < 0) {
    return response.status(400).json({ error: "Repository not found." });
  }
  
  repositories[index].likes += 1;

  return response.status(200).json(repositories[index]);
});

module.exports = app;
