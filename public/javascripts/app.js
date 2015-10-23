
'use strict';

var regexIso8601 = /^(\d{4}|\+\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})\.(\d{1,})(Z|([\-+])(\d{2}):(\d{2}))?)?)?)?$/;

function convertDateStringsToDates(input) {
    // Ignore things that aren't objects.
    if (typeof input !== "object") return input;    

    for (var key in input) {
        if (!input.hasOwnProperty(key)) continue;


        var value = input[key];
        var match;
        // Check for string properties which look like dates.
        if (typeof value === "string" && (match = value.match(regexIso8601))) {
            var milliseconds = Date.parse(match[0])
            if (!isNaN(milliseconds)) {
                input[key] = new Date(milliseconds);
            }
        } else if (typeof value === "object") {
            // Recurse into object
            convertDateStringsToDates(value);
        }
   }
}



window.onload = function()
{
    var el = document.querySelector('.scroll-container');    
    var handle = document.querySelector('.handle');
    var mainMenu = document.querySelector('#main-menu');
    var items = mainMenu.querySelectorAll('li')

    var pageSize = 4;
    var totalStep = items.length - pageSize;
    var scrollSize = el.offsetWidth - handle.offsetWidth;
    var itemSize = items[0].offsetWidth;
    var totalSize = items.length * itemSize;    
    var scrollPortion = (scrollSize / (totalStep * itemSize)) *  itemSize;
    console.log('scrollPortion ' + scrollPortion); 
    var _dragStart = false;
    var _touchStart = false;
    var _touchStartX = 0;
    var touchEndX = 0;
    var forward = 1;
    var currentStep = 0;

    Object.defineProperty(this, 'dragStart', 
        {
            get : function() { return _dragStart; },
            set : function(value) {
                _dragStart = value;
            }
        }
     );

    handle.addEventListener("transitionend", move);
    mainMenu.addEventListener("transitionend", reset);

    //number of steps to slide
    function slide(step)
    {
        if(currentStep + step < 0 || currentStep + step > totalStep)
        {        
            console.log("can't walk");
            reset();
            return;
        }

        currentStep = currentStep + step; 
        console.log("step " + currentStep);
        handle.style.transform = 'translate(' +  currentStep * scrollPortion + 'px, 0)';
    }

    function move()
    { 
        console.log("slide transitionend");                
        mainMenu.style.transform = 'translate(' + -1 * currentStep * itemSize + 'px, 0)';
    }

    function getLeft(element){
        return  Math.round(element.getBoundingClientRect().left - el.getBoundingClientRect().left);
    } 

    function reset(){
        _touchStartX = 0;
        _touchStart = false;
        console.log("reset");
    }

    mainMenu.addEventListener('touchstart', function(e) {  
        console.log("touch started");        
        if(!_touchStart)
        {
            if (event.targetTouches.length == 1) {
                    var touch = event.targetTouches[0];
                    _touchStart = true;
                    _touchStartX = touch.pageX;
                    console.log("touch start X " + touch.pageX);
            }
        }

        e.preventDefault();
    }, false);

    mainMenu.addEventListener('touchend', function(e) {               
        console.log("touch end");           
        if(!_touchStart)
            {
            if (event.changedTouches.length == 1) {
                var touch = event.changedTouches[0];
                console.log("touch end touch start point " + _touchStartX);
                if(touch.pageX - _touchStartX > 0)                
                    slide(-1);
                else
                    slide(1);            
            }
            else
            {
                reset();
            }
        }    
        
        e.preventDefault();
    }, false);

    mainMenu.addEventListener('touchleave', function(e) {        
        console.log("touchleave fired");
        if (event.changedTouches.length == 1 && _touchStart) {
            var touch = event.changedTouches[0];
            if(touch.pageX - _touchStartX > 0)                
                slide(-1);
            else
                slide(1);            
        }        
        {
            reset();
        }

    }, false);

    el.onclick = function(e)
    {        
        //slide(e.offsetX);      
    }


  /*  el.onmousemove = function(e)
    {
        if(dragStart)
        {
            handle.style.left = e.offsetX + 'px';
        }
    }*/

    el.onmouseup = function(e)
    {
        dragStart = false;
        slide(e.offsetX);
    }

    handle.onclick = function(e)
    {
        e.stopPropagation();
    }

    handle.onmousedown = function(e)
    {
        e.stopPropagation();
        dragStart = true;
    }

    handle.onmouseup = function(e)
    {
        e.stopPropagation();
        dragStart = false;     
    }

    handle.onmousemove = function(e){
        e.stopPropagation();    
    }

    document.onmouseup = function(e)
    {
        dragStart = false;
        return false;
    }
}

var app = angular.module('BestBet', [])
	.config(["$httpProvider", function ($httpProvider) {
	     $httpProvider.defaults.transformResponse.push(function(responseData){
	        convertDateStringsToDates(responseData);
	        return responseData;
	    });
	}])
    .factory("enums", [enums])
	.factory("coupon", ["$http", coupon])
	.controller("MainController", ["$scope", "$http", "enums", MainController])
	.controller("CouponController", ["$scope", "$http", "coupon", CouponController])
	.controller("MatchController", ["$scope", "$http", "coupon", MatchController])
	.controller("SitesController", ["$scope", "$http", SitesController]);