var question = document.getElementById('quest');
var questionNum = document.getElementById('questNum')
var firstAnswer = document.getElementById('ans1');
var secondAnswer = document.getElementById('ans2');
var thirdAnswer = document.getElementById('ans3');
var fourthAnswer = document.getElementById('ans4');

var progress2bar = document.querySelector('#progress2bar');
var progress3bar = document.querySelector('#progress3bar')

var mainQuestPart = document.querySelector('#main');
var scorePart = document.querySelector('#score1');

var scoreNum = document.querySelector('#scoreNum');

const options = document.querySelector(".answers") ;

var progBar = document.getElementById("progessBar");

let htmlTimer = document.getElementById('timer');

let que_count = 0;
var score = 0;
let counter;
let timeValue = 30;

function shuffle(array){
    for(var i = array.length-1 ; i>0; i--){
        var j = Math.floor(Math.random()*(i+1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;    
    }
    return array;
}

shuffle(questions);

function showQuest(index){  
    
    questionNum.innerText = que_count + 1;
    
    question.innerText = questions[index].question;
    
    firstAnswer.innerText = questions[index].choice1;
    firstAnswer.style.backgroundColor = "#ccc";
    
    secondAnswer.innerText = questions[index].choice2;
    secondAnswer.style.backgroundColor = "#ccc";
    
    thirdAnswer.innerText = questions[index].choice3;
    thirdAnswer.style.backgroundColor = "#ccc";
    
    fourthAnswer.innerText = questions[index].choice4;
    fourthAnswer.style.backgroundColor = "#ccc";
    
    enableBtn();
    
    clearInterval(counter);
    startTimer(timeValue);
}

showQuest(que_count);

function next(answer){
    value = answer.getAttribute('value');

        if(que_count === questions.length - 1){
            if(questions[que_count].answer == value){
                score++;
                answer.style.backgroundColor = '#2ee01e' ;
                checkBulletProgbar('correct');
            }else{
                answer.style.backgroundColor = '#EA4444' ; 
                checkBulletProgbar('wrong');
                showCorrect();
            }
        
            disableBtn()

            setTimeout(function(){
                showScore();
            }, 1500)

        } else{
            if(questions[que_count].answer == value){
                score++;
                answer.style.backgroundColor = '#2ee01e' ;
                checkBulletProgbar('correct');
                clearInterval(counter);
            }else{
                answer.style.backgroundColor = '#EA4444' ; 
                showCorrect();
                checkBulletProgbar('wrong');
                clearInterval(counter);
            }
        
            disableBtn()

            setTimeout(function(){
                que_count++;
                showQuest(que_count);
            }, 1000)
        }
}

function showScore(){
    progress2bar.classList.remove('active');
    progress2bar.classList.add('completed');

    progress3bar.classList.add('completed');

    mainQuestPart.style.display = 'none';
    scorePart.style.display = 'flex';

    scoreNum.innerHTML = '<h2>'+(score/10)*100+'%</h2>'

    progBar.style.display = 'none';
}

function disableBtn(){
    for(let i = 0; i < options.children.length; i++){
        options.children[i].classList.add("disable");
    }
}

function enableBtn(){
    for(let i = 0; i < options.children.length; i++){
        options.children[i].classList.remove("disable")
    }
}

function showCorrect(){
    for(let i = 0; i < options.children.length; i++){
        if(questions[que_count].answer == options.children[i].getAttribute('value')){
            options.children[i].style.backgroundColor = '#2ee01e';
        }
    }
}

function repeat(){
    location.reload();
}

function addBulletProgbar(){
    for(let i = 0; i<questions.length; i++){
        let bullet = '<span class="circle"></span>'
        progBar.innerHTML += bullet;
    }
}

addBulletProgbar();

function checkBulletProgbar(marktype){
    progBar.children[que_count].classList.add(marktype);
}


function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        htmlTimer.textContent = time;
        time--;

        if(time < 0){
            showCorrect();
            if(que_count === questions.length - 1){
                showCorrect();
                setTimeout(()=>{showScore()}, 1000)   
            }

            checkBulletProgbar('wrong');

            setTimeout(()=>{
                que_count++;
                showQuest(que_count);
            }, 1000);

            time = timeValue;

        }
    } 
}

