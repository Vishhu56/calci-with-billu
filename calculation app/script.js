let user = "", level = "easy", type = "add", timeLeft = 30;
let score = 0, total = 0, correctAnswer, timer;

let clickSound = new Audio("https://www.soundjay.com/buttons/sounds/button-3.mp3");

function login() {
  user = document.getElementById("username").value;
  if (!user) return alert("Enter name");

  document.getElementById("login").classList.add("hidden");
  document.getElementById("home").classList.remove("hidden");
  document.getElementById("welcome").innerText = "Welcome " + user;
}

function selectLevel(l) {
  level = l;
  clickSound.play();
  setActive(event.target);
}

function selectType(t) {
  type = t;
  clickSound.play();
  setActive(event.target);
}

function setTime(t) {
  timeLeft = t;
  clickSound.play();
  setActive(event.target);
}

function setActive(btn) {
  let group = btn.parentElement.children;
  for (let b of group) b.classList.remove("active");
  btn.classList.add("active");
}

function startGame() {
  score = 0;
  total = 0;

  document.getElementById("home").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = "⏱ " + timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);

  generateQuestion();
}

function generateQuestion() {
  let max = level === "easy" ? 20 : level === "moderate" ? 50 : 100;

  let a = Math.floor(Math.random() * max);
  let b = Math.floor(Math.random() * max);

  let ops = ["add", "sub", "mul", "div"];
  let op = type === "mix" ? ops[Math.floor(Math.random()*4)] : type;

  if (op === "add") {
    correctAnswer = a + b;
    document.getElementById("question").innerText = `${a} + ${b}`;
  }
  else if (op === "sub") {
    correctAnswer = a - b;
    document.getElementById("question").innerText = `${a} - ${b}`;
  }
  else if (op === "mul") {
    correctAnswer = a * b;
    document.getElementById("question").innerText = `${a} × ${b}`;
  }
  else {
    b = b || 1;
    correctAnswer = Math.floor(a / b);
    document.getElementById("question").innerText = `${a} ÷ ${b}`;
  }

  document.getElementById("answer").value = "";
}

document.getElementById("answer").addEventListener("keydown", e => {
  if (e.key === "Enter") check();
});

function check() {
  let val = parseInt(document.getElementById("answer").value);
  total++;

  let q = document.getElementById("question");

  if (val === correctAnswer) {
    score++;
    q.classList.add("correct");
  } else {
    q.classList.add("wrong");
  }

  setTimeout(()=> q.classList.remove("correct","wrong"),200);

  document.getElementById("score").innerText = "Score: " + score;

  generateQuestion();
}

function endGame() {
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");

  document.getElementById("finalScore").innerText =
    `Score: ${score}/${total}`;
}function goHome() {
  clearInterval(timer);

  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("result").classList.add("hidden");
  document.getElementById("home").classList.remove("hidden");

  // reset timer properly
  timeLeft = 30;
}