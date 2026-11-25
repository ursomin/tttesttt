const STORAGE_KEY = "moa-study-helper-demo-v1";

const initialSubjects = [
  {
    id: "science",
    name: "1-2 과학",
    kind: "science",
    files: [
      { id: "f-s1", name: "물질의 상태 변화.pdf", type: "PDF", size: "2.4 MB", added: "오늘 추가" },
      { id: "f-s2", name: "기체의 성질 정리.txt", type: "TXT", size: "18 KB", added: "어제 추가" },
      { id: "f-s3", name: "과학 3단원 노트.pdf", type: "PDF", size: "1.8 MB", added: "11월 15일" },
    ],
  },
  {
    id: "math",
    name: "1-2 수학",
    kind: "math",
    files: [
      { id: "f-m1", name: "정수와 유리수.pdf", type: "PDF", size: "3.1 MB", added: "오늘 추가" },
      { id: "f-m2", name: "계산 연습 문제.txt", type: "TXT", size: "12 KB", added: "11월 16일" },
      { id: "f-m3", name: "수학 개념 노트.pdf", type: "PDF", size: "2.2 MB", added: "11월 12일" },
    ],
  },
  {
    id: "english",
    name: "영어 단어",
    kind: "english",
    files: [
      { id: "f-e1", name: "Lesson 05 단어장.txt", type: "TXT", size: "9 KB", added: "어제 추가" },
      { id: "f-e2", name: "영어 본문 정리.pdf", type: "PDF", size: "1.6 MB", added: "11월 14일" },
    ],
  },
];

const makeQuestion = (question, choices, answer, explanation, difficulty = "기본 개념") => ({
  question,
  choices,
  answer,
  explanation,
  difficulty,
});

