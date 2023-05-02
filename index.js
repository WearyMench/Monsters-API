const express = require("express");
const app = express();
app.use(express.json());
// const http = require("http");

const Monster = [
  {
    id: 1,
    nombre: "Godzilla",
    tipo: "Kaiju",
    altura: "50 metros",
    color: "Verde",
    texturaPiel: "Escamosa",
  },
  {
    id: 2,
    nombre: "Drácula",
    tipo: "Vampiro",
    altura: "1.80 metros",
    color: "Blanco pálido",
    texturaPiel: "Suave",
  },
  {
    id: 3,
    nombre: "El Hombre Lobo",
    tipo: "Licántropo",
    altura: "2.10 metros",
    color: "Marrón",
    texturaPiel: "Peluda",
  },
  {
    id: 4,
    nombre: "Frankenstein",
    tipo: "Monstruo",
    altura: "2.50 metros",
    color: "Verde pálido",
    texturaPiel: "Cicatrizada",
  },
  {
    id: 5,
    nombre: "King Kong",
    tipo: "Kaiju",
    altura: "30 metros",
    color: "Marrón oscuro",
    texturaPiel: "Peluda",
  },
];

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { "Content-Type": "text/plain" });
//   response.end(JSON.stringify(Monster));
// });

app.get("/", (request, response) => {
  response.send("<h1>Hello World</h1>");
});
//express permite obtener los datos en una ruta especifica.
app.get("/api/monsters", (request, response) => {
  response.json(Monster);
});

//Para recuperar un dato especifico por id
app.get("/api/monsters/:id", (request, response) => {
  const id = Number(request.params.id);
  const monster = Monster.find((mons) => mons.id === id);
  if (monster) response.json(monster);
  else response.status(404).end();
});

// para eliminar un dato por id
app.delete("/api/monsters/:id", (request, response) => {
  const id = Number(request.params.id);
  const monster = Monster.find((mons) => mons.id !== id);
  response.status(204).end();
});

// crear un recurso con post
app.post("/api/monsters", (request, response) => {
  const mons = request.body;
  console.log(mons);
  response.json(Monster);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server runing on port ${PORT}`);
});
