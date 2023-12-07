const canvas = document.querySelector('canvas');   //Last stamp: video 1:44:00   Problematic changes:1:11

const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

// Gravity

const gravity = 0.7

class sprite {
    constructor({position,velocity, color= 'red', offset}) {
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,              // Attack width
            height: 50              // Attack height
        }
        this.color = color
        this.isAttacking
        this.health = 100
    }
    draw(){
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        // Attack Box
        if (this.isAttacking) {
        c.fillStyle = 'green'
        c.fillRect(
            this.attackBox.position.x, 
            this.attackBox.position.y, 
            this.attackBox.width, 
            this.attackBox.height
            )
     }
}


    
    

    update() {
        this.draw()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
         this.velocity.y = 0   
        } else this.velocity.y += gravity
    }

    attack () {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }
}

const player = new sprite({
    position: {
    x: 0,
    y: 0
    },
velocity: {
    x: 0,
    y: 0
},
offset: {
    x: 0, 
    y: 0
}
})


const enemy = new sprite({
    position: {
    x: 400,
    y: 100
    },
velocity: {
    x: 0,
    y: 0
},
color: 'blue',
offset: {
    x:-50,
    y: 0
 }
})


console.log(player);

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
    

}

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
        document.querySelector('#displayText').innerHTML = 'Player 1 Wins';
    } else if (player.health < enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Player 2 Wins';
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

decreaseTimer(); // Erster Aufruf der Funktion


function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0, canvas.width, canvas.height)
    player.update()
    enemy.update()
    
    player.velocity.x = 0
    enemy.velocity.x = 0

    // Player movement

    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5 //playerspeed
    } else if(keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5 //playerspeed
    }

    // Enemy movementDDD

    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5 //enemyrspeed
    } else if(keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5 //enemyspeed
    }

    // detect for collision
     if (
        reactangularCollison({
            rectangle1: player,
            reactangle2: enemy
        }) &&
        player.isAttacking
        ) {
            player.isAttacking = false
            enemy.health -= 2 
            document.querySelector('#enemyHealthbar').style.width = enemy.health + '%'
     }

     if (
        reactangularCollison({
            rectangle1: enemy,
            reactangle2: player
        }) &&
        enemy.isAttacking
        ) {
            enemy.isAttacking = false
            player.health -= 2 
            document.querySelector('#playerhealthbar').style.width = player.health + '%'
     }
     if (enemy.health <= 0 ||  player.health <= 0){
        determineWinner({player, enemy, timerId})
     }
}


animate()

window.addEventListener('keydown', (event) =>{
    switch(event.key) {
        case 'd':
        keys.d.pressed = true
        player.lastKey = 'd'
        break
        case 'a':
        keys.a.pressed = true
        player.lastKey = 'a'
        break
        case 'w':
        player.velocity.y = -20 //Jump
        break
        case ' ':
        player.attack()
        break
        case ' ':
        player.attack()
        break

        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
            case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
            case 'ArrowUp':
            enemy.velocity.y = -20 //Jump
            break
            case 'ArrowDown':
            enemy.attack()
            break
            case 'ArrowDown':
            enemy.attack()
            break
            
           
        
    }


})

window.addEventListener('keyup', (event) =>{
    switch(event.key) {
        case 'd':
        keys.d.pressed = false
        break
        case 'a':
        keys.a.pressed = false
        break
        case 'w':
        keys.w.pressed = false
        break

        // enemy Keys
        case 'ArrowRight':
        keys.ArrowRight.pressed = false
        break
        case 'ArrowLeft':
        keys.ArrowLeft.pressed = false
        break
        case 'w':
        keys.w.pressed = false
        break

    }


})
