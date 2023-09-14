class Frame {
  constructor() {
    this.rolls = [];
  }

  check(goal){

    let score = this.score()

    if (score < 10 && this.rolls.length < 2 && score + goal <= 10){return true}
    else{
      //console.log('Параметры не прошли проверку')
    }


  }

  push(goal) {
    if (this.check(goal)){
    this.rolls.push(goal);
  }
  }

  is_strike() {
    return this.rolls.length === 1 && this.rolls[0] === 10;
  }

  is_spare() {
    return this.rolls.length === 2 && this.rolls[0] + this.rolls[1] === 10;
  }

  score() {
    let sum = 0;
    this.rolls.forEach(function (element) {
      sum += element;
    });

    return sum;
  }
}

class BowlingGame {
  constructor() {
    this.frames = [];
    this.currentFrame = new Frame();
    this.frames.push(this.currentFrame);
    this.maxFrames = 10; // Максимальное количество фреймов
    this.extra_bonus1 = NaN
    this.extra_bonus2 = NaN
  }

  print(){
    this.frames.forEach(function(item) {
    console.log(item);
});
  }

  roll(pins){ //Записать результат удара

    if (this.frames.length === this.maxFrames && (this.currentFrame.is_strike() || this.currentFrame.is_spare())){
        if (isNaN(this.extra_bonus1)){this.extra_bonus1 = pins}
        else if (!isNaN(this.extra_bonus1) && this.currentFrame.is_strike() &&isNaN(this.extra_bonus2)){this.extra_bonus2 = pins}
        else {
            /*console.log("Game over!")*/
            return;
        }
        
        
    }

    else{

    if (this.frames.length === this.maxFrames && !this.currentFrame.is_strike() && this.currentFrame.rolls.length === 2) {
      /*console.log("Game over!");*/
      return;
    }

    if (this.currentFrame.rolls.length === 2 || this.currentFrame.is_strike()) {
      this.currentFrame = new Frame();
      this.frames.push(this.currentFrame);
    }

    this.currentFrame.push(pins);
  }
  }


  calculate_bonuses(){ //Отвечает за вне фреймовые броски, если последний был спеар или страйк 
    let sum = 0
    if (this.frames.length === this.maxFrames){
    if (!isNaN(this.extra_bonus1)){sum +=this.extra_bonus1}
    if (this.frames[this.maxFrames - 2].is_strike()){sum +=this.extra_bonus1}
    if (!isNaN(this.extra_bonus2)){sum +=this.extra_bonus2}}
    return sum
  }

  calculate_score() { //подсчитать очки

    let totalScore = 0;

    for (let i = 0; i < this.frames.length; i++) {

      let frame = this.frames[i];
      totalScore += frame.score();

      if (frame.is_strike() && (i + 2 >= this.frames.length || i + 1 != this.maxFrames)) {
        const nextFrame = this.frames[i + 1];
        if (nextFrame) {
          totalScore += nextFrame.rolls[0];

          if (nextFrame.is_strike() && (i + 3 >= this.frames.length || i + 1 != this.maxFrames)) {
            const nextNextFrame = this.frames[i + 2];
            if (nextNextFrame) {
              totalScore += nextNextFrame.rolls[0];
            }
          } else {
            if (nextFrame.rolls.length === 2){totalScore += nextFrame.rolls[1];}
            
          }
        }
      } else if (frame.is_spare() && (i + 2 >= this.frames.length || i + 1 != this.maxFrames)) {
        const nextFrame = this.frames[i + 1];
        if (nextFrame) {
          totalScore += nextFrame.rolls[0];
        }

      }
    }



    return totalScore + this.calculate_bonuses();
  }
}

