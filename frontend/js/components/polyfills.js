module.exports = (function() {

    var lastTime = 0;

    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }


    // Fix the console in IE8.
    if (typeof console === 'undefined') {
        console = {};
        console.log = function(){

        };
    }

    // Add function binding to unsupported browsers
    if (!Function.prototype.bind) {
        Function.prototype.bind = function (oThis) {
            if (typeof this !== "function") {
                // closest thing possible to the ECMAScript 5 internal IsCallable function
                throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            }

            var aArgs = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                fNOP = function () {},
                fBound = function () {
                    return fToBind.apply(this instanceof fNOP && oThis
                        ? this
                        : oThis,
                        aArgs.concat(Array.prototype.slice.call(arguments)));
                };

            fNOP.prototype = this.prototype;
            fBound.prototype = new fNOP();

            return fBound;
        };
    }


    // Add eventlisteners to IE8

    (function() {
        if (!Event.prototype.preventDefault) {
            Event.prototype.preventDefault=function() {
                this.returnValue=false;
            };
        }
        if (!Event.prototype.stopPropagation) {
            Event.prototype.stopPropagation=function() {
                this.cancelBubble=true;
            };
        }
        if (!Element.prototype.addEventListener) {
            var eventListeners=[];

            var addEventListener=function(type,listener /*, useCapture (will be ignored) */) {
                var self=this;
                var wrapper=function(e) {
                    e.target=e.srcElement;
                    e.currentTarget=self;
                    if (listener.handleEvent) {
                        listener.handleEvent(e);
                    } else {
                        listener.call(self,e);
                    }
                };
                if (type=="DOMContentLoaded") {
                    var wrapper2=function(e) {
                        if (document.readyState=="complete") {
                            wrapper(e);
                        }
                    };
                    document.attachEvent("onreadystatechange",wrapper2);
                    eventListeners.push({object:this,type:type,listener:listener,wrapper:wrapper2});

                    if (document.readyState=="complete") {
                        var e=new Event();
                        e.srcElement=window;
                        wrapper2(e);
                    }
                } else {
                    this.attachEvent("on"+type,wrapper);
                    eventListeners.push({object:this,type:type,listener:listener,wrapper:wrapper});
                }
            };
            var removeEventListener=function(type,listener /*, useCapture (will be ignored) */) {
                var counter=0;
                while (counter<eventListeners.length) {
                    var eventListener=eventListeners[counter];
                    if (eventListener.object==this && eventListener.type==type && eventListener.listener==listener) {
                        if (type=="DOMContentLoaded") {
                            this.detachEvent("onreadystatechange",eventListener.wrapper);
                        } else {
                            this.detachEvent("on"+type,eventListener.wrapper);
                        }
                        break;
                    }
                    ++counter;
                }
            };
            Element.prototype.addEventListener=addEventListener;
            Element.prototype.removeEventListener=removeEventListener;
            if (HTMLDocument) {
                HTMLDocument.prototype.addEventListener=addEventListener;
                HTMLDocument.prototype.removeEventListener=removeEventListener;
            }
            if (Window) {
                Window.prototype.addEventListener=addEventListener;
                Window.prototype.removeEventListener=removeEventListener;
            }
        }
    })();


    /**
     * Animation events lookup
     */
    (function() {
        var animationEvent;
        var animation = false,
            animationstring = 'animation',
            keyframeprefix = '',
            domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
            pfx  = '';

        var el = document.createElement('fakeelement');

        if ( el.style.animationName !== undefined ) { animation = true; }

        if( animation === false ) {
            for( var i = 0; i < domPrefixes.length; i++ ) {
                if( el.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
                    pfx = domPrefixes[ i ];
                    animationstring = pfx + 'Animation';
                    keyframeprefix = '-' + pfx.toLowerCase() + '-';
                    animation = true;
                    break;
                }
            }
        }


        function whichTransitionEvent(){
            var t;

            var transitions = {
                'transition':'transitionend',
                'OTransition':'oTransitionEnd',
                'MozTransition':'transitionend',
                'WebkitTransition':'webkitTransitionEnd'
            };

            for(t in transitions){
                if( el.style[t] !== undefined ){
                    return transitions[t];
                }
            }
        }


        function whichAnimationEvent(){
            var t;

            var animations = {
                'animation':'animationend',
                'OAnimation':'oAnimationEnd',
                'MozAnimation':'animationend',
                'WebkitAnimation':'webkitAnimationEnd'
            };

            for(t in animations){
                if( el.style[t] !== undefined ){
                    return animations[t];
                }
            }
        }

        if (animation) {
            window.animation = {
                string: animationstring,
                animationEnd: whichAnimationEvent(),
                transitionEnd: whichTransitionEvent()
            };
        } else {
            window.animation = false;
        }

    })();


})();