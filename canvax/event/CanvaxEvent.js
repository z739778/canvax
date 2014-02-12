/**
 * Canvax
 *
 * @author 释剑 (李涛, litao.lt@alibaba-inc.com)
 *
 * canvas 上委托的事件管理
 */


KISSY.add("canvax/event/CanvaxEvent" , function(S,EventBase,Base){
    var CanvaxEvent = function(type, bubbles, cancelable) {
        EventBase.call(this, type, bubbles, cancelable);

        this.mouseX = 0;
        this.mouseY = 0;
    }

    Base.creatClass(CanvaxEvent , EventBase , {
        toString : function() {
        return "[CanvaxEvent type=" + this.type + ", mouseX=" + this.mouseX + ", mouseY=" + this.mouseY + "]";
    }

    });

    CanvaxEvent.EVENTS = [
       "click" , "mousedown" , "mousemove" , "mouseup" , "mouseout"    
    ];

    var addOrRmoveEventHand = function( domHand , ieHand ){
        if( document[ domHand ] ){
            return function( el , type , fn ){
                if( el.length ){
                    for(var i=0 ; i < el.length ; i++){
                        arguments.callee( el[i] , type , fn );
                    }
                } else {
                    el[ domHand ]( type , fn , false );
                }
            };
        } else {
            return function( el , type , fn ){
                if( el.length ){
                    for(var i=0 ; i < el.length ; i++){
                        arguments.callee( el[i],type,fn );
                    }
                } else {
                    el[ ieHand ]( "on"+type , function(){
                        return fn.call( el , window.event );
                    });
                }
            };
        }
    }

    /*
     * 添加事件侦听
     */
    CanvaxEvent.addEvent    = addOrRmoveEventHand( "addEventListener" , "attachEvent" );
     /*
     * 删除事件侦听
     */
    CanvaxEvent.removeEvent = addOrRmoveEventHand( "removeEventListener" , "detachEvent" );


    return CanvaxEvent;

} , {
    requires : [
        "canvax/event/EventBase",
        "canvax/core/Base"
        ]
})