const questionBanks = {
  science: [
    makeQuestion("얼음이 녹아 물이 되는 상태 변화는 무엇인가요?", ["응고", "융해", "기화", "액화"], 1, "고체인 얼음이 열을 받아 액체인 물로 변하는 상태 변화를 융해라고 해요."),
    makeQuestion("물이 끓어 수증기로 변하는 상태 변화는 무엇인가요?", ["기화", "응고", "승화", "액화"], 0, "액체가 기체로 변하는 상태 변화를 기화라고 해요. 끓음과 증발이 모두 기화에 해당해요."),
    makeQuestion("차가운 컵 표면에 물방울이 맺히는 까닭으로 알맞은 것은 무엇인가요?", ["물이 얼어서", "수증기가 액체로 변해서", "물이 기체로 변해서", "얼음이 바로 기체로 변해서"], 1, "공기 중 수증기가 차가운 컵 표면에서 열을 잃고 액체 물방울로 변해요. 이를 액화라고 해요."),
    makeQuestion("액체의 성질로 알맞은 것은 무엇인가요?", ["모양과 부피가 모두 일정하다", "모양은 담긴 그릇에 따라 변하고 부피는 거의 일정하다", "모양은 일정하고 부피는 일정하지 않다", "모양과 부피가 모두 일정하지 않다"], 1, "액체는 담긴 그릇에 따라 모양은 변하지만 부피는 거의 일정하게 유지해요."),
    makeQuestion("기체 입자의 모습에 대한 설명으로 알맞은 것은 무엇인가요?", ["입자들이 규칙적으로 빽빽하게 모여 있다", "입자들이 서로 붙어 움직이지 않는다", "입자 사이가 멀고 자유롭게 움직인다", "입자가 없어 빈 공간만 있다"], 2, "기체 입자는 서로 멀리 떨어져 있고, 공간을 자유롭게 움직여요."),
    makeQuestion("물에 열을 계속 가했을 때 일어나는 변화로 알맞은 것은 무엇인가요?", ["물의 온도가 낮아지다가 얼어요", "물이 수증기로 변해요", "물이 고체로 변해요", "물의 부피가 사라져요"], 1, "액체 물은 열을 받아 기화하면서 기체인 수증기로 변해요."),
    makeQuestion("같은 양의 물이 더 빨리 증발하도록 하는 방법은 무엇인가요?", ["넓은 그릇에 담아 표면적을 크게 한다", "좁고 깊은 병에 담는다", "뚜껑을 닫아 둔다", "온도를 낮춘다"], 0, "액체의 표면적이 넓어지면 표면에서 기체로 빠져나가는 입자가 많아져 증발이 빨라져요.", "개념 응용"),
    makeQuestion("물이 어는 동안 물질의 상태는 어떻게 변하나요?", ["액체에서 기체로", "기체에서 고체로", "액체에서 고체로", "고체에서 액체로"], 2, "액체가 열을 잃고 고체로 변하는 상태 변화를 응고라고 해요."),
    makeQuestion("일정한 압력에서 물이 끓는 동안 나타나는 현상은 무엇인가요?", ["온도가 계속 빠르게 높아진다", "물이 모두 고체가 된다", "열을 받아도 온도가 일정하게 유지된다", "물의 질량이 갑자기 늘어난다"], 2, "끓는점에 도달한 액체는 끓는 동안 상태 변화에 열을 사용하므로 온도가 일정하게 유지돼요.", "개념 응용"),
    makeQuestion("빨래가 바람 부는 날 더 잘 마르는 주된 까닭은 무엇인가요?", ["바람이 물을 얼리기 때문에", "옷 주변의 수증기를 바람이 옮겨 증발이 빨라지기 때문에", "바람이 옷의 무게를 줄이기 때문에", "공기 중 산소가 물을 없애기 때문에"], 1, "바람은 옷 주변에 모인 수증기를 옮겨 주어 물이 더 많이 증발할 수 있게 해요.", "개념 응용"),
    makeQuestion("온도가 높아질 때 기체 입자의 운동은 어떻게 되나요?", ["더 활발해진다", "완전히 멈춘다", "입자 수가 줄어든다", "입자 크기가 작아진다"], 0, "온도가 높아지면 입자의 평균 운동 에너지가 커져 더 활발하게 움직여요.", "개념 응용"),
    makeQuestion("증발과 끓음의 공통점은 무엇인가요?", ["액체가 기체로 변한다", "액체 전체에서만 일어난다", "항상 같은 온도에서 일어난다", "기체가 액체로 변한다"], 0, "증발과 끓음은 모두 액체가 기체로 변하는 기화 현상의 한 종류예요.", "개념 응용"),
    makeQuestion("따뜻한 공기 주머니를 데우면 부피가 커질 수 있는 까닭은 무엇인가요?", ["기체 입자 운동이 활발해져 더 넓게 퍼지기 때문에", "기체 입자가 액체로 변하기 때문에", "입자 수가 저절로 늘어나기 때문에", "공기가 무거워지기 때문에"], 0, "기체를 데우면 입자 운동이 활발해져 공간을 더 많이 차지하려는 성질이 나타나요.", "여러 개념 활용"),
    makeQuestion("차가운 곳에 둔 물병 안쪽에 물방울이 생겼다면 가장 알맞은 설명은 무엇인가요?", ["병 안의 물이 모두 증발했다", "수증기가 열을 잃고 액체로 액화했다", "물이 응고해 기체가 되었다", "물병에서 물질이 새어 나왔다"], 1, "수증기가 차가운 표면에서 열을 잃으면 액체로 변해 물방울이 맺힐 수 있어요.", "여러 개념 활용"),
    makeQuestion("물이 끓는 동안 가열을 계속해도 온도가 거의 일정한 이유는 무엇인가요?", ["열이 사라지기 때문에", "받은 열이 상태 변화에 쓰이기 때문에", "물 입자가 움직이지 않기 때문에", "주변 압력이 없어지기 때문에"], 1, "끓는 동안 공급된 열은 액체를 기체로 바꾸는 데 쓰여 온도 변화가 거의 없어요.", "여러 개념 활용"),
    makeQuestion("두 접시에 같은 양의 물을 담고 한 접시만 넓게 펼쳤어요. 넓은 접시의 물이 더 빨리 줄어드는 까닭은 무엇인가요?", ["물의 표면적이 넓어 증발하는 입자가 많아져서", "넓은 접시의 물만 응고해서", "좁은 접시의 물만 끓어서", "넓은 접시가 물의 질량을 늘려서"], 0, "표면적이 넓을수록 공기와 맞닿는 물의 입자가 많아져 증발이 활발해져요.", "여러 개념 활용"),
    makeQuestion("향수 냄새가 방 안 여러 곳에서 느껴지는 현상과 가장 관련 있는 기체의 성질은 무엇인가요?", ["기체는 일정한 모양을 가진다", "기체 입자는 자유롭게 움직이며 퍼진다", "기체는 흐르지 않는다", "기체는 부피가 항상 일정하다"], 1, "기체 입자는 자유롭게 운동하며 주변 공간으로 퍼져 나가요.", "여러 개념 활용"),
    makeQuestion("물이 얼음으로 변할 때 주변으로 열이 이동하는 방향으로 알맞은 것은 무엇인가요?", ["주변에서 물로만 열이 이동한다", "물이 열을 잃어 주변으로 열을 내보낸다", "열의 이동 없이 상태만 변한다", "얼음이 주변에서 열을 흡수한다"], 1, "응고할 때 액체는 열을 잃고 고체로 변하며, 그 열을 주변으로 내보내요.", "여러 개념 활용"),
    makeQuestion("같은 온도의 물을 넓은 접시와 뚜껑 있는 병에 나누어 두었어요. 넓은 접시의 물이 더 빨리 줄어드는 조건을 모두 고른 것은 무엇인가요?", ["표면적이 크고 공기와 잘 접한다", "표면적이 작고 뚜껑이 닫혀 있다", "온도가 낮고 바람이 없다", "물이 얼고 있는 중이다"], 0, "넓은 표면이 공기와 접하면 증발이 활발해져요. 뚜껑은 수증기가 빠져나가는 것을 줄여요.", "여러 개념 활용"),
    makeQuestion("물질의 상태 변화와 입자 운동을 함께 설명한 것으로 가장 알맞은 것은 무엇인가요?", ["가열하면 입자 운동이 활발해지고, 충분한 열을 받으면 상태가 변할 수 있다", "상태가 변하면 입자는 사라진다", "온도는 입자 운동과 관계가 없다", "기체 입자는 고체 입자보다 움직이지 않는다"], 0, "가열하면 입자의 운동이 활발해져요. 물질이 상태 변화 온도에 도달하면 열을 받아 다른 상태로 변할 수 있어요.", "여러 개념 활용"),
  ],
  math: [
    makeQuestion("(-3) + 8의 값은 얼마인가요?", ["-11", "-5", "5", "11"], 2, "절댓값이 큰 양수 8에서 3을 빼면 5이고, 부호는 양수예요."),
    makeQuestion("7 - 12의 값은 얼마인가요?", ["-19", "-5", "5", "19"], 1, "7에서 12를 빼면 5만큼 작아지므로 -5예요."),
    makeQuestion("(-4) × 6의 값은 얼마인가요?", ["-24", "-10", "10", "24"], 0, "부호가 다른 두 수의 곱은 음수이고, 4 × 6 = 24이므로 -24예요."),
    makeQuestion("(-36) ÷ (-9)의 값은 얼마인가요?", ["-4", "-3", "3", "4"], 3, "부호가 같은 두 수의 몫은 양수이고, 36 ÷ 9 = 4예요."),
    makeQuestion("1/2 + 1/4의 값은 얼마인가요?", ["1/6", "2/6", "3/4", "1"], 2, "분모를 4로 통일하면 1/2는 2/4예요. 2/4 + 1/4 = 3/4예요."),
    makeQuestion("-2와 5 사이에 있는 정수 중 가장 큰 수는 무엇인가요?", ["-1", "0", "4", "5"], 2, "-2보다 크고 5보다 작은 정수는 -1, 0, 1, 2, 3, 4이고 가장 큰 수는 4예요."),
    makeQuestion("(-2)³의 값은 얼마인가요?", ["-8", "-6", "6", "8"], 0, "(-2)³ = (-2) × (-2) × (-2) = -8이에요.", "개념 응용"),
    makeQuestion("-3/5와 -2/5 중 더 큰 수는 무엇인가요?", ["-3/5", "-2/5", "두 수가 같다", "비교할 수 없다"], 1, "음수에서는 0에 가까운 수가 더 커요. 따라서 -2/5가 더 커요."),
    makeQuestion("-4 + 3 × 2의 값은 얼마인가요?", ["-2", "2", "-14", "14"], 1, "곱셈을 먼저 계산해 -4 + 6 = 2예요.", "개념 응용"),
    makeQuestion("어떤 수 x에 7을 더했더니 -2가 되었어요. x는 얼마인가요?", ["-9", "-5", "5", "9"], 0, "x + 7 = -2이므로 양변에서 7을 빼면 x = -9예요.", "개념 응용"),
    makeQuestion("-1/3 + 5/6의 값은 얼마인가요?", ["1/6", "1/2", "2/3", "7/6"], 1, "-1/3을 -2/6으로 바꾸면 -2/6 + 5/6 = 3/6 = 1/2예요.", "개념 응용"),
    makeQuestion("-2.5 + 1.2의 값은 얼마인가요?", ["-3.7", "-1.3", "1.3", "3.7"], 1, "절댓값이 큰 음수 -2.5에서 1.2만큼 0에 가까워지므로 -1.3이에요."),
    makeQuestion("(-3) × (-2) × 4의 값은 얼마인가요?", ["-24", "-10", "10", "24"], 3, "(-3) × (-2) = 6이고 6 × 4 = 24예요.", "여러 개념 활용"),
    makeQuestion("기온이 -2℃에서 5℃ 올랐어요. 바뀐 기온은 몇 도인가요?", ["-7℃", "-3℃", "3℃", "7℃"], 2, "-2 + 5 = 3이므로 기온은 3℃예요.", "여러 개념 활용"),
    makeQuestion("(-3/4) ÷ (3/8)의 값은 얼마인가요?", ["-2", "-1/2", "1/2", "2"], 0, "나눗셈은 뒤의 수를 뒤집어 곱해요. (-3/4) × (8/3) = -2예요.", "여러 개념 활용"),
    makeQuestion("다음 식의 계산 순서와 값으로 알맞은 것은 무엇인가요? -6 + 2 × (-3)", ["덧셈 먼저, 0", "곱셈 먼저, -12", "왼쪽부터 계산, 0", "곱셈 먼저, 0"], 1, "곱셈을 먼저 계산하면 2 × (-3) = -6이고, -6 + (-6) = -12예요.", "여러 개념 활용"),
    makeQuestion("두 수 -1/2와 1/3의 차를 (큰 수) - (작은 수)로 나타내면 얼마인가요?", ["-5/6", "-1/6", "1/6", "5/6"], 3, "큰 수는 1/3, 작은 수는 -1/2예요. 1/3 - (-1/2) = 1/3 + 1/2 = 5/6이에요.", "여러 개념 활용"),
    makeQuestion("수직선에서 -4에서 시작해 오른쪽으로 7만큼 이동한 위치는 어디인가요?", ["-11", "-3", "3", "11"], 2, "오른쪽으로 7만큼 움직이는 것은 7을 더하는 것이므로 -4 + 7 = 3이에요.", "여러 개념 활용"),
    makeQuestion("a = -2일 때 3a - 4의 값은 얼마인가요?", ["-10", "-2", "2", "10"], 0, "a에 -2를 대입하면 3 × (-2) - 4 = -6 - 4 = -10이에요.", "여러 개념 활용"),
    makeQuestion("-0.6, -2/3, 1/2를 작은 수부터 바르게 나열한 것은 무엇인가요?", ["-0.6, -2/3, 1/2", "-2/3, -0.6, 1/2", "1/2, -0.6, -2/3", "-2/3, 1/2, -0.6"], 1, "-2/3은 약 -0.67이므로 -0.6보다 작고, 1/2는 양수예요. 순서는 -2/3, -0.6, 1/2예요.", "여러 개념 활용"),
  ],
  english: [
    makeQuestion("‘apple’의 뜻은 무엇인가요?", ["사과", "책", "의자", "연필"], 0, "‘apple’은 과일인 사과를 뜻해요."),
    makeQuestion("‘water’의 뜻은 무엇인가요?", ["불", "물", "바람", "나무"], 1, "‘water’는 물을 뜻해요."),
    makeQuestion("‘book’의 뜻은 무엇인가요?", ["가방", "공책", "책", "문"], 2, "‘book’은 책을 뜻해요."),
    makeQuestion("‘happy’의 뜻으로 알맞은 것은 무엇인가요?", ["행복한", "배고픈", "졸린", "바쁜"], 0, "‘happy’는 행복하거나 기쁜 상태를 뜻해요."),
    makeQuestion("‘library’는 어떤 장소인가요?", ["병원", "도서관", "운동장", "식당"], 1, "‘library’는 책을 읽거나 빌릴 수 있는 도서관이에요."),
    makeQuestion("‘important’의 뜻은 무엇인가요?", ["중요한", "조용한", "비싼", "쉬운"], 0, "‘important’는 중요하다는 뜻의 형용사예요.", "개념 응용"),
    makeQuestion("‘practice’의 뜻으로 알맞은 것은 무엇인가요?", ["연습하다", "잊어버리다", "기다리다", "빌리다"], 0, "동사 ‘practice’는 기술을 익히기 위해 연습하다는 뜻이에요.", "개념 응용"),
    makeQuestion("‘careful’의 뜻은 무엇인가요?", ["위험한", "조심하는", "친절한", "재미있는"], 1, "‘careful’은 주의 깊고 조심하는 상태를 뜻해요.", "개념 응용"),
    makeQuestion("‘different’의 뜻으로 알맞은 것은 무엇인가요?", ["같은", "다른", "빠른", "새로운"], 1, "‘different’는 서로 같지 않거나 다른 상태를 뜻해요.", "개념 응용"),
    makeQuestion("‘remember’의 뜻은 무엇인가요?", ["기억하다", "찾다", "만들다", "보내다"], 0, "‘remember’는 과거에 알거나 경험한 것을 기억하다는 뜻이에요.", "개념 응용"),
    makeQuestion("‘between’은 어떤 관계를 나타내나요?", ["~의 위에", "~의 아래에", "~의 사이에", "~의 바깥에"], 2, "‘between’은 둘 또는 그 이상의 대상 사이에 있다는 뜻이에요.", "개념 응용"),
    makeQuestion("‘prepare’의 뜻으로 알맞은 것은 무엇인가요?", ["준비하다", "도착하다", "선택하다", "설명하다"], 0, "‘prepare’는 어떤 일을 하기 위해 미리 준비하다는 뜻이에요.", "개념 응용"),
    makeQuestion("‘discover’의 뜻은 무엇인가요?", ["잃어버리다", "발견하다", "나누다", "닫다"], 1, "‘discover’는 이전에 몰랐던 것을 발견하다는 뜻이에요.", "여러 개념 활용"),
    makeQuestion("‘healthy’의 뜻으로 알맞은 것은 무엇인가요?", ["건강한", "배고픈", "어려운", "약한"], 0, "‘healthy’는 건강한 상태를 뜻해요.", "여러 개념 활용"),
    makeQuestion("‘return’의 뜻은 문장에 따라 달라질 수 있어요. ‘I will return the book tomorrow.’에서 알맞은 뜻은 무엇인가요?", ["책을 빌리다", "책을 돌려주다", "책을 읽다", "책을 고르다"], 1, "이 문장에서 ‘return’은 빌린 것을 돌려주다는 뜻이에요.", "여러 개념 활용"),
    makeQuestion("‘improve’의 뜻으로 알맞은 것은 무엇인가요?", ["개선하다", "멈추다", "숨기다", "비교하다"], 0, "‘improve’는 더 좋게 만들거나 나아지게 하다는 뜻이에요.", "여러 개념 활용"),
    makeQuestion("‘always’의 뜻은 무엇인가요?", ["가끔", "절대로", "항상", "곧"], 2, "‘always’는 언제나 또는 항상이라는 뜻의 빈도 부사예요.", "여러 개념 활용"),
    makeQuestion("‘quiet’의 뜻으로 알맞은 것은 무엇인가요?", ["시끄러운", "조용한", "어두운", "넓은"], 1, "‘quiet’는 소리가 거의 없거나 조용한 상태를 뜻해요.", "여러 개념 활용"),
    makeQuestion("‘nature’의 뜻은 무엇인가요?", ["자연", "날씨", "도시", "계절"], 0, "‘nature’는 산, 강, 동식물과 같은 자연을 뜻해요.", "여러 개념 활용"),
    makeQuestion("‘problem’의 뜻으로 알맞은 것은 무엇인가요?", ["계획", "문제", "대답", "약속"], 1, "‘problem’은 풀거나 해결해야 하는 문제를 뜻해요.", "여러 개념 활용"),
  ],
};

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
}[character]));

