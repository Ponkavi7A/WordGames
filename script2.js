var wordsArray = [];
let api = (word) => `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

let getWord = (lenofword) => `https://random-word-api.vercel.app/api?words=500&length=${lenofword}&type=uppercase`;

const fetchData = async (w) => {
    return await fetch(api(w))
        .then(res => {
            console.log(res)
            // res.json()
            
            return res.status == '200';
        })
        .catch(err => console.log(err))
}
var hin = "";
const fetchData2 = async (w) => {
    (await fetch(api(w))).json().then(data => {
        hin = (data[0].meanings[0].definitions[0].definition);
        console.log(hin)
    })
}
let elements = document.querySelectorAll(".container .shells");
elements.forEach( (ele) =>{ 
ele.style.height = "105px";
ele.style.width = "106px";
ele.style.position = "relative";
ele.style.overflow ="hidden";
});
var arr = []
// document.querySelector("#middle").style.backgroundColor = "orange"
// function instr() {
//     let ele = document.getElementById("inst")
//     ele.innerHTML = '';
//     ele.style.position = 'fixed';
//     ele.style.top = '50%';
//     ele.style.left = '50%';
//     ele.style.transform = 'translate(-50%, -50%)';
//     ele.style.width = '700px';
//     ele.style.height = '500px';
//     ele.style.overflowY = 'auto';
//     ele.style.backgroundColor = 'black';
//     ele.style.border = '1px solid #ccc';
//     ele.style.boxShadow = '10px 10px 10px white';
//     ele.style.zIndex = '1'; // Ensures it is above other elements
//     ele.style.padding = '20px';
//     ele.style.boxSizing = 'border-box';
//     let para = document.createElement("p");
//     let back = document.createElement("div");
//     let tag = document.createElement("a");
//     para.setAttribute("class", "para1");
//     para.innerText = "Spellie is a word game where you have to guess random words in a particular time. If you type a word with correct spelling you will earn points..!."
//     ele.appendChild(para);
//     back.setAttribute('class', 'back_button2');
//     tag.innerText = "Back";
//     tag.setAttribute("href","main2.html");
//     back.appendChild(tag);
//     ele.appendChild(back);
// }

var sec = 61;
var ele1 = document.getElementsByClassName("rotatedText")[0];
var ele2 = document.getElementsByClassName("rotatedText")[1];
var ele3 = document.getElementsByClassName("rotatedText")[2];
var ele4 = document.getElementsByClassName("rotatedText")[3];
var ele5 = document.getElementsByClassName("rotatedText")[4];
var ele6 = document.getElementsByClassName("rotatedText")[5];
var ele7 = document.getElementsByClassName("rotatedText")[6];
var scores = 0;
var score = 0;
var com = "";
var wordObj = {};
var wordArr = [];
var count = 0;
var word3 = ""
function wordsGenerator(){
    var n = 7;
    console.log(n);
   fetch(getWord(n))
        .then(res => {
            var wordsArray = [];
            res.json().then(data => {
                for (i = 0; i < data.length; i++) {
                    let arr = data[i].split("");
                    var setWord = new Set(arr);

                    if (data[i].length === setWord.size) {
                        wordsArray.push(data[i])
                    }
                }
                word = wordsArray[Math.ceil(Math.random() * wordsArray.length)];
                localStorage.setItem('word2',word);
                word3  = localStorage.getItem('word2')
                console.log(localStorage.getItem('word2'))
            })

        })
        .catch(err => console.log(err));
}
wordsGenerator();
var currentGuess = [];
var currentWord = ""

var secretWord = localStorage.getItem('word2');
console.log(secretWord);
var list = [];
var count  = 0;
while(count >= 0 && count < 7){
    let num = Math.floor(Math.random()*7);
    if(!list.includes(num)){
        list.push(num);
        count++;
    }
}
console.log(list);
ele1.innerText = secretWord[list[0]];
ele2.innerText = secretWord[list[1]];
ele3.innerText = secretWord[list[2]];
ele4.innerText = secretWord[list[3]];
ele5.innerText = secretWord[list[4]];
ele6.innerText = secretWord[list[5]];
ele7.innerText = secretWord[list[6]];

// var list = [ele1.innerText,ele2.innerText,ele3.innerText,ele4.innerText,ele5.innerText,ele6.innerText,ele7.innerText,]
// document.addEventListener("keydown",(event)=>{
//      let show = document.getElementById("message2_div");
//      console.log(event.key);
//     if(list.includes(event.key.toUpperCase())){
//         currentWord+= event.key.toUpperCase()
//         show.innerText = currentWord;
//     }
//     else if(event.key == 'Backspace'){
//         currentWord = currentWord.slice(0,currentWord.length-1);
//         show.innerText = currentWord;
//     }
//     else if(event.key == 'Enter'){
//         wordClick('enterKey');
//     }
// })


