define(["exports", "globalization"], function (exports, globalization) {

    exports.constants = {
        noImagePath: '/content/images/no-image.png'
    };

    exports.regex = {
        phoneregexsample : /^\s*(\+|00)\s*(\(?[0-9]{3}\)?\s*)(\-?[0-9]{3}\s*)+\s*([0-9]{3})\s*$/
    };
    
    (function(enums){
        enums = {
            errorType: {
                Unexpected: 0,
                Business: 1,
                Session: 2
            },
            dataType: {
                string: 1,
                number: 2,
                datetime: 3,
                lookup: 4
            },
            paddir : {
                STR_PAD_LEFT : 1,
                STR_PAD_RIGHT : 2,
                STR_PAD_BOTH : 3
            }
        };
    })(exports.enums = {});

    exports.newId = function () { return "control-" + Math.floor((Math.random() * 10000) + 1) };
    exports.emptyFunction = function () {};

    exports.tojQuery = function (element) {
        if (typeof (element) == "string") {
            return $(element.indexOf('#') > -1 ? element : '#' + element);
        } else if (element.constructor.__proto__ == HTMLElement) {
            return $(element);
        } else {
            return element;
        }
    };

    exports.serializaeObject = function (element) {
        var o = {};
        var a = tojQuery(element).serializeArray();
        $.each(a, function () {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    }
    
    
    (function(str){
        var pad = function(str, len, pad, dir) {
            if (typeof(len) == "undefined") { var len = 0; }
            if (typeof(pad) == "undefined") { var pad = ' '; }
            if (typeof(dir) == "undefined") { var dir = STR_PAD_RIGHT; }

            if (len + 1 >= str.length) {

                switch (dir){

                    case enums.paddir.STR_PAD_LEFT:
                        str = Array(len + 1 - str.length).join(pad) + str;
                    break;

                    case utils.paddir.STR_PAD_BOTH:
                        var right = Math.ceil((padlen = len - str.length) / 2);
                        var left = padlen - right;
                        str = Array(left+1).join(pad) + str + Array(right+1).join(pad);
                    break;

                    default:
                        str = str + Array(len + 1 - str.length).join(pad);
                    break;

                } // switch
            }
            return str;                 
        };


        str.padLeft = function(str, len, pad)
        {
            return pad(str, len, pad, enums.paddir.STR_PAD_LEFT);
        };
        str.padRight = function(str, len, pad)
        {
            return pad(str, len. pad, enums.paddir.STR_PAD_RIGHT);
        };
        str.padBoth = function(str, len, pad)
        {
            return pad(str, len. pad, enums.paddir.STR_PAD_BOTH);
        };

    })(exports.strings = {});

    (function(exports){
        var stringComparer = function (a, b) {
            if (typeof (a) != 'string') {
                a = a.toString();
            }

            if (typeof (b) != 'string') {
                b = b.toString();
            }

            var A = a.toLowerCase();
            var B = b.toLowerCase();

            return A.localeCompare(B);
        };    

        var dateComparer = function (a, b) {
            if(typeof(a) === 'string')
            {
                a = new Date(a);
            }
            
            if(typeof(b) === 'string')
            {
                b = new Date(b);
            }

            a = ((a.getTime() * 10000) + 621355968000000000);
            b = ((b.getTime() * 10000) + 621355968000000000);

            if(a == b)
                return 0;

            return  a > b ? 1 : -1;
        };

        var numberComparer = function(a, b){
            if(a == b)
                return 0;

            return  a > b ? 1 : -1
        };

        exports.getComparer = function (type, desc) {
            if (type == 'number') {
                return this.numberComparer;
            }
            else if (type == 'date')
            {
                return this.dateComparer;   
            }

            return this.stringComparer;
        };
    })(exports);

    exports.parser = {
        tryParseInt: function (value, defaultValue) {
            var val = parseInt(value);
            if (val.toString() === 'NaN')
                return defaultValue;
            return val;
        },
        parseSerializedJsonDate: function (exp) {
            return new Date(parseInt(exp.substr(6)));
        }
    };

    //gets random number between given min and max value
    exports.getRandomArbitrary = function(min, max) {
        return (Math.random() * (max - min) + min).toFixed(3);
    };

    exports.globalization = globalization;

    return exports;
});
