let xp = 0;
let health = 100;
let gold = 50;//semicolen is optional
let currentWeapon = 0;/*you can use var,let or const to create a
variable. const is used if the value of the variable does not
change*/
let fighting;
let monterhealth;
let inventory=["stick"];/*you can also use '' to store a string
we have created an array by adding [] marks*/
/*Inorder to update elements in your html page you web page
you need to add reference of it in your html code inorder to
do this we do eg: let el=document.querySelector("#el")
el is the id of the element, var variable is open to alot of
changes but can bring in bugs because of it so we use let*/
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons=[
  {
    name:"stick",
    power:5
  },
  {
    name:"dagger",
    power:30
  },
  {
    name:"claw hammer",
    power:50
  },
  {
    name:"sword",
    power:100
  }
];
const monsters=[
  {
    name:"slime",
    level:2,
    health:15
  },
  {
    name:"fanged beast",
    level:8,
    health:60
  },
  {
    name:"dragon",
    level:20,
    health:300
  }
];
const locations=[
  {
    name: "town square",
    "button text":["Go to store","Go to cave","Fight dragon"],
    "button functions":[goStore,goCave,fightDragon],
    text:'You are in the town square.You see a sign that says "store"'
  },
  {
    name: "store",
    "button text":["Buy 10 health (10 gold)","Buy weapon(30 gold)","Go to town square."],
    "button functions":[buyHealth,buyWeapon,goTown],
    text:'You entered the store.'
  },
  {
    name: "cave",
    "button text":["Fight slime","Fight fanged beast","Go to town square."],
    "button functions":[fightSlime,fightBeast,goTown],
    text:'You entered the cave.You can see some monsters infront of you.'
  },
  {
    name: "fight",
    "button text":["Attack","Dodge","Run"],
    "button functions":[attack,dodge,goTown],
    text:'You are fighting a monster'
  },
  {
    name: "kill monster",
    "button text":["Go to town square.","Go to town square.","Go to town square."],
    "button functions":[goTown,goTown,easterEgg],
    text:'The monster screams "Arg!" as it dies. You gain experience points and find gold'
  },
  {
    name: "lose",
    "button text":["REPLAY?","REPLAY?","REPLAY?"],
    "button functions":[restart,restart,restart],
    text:'You die'
  },
  {
		name: "win",
		"button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
		"button functions": [restart, restart, restart],
		text: "You defeat the dragon! YOU WIN THE GAME! 🎉"
  },
  {
		name: "easter egg",
		"button text": ["2", "8", "Go to town square?"],
		"button functions": [pickTwo, pickEight, goTown],
		text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
	}
] 
/*we added an empty object using {} inthe array in this name,
button text,button functions and text are keys. Keys with
two or more words must be in ""*/
//initialize buttons
/*button.onclick=openProgram; now we are assigning a function 
openProgram to the button when it is clicked once,be sure to
create the function*/
button1.onclick = goStore;//calling func. goStore
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location){
  monsterStats.style.display="none";
  button1.innerText=location["button text"][0];
  button2.innerText=location["button text"][1];
  button3.innerText=location["button text"][2];
  text.innerText=location.text;
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
}
/*we wrote the update fumction because there were multiple functions doing the same
jods so we created the update function*/
function goTown(){
  /*button1.innerText="Go to store";
  button2.innerText="Go to cave";
  button3.innerText="Fight dragon";
  text.innerText='You are in the town square.You see a sign that says "store"';
  button1.onclick = goStore;
  button2.onclick = goCave;
  button3.onclick = fightDragon;*/
  update(locations[0]);
}
function goStore(){
  /*button1.innerText="Buy 10 health (10 gold)";
  //doing this we change the text on the button
  button2.innerText="Buy weapon(30 gold)";
  button3.innerText="Go to town square.";
  text.innerText='You entered the store.';
  button1.onclick = buyHealth;//calling func. goStore
  button2.onclick = buyWeapon;
  button3.onclick = goTown;
  //console.log("Going to store.")
  /*it prints in the console the msg within ""*/
  update(locations[1]);
  
}
function goCave(){
  //console.log("Going to cave.")
  /*it prints in the console the msg within ""*/
  update(locations[2]);
}
function buyHealth(){
  if(gold >= 10)
  {
    gold = gold - 10;
    health = health + 10;
    goldText.innerText=gold;
    healthText.innerText=health;
    text.innerText="You bought 10 health";
  }
  else
  {
    text.innerText="You do not have enough gold";
  }
}
function buyWeapon(){
  if(currentWeapon <3)
  {
    if(gold>=30)
    {
      gold=gold-30;
      goldText.innerText=gold;
      currentWeapon +=1;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText="You now have a "+newWeapon+".";
      inventory.push(newWeapon);
      text.innerText +=" In your inventory you have: "+ inventory;
    }
    else
    {
      text.innerText="You do not have enough gold to buy a weapon";
      button2.innerText="Sell weapon for 15 gold";
      button2.onclick=sellWeapon;
    }
  }
  else
  {
    text.innerText="You already have the most powerful weapon!";
    button2.innerText="Sell weapon for 15 gold";
    button2.onclick=sellWeapon;
  }
}
function sellWeapon(){
  if(inventory.length > 1){
    gold += 15;
    if(gold >= 30)
    {
      button2.innerText="Buy weapon(30 gold)";
      button2.onclick=buyWeapon;
    }
    goldText.innerText=gold;
    let currentWeapon = inventory.shift();
    //shift removes the first element of the array and returns it back in the same way you can use inventory.pop()
    text.innerText="You sold a "+ currentWeapon + ".";
    text.innerText +=" In your inventory you have: "+ inventory;
  }
  else
  {
    text.innerText="Don't sell your only weapon";
  }
}
function fightSlime(){
  fighting=0;
  goFight();
}
function fightBeast(){
  fighting=1;
  goFight();
}
function fightDragon(){
  //console.log("Fighting Dragon.")
  /*it prints in the console the msg within ""*/
  fighting=2;
  goFight();
}
function goFight(){
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  //monsterNameText.innertext=monsters[fighting].name;
  //monsterHealthText.innertext=monsterHealth;
  monsterStats.style.display ="block";
  /*here we changed the css style of the element
  general way element.style.display=""*/
  monsterNameText.innerText=monsters[fighting].name;
  monsterHealthText.innerText=monsterHealth;
}
function attack(){
  text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
    
    if (isMonsterHit()) {
        health -= getMonsterAttackValue(monsters[fighting].level);
    } else {
		text.innerText += " You miss.";
	}
    
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
	healthText.innerText = health;
	monsterHealthText.innerText = monsterHealth;   
	if (health <= 0) {
		lose();
	} else if (monsterHealth <= 0) {
		fighting === 2 ? winGame() : defeatMonster();
	}

	if (Math.random() <= .1 && inventory.length !== 1) {
        text.innerText += " Your " + inventory.pop() + " breaks.";
        currentWeapon--;
	}
}
function getMonsterAttackValue(level){
  let hit=(level*5)-(Math.floor(Math.random()*xp));
  console.log(hit);
  return hit;
}
function isMonsterHit() {
	return Math.random() > .2 || health < 20;
}
function dodge(){
  text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";
}
function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7)
    xp += monsters[fighting].level;
    goldText.innerText = gold;
	  xpText.innerText = xp;
    update(locations[4]);
}
function lose(){
  update(locations[5]);
}
function winGame(){
  update(locations[6]);
}
function restart(){
  xp = 0;
	health = 100;
	gold = 50;
	currentWeapon = 0;
	inventory = ["stick"];
	goldText.innerText = gold;
	healthText.innerText = health;
	xpText.innerText = xp;
	goTown();
}
function winGame(){
  update(locations[6]);
}
function easterEgg(){
  update(locations[7]);
}
function pickTwo(){
  pick(2);
}
function pickEight(){
  pick(8);
}
function pick(guess) {
    let numbers = [];
    while (numbers.length < 10) {
        numbers.push(Math.floor(Math.random() *11));
    }
  text.innerText="You picked "+ guess+". Here are the random numbers :\n";
  for (let i = 0; i < 10; i++) {
        text.innerText += numbers[i] + "\n";
    }
  if (numbers.indexOf(guess) !== -1) {
        text.innerText += "Right! You win 20 gold!"
        gold += 20;
        goldText.innerText = gold;
    } else {
        text.innerText += "Wrong! You lose 10 health!"
        health -= 10;
        healthText.innerText = health
        if (health <= 0) {
          lose();
        }
    }
}