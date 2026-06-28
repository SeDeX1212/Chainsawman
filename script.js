let loggedUser = null;
let database = null;

const output = document.getElementById("output");
const input = document.getElementById("commandInput");

const bootScreen = document.getElementById("bootScreen");
const terminal = document.getElementById("terminal");
const bootText = document.getElementById("bootText");
const progressBar = document.getElementById("progressBar");
const bootStatus = document.getElementById("bootStatus");

const entityScreen = document.getElementById("entityScreen");
const entityImage = document.getElementById("entityImage");
const entityName = document.getElementById("entityName");
const entityDanger = document.getElementById("entityDanger");
const entityContent = document.getElementById("entityContent");

const warningScreen = document.getElementById("warningScreen");
const warningText = document.getElementById("warningText");

const ouroborosASCII = `                                    
            
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⣀⣀⣄⣀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣴⡶⢿⣟⡛⣿⢉⣿⠛⢿⣯⡈⠙⣿⣦⡀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣠⡾⠻⣧⣬⣿⣿⣿⣿⣿⡟⠉⣠⣾⣿⠿⠿⠿⢿⣿⣦⠀⠀⠀
⠀⠀⠀⠀⣠⣾⡋⣻⣾⣿⣿⣿⠿⠟⠛⠛⠛⠀⢻⣿⡇⢀⣴⡶⡄⠈⠛⠀⠀⠀
⠀⠀⠀⣸⣿⣉⣿⣿⣿⡿⠋⠀⠀⠀⠀⠀⠀⠀⠈⢿⣇⠈⢿⣤⡿⣦⠀⠀⠀⠀
⠀⠀⢰⣿⣉⣿⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠦⠀⢻⣦⠾⣆⠀⠀⠀
⠀⠀⣾⣏⣿⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⡶⢾⡀⠀⠀
⠀⠀⣿⠉⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣧⣼⡇⠀⠀
⠀⠀⣿⡛⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣧⣼⡇⠀⠀
⠀⠀⠸⡿⢻⣿⣿⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣼⣿⣥⣽⠁⠀⠀
⠀⠀⠀⢻⡟⢙⣿⣿⣿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⣿⣧⣸⡏⠀⠀⠀
⠀⠀⠀⠀⠻⣿⡋⣻⣿⣿⣿⣦⣤⣀⣀⣀⣀⣀⣠⣴⣿⣿⢿⣥⣼⠟⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠈⠻⣯⣤⣿⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⠛⣷⣴⡿⠋⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠈⠙⠛⠾⣧⣼⣟⣉⣿⣉⣻⣧⡿⠟⠋⠁⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀

[ ◼◼RO◼O◼OS ]

`;

function startBoot() {
  bootText.innerText = ouroborosASCII;

  let progress = 0;

  const interval = setInterval(() => {
    progress += 5;
    progressBar.style.width = progress + "%";

    if (progress < 30) bootStatus.innerText = "Verificando memória...";
    else if (progress < 60) bootStatus.innerText = "Carregando módulos...";
    else if (progress < 90) bootStatus.innerText = "Iniciando interface...";
    else bootStatus.innerText = "Sistema pronto.";

    if (progress >= 100) {
      clearInterval(interval);

      setTimeout(() => {
        bootScreen.style.display = "none";
        terminal.style.display = "flex";
        input.focus();

        loadDatabase().then(showWelcome);
      }, 800);
    }
  }, 150);
}

/* ===== TERMINAL NORMAL ===== */

function print(text) {
  
  output.innerText += text + "\n";

  output.scrollTop =
      output.scrollHeight;
}

async function loadDatabase() {
  const response = await fetch("docs.json");
  database = await response.json();
}

function findUser(username) {
  return database.users.find(u => u.username === username);
}

function getFiles() {
  if (!loggedUser) return [];
  return loggedUser.files;
}

function findFile(filename) {
  return getFiles().find(f => f.name.toLowerCase() === filename.toLowerCase());
}

