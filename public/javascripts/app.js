
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

    var dragStart = false;
    var start = 0;
    var end = null;
    var totalSize = 400;
    var itemCount = 4;
    var scrollSize = 200;
    var scrollPortion = scrollSize / itemCount;

    handle.addEventListener("transitionend", move, false)

    function slide(endPos)
    {
        if(endPos > handle.offsetLeft)
        {
            handle.style.left = endPos - handle.offsetWidth + 'px';
        }
        else
        {
            handle.style.left = endPos + 'px';
        }
    }

    function move()
    {
        debugger
        var step = Math.round(handle.offsetLeft / 50);        
        mainMenu.style.transform = 'translate(' + step * 100 * -1 + 'px, 0)';
    }

    el.onclick = function(e)
    {        
        slide(e.offsetX);      
    }
/*
    el.onmousedown = function(e)
    {
        dragStart = true;
    }

    el.onmousemove = function(e)
    {
        if(dragStart)
        {
            slide(e.offsetX);
        }
    }

    el.onmouseup = function(e)
    {
        dragStart = false;
    }*/
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