let api = (word) => `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

let getWord = (lenofword) => `https://random-word-api.vercel.app/api?words=300&length=${lenofword}&type=uppercase`;

const fetchData = (w) => {
    return fetch(api(w))
        .then(res => {
            console.log(res)
            return res.status == '200';
        })
        .catch(err => console.log(err))
}
function secretWordGenerator() {
    let n = sessionStorage.getItem("Grid_number");
    console.log(n);
    let word;
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
                word = wordsArray[Math.ceil(Math.random() * wordsArray.length-1)];
                localStorage.setItem('word', word);
                // (localStorage.getItem('word'))
            })

        })
        .catch(err => console.log(err))
}
//for instructions //

function instr() {
    let ele = document.getElementById("inst")
    ele.innerHTML = '';
    ele.style.position = 'fixed';
    ele.style.top = '50%';
    ele.style.left = '50%';
    ele.style.transform = 'translate(-50%, -50%)';
    ele.style.width = '700px';
    ele.style.height = '500px';
    ele.style.scrollbarWidth = "none"
    ele.style.overflowY = 'auto';
    ele.style.backgroundColor = 'black';
    ele.style.border = '1px solid #ccc';
    ele.style.boxShadow = '10px 10px 10px white';
    ele.style.zIndex = '1'; // Ensures it is above other elements
    ele.style.padding = '20px';
    ele.style.boxSizing = 'border-box';
    let para = document.createElement("p");
    let back = document.createElement("div");
    let tag = document.createElement("a");
    para.setAttribute("class", "para1");
    para.innerText = "Wordle is a guessing game where you have to guess a secret word. If your word is correct the grid will turn green else if your word contains the letters that the secret word has and the position of the letter is also correct that particular letter will turn green, if the position is inappropriate the letter will turn yellow, else the letter will turn grey."
    ele.appendChild(para);
    back.setAttribute('class', 'back_button2');
    tag.innerText = "Back";
    tag.setAttribute("href", "play.html");
    back.appendChild(tag)
    ele.appendChild(back);
}

// choosing the grid //
sessionStorage.setItem("Grid_number", 3);
secretWordGenerator();
function adjust(val) {
    let num = Number(document.getElementById("number").innerText);
    if (num >= 2 && num <= 12) {
        if (val == "play") {
            document.getElementById("number").innerText = Number(num)
        }
        else if (val == "+") {
            if (num < 12) {
                num++
                document.getElementById("number").innerText = Number(num)
            }
        }
        else if (val == "-") {
            if (num > 3) {
                num--;
                document.getElementById("number").innerText = Number(num)
            }
        }
    }
    sessionStorage.setItem("Grid_number", num);
    secretWordGenerator();
}
var secretWord = localStorage.getItem("word")
var n = secretWord.length;
//creating the WordleGrid //
console.log(secretWord);
function createWordleGrid() {
    const wordleGrid = document.getElementById("grid");
    wordleGrid.style.gridTemplateColumns = `repeat(${n},1fr)`;
    wordleGrid.style.gridTemplateRows = "repeat(6,1fr)";
    wordleGrid.innerHTML = " ";
    document.getElementById("grid").style.width = `calc(${n} * 5vw)`;
    document.getElementById("message_div").style.width = `calc(${n} * 5vw)`;
    for (let i = 1; i <= 6 * n; i++) {
        let wordGrid = document.createElement("div");
        wordGrid.className = "grid-item";
        wordGrid.setAttribute("id", i);
        wordleGrid.appendChild(wordGrid);
    }
    let newGame = document.createElement("div");
    newGame.setAttribute("class", "newDiv");
    let tag2 = document.createElement("a");
    tag2.innerText = "New Game"
    tag2.setAttribute("class", "lin");
    tag2.setAttribute("href", "play.html")
    newGame.appendChild(tag2);
    let parent = document.getElementById("new_game");
    parent.appendChild(newGame);
}
createWordleGrid()

// getting the random word // 

