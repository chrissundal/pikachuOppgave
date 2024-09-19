let showBag = '';
let randomAnimal = 0;
let showAnimalDiv = '';
let chanceOfSuccess = 0;
let gameText = '';
let isOpen = false;
let animalStorage = [];
let player = [
    {
        name: "Peter",
        health: 40,
        image: "IMG/peter.png",
        gear: "IMG/pokeball.png",
        level: 4
    }
]

let animals = [
    {
        name: "Bear",
        health: 80,
        image: "IMG/bjorn.png",
        level: 10
    },
    {
        name: "Tiger",
        health: 70,
        image: "IMG/tiger.png",
        level: 9
    },
    {
        name: "Leopard",
        health: 65,
        image: "IMG/leopard.png",
        level: 8
    },
    {
        name: "Wolf",
        health: 55,
        image: "IMG/ulv.png",
        level: 6
    },
    {
        name: "Horse",
        health: 35,
        image: "IMG/hest.png",
        level: 3
    },
    {
        name: "Squirrel",
        health: 15,
        image: "IMG/ekorn.png",
        level: 1
    },
    {
        name: "Lynx",
        health: 60,
        image: "IMG/lynx.png",
        level: 6
    },
    {
        name: "Rabbit",
        health: 20,
        image: "IMG/rabbit.png",
        level: 1
    },
    {
        name: "Badger",
        health: 70,
        image: "IMG/badger.png",
        level: 3
    },
    {
        name: "Icebear",
        health: 100,
        image: "IMG/icebear.png",
        level: 11
    },
    {
        name: "Rocket",
        health: 70,
        image: "IMG/rocket.png",
        level: 12
    },
    {
        name: "Dog",
        health: 35,
        image: "IMG/dog.png",
        level: 4
    }
]

updateView();
function updateView() {
    document.getElementById('app').innerHTML = /*HTML*/`
<div class="container">
    ${showAnimalDiv}
    <div class="bottomScreen">
        <div class="player">
            <img src="${player[0].gear}" height = 50px class="pokeball"/>
            <img src="${player[0].image}" class="peter"/>
            <div class="playerStats">${player[0].name} <br> lvl: ${player[0].level} <br> HP: ${player[0].health}</div>
        </div>
        <div class="buttonContainer">
            <button onclick="catchAnimal()">Fang</button>
            <button onclick="newAnimal()">Finn en annen</button>
            ${createDropdown()}
        </div>
        <div>${showBag}</div>
        <div>${gameText}</div>
    </div>
</div>
    `;
    if (player[0].health < 0 || player[0].level < 0) {
        showAnimalDiv = `
        <div class="motstander">
            usj det var leit, der døde du visst
            </div>`;
        gameOver();
    }
    if (animals.length <= 0) {
        showAnimalDiv = `
            <div class="motstander">
                usj det var leit, alle er borte
                </div>`;
        gameOver();
    }
    if (player[0].health >= 100) {
        player[0].health = 100;
    }

}
function createDropdown() {
    if (isOpen == false) return `<button onclick="openAnimalBag()">Vis dine dyr</button>`;
    return `
        <div class="openBag">
            ${createInnerBag()}   
            </div>
            <button class="closeanimal" onclick="closeAnimalBag()">lukk bag</button>
        `;
}


function createInnerBag() {
    let html = '';
    for (let index = 0; index < animalStorage.length; index++) {
        html += `
        <div class="innerCart">
            <div>${animalStorage[index].name} <br> lvl: ${animalStorage[index].level} <br> HP: ${animalStorage[index].health}</div>
            <img src="${animalStorage[index].image}" width= 50px height = 40px/>
            <button class="delBtn" onclick="deleteAnimal(${index})">X</button>
        </div>
        `;
    }
    return html;
}

function newAnimal() {
    showAnimalDiv = '';
    gameText = '';
    randomAnimal = Math.floor(Math.random() * animals.length)
    if (animals.length > 0) {
        showAnimalDiv = `<div class="motstander">
        <div>${animals[randomAnimal].name} <br> lvl: ${animals[randomAnimal].level} <br> HP: ${animals[randomAnimal].health}</div>
        <div class="animalImg">
            <img src="${animals[randomAnimal].image}" width= 500px height = 400px/>
            </div>
            </div>`;
    }
    updateView();
}
function catchAnimal() {
    chanceOfSuccess = player[0].level / animals[randomAnimal].level;
    if (Math.random() < chanceOfSuccess) {
        player[0].health += 10;
        gameText = '';
        player[0].level += 1;
        animalStorage.push(animals[randomAnimal])
        animals.splice(randomAnimal, 1)
    } else {
        player[0].level -= 1;
        player[0].health -= 10;
        animals[randomAnimal].level += 1
    }
    console.log(chanceOfSuccess)
    updateView();
    newAnimal();
}
function deleteAnimal(index) {
    animalStorage.splice(index, 1)
    updateView();

}
function openAnimalBag() {
    isOpen = true;
    updateView();
}
function closeAnimalBag() {
    isOpen = false;
    updateView();
}
function gameOver() {
    isOpen = false;
    gameText = `
            <div class="gameover">Game Over<div>
            <button class="startBtn" onclick="location.reload()">Restart</button>
            `;
    animalStorage = []
    updateView();
}
function startGame() {
    gameText = `
            <div class="gameover">Klar for fight?<div>
            <button class="startBtn" onclick="newAnimal()">Start</button>
            `;
    updateView();
}