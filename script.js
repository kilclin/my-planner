//  Опис кожної квітки 
const flowerData = {
  "Ромашка": "Ромашка — це квітка з білими пелюстками і жовтою серединкою. Вона символізує чистоту та невинність.",
  "Троянда": "Троянда — популярна квітка, символ любові та краси. Може бути різних кольорів.",
  "Лілія": "Лілія — елегантна квітка з ніжними пелюстками. Символізує чистоту, велич та благородство."
};

// ----------------------
// 🔊 Гучність звукових ефектів
// ----------------------
let effectsVolume = 0.5;

//  Звуки через HTML Audio 
function playSound(url) {
  const audio = new Audio(url);
  audio.volume = effectsVolume;
  audio.play();
}

//  Один Audio об’єкт для фонового звуку
let bgMusicAudio;
function playBgMusic(url, volume = 0.2) {
  if (bgMusicAudio) {
    bgMusicAudio.pause();
    bgMusicAudio = null;
  }
  bgMusicAudio = new Audio(url);
  bgMusicAudio.volume = volume;
  bgMusicAudio.loop = true;
  bgMusicAudio.play();
}

//  Кнопка "Увійти в сад"
document.getElementById('enter-garden').addEventListener('click', () => {
  const menu = document.getElementById('menu');
  const garden = document.getElementById('garden');

  menu.style.display = 'none';
  garden.style.display = 'block';
  garden.classList.add('fade-in');

  playBgMusic('sounds/bg_music.mp3', 0.2);
});

//  Клік по квітці 
const flowers = document.querySelectorAll('.flower');
flowers.forEach(flower => {
  flower.addEventListener('click', () => {
    playSound('sounds/click.mp3');

    const name = flower.dataset.name;
    const card = document.getElementById('flower-card');
    const garden = document.getElementById('garden');

    document.getElementById('flower-name').textContent = name;
    document.getElementById('flower-info').textContent = flowerData[name];

    garden.style.display = 'none';
    card.style.display = 'block';
    card.classList.add('fade-in');
  });
});

//  Кнопка "Назад у сад"
document.getElementById('back-to-garden').addEventListener('click', () => {
  const card = document.getElementById('flower-card');
  const garden = document.getElementById('garden');
   playSound('sounds/click.mp3');


  card.style.display = 'none';
  garden.style.display = 'block';
  garden.classList.add('fade-in');
});

// ----------------------
// ⚙️ Налаштування гучності
// ----------------------
const settingsBtn = document.getElementById('settings-btn');
const volumeControl = document.getElementById('volume-control');
const volumeRange = document.getElementById('volume-range');

settingsBtn.addEventListener('click', () => {
  volumeControl.style.display =
    volumeControl.style.display === 'none' ? 'block' : 'none';
});

// 🔊 ТЕПЕР ПОВЗУНОК КЕРУЄ І МУЗИКОЮ, І ЕФЕКТАМИ
volumeRange.addEventListener('input', () => {
  const v = parseFloat(volumeRange.value);

  // фонова музика
  if (bgMusicAudio) {
    bgMusicAudio.volume = v;
  }

  // ефекти
  effectsVolume = v;
});


// ----------------------
// Система тестів
// ----------------------

//  питання для кожної квітки
const tests = {
  "Ромашка": [
    { question: "Якого кольору пелюстки ромашки?", options: ["Білі", "Червоні", "Жовті"], answer: "Білі" },
    { question: "Що символізує ромашка?", options: ["Любов", "Чистоту", "Смуток"], answer: "Чистоту" },
    { question: "Де зазвичай ростуть ромашки?", options: ["У воді", "На луках", "У лісі"], answer: "На луках" }
  ],
  "Троянда": [
    { question: "Що символізує троянда?", options: ["Любов", "Холод", "Смуток"], answer: "Любов" },
    { question: "Якого кольору найвідоміша троянда?", options: ["Синя", "Червона", "Чорна"], answer: "Червона" },
    { question: "Чим покрито стебло троянди?", options: ["Шипами", "Пелюстками", "Пилком"], answer: "Шипами" }
  ],
  "Лілія": [
    { question: "Що символізує лілія?", options: ["Елегантність", "Холод", "Силу"], answer: "Елегантність" },
    { question: "Якого кольору найчастіше лілії?", options: ["Білі", "Сині", "Чорні"], answer: "Білі" },
    { question: "Де зазвичай росте лілія?", options: ["У саду", "Під землею", "На дереві"], answer: "У саду" }
  ]
};

