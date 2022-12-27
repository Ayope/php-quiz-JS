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

let que_count = 0;
var score = 0;
const options = document.querySelector(".answers") ;

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
    firstAnswer.style.backgroundColor = "#ccc"
    secondAnswer.innerText = questions[index].choice2;
    secondAnswer.style.backgroundColor = "#ccc"
    thirdAnswer.innerText = questions[index].choice3;
    thirdAnswer.style.backgroundColor = "#ccc"
    fourthAnswer.innerText = questions[index].choice4;
    fourthAnswer.style.backgroundColor = "#ccc"
    for(let i = 0; i < options.children.length; i++){
        options.children[i].classList.remove("disable")
    }
}

showQuest(que_count);

function next(answer){
    value = answer.getAttribute('value');

    if(que_count === questions.length - 1){
            if(questions[que_count].answer == value){
                score++;
                answer.style.backgroundColor = 'green' ;
            }else{
                answer.style.backgroundColor = 'red' ; 
            }
        
            for(let i = 0; i < options.children.length; i++){
                options.children[i].classList.add("disable")
            }

            setTimeout(function(){
                progress2bar.classList.remove('active');
                progress2bar.classList.add('completed');
        
                progress3bar.classList.add('completed');
        
                mainQuestPart.style.display = 'none';
                scorePart.style.display = 'flex';
        
                scoreNum.innerHTML = '<h2>'+(score/10)*100+'%</h2>'
            }, 1500)

   
            //the last question doesn't show the green and the red answers
        } else{
            if(questions[que_count].answer == value){
                score++;
                answer.style.backgroundColor = 'green' ;
            }else{
                answer.style.backgroundColor = 'red' ; 
            }
        
            for(let i = 0; i < options.children.length; i++){
                options.children[i].classList.add("disable")
            }

            setTimeout(function(){
                que_count++;
                showQuest(que_count);
            }, 1000)
    }
}

function repeat(){
    location.reload();
}