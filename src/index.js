import "./styles.css";
import { createCard } from "./modules/projectCard";
import battleshipImg from "./assets/images/Battleship.png";
import weatherImg from "./assets/images/weather-app.png";

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

const project2 = createCard(
  "Project name",
  "Short description of the project",
  "https://julczan.github.io/battleship_odin/",
  "https://github.com/Julczan/battleship_odin",
  battleshipImg
);
const project3 = createCard(
  "Project name",
  "Short description of the project",
  "https://julczan.github.io/battleship_odin/",
  "https://github.com/Julczan/battleship_odin",
  battleshipImg
);
const project4 = createCard(
  "Project name",
  "Short description of the project",
  "https://julczan.github.io/battleship_odin/",
  "https://github.com/Julczan/battleship_odin",
  battleshipImg
);
const project5 = createCard(
  "Project name",
  "Short description of the project",
  "https://julczan.github.io/battleship_odin/",
  "https://github.com/Julczan/battleship_odin",
  battleshipImg
);

projectContainer.appendChild(battleship);
projectContainer.appendChild(weather);
projectContainer.appendChild(project2);
projectContainer.appendChild(project3);
projectContainer.appendChild(project4);
projectContainer.appendChild(project5);
