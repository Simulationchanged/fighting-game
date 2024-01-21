
function reactangularCollison({rectangle1, reactangle2}){
    return(
        rectangle1.attackBox.position.x + player.attackBox.width >= 
        reactangle2.position.x && 
        rectangle1.attackBox.position.x <= reactangle2.position.x + 
        reactangle2.width &&
        rectangle1.attackBox.position.y + player.attackBox.height >= 
        reactangle2.position.y
        && rectangle1.attackBox.position.y <= reactangle2.position.y + reactangle2.height
    )
}

function determineWinner({player, enemy, timerId}) {
    clearTimeout(timerId)
    document.querySelector('#displayText').style.display = 'flex'; 
    if(player.health === enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Unentschieden!';
    } else if (player.health > enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Samurai Wins';
    } else if (player.health < enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Ninja Wins';
    }  
}

let timer = 60;
let timeId
function decreaseTimer() {
    if (timer > 0) {
        timer--;
        document.querySelector('#timer').innerHTML = timer;
       timerId = setTimeout(decreaseTimer, 1000); // Setze den Timeout nur, wenn der Timer noch nicht 0 ist
    } else if (timer === 0) {
        // Code für das Ende des Timers
        determineWinner({player, enemy, timerId})
    }
}