function readSavedState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && Array.isArray(saved.subjects)) {
      return {
        subjects: saved.subjects,
        selectedSubjectId: saved.selectedSubjectId,
      };
    }
  } catch (error) {
    console.info("데모 저장 내용을 불러오지 못해 예시 데이터를 사용합니다.", error);
  }
  return { subjects: structuredClone(initialSubjects), selectedSubjectId: "science" };
}

const state = {
  ...readSavedState(),
  difficulty: "easy",
  questionCount: 5,
  currentQuiz: [],
  answers: [],
  questionIndex: 0,
  toastTimer: null,
  quizSubject: null,
  quizDifficulty: null,
};

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      subjects: state.subjects,
      selectedSubjectId: state.selectedSubjectId,
    }));
  } catch (error) {
    console.info("이 브라우저에서는 데모 상태를 저장할 수 없습니다.", error);
  }
}

function getSelectedSubject() {
  return state.subjects.find((subject) => subject.id === state.selectedSubjectId) || null;
}

function getSubjectKind(name) {
  if (/수학|math/i.test(name)) return "math";
  if (/영어|english/i.test(name)) return "english";
  return "science";
}

function subjectIcon(kind) {
  return ({ science: "⚛", math: "∑", english: "Aa", custom: "✳" })[kind] || "✳";
}

