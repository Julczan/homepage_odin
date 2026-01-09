import "./styles.css";
import { createCard } from "./modules/projectCard";
import battleshipImg from "./assets/images/Battleship.png";

const projectContainer = document.querySelector(".projects");

const project = createCard(
  "Project name",
  "Short description of the project",
  "https://julczan.github.io/battleship_odin/",
  "https://github.com/Julczan/battleship_odin",
  battleshipImg
);

const project1 = createCard(
  "Project name",
  "Short description of the project",
  "https://julczan.github.io/battleship_odin/",
  "https://github.com/Julczan/battleship_odin",
  battleshipImg
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

projectContainer.appendChild(project);
projectContainer.appendChild(project1);
projectContainer.appendChild(project2);
projectContainer.appendChild(project3);
projectContainer.appendChild(project4);
projectContainer.appendChild(project5);
