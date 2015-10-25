
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

function getLeft(element){
    return element.getBoundingClientRect().left - element.offsetParent.getBoundingClientRect().left;
} 

function Slider(scrollContent)
{    
    var self = this;

    this.slidee = scrollContent;
    this.frame = scrollContent.offsetParent;

    var items = document.querySelectorAll('li');
    this.scrollLeft = 0;

    //field keeps where user touched at start
    self.touchStartX = 0;    

    self.touchEndX = 0;

    //flags keeps touch has started
    //it is used to check if an active touch exists
    self.touchStarted = false;

    //contentSize
    Object.defineProperty(self, 'contentSize', {
        set : function(value) {
            this.slidee.style.width = value + 'px';
        },
        get : function(){
            return this.slidee.offsetWidth;
        }
    });

    //frameSize
    Object.defineProperty(self, 'frameSize', {
        set : function(value){
            this.frame.style.width = value + px;
        },
        get : function(){
            return this.frame.offsetWidth;
        }
    });

    //scrollSize
    Object.defineProperty(self, '_scrollSize', {
        writable : false,
        value  : this.slidee.offsetWidth - this.frame.offsetWidth
    });

    //field keeps elements left position
    Object.defineProperty(self, 'left', {
        set : function(value){
            console.log("slidee width " +   self.slidee.offsetWidth);
            console.log("frame width " +   self.frame.offsetWidth);
            console.log(value);
            if(value < 0 && value > ( -1* self._scrollSize) || value > 0 && self.left < 0)
                this.slidee.style.transform =  'translate(' +  value + 'px, 0)';
            
        },
        get : function()
        {
            return getLeft(this.slidee);
        }
    });

    self.reset = function(){
        self.touchStartX = 0;
        self.touchStarted = false;
        console.log("reset");
    }


    //touch started event
    self.slidee.addEventListener('touchstart', function(e) {  
        console.log("touch started");        
        if(!self.touchStarted && event.targetTouches.length == 1)
        {
            var touch = event.targetTouches[0];
            self.touchStarted = true;
            self.touchStartX = touch.pageX;
            console.log("touch start X " + self.touchStartX);                  
        }
    }, false);

    //touch started event
    self.slidee.addEventListener('touchend', function(e) {               
        console.log("touch end");           
        if(self.touchStarted)
        {
            if (event.changedTouches.length == 1) {
                var touch = event.changedTouches[0];
                console.log("touch end touch start point " + self.touchStartX);
                self.reset();
            }
            else{
                console.log("page X " + touch.pageX);
                self.reset();
            }
        }    
    }, false);

    //touch started event
    self.slidee.addEventListener('touchmove', function(e) {        
        e.preventDefault();        
        console.log("touchmove");        
        if (event.changedTouches.length == 1) {
            var touch = event.changedTouches[0];
            var distance = (touch.pageX - self.touchStartX);
            console.log("how much left it pulled " + distance);
            self.left = self.left + distance;
            self.touchStartX += distance;            
        }

    }, false);
}


window.onload = function()
{
    var slider = new Slider(document.querySelector('#main-menu'));

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