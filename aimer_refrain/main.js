enchant();

var rand = function(num){
    //用來生成亂數的函式碼
    return Math.floor(Math.random()*num);
};

// Here we build a class from scratch to create the bear
Aimer = Class.create(Sprite, // We extend the Sprite class
{
    initialize: function(x, y) { //initialization
        Sprite.call(this, 32, 32); //initialization of the Sprite object
        this.image = game.assets['aimer_refrain.png'];
        this.x = x;
        this.y = y;
       // this.frame = 0;
        game.rootScene.addChild(this);
    },
    //define the ontouchend event listener (when the user lifts finger/finishes clicking on the bear)
    ontouchmove: function(e) {
        //this.frame += 3; //switch to frame of crying bear
        this.x=e.x-16;
    }
    
});

// Here we build a class from scratch to create the bear
Umbrella = Class.create(Sprite, // We extend the Sprite class
{
    initialize: function() { //initialization
        Sprite.call(this, 32, 32); //initialization of the Sprite object
        this.image = game.assets['umbrella.png'];
        this.x = rand(320);
        this.y = -32;
        //this.frame = 0;
        this.speed = rand(4)+3;
        game.rootScene.addChild(this);
    },
    //define the onenterframe eventlistener (run every frame)
    onenterframe: function() {
        this.y += this.speed;
        
        if(this.y>332){
            this.remove();
            game.score+=10; //加10分
            scoreLabel.text = "SCORE : " + game.score; //顯示目前分數
        }
        
        //相交------------------------------
        if (this.intersect(aimer)){
            this.remove(); //移除雨傘
            game.life-=10; //減10命
            lifeLabel.text = "LIFE : " + game.life; //顯示目前分數
            
            //遊戲結束
            if(game.life<=0){
                game.life=0;
                lifeLabel.text = "LIFE : " + game.life;
                game.end(game.score,"Your score is " + game.score);
            }            
        }
        //-------------------------------------------
    }
});

window.onload = function() {
    game = new Game(320, 320);
    game.score = 0; //遊戲分數一開始設定是 0
    game.life = 221;
    game.preload('aimer_refrain.png','umbrella.png');
    
    //分數
    scoreLabel = new Label("SCORE : " + game.score);
    scoreLabel.x = 10;
    scoreLabel.y = 5;
    scoreLabel.color = "white";
    scoreLabel.font = "18px 'Pangolin'";
    game.rootScene.addChild(scoreLabel);
    
    //生命
    lifeLabel = new Label("LIFE : " + game.life);
    lifeLabel.x = 10;
    lifeLabel.y = 30;
    lifeLabel.color = "white";
    lifeLabel.font = "18px 'Pangolin'";
    game.rootScene.addChild(lifeLabel);
    
    game.onload = function() {
        game.rootScene.backgroundColor = "#E1B1C4"; //底色       
        aimer = new Aimer(160-16, 320-32);
        
        game.rootScene.addEventListener('enterframe',function(){
            if(rand(100)%5===3){
                var umbrella = new Umbrella();
            }
        });
    }
    game.start();
}