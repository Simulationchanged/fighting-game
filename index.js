const canvas = document.querySelector('canvas');   //Last stamp: video 2:31:00   Problematic changes:1:11

const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

// Gravity

const gravity = 0.7

const background =  new sprite({
position: {
    x: 0,
    y: 0
    },
    imageSrc: './img/background.png'    
})
const shop =  new sprite({
    position: {
        x: 600,
        y: 128
        },
        imageSrc: './img/shop.png',
        scale: 2.75 ,
        framesMax: 6  
    })
const player = new Fighter({
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
},
imageSrc: './img/samuraiMack/Idle.png',
framesMax: 8,
scale: 2.5,
offset: {
    x: 215,
    y: 157
},
sprites: {
    idle: {
        imageSrc: './img/samuraiMack/Idle.png',
        framesMax: 8
    },
    run: {
        imageSrc: './img/samuraiMack/Run.png',
        framesMax: 8
    },
    jump: {
        imageSrc: './img/samuraiMack/Jump.png',
        framesMax: 2
    }
}
})


const enemy = new Fighter({
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

decreaseTimer(); // Erster Aufruf der Funktion


function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0, canvas.width, canvas.height)
    background.update()
    shop.update()
    player.update()
    // enemy.update()
    
    player.velocity.x = 0
    enemy.velocity.x = 0

    // Player movement
    player.switchSprite('idle') //default image/ stehender Samurai
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5 //playerspeed
        player.switchSprite('run') //move to left/ running left
    } else if(keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5 //playerspeed
        player.switchSprite('run')
    }
    if(player.velocity.y < 0){
        player.switchSprite('jump')
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
