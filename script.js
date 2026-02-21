document.addEventListener("DOMContentLoaded", function() {

const chat = document.getElementById("chat");
const examSelect = document.getElementById("exam-select");
const subjectSelect = document.getElementById("subject-select");
const startBtn = document.getElementById("start-btn");

let questions = [];
let currentQuestionIndex = 0;

// Sample 100+ MCQs (expandable)
const questionBank = {
  jamb: {
    mathematics: [
      {question:"2 + 2 = ?", choices:["1","2","3","4"], answer:"4", hint:"Think pairs", explanation:"2 + 2 = 4"},
      {question:"x + 3 = 7, x = ?", choices:["2","3","4","5"], answer:"4", hint:"Subtract 3", explanation:"x=4"},
      {question:"Square root of 16?", choices:["2","4","8","16"], answer:"4", hint:"What times itself gives 16?", explanation:"4*4=16"},
      {question:"10 ÷ 2 = ?", choices:["2","5","10","20"], answer:"5", hint:"Half of 10", explanation:"10 ÷ 2 = 5"},
      {question:"5 × 6 = ?", choices:["11","30","20","15"], answer:"30", hint:"Multiply 5 by 6", explanation:"5 × 6 = 30"},
      {question:"7 + 8 = ?", choices:["14","15","16","17"], answer:"15", hint:"Add 7 and 8", explanation:"7 + 8 = 15"},
      // Add more to reach 100+...
    ],
    english: [
      {question:"Plural of child?", choices:["childs","children","childes","childer"], answer:"children", hint:"Irregular plural", explanation:"Children is correct"},
      {question:"Synonym of happy?", choices:["sad","joyful","angry","tired"], answer:"joyful", hint:"Means feeling good", explanation:"Joyful is correct"},
      {question:"Antonym of hot?", choices:["cold","warm","cool","boiling"], answer:"cold", hint:"Opposite of hot", explanation:"Cold is correct"}
    ],
    biology: [
      {question:"Basic unit of life?", choices:["Organ","Cell","Tissue","Organism"], answer:"Cell", hint:"Smallest living unit", explanation:"Cell is the basic unit of life"},
      {question:"Largest organ in human body?", choices:["Liver","Skin","Heart","Brain"], answer:"Skin", hint:"Covers the body", explanation:"Skin is largest organ"}
    ]
  },
  waec: {
    mathematics: [
      {question:"Area of circle r=7, π≈22/7?", choices:["154","308","77","44"], answer:"154", hint:"Area=πr²", explanation:"22/7*7²=154"}
    ],
    physics: [
      {question:"Unit of force?", choices:["Newton","Joule","Watt","Pascal"], answer:"Newton", hint:"F = ma", explanation:"Force is measured in Newtons"}
    ],
    english: [
      {question:"Synonym of brave?", choices:["timid","cowardly","courageous","shy"], answer:"courageous", hint:"Shows courage", explanation:"Courageous means brave"}
    ]
  }
};

// Start practice
startBtn.addEventListener("click", () => {
  const exam = examSelect.value;
  const subject = subjectSelect.value;
  if(!exam || !subject){ alert("Select exam and subject"); return; }

  questions = (questionBank[exam][subject] || []);
  currentQuestionIndex = 0;

  if(questions.length === 0){
    appendMessage("❌ No questions available for this subject.");
    return;
  }

  appendMessage(`🎯 Starting ${exam.toUpperCase()} ${subject.charAt(0).toUpperCase() + subject.slice(1)} Practice!`);
  askQuestion();
});

// Ask question
function askQuestion(){
  if(currentQuestionIndex >= questions.length){
    appendMessage("🎉 You completed this session!");
    return;
  }

  const q = questions[currentQuestionIndex];
  appendMessage(`<b>Q${currentQuestionIndex + 1}:</b> ${q.question}`);

  const mcqDiv = document.createElement("div");
  mcqDiv.classList.add("mcq");

  q.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.onclick = () => evaluateAnswer(choice);
    mcqDiv.appendChild(btn);
  });

  chat.appendChild(mcqDiv);
  chat.scrollTop = chat.scrollHeight;
}

// Evaluate answer
function evaluateAnswer(choice){
  const q = questions[currentQuestionIndex];
  if(choice.toLowerCase() === q.answer.toLowerCase()){
    appendMessage(`✅ Correct! <br><i>Explanation:</i> ${q.explanation}`);
    currentQuestionIndex++;
    setTimeout(askQuestion, 1500);
  } else {
    appendMessage(`❌ Not correct. Hint: ${q.hint}`);
  }
}

// Append message
function appendMessage(text, sender="bot"){
  const div = document.createElement("div");
  div.classList.add("message", sender);
  div.innerHTML = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

}); // DOMContentLoaded