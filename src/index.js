import "./styles.css";
import { createCard } from "./modules/projectCard";

const projectContainer = document.querySelector(".projects");

const project = createCard(
  "Project name",
  "Short description of the project",
  "https://julczan.github.io/battleship_odin/",
  "https://github.com/Julczan/battleship_odin"
);

projectContainer.appendChild(project);