function subjectTypeLabel(kind) {
  return ({ science: "과학", math: "수학", english: "영어", custom: "과목" })[kind] || "과목";
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(state.toastTimer);
  state.toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function renderSidebarSubjects() {
  $("#sidebarSubjects").innerHTML = state.subjects.map((subject) => {
    const kind = subject.kind || getSubjectKind(subject.name);
    return `<button class="sidebar-subject-link ${subject.id === state.selectedSubjectId ? "selected" : ""}" type="button" data-select-subject="${escapeHTML(subject.id)}">
      <span class="mini-subject-icon ${kind}">${escapeHTML(subjectIcon(kind))}</span><span>${escapeHTML(subject.name)}</span>
    </button>`;
  }).join("");
}

function renderSubjectCards() {
  $("#subjectGrid").innerHTML = state.subjects.map((subject) => {
    const kind = subject.kind || getSubjectKind(subject.name);
    const selected = subject.id === state.selectedSubjectId;
    const fileCount = subject.files.length;
    return `<article class="subject-card ${selected ? "selected" : ""}" data-card-subject="${escapeHTML(subject.id)}" tabindex="0" role="button" aria-label="${escapeHTML(subject.name)} 선택">
      <div class="subject-top"><span class="subject-icon ${kind}">${escapeHTML(subjectIcon(kind))}</span>
        <button class="subject-kebab" type="button" data-delete-subject="${escapeHTML(subject.id)}" aria-label="${escapeHTML(subject.name)} 삭제">···</button></div>
      <h3>${escapeHTML(subject.name)}</h3><p>${escapeHTML(subjectTypeLabel(kind))} · ${fileCount}개 자료</p>
      <div class="subject-card-bottom"><span>${selected ? "선택한 과목" : "학습 자료"}</span><strong>${fileCount}개</strong></div>
    </article>`;
  }).join("");
}

function renderSubjectSelect() {
  const select = $("#quizSubjectSelect");
  const currentValue = state.selectedSubjectId;
  select.innerHTML = '<option value="">과목을 선택해 주세요</option>' + state.subjects.map((subject) => `<option value="${escapeHTML(subject.id)}">${escapeHTML(subject.name)}</option>`).join("");
  select.value = currentValue || "";
  select.disabled = state.subjects.length === 0;
}

function renderFiles() {
  const subject = getSelectedSubject();
  $("#materialSubjectName").textContent = subject?.name || "과목을 선택해 주세요";
  const files = subject?.files || [];
  $("#materialCount").textContent = String(files.length).padStart(2, "0");
  $("#emptyFiles").hidden = files.length > 0;
  $("#fileList").hidden = files.length === 0;
  $("#fileList").innerHTML = files.map((file) => {
    const type = file.type === "PDF" ? "pdf" : "txt";
    return `<div class="file-row"><span class="file-type-icon ${type}">${escapeHTML(file.type)}</span>
      <span class="file-details"><strong title="${escapeHTML(file.name)}">${escapeHTML(file.name)}</strong><small>${escapeHTML(file.size)} <span>·</span> ${escapeHTML(file.added)}</small></span>
      <span class="file-status">목록 등록</span><button class="file-remove" type="button" data-delete-file="${escapeHTML(file.id)}" aria-label="${escapeHTML(file.name)} 삭제">×</button></div>`;
  }).join("");
}

function renderDashboard() {
  if (state.selectedSubjectId && !state.subjects.some((subject) => subject.id === state.selectedSubjectId)) {
    state.selectedSubjectId = state.subjects[0]?.id || null;
  }
  renderSidebarSubjects();
  renderSubjectCards();
  renderSubjectSelect();
  renderFiles();
  $("#subjectHeadingCount").textContent = String(state.subjects.length).padStart(2, "0");
  renderBuilder();
  saveState();
}

function openSubjectDialog() {
  $("#subjectNameInput").value = "";
  $("#subjectDialog").showModal();
  window.setTimeout(() => $("#subjectNameInput").focus(), 50);
}

function closeSubjectDialog() {
  $("#subjectDialog").close();
}

function addSubject(name) {
  const cleanName = name.trim();
  if (!cleanName) return;
  if (state.subjects.some((subject) => subject.name.toLocaleLowerCase() === cleanName.toLocaleLowerCase())) {
    showToast("이미 등록된 과목 이름이에요.");
    return;
  }
  const kind = getSubjectKind(cleanName);
  const subject = { id: `subject-${Date.now()}`, name: cleanName, kind: /수학|영어/i.test(cleanName) ? kind : "custom", files: [] };
  state.subjects.push(subject);
  state.selectedSubjectId = subject.id;
  closeSubjectDialog();
  renderDashboard();
  showToast(`${cleanName} 과목을 만들었어요. 자료를 추가해 보세요.`);
}

function deleteSubject(subjectId) {
  const subject = state.subjects.find((entry) => entry.id === subjectId);
  if (!subject) return;
  const confirmed = window.confirm(`“${subject.name}” 과목과 등록된 자료를 삭제할까요?`);
  if (!confirmed) return;
  state.subjects = state.subjects.filter((entry) => entry.id !== subjectId);
  if (state.selectedSubjectId === subjectId) state.selectedSubjectId = state.subjects[0]?.id || null;
  renderDashboard();
  showToast("과목을 삭제했어요.");
}

function selectSubject(subjectId) {
  if (subjectId && !state.subjects.some((subject) => subject.id === subjectId)) return;
  state.selectedSubjectId = subjectId || null;
  renderDashboard();
}

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function addFiles(fileList) {
  const subject = getSelectedSubject();
  if (!subject) {
    showToast("먼저 과목을 만들어 주세요.");
    return;
  }
  let added = 0;
  [...fileList].forEach((file) => {
    const extension = file.name.split(".").pop().toLowerCase();
    if (!(["txt", "pdf"].includes(extension))) {
      showToast("TXT 또는 PDF 파일만 추가할 수 있어요.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      showToast(`${file.name}: 10MB 이하 파일만 추가할 수 있어요.`);
      return;
    }
    subject.files.unshift({
      id: `file-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: file.name,
      type: extension.toUpperCase(),
      size: formatFileSize(file.size),
      added: "방금 추가",
    });
    added += 1;
  });
  if (added) {
    renderDashboard();
    showToast(`${added}개 파일을 목록에 추가했어요. 화면 데모용 상태로 저장돼요.`);
  }
  $("#fileInput").value = "";
}

function removeFile(fileId) {
  const subject = getSelectedSubject();
  if (!subject) return;
  subject.files = subject.files.filter((file) => file.id !== fileId);
  renderDashboard();
  showToast("자료를 목록에서 삭제했어요.");
}

function chooseDifficulty(difficulty) {
  state.difficulty = difficulty;
  $$("[data-difficulty]").forEach((button) => button.classList.toggle("selected", button.dataset.difficulty === difficulty));
}

function chooseCount(count) {
  state.questionCount = Number(count);
  $$("[data-count]").forEach((button) => button.classList.toggle("selected", Number(button.dataset.count) === state.questionCount));
}


function renderBuilder() {
  const subject = getSelectedSubject();
  const count = subject?.files.length || 0;
  $("#builderTitle").textContent = subject ? `${subject.name} 문제 만들기` : "문제 만들기";
  $("#builderSubjectName").textContent = subject?.name || "선택한 과목 없음";
  $("#builderMaterialCount").textContent = `등록된 학습 자료 ${count}개`;
  const warning = $("#builderWarning");
  warning.hidden = Boolean(subject && count);
  warning.textContent = subject ? "이 과목에는 학습 자료가 없어요. 자료 관리에서 TXT 또는 PDF를 먼저 추가해 주세요." : "과목을 선택해 주세요. 과목이 없다면 학습 홈에서 새 과목을 만들 수 있어요.";
  $("#createQuizButton").disabled = !subject || !count;
  $("#openBuilderButton").disabled = !subject;
}

function showBuilder() {
  ["dashboardView", "quizView", "resultsView"].forEach((id) => $("#" + id).hidden = true);
  $("#builderView").hidden = false;
  $("#breadcrumbCurrent").textContent = "문제 만들기";
  $$("[data-nav]").forEach((link) => link.classList.toggle("active", link.dataset.nav === "create"));
  renderBuilder();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function buildQuiz() {
  const subject = getSelectedSubject();
  if (!subject) {
    showToast("먼저 과목을 만들어 주세요.");
    return;
  }
  if (!subject.files.length) {
    showToast("문제를 만들려면 이 과목에 학습 자료를 먼저 추가해 주세요.");
    $("#materials").scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  const kind = subject.kind === "custom" ? getSubjectKind(subject.name) : subject.kind;
  const bank = questionBanks[kind];
  if (!bank || subject.kind === "custom") {
    showToast("이 과목에는 예시 문제가 아직 없어요. 과학·수학·영어 예시 과목으로 연습해 주세요.");
    return;
  }
  const difficultyIndex = { easy: 0, medium: 1, hard: 2 }[state.difficulty];
  const prioritized = bank.filter((question) => {
    if (difficultyIndex === 0) return question.difficulty === "기본 개념";
    if (difficultyIndex === 1) return question.difficulty === "개념 응용";
    return question.difficulty === "여러 개념 활용";
  });
  const remainder = bank.filter((question) => !prioritized.includes(question));
  const ordered = [...prioritized, ...remainder];
  state.currentQuiz = ordered.slice(0, state.questionCount).map((question) => ({ ...question, choices: [...question.choices] }));
  state.quizSubject = { id: subject.id, name: subject.name };
  state.quizDifficulty = state.difficulty;
  state.answers = new Array(state.currentQuiz.length).fill(null);
  state.questionIndex = 0;
  $("#quizSessionSubject").textContent = subject.name;
  $("#dashboardView").hidden = true;
  $("#builderView").hidden = true;
  $("#resultsView").hidden = true;
  $("#quizView").hidden = false;
  $("#breadcrumbCurrent").textContent = "문제 풀이";
  renderQuestion();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderQuestion() {
  const question = state.currentQuiz[state.questionIndex];
  if (!question) return;
  const current = state.questionIndex + 1;
  const total = state.currentQuiz.length;
  $("#sessionCount").textContent = `${String(current).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  $("#questionNumber").textContent = `QUESTION ${String(current).padStart(2, "0")}`;
  $("#questionDifficulty").textContent = question.difficulty;
  $("#questionTitle").textContent = question.question;
  $("#quizProgressFill").style.width = `${(current / total) * 100}%`;
  $("#questionOptions").innerHTML = question.choices.map((choice, index) => `<button class="answer-option ${state.answers[state.questionIndex] === index ? "selected" : ""}" type="button" data-answer="${index}" aria-pressed="${state.answers[state.questionIndex] === index}">
    <span class="option-letter">${String.fromCharCode(65 + index)}</span><span class="option-text">${escapeHTML(choice)}</span></button>`).join("");
  $("#prevQuestion").disabled = state.questionIndex === 0;
  $("#prevQuestion").style.opacity = state.questionIndex === 0 ? ".45" : "1";
  $("#nextQuestion").innerHTML = current === total ? `마지막 문제 <span>✓</span>` : `다음 문제 <span>→</span>`;
  $("#submitQuizButton").disabled = state.answers.some((answer) => answer === null);
}

function setAnswer(index) {
  state.answers[state.questionIndex] = index;
  renderQuestion();
}

function submitQuiz() {
  if (state.answers.some((answer) => answer === null)) {
    showToast("아직 답하지 않은 문제가 있어요. 모든 문제에 답해 주세요.");
    return;
  }
  const correct = state.currentQuiz.reduce((count, question, index) => count + (question.answer === state.answers[index] ? 1 : 0), 0);
  const total = state.currentQuiz.length;
  const score = Math.round((correct / total) * 100);
  const subject = state.quizSubject;
  $("#scoreValue").textContent = score;
  $("#scoreRing").style.background = `conic-gradient(#61a77e 0 ${score * 3.6}deg, #eaf0ec ${score * 3.6}deg 360deg)`;
  $("#correctCount").textContent = correct;
  $("#totalCount").textContent = total;
  $("#resultSubject").textContent = subject?.name || "과목";
  $("#resultDifficulty").textContent = ({ easy: "하", medium: "중", hard: "상" })[state.quizDifficulty];
  $("#reviewCount").textContent = String(total).padStart(2, "0");
  $("#resultTitle").textContent = score === 100 ? "완벽해요!" : score >= 60 ? "잘했어요!" : "다시 확인해 봐요!";
  $("#resultSubtitle").textContent = score === 100 ? "모든 문제를 맞혔어요. 오늘의 학습이 탄탄하게 쌓였어요." : "한 문제씩 풀어낸 오늘의 학습, 정말 멋져요.";
  $("#scoreSubcopy").textContent = score >= 80 ? "잘하고 있어요. 이 흐름을 이어가 봐요." : "틀린 문제를 다시 확인하며 개념을 다져봐요.";
  $("#reviewList").innerHTML = state.currentQuiz.map((question, index) => {
    const isCorrect = question.answer === state.answers[index];
    return `<article class="review-card"><div class="review-card-top"><span>QUESTION ${String(index + 1).padStart(2, "0")}</span><span class="answer-result ${isCorrect ? "correct" : "incorrect"}">${isCorrect ? "✓ 정답" : "↻ 오답"}</span></div>
      <p class="review-question">${escapeHTML(question.question)}</p><div class="review-answer-line"><span>내가 고른 답 <strong>${escapeHTML(question.choices[state.answers[index]])}</strong></span>${isCorrect ? "" : `<span>정답 <strong class="correct-answer">${escapeHTML(question.choices[question.answer])}</strong></span>`}</div>
      <p class="review-explanation"><strong>해설</strong>${escapeHTML(question.explanation)}</p></article>`;
  }).join("");
  $("#quizView").hidden = true;
  $("#builderView").hidden = true;
  $("#resultsView").hidden = false;
  $("#breadcrumbCurrent").textContent = "학습 결과";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showDashboard() {
  $("#quizView").hidden = true;
  $("#resultsView").hidden = true;
  $("#builderView").hidden = true;
  $("#dashboardView").hidden = false;
  $("#breadcrumbCurrent").textContent = "학습 홈";
  $("[data-nav='home']").classList.add("active");
  $$('[data-nav]').filter((link) => link.dataset.nav !== "home").forEach((link) => link.classList.remove("active"));
  renderDashboard();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function retryQuiz() {
  state.answers = new Array(state.currentQuiz.length).fill(null);
  state.questionIndex = 0;
  $("#resultsView").hidden = true;
  $("#builderView").hidden = true;
  $("#quizView").hidden = false;
  $("#breadcrumbCurrent").textContent = "문제 풀이";
  renderQuestion();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function bindEvents() {
  $("#openBuilderButton").addEventListener("click", showBuilder);
  $("#builderHomeButton").addEventListener("click", showDashboard);
  $("#builderMaterialsButton").addEventListener("click", () => {
    showDashboard();
    $("#materials").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  $(".brand").addEventListener("click", (event) => { event.preventDefault(); showDashboard(); });
  $("#addSubjectButton").addEventListener("click", openSubjectDialog);
  $("#sidebarAddSubject").addEventListener("click", openSubjectDialog);
  $("#closeSubjectDialog").addEventListener("click", closeSubjectDialog);
  $("#cancelSubjectButton").addEventListener("click", closeSubjectDialog);
  $("#subjectDialog").addEventListener("click", (event) => {
    if (event.target === $("#subjectDialog")) closeSubjectDialog();
  });
  $("#subjectForm").addEventListener("submit", (event) => {
    event.preventDefault();
    addSubject($("#subjectNameInput").value);
  });

  $("#subjectGrid").addEventListener("click", (event) => {
    const deleteButton = event.target.closest("[data-delete-subject]");
    if (deleteButton) {
      event.stopPropagation();
      deleteSubject(deleteButton.dataset.deleteSubject);
      return;
    }
    const card = event.target.closest("[data-card-subject]");
    if (card) selectSubject(card.dataset.cardSubject);
  });
  $("#subjectGrid").addEventListener("keydown", (event) => {
    const card = event.target.closest("[data-card-subject]");
    if (card && event.target === card && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      selectSubject(card.dataset.cardSubject);
    }
  });
  $("#sidebarSubjects").addEventListener("click", (event) => {
    const button = event.target.closest("[data-select-subject]");
    if (button) selectSubject(button.dataset.selectSubject);
  });

  $("#quizSubjectSelect").addEventListener("change", (event) => selectSubject(event.target.value));
  $("#fileInput").addEventListener("change", (event) => addFiles(event.target.files));
  $("#fileList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-delete-file]");
    if (button) removeFile(button.dataset.deleteFile);
  });
  $$("[data-difficulty]").forEach((button) => button.addEventListener("click", () => chooseDifficulty(button.dataset.difficulty)));
  $$("[data-count]").forEach((button) => button.addEventListener("click", () => chooseCount(button.dataset.count)));
  $("#createQuizButton").addEventListener("click", buildQuiz);
  $("#questionOptions").addEventListener("click", (event) => {
    const option = event.target.closest("[data-answer]");
    if (option) setAnswer(Number(option.dataset.answer));
  });
  $("#prevQuestion").addEventListener("click", () => {
    if (state.questionIndex > 0) {
      state.questionIndex -= 1;
      renderQuestion();
    }
  });
  $("#nextQuestion").addEventListener("click", () => {
    if (state.answers[state.questionIndex] === null) {
      showToast("보기를 하나 선택해 주세요.");
      return;
    }
    if (state.questionIndex < state.currentQuiz.length - 1) {
      state.questionIndex += 1;
      renderQuestion();
    } else {
      submitQuiz();
    }
  });
  $("#submitQuizButton").addEventListener("click", submitQuiz);
  $("#backToDashboard").addEventListener("click", showDashboard);
  $("#resultsBackButton").addEventListener("click", showDashboard);
  $("#resultHomeButton").addEventListener("click", showDashboard);
  $("#retryQuizButton").addEventListener("click", retryQuiz);

  $$("[data-nav]").forEach((link) => link.addEventListener("click", (event) => {
    if (link.dataset.nav === "create") { event.preventDefault(); showBuilder(); return; }
    if (["quizView", "resultsView", "builderView"].some((id) => !$("#" + id).hidden)) showDashboard();
    $$("[data-nav]").forEach((navLink) => navLink.classList.toggle("active", navLink === link));
    $("#breadcrumbCurrent").textContent = "학습 홈";
    if (link.dataset.nav === "home") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }));
}

bindEvents();
renderDashboard();
