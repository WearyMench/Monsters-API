import express from "express";
import { Monster } from "./data.js";

const app = express();
app.use(express.json());

app.get("/", (request, response) => {
  response.send("<h1>Hello World</h1>");
});

// Obtener todos los monstruos
app.get("/api/monsters", (request, response) => {
  response.json(Monster);
});

// Buscar por ID
app.get("/api/monsters/:id", (request, response) => {
  const id = Number(request.params.id);
  const monster = Monster.find((mons) => mons.id === id);
  if (monster) response.json(monster);
  else response.status(404).json({ error: "Monstruo no encontrado" });
});

// Eliminar por ID
app.delete("/api/monsters/:id", (request, response) => {
  const id = Number(request.params.id);
  const index = Monster.findIndex((mons) => mons.id === id);
  if (index !== -1) {
    Monster.splice(index, 1);
    response.status(204).end();
  } else {
    response.status(404).json({ error: "Monstruo no encontrado" });
  }
});

// Crear nuevo monstruo
app.post("/api/monsters", (request, response) => {
  const mons = request.body;
  if (!mons || !mons.nombre || !mons.tipo) {
    response.status(400).json({ error: "Faltan datos obligatorios" });
  } else {
    const newMonster = {
      id: Monster.length + 1,
      ...mons,
    };
    Monster.push(newMonster);
    response.status(201).json(newMonster);
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
