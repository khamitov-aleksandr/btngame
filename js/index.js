const collection = document.getElementsByClassName("game-task1");
// Create an "button" node:
const refresh = document.createElement("button");
// Create a text node:
const textRefresh = document.createTextNode("Start again");
// Append the text node to the "button" node:
refresh.appendChild(textRefresh);
refresh.id = "restart";
refresh.classList.add("refButton");




function chpok(text){
    let elem = document.getElementById(text); //находим блок div по его id, который передали в функцию
    let state = elem.style.display; //смотрим, включен ли сейчас элемент
    	if (state =='') {
    	elem.style.display='none'; //если включен, то выключаем
    	} else {
     	elem.style.display=''; //иначе - включаем
 		}
    collection[0].innerHTML = "🎉You won🎉";
    // Append the "button" node to the list:
     document.getElementById("task").appendChild(refresh);
    // let v = refresh.setAttribute("onclick", refreshPage());
        
}

function chpok2(text){
    let elem = document.getElementById(text); //находим блок div по его id, который передали в функцию
    let state = elem.style.display; //смотрим, включен ли сейчас элемент
        if (state =='') {
        elem.style.display='none'; //если включен, то выключаем
        } else {
        elem.style.display=''; //иначе - включаем
        }
    collection[0].innerHTML = "😳You lose😳";
    // Append the "button" node to the list:
     document.getElementById("task").appendChild(refresh);
}

// refresh.onclick = refreshPage("text");

// function refreshPage() {
//     window.location.reload();
// }

refresh.onclick = function () {
  window.location.reload();
}
