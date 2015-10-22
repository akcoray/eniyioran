
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
    var scrollSize = el.offsetWidth;
    var itemSize = items[0].offsetWidth;
    var totalSize = items.length * itemSize;    
    var scrollPortion = (scrollSize / ((items.length - pageSize) * itemSize)) *  itemSize;
    var _dragStart = false;
    var _touchStart = false;
    var _touchStartX = 0;
    var touchEndX = 0;

    Object.defineProperty(this, 'dragStart', 
        {
            get : function() { return _dragStart; },
            set : function(value) {
                _dragStart = value;
                if(value)
                {
                    handle.style.transition = "";
                }
                else
                {
                    handle.style.transition = "left 0.2s";
                }
            }
        }
     );

    handle.addEventListener("transitionend", move, false)

    function slide(endPos)
    {
        if(endPos < 0 || endPos > el.offsetWidth)
        {
            console.log("you are the cross lines");
            return;
        }

        if(endPos > handle.offsetLeft)
        {            
            var step = Math.ceil(endPos / scrollPortion);
            var distance = (step * scrollPortion - handle.offsetWidth / 2)
            //console.log(distance)
            if(distance + handle.offsetWidth >= scrollSize)
                distance = scrollSize - handle.offsetWidth;

            handle.style.left = distance  + 'px';            
        }
        else
        {
            //console.log(Math.floor(endPos / scrollPortion) * scrollPortion )
            handle.style.left = (Math.floor(endPos / scrollPortion) * scrollPortion)  + 'px';
        }
    }

    function move()
    {        
        var step = Math.round(handle.offsetLeft / scrollPortion );
        mainMenu.style.transform = 'translate(' + step * itemSize * -1 + 'px, 0)';
    }

    mainMenu.addEventListener('touchstart', function(e) {  
        console.log("touch started")
        e.preventDefault();
        if (event.targetTouches.length == 1) {
            if(!_touchStart)
            {
                var touch = event.targetTouches[0];
                _touchStart = true;
                _touchStartX = touch.pageX;
            }
        }
    }, false);

    mainMenu.addEventListener('touchend', function(e) {          
        if (event.changedTouches.length == 1) {
            var touch = event.changedTouches[0];
            if(touch.pageX - _touchStartX > 0)                
                slide(handle.offsetLeft - scrollPortion);
            else
                slide(handle.offsetLeft + scrollPortion);

            _touchStartX = 0;
            _touchStart = false;        
            
        }
    }, true);

    mainMenu.addEventListener('touch', function(e){
        console.dir(e);
    })

    mainMenu.addEventListener('touchleave', function(e) {        
        if (event.changedTouches.length == 1) {
            var touch = event.changedTouches[0];
            if(touch.pageX - _touchStartX > 0)                
                slide(handle.offsetLeft - scrollPortion);
            else
                slide(handle.offsetLeft + scrollPortion);

            _touchStartX = 0;
            _touchStart = false;        
            
        }
    }, true);

    el.onclick = function(e)
    {        
        slide(e.offsetX);      
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