function wordClick(id){
    let letter = document.getElementById(`${id}`).innerText;
    let show = document.getElementById("message2_div");
     if(letter == 'Enter'){
        if(currentWord === secretWord){
             const time = setTimeout(()=>{
             show.innerText = "JUMBO...!";
             show.style.border = "5px solid green";
             },100)
             const time2 = setTimeout(()=>{
             show.innerText = "";
             show.style.border = "2px solid black";
             },1500)
             currentWord="";
             scores+=10;
        }
        else if(currentWord.length<=2){
             const time = setTimeout(()=>{
             show.innerText = "Too short";
             show.style.border = "5px solid black";
             },100)
             const time2 = setTimeout(()=>{
             show.innerText = "";
             show.style.border = "2px solid black";
             },1500)
             currentWord=""
        }
        else if(!currentWord.includes(document.getElementById('middle').innerText)){
            const time = setTimeout(()=>{
             show.innerText = "Missing center letter";
             show.style.border = "5px solid orange";
             },100)
              const time2 = setTimeout(()=>{
             show.innerText = "";
             show.style.border = "2px solid black";
             },1500)
               currentWord="";
        }
        else{
             fetchData(currentWord).then(res => {
                    if (res === false) {
                        setTimeout(() => {
                                show.innerText = "Not in Word list";
                                show.style.border = "5px solid red";
                            }, 50);
                            setTimeout(() => {
                                show.innerText = "";
                                show.style.border = "2px solid black";
                            }, 900);
                             currentWord="";
                    }
                    else{
                        document.querySelector(".words").innerText += currentWord+"\n";

                        if(currentWord.length == 3 ||currentWord.length == 4){
                            score = 1;
                           
                        }
                        else if(currentWord.length == 5 ||currentWord.length == 6){
                            score = 3;
                        }
                        else if(currentWord.length == 7 || currentWord.length == 8){
                            score = 5;
                        }
                        else{
                            score = 7
                        }
                        scores+= score;
                        setTimeout(() => {
                                show.innerText = currentWord;
                                show.style.border = "5px solid green";
                            }, 0.5);
                            setTimeout(() => {
                                show.innerText = "";
                                show.style.border = "2px solid black";
                            }, 1000);
                            setTimeout(()=>{
                                currentWord="";
                            },1000)
                    }
             }
        )}
     }

     else if(letter == 'Delete'){
        currentWord = currentWord.slice(0,currentWord.length-1);
        show.innerText = currentWord;
     }
     else{
    show.innerText += letter;
    currentWord += letter;
     }
}
 var setInt = setInterval(() => {
    sec--;
      let show = document.getElementById("message2_div");
      document.getElementById("time_div").innerText = "Time : "+ sec;
      document.getElementsByClassName('score2_div')[0].innerText = "Score :"+scores;
    if (sec == 0) {
         setTimeout(() => {
                                show.innerText = "Time's Up";
                                show.style.border = "5px solid black";
                            }, 50);
                            setTimeout(() => {
                                show.innerText = "Your Score is "+ scores;
                                show.style.border = "5px solid black";
                            }, 1000);
                            setTimeout(() => {
                                show.innerText = "";
                            }, 2000);
                             currentWord = "";
                            clearInterval(setInt);

    }
}, 1000)
function replayGame(){
 
    document.querySelector(".words").innerText = "";
    sec = 61;
    scores = 0;
    wordsGenerator();
     secretWord = localStorage.getItem('word2');
console.log(secretWord);
var list = [];
currentWord =" ";
var count  = 0;
var score = "";
while(count >= 0 && count < 7){
    let num = Math.floor(Math.random()*7);
    if(!list.includes(num)){
        list.push(num);
        count++;
    }
    document.getElementById("message2_div").innerText = "";
}
localStorage.setItem("word2",secretWord)
    console.log(localStorage.getItem("word2"))
    console.log(list);
    secretWord = localStorage.getItem("word2");
ele1.innerText = secretWord[list[0]];
ele2.innerText = secretWord[list[1]];
ele3.innerText = secretWord[list[2]];
ele4.innerText = secretWord[list[3]];
ele5.innerText = secretWord[list[4]];
ele6.innerText = secretWord[list[5]];
ele7.innerText = secretWord[list[6]];
var currentGuess = [];
}
function dis(){
    document.querySelector(".whole_container").style.display = "block";
}
// fetchData2(localStorage.getItem("word2"))
function hints(){
    var b = secretWord;
    const time = setTimeout(()=>{
         document.querySelector(".hintbox").style.display= "block";
           document.querySelector(".hintbox").style.padding = "210px"
         document.querySelector(".hintbox").innerText = b[0]+"__"+"_"+"__"+b[5]+"_";
           document.querySelector(".hintbox").style.fontSize = "1.7em";

                 },1);
    const time2 = setTimeout(()=>{
            document.querySelector(".hintbox").style.display= "none"
             },5000);
}
