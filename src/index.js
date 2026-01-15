import "./styles.css";
import { createCard } from "./modules/projectCard";
import battleshipImg from "./assets/images/Battleship.png";
import weatherImg from "./assets/images/weather-app.png";
import toDoAppImg from "./assets/images/to-do.png";
import calcImg from "./assets/images/calculator.png";
import sketchImg from "./assets/images/etch-a-sketch.png";
import tictacImg from "./assets/images/tic-tac.png";

const projectContainer = document.querySelector(".projects");

const battleship = createCard(
  "Battleship",
  "Battleship game",
  "https://julczan.github.io/battleship_odin/",
  "https://github.com/Julczan/battleship_odin",
  battleshipImg
);

const weather = createCard(
  "Weather App",
  "Weather App made in HTML, CSS and JS",
  "https://julczan.github.io/weather_app_odin/",
  "https://github.com/Julczan/weather_app_odin",
  weatherImg
);

const toDo = createCard(
  "To Do List App",
  "To Do List App",
  "https://julczan.github.io/to-do-list/",
  "https://github.com/Julczan/to-do-list",
  toDoAppImg
);
const calculator = createCard(
  "Calculator Project",
  "Calculator made in HTML, CSS and JS",
  "https://julczan.github.io/calculator_TOP/",
  "https://github.com/Julczan/calculator_TOP",
  calcImg
);
const sketch = createCard(
  "Etch a sketch",
  "Etch a sketch project",
  "https://julczan.github.io/etch-a-sketch/",
  "https://github.com/Julczan/etch-a-sketch",
  sketchImg
);
const tictactoe = createCard(
  "Project name",
  "Short description of the project",
  "https://julczan.github.io/odin_tic-tac-toe/",
  "https://github.com/Julczan/odin_tic-tac-toe",
  tictacImg
);

projectContainer.appendChild(battleship);
projectContainer.appendChild(weather);
projectContainer.appendChild(toDo);
projectContainer.appendChild(calculator);
projectContainer.appendChild(sketch);
projectContainer.appendChild(tictactoe);
