describe('Array', function(){

  describe('Проверка .Frame()', function(){
    it('Проверка на страйк', function(){
      let a = new Frame()
        a.push(10)

      expect(a.is_strike()).to.equal(true);
      expect(a.is_spare()).to.equal(false);
      expect(a.score()).to.equal(10);
      })


    it('Проверка на Cпер', function(){
      let a = new Frame()
        a.push(1)
        a.push(9)

      expect(a.is_strike()).to.equal(false);
      expect(a.is_spare()).to.equal(true);
      expect(a.score()).to.equal(10);
      })

    it('Проверка сложения очков', function(){
      let a = new Frame()
        a.push(1)
        a.push(4)

      expect(a.is_strike()).to.equal(false);
      expect(a.is_spare()).to.equal(false);
      expect(a.score()).to.equal(5);
      })


    it('Проверка на недопустимость переполнения массива фрейма (максимум два числа)', function(){
      let a = new Frame()
        a.push(1)
        a.push(4)
        a.push(4)

      expect(a.is_strike()).to.equal(false);
      expect(a.is_spare()).to.equal(false);
      expect(a.score()).to.equal(5);
      })

    })


  describe('Проверка .Game()', function(){
    it('Проверка на случай из описания (168 очков)', function(){
      const game = new BowlingGame();
        game.roll(10);
        game.roll(7);
        game.roll(3);
        game.roll(7);
        game.roll(2);
        game.roll(9);
        game.roll(1);
        game.roll(10);
        game.roll(10);
        game.roll(10);
        game.roll(2);
        game.roll(3);
        game.roll(6);
        game.roll(4);
        game.roll(7);
        game.roll(3);
        game.roll(3);
        game.roll(10);
        game.roll(10);


      expect(game.calculate_score()).to.equal(168);
      })


    it('Проверка на случай из описания с учетом последнего страйка (174 очка)', function(){
      const game = new BowlingGame();
        game.roll(10);
        game.roll(7);
        game.roll(3);
        game.roll(7);
        game.roll(2);
        game.roll(9);
        game.roll(1);
        game.roll(10);
        game.roll(10);
        game.roll(10);
        game.roll(2);
        game.roll(3);
        game.roll(6);
        game.roll(4);
        game.roll(10);
        game.roll(3);
        game.roll(3);
        game.roll(10);
        game.roll(10);

      expect(game.calculate_score()).to.equal(174);
      })



    it('Проверка на безупречную игру (300 очков)', function(){
      const game = new BowlingGame();
        game.roll(10);
        game.roll(10);
        game.roll(10);
        game.roll(10);
        game.roll(10);
        game.roll(10);
        game.roll(10);
        game.roll(10);
        game.roll(10);
        game.roll(10);
        game.roll(10);
        game.roll(10);
        game.roll(10);
        game.roll(2);
        game.roll(3);
        game.roll(6);
        game.roll(4);
        game.roll(10);
        game.roll(3);
        game.roll(3);
        game.roll(10);
        game.roll(10);


      expect(game.calculate_score()).to.equal(300);
      })



      /*it('Просто по приколу бахнул (Интересно було будет крестик или нет(тест 300 очков equal(299)))', function(){
      const game = new BowlingGame();
        game.roll(10);
        game.roll(10);
        expect(game.calculate_score()).to.equal(299);})
        */


      it('Проверка на безупречную игру 3 фреймов (60 очков)', function(){
      const game = new BowlingGame();
        game.roll(10);
        game.roll(10);
        game.roll(10);



      expect(game.calculate_score()).to.equal(60);
      })


      it('Проверка на 4 фреймов [[10],[6,4],[10],[6]](62 очкf)', function(){
      const game = new BowlingGame();
        game.roll(10);
        game.roll(6);
        game.roll(4);
        game.roll(10);
        game.roll(6);



      expect(game.calculate_score()).to.equal(62);
      })
      
      it('Проверка на 4 фреймов [[10],[6,4],[10],[6, 4]](70 очкoff)', function(){
      const game = new BowlingGame();
        game.roll(10);
        game.roll(6);
        game.roll(4);
        game.roll(10);
        game.roll(6);
        game.roll(4);



      expect(game.calculate_score()).to.equal(70);
      })

    it('Проверка на недопустимость [[10],[6,4],[10],[6, 6]] должно откатиться до 62 очков и [[10],[6,4],[10],[6]]', function(){
      const game = new BowlingGame();
        game.roll(10);
        game.roll(6);
        game.roll(4);
        game.roll(10);
        game.roll(6);
        game.roll(6);



      expect(game.calculate_score()).to.equal(62);
      })

    it('Проверка на недопустимость [[10],[6,4],[10],[6, 6], [3]] должно откатиться до 62 очков и добавить 3 [[10],[6,4],[10],[6,3]] итого очков 68', function(){
      const game = new BowlingGame();
        game.roll(10);
        game.roll(6);
        game.roll(4);
        game.roll(10);
        game.roll(6);
        game.roll(6);
        game.roll(3);



      expect(game.calculate_score()).to.equal(68);
      })

      
    })

})
  