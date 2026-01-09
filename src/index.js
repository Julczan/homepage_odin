import "./styles.css";
import { createCard } from "./modules/projectCard";

const projectContainer = document.querySelector(".projects");

const project = createCard(
  "Project name",
  "Short description of the project",
  "https://julczan.github.io/battleship_odin/",
  "https://github.com/Julczan/battleship_odin"
);

const project1 = createCard(
  "Project name",
  "Short description of the project",
  "https://julczan.github.io/battleship_odin/",
  "https://github.com/Julczan/battleship_odin"
);

const project2 = createCard(
  "Project name",
  "Short description of the project",
  "https://julczan.github.io/battleship_odin/",
  "https://github.com/Julczan/battleship_odin"
);
const project3 = createCard(
  "Project name",
  "Short description of the project",
  "https://julczan.github.io/battleship_odin/",
  "https://github.com/Julczan/battleship_odin"
);
const project4 = createCard(
  "Project name",
  "Short description of the project",
  "https://julczan.github.io/battleship_odin/",
  "https://github.com/Julczan/battleship_odin"
);
const project5 = createCard(
  "Project name",
  "Short description of the project",
  "https://julczan.github.io/battleship_odin/",
  "https://github.com/Julczan/battleship_odin"
);

projectContainer.appendChild(project);
projectContainer.appendChild(project1);
projectContainer.appendChild(project2);
projectContainer.appendChild(project3);
projectContainer.appendChild(project4);
projectContainer.appendChild(project5);