// getting input //
var secretWord = localStorage.getItem("word")
console.log(secretWord);
var currentGuess = [];
var count = 1;
var n2 = secretWord.length;
document.addEventListener("keydown", (event) => {
    var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    if (count <= n2 + 1 && n2 <= secretWord.length * 6) {
        if (event.key === 'Backspace') {
            if (count > n2 - (secretWord.length - 1)) {
                count--;
                document.getElementById(count).innerText = " ";
                currentGuess.pop();
            }
        }
        else if (event.key === 'Enter' && count < n2) {
            document.getElementById("message_div").innerText = "Too short";
        }
        else if (alphabet.includes(event.key.toUpperCase()) && count <= n2) {
            document.getElementById(count).innerText = event.key.toUpperCase();
            count++
            currentGuess.push(event.key.toUpperCase())
        }
        else if (event.key === 'Enter') {
            if (currentGuess.join("") === secretWord) {
                for (i = n2 - (secretWord.length - 1); i <= n2; i++) {
                    let element = document.getElementById(`${i}`);
                    element.classList.add('animation');
                    console.log(n2)
                    document.getElementById(`${i}`).style.backgroundColor = "#6AAA64";
                    count = "stop";
                }
                setTimeout(() => {
                               document.getElementById("message_div").style.border = "4px solid #6AAA64";
                               document.getElementById("message_div").style.boxShadow = "5px 5px 5px #6AAA64";
                               document.getElementById("message_div").innerText = secretWord + " You guessed it...!";
                            }, 700);

            }
            else {
                fetchData(currentGuess.join("")).then(res => {
                    if (res === false) {
                        setTimeout(() => {
                               document.getElementById("message_div").style.border = "4px solid red";
                               document.getElementById("message_div").style.boxShadow = "5px 5px 5px red";
                               document.getElementById("message_div").innerText ="Not in word list...!";
                            }, 100);
                            document.getElementById("message_div").innerText =" ";
                    } else {
                        var count2 = 0;
                        const secretLetterCount = {};
                        const temp = new Array(currentGuess.length).fill('gray');
                        const set3 = new Set();

                        // Count the letters in  secret word
                        for (let ele of secretWord) {
                            secretLetterCount[ele] = (secretLetterCount[ele] || 0) + 1;
                        }

                        // Check  greens colors
                        for (let count2 = 0; count2 < currentGuess.length; count2++) {
                            const currentEle = currentGuess[count2];
                            if (currentEle === secretWord[count2]) {
                                temp[count2] = '#6AAA64';
                                set3.add(count2);
                                secretLetterCount[currentEle]--;
                            }
                        }

                        // Check  yellows//
                        for (let count2 = 0; count2 < currentGuess.length; count2++) {
                            const currentEle = currentGuess[count2];

                            if (!set3.has(count2)) {
                                if (secretWord.includes(currentEle) && secretLetterCount[currentEle] > 0) {
                                    temp[count2] = 'orange';
                                    secretLetterCount[currentEle]--;
                                }
                            }
                        }
                        // Apply the temp colors to the elements
                        for (let count2 = 0; count2 < currentGuess.length; count2++) {
                            const elementId = n2 - (secretWord.length - 1) + count2;
                            const element = document.getElementById(`${elementId}`);
                            element.classList.add('animation');

                            setTimeout(() => {
                                
                                element.style.backgroundColor = temp[count2] === '#6AAA64' ? '#6AAA64' :
                                    temp[count2] === 'orange' ? 'orange' :
                                        'gray';
                            }, 500);
                        }
                          document.getElementById("message_div").innerText = currentGuess.join("");
                           setTimeout(() => {
                               document.getElementById("message_div").style.border = "4px solid black";
                               document.getElementById("message_div").style.boxShadow = "5px 5px 5px black";
                             
                            }, 500);
                            


                        if (n2 == secretWord.length * 6) {
                            document.getElementById("message_div").innerText = "The word is " + secretWord;
                            count = "stop"
                        }
                        else {
                            n2 += secretWord.length;
                            currentGuess = [];
                        }
                    }
                });
            }

        }
    }
}
);


