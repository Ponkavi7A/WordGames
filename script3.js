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
    para.innerText = "Spellie Bee is a word game that challenges players to construct as many words as they can using pre-selected letters. Each word must include the center letter provided in the puzzle."
    ele.appendChild(para);
    back.setAttribute('class', 'back_button2');
    tag.innerText = "Back";
    tag.setAttribute("href", "main2.html");
    back.appendChild(tag)
    ele.appendChild(back);
}