import externalSrc from "/src/assets/icons/open-in-new.svg";

function createCard(name, description, externalHyper, githubHyper, imgSrc) {
  const screenshot = document.createElement("img");
  const githubIcon = document.createElement("img");
  const externalIcon = document.createElement("img");
  const hyperLinkGit = document.createElement("a");
  const hyperLinkExt = document.createElement("a");
  const card = document.createElement("div");
  const projectName = document.createElement("h2");
  const projectDesc = document.createElement("p");

  screenshot.src = "";
  githubIcon.src =
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg";
  externalIcon.src = externalSrc;
  projectName.textContent = name;
  hyperLinkExt.href = externalHyper;
  hyperLinkGit.href = githubHyper;
  projectDesc.textContent = description;

  githubIcon.classList.add("icon");
  externalIcon.classList.add("icon");
  card.classList.add("card");
  hyperLinkGit.classList.add("hyper-git");
  hyperLinkExt.classList.add("hyper-ext");

  hyperLinkGit.appendChild(githubIcon);
  hyperLinkExt.appendChild(externalIcon);

  card.appendChild(screenshot);
  card.appendChild(projectName);
  card.appendChild(projectDesc);
  card.appendChild(hyperLinkGit);
  card.appendChild(hyperLinkExt);

  return card;
}

export { createCard };