// function wordClick(id){
//     var key = document.getElementById(`${id}`).innerText;
//     var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
//     if (count <= n2 + 1 && n2 <= secretWord.length * 6) {
//         if (key === 'Backspace') {
//             if (count > n2 - (secretWord.length - 1)) {
//                 count--;
//                 document.getElementById(count).innerText = " ";
//                 currentGuess.pop();
//             }
//         }
//         else if (key === 'Enter' && count < n2) {
//             document.getElementById("message_div").innerText = "Too short";
//         }
//         else if (alphabet.includes(key&& count <= n2)) {
//             document.getElementById(count).innerText = key
//             count++
//             currentGuess.push(key)
//         }
//         else if (key === 'Enter') {
//             if (currentGuess.join("") === secretWord) {
//                 for (i = n2 - (secretWord.length - 1); i <= n2; i++) {
//                     let element = document.getElementById(`${i}`);
//                     element.classList.add('animation');
//                     console.log(n2)
//                     document.getElementById(`${i}`).style.backgroundColor = "#6AAA64";
//                     count = "stop";
//                 }
//                 setTimeout(() => {
//                                document.getElementById("message_div").style.border = "4px solid #6AAA64";
//                                document.getElementById("message_div").style.boxShadow = "5px 5px 5px #6AAA64";
//                                document.getElementById("message_div").innerText = secretWord + " You guessed it...!";
//                             }, 700);
//                              setTimeout(() => {
//                                 for(i=0;i<currentGuess.length;i++){
//                                     document.getElementById(`${currentGuess[i]}`).style.backgroundColor =  "#6AAA64";
//                                 }
//                             }, 700);

//             }
//             else {
//                 fetchData(currentGuess.join("")).then(res => {
//                     if (res === false) {
//                         setTimeout(() => {
//                                document.getElementById("message_div").style.border = "4px solid red";
//                                document.getElementById("message_div").style.boxShadow = "5px 5px 5px red";
//                                document.getElementById("message_div").innerText ="Not in word list...!";
//                             }, 100);
//                             document.getElementById("message_div").innerText =" ";
//                     } else {
//                         var count2 = 0;
//                         const secretLetterCount = {};
//                         const temp = new Array(currentGuess.length).fill('gray');
//                         const set3 = new Set();

//                         // Count the letters in  secret word
//                         for (let ele of secretWord) {
//                             secretLetterCount[ele] = (secretLetterCount[ele] || 0) + 1;
//                         }

//                         // Check  greens colors
//                         for (let count2 = 0; count2 < currentGuess.length; count2++) {
//                             const currentEle = currentGuess[count2];
//                             if (currentEle === secretWord[count2]) {
//                                 temp[count2] = 'green';
//                                 set3.add(count2);
//                                 secretLetterCount[currentEle]--;
//                             }
//                         }

//                         // Check  yellows//
//                         for (let count2 = 0; count2 < currentGuess.length; count2++) {
//                             const currentEle = currentGuess[count2];

//                             if (!set3.has(count2)) {
//                                 if (secretWord.includes(currentEle) && secretLetterCount[currentEle] > 0) {
//                                     temp[count2] = 'orange';
//                                     secretLetterCount[currentEle]--;
//                                 }
//                             }
//                         }
//                         // Apply the temp colors to the elements
//                         for (let count2 = 0; count2 < currentGuess.length; count2++) {
//                             const elementId = n2 - (secretWord.length - 1) + count2;
//                             const element = document.getElementById(`${elementId}`);
//                             element.classList.add('animation');

//                             setTimeout(() => {
                                
//                                 element.style.backgroundColor = temp[count2] === 'green' ? 'green' :
//                                     temp[count2] === 'orange' ? 'orange' :
//                                         'gray';
//                             }, 500);
//                         }
//                           document.getElementById("message_div").innerText = currentGuess.join("");
//                            setTimeout(() => {
//                                document.getElementById("message_div").style.border = "4px solid black";
//                                document.getElementById("message_div").style.boxShadow = "5px 5px 5px black";
//                             }, 500);
//                         if (n2 == secretWord.length * 6) {
//                             document.getElementById("message_div").innerText = "Try again..! " + secretWord;
//                             count = "stop"
//                         }
//                         else {
//                             n2 += secretWord.length;
//                             currentGuess = [];
//                         }
//                     }
//                 });
//             }

//         }
//     }
// };

