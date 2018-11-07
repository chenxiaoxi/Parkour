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
        m_Hero:cc.Animation
    },

    // LIFE-CYCLE CALLBACKS:

     // 第一次进入游戏，控件创建产生后会调用的函数
    onLoad () {
      
    },
   
    onAnimationChang(target,data){
        cc.log('onAnimationChang:'+data)
        this.m_Hero.play(data)
    }

    // start () {
    //     cc.log('hello,world')
    // },

    // update (dt) {},
});