function showWelcome() {
  print("◼◼RO◼O◼OS");
  print("Registros de Documentos");
  print("");
  print("Bem vindo agente, quer conferir algum documento?");
  print("");
  print("Digite HELP para ver os comandos.");
  print("");
}

function processCommand(cmd) {
  const args = cmd.trim().split(" ");
  const command = args[0].toLowerCase();

  if (command === "") return;

  if (command === "help") {
    print("Comandos disponíveis:");
    print("HELP                - mostra comandos");
    print("LOGIN usuario senha - entra no sistema");
    print("DIR                 - lista arquivos");
    print("TYPE arquivo.txt    - abre arquivo");
    print("CLS                 - limpa a tela");
    print("LOGOUT              - sair");
    return;
  }

  if (command === "cls") {
    output.innerText = "";
    return;
  }

  if (command === "login") {
    if (args.length < 3) {
      print("Uso: LOGIN usuario senha");
      return;
    }

    const username = args[1];
    const password = args[2];

    const user = findUser(username);

    if (!user || user.password !== password) {
      print("Acesso negado.");
      return;
    }

    loggedUser = user;
    print("Acesso permitido. Saudações, Sr(a) " + loggedUser.username + ".");
    return;
  }

  if (command === "logout") {
    loggedUser = null;
    print("Logout efetuado.");
    return;
  }

  if (command === "dir") {
    if (!loggedUser) {
      print("Acesso negado. Faça LOGIN primeiro.");
      return;
    }

    print("Diretório C:\\DOCUMENTS");
    print("");

    getFiles().forEach(f => print("  " + f.name));

    print("");
    print(getFiles().length + " arquivo(s).");
    return;
  }

  if (command === "type") {

    if (!loggedUser) {
      print("Acesso negado. Faça LOGIN primeiro.");
      return;
    }

    if (args.length < 2) {
      print("Uso: TYPE arquivo");
      return;
    }

    const filename = args[1];
    const file = findFile(filename);

    if (!file) {
      print("Arquivo não encontrado.");
      return;
    }

    if (file.type === "text") {

      print("");
      print(file.content);
      print("");

      return;
    }

    if (file.type === "entity") {

      openEntity(file);

      return;
    }

    print("Tipo de arquivo inválido.");
    return;
  }

  print("Comando não reconhecido. Digite HELP.");

}

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const cmd = input.value;
    print("C:\\> " + cmd);
    input.value = "";
    processCommand(cmd);
  }
});

/* INICIA O BOOT AO ABRIR O SITE */

function openEntity(file) {

  terminal.style.display = "none";

  entityScreen.style.display = "block";

  entityImage.src = file.image;

  entityName.textContent = file.title;

  entityDanger.textContent =
    `NÍVEL DE PERIGO ${file.danger}/5 - PRIMORDIAL`;

  entityContent.textContent =
    file.content;
}

function closeEntity() {

  entityScreen.style.display = "none";

  terminal.style.display = "block";

  input.focus();
}

function shakeScreen() {

  document.body.classList.add("screenShake");

  setTimeout(() => {
    document.body.classList.remove("screenShake");
  }, 100);
}

async function darknessEasterEgg() {

  entityScreen.style.display = "none";

  warningScreen.style.display = "flex";

  warningText.textContent = "";

  const phrase =
    "A ESCURIDÃO TE PERSEGUE";

  for (let i = 0; i < phrase.length; i++) {

    warningText.textContent += phrase[i];

    shakeScreen();

    await new Promise(resolve =>
      setTimeout(resolve, 80)
    );
  }

  await new Promise(resolve =>
    setTimeout(resolve, 2500)
  );

  warningScreen.style.display = "none";

  entityScreen.style.display = "block";
}

entityImage.addEventListener(
  "click",
  darknessEasterEgg
);

document.addEventListener("keydown", (e) => {

  if (e.key === "Escape") {

    if (entityScreen.style.display === "block") {

      closeEntity();

    }

  }

});

startBoot();