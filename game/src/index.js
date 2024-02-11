//prettier-ignore
const $ = (selector,parent = document)=> parent.querySelector(selector);
const $$ = (selector,parent = document)=> parent.querySelectorAll(selector);
const random = (max,min = 0)=> min + Math.round(Math.random() * (max - min));


const colors = ['#ff0000','#ffff00','#ff8800',
                '#00ff00','#ff00ff','#00ffff',
                '#0000ff','#000000','#ffffff',
                '#ce00ff','#14930a','#0af89d'];


// const cards_box = document.querySelector('.cards-box');
const cards_box = $('.cards-box');
const picker_box = $('.picker-box');
let first_time = true;
let cards_num = 3;
let random_colors_arr = [];
let current_pick = 0;


start_game();

function start_game(){
  if(first_time){
    create_cards();
    create_color_picker();
    first_time = false;
  }
  random_colors_arr = set_random_colors(colors, cards_box, cards_num);
  setTimeout(()=>{
    hide_cards();
    set_focused_card(cards_box, current_pick);
  }, 2000);

  picker_box.addEventListener("click", on_user_guessed_color);
}
function create_cards(){
  for(let i = 0; i < cards_num; i++){
    cards_box.innerHTML += `<div class="card"> </div>`
  }
}
function create_color_picker(){
  for (let color of colors){
    picker_box.innerHTML += `<div class="picker" style="background-color:${color}" data-hex="${color}"></div>`
  }
}
function set_random_colors(colors, box, cards_num){
  const random_colors = [];
  while(random_colors.length < cards_num){
    const index = random(colors.length);
    const rand = colors[index];
    if(random_colors.includes(rand) === false){
      box.children[random_colors.length].style.backgroundColor = rand;
      random_colors.push(rand);
    } 
  }
  return random_colors;
}
function hide_cards(){
  for(let card of cards_box.children) {
    card.style.backgroundColor = '#ffffff';
  }
}
function set_focused_card(box,index){
  box.children[index].classList.add('marked-card');
  if(box.children[index] > 2) {
  }
}
function on_user_guessed_color(event){
  const t = event.target;
  if(t.classList.contains("picker")){
    const selectedColor = t.dataset.hex;
    // User selected the correct color!
    if(random_colors_arr[current_pick] === selectedColor){
      const isLastCard = current_pick >= (cards_num - 1);
      // Last card - restart game
      color_correct_card(cards_box, current_pick, selectedColor);
      if(isLastCard === true){
        notify_fail_win("Congrats! You won!\nPlay again?")
      } else {
        // not last card...
        cards_box.children[current_pick].classList.remove('marked-card');
        current_pick++;
        set_focused_card(cards_box, current_pick);
      }
    }else {
      // User selected the wrong color!
      notify_fail_win('Wrong color!\nPlay again?');
    }
  }
}
function color_correct_card(box, index, color){
  box.children[index].style.backgroundColor = color;
}
function notify_fail_win(msg){
  const tryAgain = confirm(msg);
  if(tryAgain === true){
    start_game();
    cards_box.children[current_pick].classList.remove('marked-card');
    current_pick = 0;
  }else {
    location.href = 'https://www.google.com';
  }
}