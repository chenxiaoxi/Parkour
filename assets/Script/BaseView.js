// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
cc.Class({
    extends: cc.Component,

    properties: {
        m_Hero:cc.Animation,
        m_BtRoll:cc.Button,
        m_Back1:[cc.Node],
        m_Back2:[cc.Node],
        m_Back3:[cc.Node],
        m_Back4:[cc.Node],
        m_Back5:[cc.Node],
        m_Floor1:[cc.Node]
    },

    // LIFE-CYCLE CALLBACKS:

     // 第一次进入游戏，控件创建产生后会调用的函数
    onLoad () {
        this.myHeroPlay('Run');
        // 节点绑定事件
        this.m_BtRoll.node.on(cc.Node.EventType.TOUCH_START,this.touchStart,this);
        this.m_BtRoll.node.on(cc.Node.EventType.TOUCH_END,this.touchEnd,this);
        this.m_BtRoll.node.on(cc.Node.EventType.TOUCH_CANCEL,this.touchEnd,this);
       
        // 第一层背景图移动
    var BackNode = [this.m_Back1,this.m_Back2,this.m_Back3,this.m_Back4,this.m_Back5,this.m_Floor1];
    var moveTime = [BackMoveTime1,BackMoveTime2,BackMoveTime3,BackMoveTime4,BackMoveTime5,FloorMoveTime1];
    for(var j=0;j<BackNode.length;j++){
        for(var i = 0;i<BackNode[j].length;i++){
            var bgWidth = BackNode[j][i].width-3;
            BackNode[j][i].setPosition(i*bgWidth,0);
            var move = cc.moveTo(i*moveTime[j]+moveTime[j],cc.v2(-bgWidth,0));
            var seq = cc.sequence(move,cc.callFunc(this.BackMoveEnd,this,moveTime[j]));
            BackNode[j][i].runAction(seq)
    }
    }
  
    //     // 背景树移动
    //     for(var i = 0;i<this.m_Back2.length;i++){
    //     var bgWidth = this.m_Back2[i].width-3;
    //     this.m_Back2[i].setPosition(i*bgWidth,0);
    //     var move = cc.moveTo(i*BackMoveTime2+BackMoveTime2,cc.v2(-bgWidth,0));
    //     var seq = cc.sequence(move,cc.callFunc(this.BackMoveEnd,this,BackMoveTime2));
    //     this.m_Back2[i].runAction(seq)    
    // }
        // 背景浪移动
    //     for(var i = 0;i<this.m_Back3.length;i++){
    //     var bgWidth = this.m_Back3[i].width-3;
    //     this.m_Back3[i].setPosition(i*bgWidth,0);
    //     var move = cc.moveTo(i*BackMoveTime3+BackMoveTime3,cc.v2(-bgWidth,0));
    //     var seq = cc.sequence(move,cc.callFunc(this.BackMoveEnd,this,BackMoveTime3));
    //     this.m_Back3[i].runAction(seq);
    // }

    },
    
     // 第一背景图移动结束后的回调
    BackMoveEnd (target,data) {
        var BgWidth = target.width -3;
        target.setPosition(BgWidth,0);
        var move = cc.moveTo(data*2,cc.v2(-BgWidth,0));
        var sqr = cc.sequence(move,cc.callFunc(this.BackMoveEnd,this,data))
        target.runAction(sqr);
    },
    // 按下滑铲时，播放动画Roll
    touchStart(){
        cc.log()
        if(this.m_Hero.currentClip.name == 'Jump'){
            return;
        }
        this.myHeroPlay('Roll')
    },
     // 松开滑铲时，播放动画Run
    touchEnd(){
        if(this.m_Hero.currentClip.name == 'Jump'){
            return;
        }
        this.myHeroPlay('Run')
    },

    // 人物跳起落地后的回调
   callBackDownOver(){
    this.myHeroPlay('Run')
   },
//    人物调用的总执行函数
   myHeroPlay(playName){
    if(this.isChangeClip(playName) == false){
        return;
    }
    if(playName == 'Roll'){
        this.m_Hero.node.setPosition(cc.v2(-63,-57.5))
    }else if (playName == 'Run'){
        this.m_Hero.node.setPosition(cc.v2(-63,-50))
    }
    this.m_Hero.play(playName)
   },

//    人物跳起后的位移帧
    onAnimationChang(target,data){
        if(data == 'Jump' && this.isChangeClip('Jump')){
            var moveUp = cc.moveTo(0.5,-63,-10).easing(cc.easeCubicActionOut());
            var moveDown = cc.moveTo(0.5,-63,-50).easing(cc.easeCubicActionIn());
            var callBakcFun = cc.callFunc(this.callBackDownOver,this);
            var sqe = cc.sequence(moveUp,moveDown,callBakcFun);
            this.m_Hero.node.runAction(sqe);
        }
        this.myHeroPlay(data);
    },

    // 解决2个动作同时执行bug
    isChangeClip (playName){
        // 判断滑铲
        if(playName == 'Roll'){
            // 如果是跳跃，返回false
            if(this.m_Hero.currentClip.name =='Jump'){
                return false
            }else if(this.m_Hero.currentClip.name =='Run'){
                return true                
            }
            // 判断跳跃
        }else if(playName == 'Jump'){
            // 如果是跑步，返回true
            if(this.m_Hero.currentClip.name == 'Run'){
                return true;
            }else{
                return false;
            }
        }
        return true;
    }
    // start () {
    //     cc.log('hello,world')
    // },

    // update (dt) {},
});