// Бали по кожній квітці
let flowerScores = {
  "Ромашка": 0,
  "Троянда": 0,
  "Лілія": 0
};

// Кнопка “Пройти тест”
document.getElementById('start-test').addEventListener('click', () => {
  const currentFlower = document.getElementById('flower-name').textContent;
  startTest(currentFlower);
   playSound('sounds/click.mp3');

});

function startTest(flowerName) {
  const testData = tests[flowerName];
  let currentQuestion = 0;
  let correctAnswers = 0;

  const testSection = document.getElementById('test-section');
  const questionEl = document.getElementById('test-question');
  const optionsEl = document.getElementById('test-options');
  const resultEl = document.getElementById('test-result');

  testSection.style.display = 'block';
  resultEl.textContent = '';

  showQuestion();

  function showQuestion() {
    const q = testData[currentQuestion];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = '';
    resultEl.textContent = '';

    q.options.forEach(option => {
      const btn = document.createElement('button');
      btn.textContent = option;
      btn.addEventListener('click', () => checkAnswer(option, q.answer));
      optionsEl.appendChild(btn);
    });
  }

  function checkAnswer(selected, correct) {
    const allButtons = optionsEl.querySelectorAll('button');
    allButtons.forEach(b => b.disabled = true);

    if (selected === correct) {
      correctAnswers++;
      resultEl.textContent = "✅ Правильно!";
      resultEl.style.color = "green";
      playSound("sounds/success.mp3");
    } else {
      resultEl.textContent = "❌ Неправильно!";
      resultEl.style.color = "red";
      playSound("sounds/error.mp3");

      const retryBtn = document.createElement('button');
      retryBtn.textContent = "Спробувати ще раз";
      retryBtn.addEventListener('click', () => {
        resultEl.textContent = '';
        retryBtn.remove();
        showQuestion();
      });
      resultEl.appendChild(document.createElement('br'));
      resultEl.appendChild(retryBtn);
      return;
    }

    currentQuestion++;
    if (currentQuestion < testData.length) {
      setTimeout(() => {
        showQuestion();
      }, 800);
    } else {
      finishTest();
    }
  }

  // helper: перетворення укр. назви в латиницю
  function slugify(name) {
    const map = { 'а':'a','б':'b','в':'v','г':'g','ґ':'g','д':'d','е':'e','є':'ye','ж':'zh','з':'z','и':'y','і':'i','ї':'yi','й':'y','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'h','ц':'ts','ч':'ch','ш':'sh','щ':'shch','ь':'','ю':'yu','я':'ya' };
    return name.toLowerCase().split('').map(ch => map[ch] ?? '-').join('')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function finishTest() {
    confetti({
      particleCount: 250,
      spread: 90,
      origin: { y: 0.6 }
    });
    testSection.style.display = 'none';
    const gainedPoints = correctAnswers * 10;
    flowerScores[flowerName] += gainedPoints;

    const flowerInfo = document.getElementById('flower-info');
    flowerInfo.innerHTML += `<br><b>🎉 Ви завершили тест для ${flowerName}! Отримано ${gainedPoints} балів!</b><br>`;
    flowerInfo.innerHTML += `<b>🌸 Ваші бали за ${flowerName}: ${flowerScores[flowerName]}</b>`;

    const slug = slugify(flowerName);
    const scoreElement = document.getElementById(`score-${slug}`);
    if (scoreElement) {
      scoreElement.textContent = flowerScores[flowerName];
    }
  }
}
