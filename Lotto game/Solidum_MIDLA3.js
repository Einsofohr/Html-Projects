document.getElementById('loadButton').addEventListener('click', function () {
    loadButton.style.display = 'none';
    contentContainer.style.display = 'block';
});

document.getElementById('btn9').addEventListener('click', function () {
    loadButton.style.display = 'block';
    contentContainer.style.display = 'none';
});

document.addEventListener("DOMContentLoaded", function(e){
    var body = document.querySelector("body");
    var section = document.querySelector("section");
    var articleLotto = document.querySelector(".lotto");
    var articleBalls = document.querySelector(".balls");
    var numbers = [];
    var balls = document.getElementsByClassName("ball");
    var drawnNums = [];
    var chosenByMachine = [];
    function createNumberBoard(number){
    	console.log("I work");
        var board = document.createElement("div");
        board.classList.add("board");
        articleLotto.appendChild(board);
        for( var i = 0; i<number; i ++){
            var boardEl = document.createElement("button");
            boardEl.classList.add("boardEl");
            board.appendChild(boardEl);
        }
        var boardEls = document.getElementsByClassName("boardEl");
        for( var i =0; i<boardEls.length; i++){
            boardEls[i].setAttribute("data-number", i+1);
            var dataNumber = boardEls[i].getAttribute("data-number");
            var number = parseInt(dataNumber, 10);
            numbers.push(number);
            boardEls[i].textContent = number;
        }
    }
    createNumberBoard(49); 

    var board = document.querySelector(".board");
    var boardEls = document.querySelectorAll(".boardEl");
    function drawNumbers(){
        
        for (var i = 0; i<boardEls.length; i++){
        	boardEls[i].addEventListener("click", selectNums);
        }
        function selectNums(){
            var number = parseInt(this.dataset.number, 10);
            if(this.hasAttribute("data-number")){
                drawnNums.push(number);
                this.removeAttribute("data-number");
                this.classList.add("crossedOut");
            } 
            if(drawnNums.length=== 6){
                
                for ( var i = 0; i<boardEls.length; i++){
                	boardEls[i].removeAttribute("data-number");
                	boardEls[i].addEventListener("click", makeAlert);
                }
                var startDraw = document.querySelector(".startDraw");
                if(startDraw === null){ 
                    createButtonForMachineDraw();
                } else {
                    return;
                }
                

            }
            
        }
        
        return drawnNums;

    }
    drawNumbers();

    function makeAlert() {
    	var alertBox = document.createElement("div");
    	board.appendChild(alertBox);
    	alertBox.classList.add("alertBox");
    	alertBox.textContent = "you already chose 6!";
    	
    	setTimeout(function() {
    		alertBox.parentNode.removeChild(alertBox);
    	}, 1500);
    	
    }

    function machineDraw(){
        for( var i =0; i<6; i++){
            var idx = Math.floor(Math.random() * numbers.length)
            chosenByMachine.push(numbers[idx]);
            
             
            numbers.splice(idx,1); 
            console.log(numbers)
            
        }
        var btnToRemove = document.querySelector(".startDraw");
        
        btnToRemove.classList.add("invisible"); 
                return chosenByMachine;

    }
    

    function createButtonForMachineDraw(){
    	var startDraw = document.createElement("button");
    	startDraw.classList.add("startDraw");
    	section.appendChild(startDraw);
    	startDraw.textContent ="Show the winning Lotto numbers";
    	startDraw.addEventListener("click", machineDraw);
    	startDraw.addEventListener("click", compareArrays);
    	
    }

    function compareArrays(){     
        for( var i =0; i<balls.length; i++) {
            balls[i].textContent = chosenByMachine[i];
            (function() {
            	var j = i;
            	var f = function(){
            		balls[j].classList.remove("invisible");
            	}
            	setTimeout(f, 1000*(j+1));
            })();           
        }
        var common =[];
        var arr1 = chosenByMachine;
        var arr2 = drawnNums;
            for(var i = 0; i<arr1.length; i++){
                for(var j= 0; j<arr2.length; j++){
                    if(arr1[i]===arr2[j]){ 
                        common.push(arr1[i]);
                    }
                }
            }
            console.log(arr1, arr2, common); 
            function generateResult(){
                var resultsBoard = document.createElement("article");
                section.appendChild(resultsBoard);
                var paragraph = document.createElement("p");
                resultsBoard.appendChild(paragraph);
                resultsBoard.classList.add("resultsBoard");
                resultsBoard.classList.add("invisible");
                if( common.length===0){
                    paragraph.textContent ="Try again next time," + common.length + " numbers are correct, no cash prize ";
                } else if( common.length >0 && common.length< 3){
                    paragraph.textContent ="Bad luck, you only guessed " + common.length + " number, no cash prize ";
                } else if(common.length ===3) {
                    paragraph.textContent ="Not bad, " + common.length + " , here's your twenty ";
                } else if(common.length ===4){
                    paragraph.textContent ="Not bad, " + common.length + " , here's your hundred ";
                } else if( common.length ===5){
                    paragraph.textContent ="Not bad, " + common.length + " , here's your thousand ";
                }
                else if(common.length===6){
                    paragraph.textContent ="A true winner " + common.length + " here's your million";
                }
            }
        setTimeout(function() {
        	makeComebackBtn();
        	document.querySelector(".resultsBoard").classList.remove("invisible"); 
        }, 8000);
        generateResult();       
    }
    
    function makeComebackBtn(){
        var comebackBtn = document.createElement("a");
        comebackBtn.classList.add("comebackBtn");
        section.appendChild(comebackBtn);
        comebackBtn.textContent ="again"
        comebackBtn.setAttribute("href", "https://ewagrela.github.io/lottoIE/");
    }
    
})

function displayCurrentDate() {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const now = new Date();

    const dayOfWeek = daysOfWeek[now.getDay()];
    const month = months[now.getMonth()];
    const day = now.getDate();
    const year = now.getFullYear();

    const formattedDate = `Today is <span class="day">${dayOfWeek}</span>, ${month} ${day}, ${year}`;
    dateDisplay.innerHTML = formattedDate;
}

function displayCurrentTime() {
    const now = new Date();

    now.setHours(now.getHours());

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    const amOrPm = hours >= 12 ? 'P.M.' : 'A.M.';

    hours = hours % 12 || 12;

    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    const timeString = `Philippine Standard Time: ${hours}:${minutes}:${seconds} ${amOrPm}`;
    timeDisplay.textContent = timeString;
}

function updateCurrentValueDisplay() {
    const currentValue = document.getElementById('currentValue');
    
    if (currentRandomValue !== null) {
        currentValue.textContent = `Winning Number Combination: ${currentRandomValue}`;
    }
}

displayCurrentDate();
displayCurrentTime();

setInterval(displayCurrentTime, 1000);
