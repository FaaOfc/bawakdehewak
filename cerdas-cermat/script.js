let soal = [];
let skor = 0;
let index = 0;
let timerInterval;
let sisaWaktu = 30;

async function mulaiGame(mode) {
  // Load soal dari JSON
  const res = await fetch('cerdas-cermat/soal.json');
  const data = await res.json();
  soal = data[mode];
  shuffleArray(soal); // acak urutan soal
  skor = 0;
  index = 0;
  document.getElementById("skor").textContent = skor;
  document.querySelector(".mode-pilih").classList.add("hidden");
  document.getElementById("hasil-akhir").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  tampilSoal();
  mulaiTimer();
}

function tampilSoal() {
  if (index >= 10) {
    akhirGame();
    return;
  }
  const q = soal[index];
  document.getElementById("pertanyaan").textContent = q.pertanyaan;
  const pilihanDiv = document.getElementById("pilihan");
  pilihanDiv.innerHTML = "";
  q.pilihan.forEach(jawab => {
    const btn = document.createElement("button");
    btn.textContent = jawab;
    btn.onclick = () => cekJawaban(jawab, q.jawaban);
    pilihanDiv.appendChild(btn);
  });
  document.getElementById("feedback").textContent = "";
  resetTimer();
}

function cekJawaban(dipilih, benar) {
  clearInterval(timerInterval);
  if (dipilih === benar) {
    skor += 10;
    document.getElementById("feedback").textContent = "Benar!";
    document.getElementById("feedback").style.color = "#0f0";
  } else {
    document.getElementById("feedback").textContent = `Salah! Jawaban benar: ${benar}`;
    document.getElementById("feedback").style.color = "#f00";
  }
  document.getElementById("skor").textContent = skor;
  index++;
  setTimeout(tampilSoal, 1500);
}

function akhirGame() {
  clearInterval(timerInterval);
  document.getElementById("game").classList.add("hidden");
  const hasil = document.getElementById("hasil-akhir");
  hasil.innerHTML = `Permainan selesai!<br>Skor akhir kamu: <strong>${skor}</strong>`;
  hasil.classList.remove("hidden");
  document.querySelector(".mode-pilih").classList.remove("hidden");
}

function mulaiTimer() {
  sisaWaktu = 30;
  document.getElementById("timer").textContent = sisaWaktu;
  timerInterval = setInterval(() => {
    sisaWaktu--;
    document.getElementById("timer").textContent = sisaWaktu;
    if (sisaWaktu <= 0) {
      clearInterval(timerInterval);
      cekJawaban("", soal[index].jawaban); // otomatis salah
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  mulaiTimer();
}

function shuffleArray(array) {
  for (let i = array.length -1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
