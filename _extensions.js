/** ------------------------------- */
/**   Object Prototype Extensions   */
/** ------------------------------- */
(function(){
	/** extend(String, "fn", function(){}); OR extend(String, ["fn1", "fn2"], function(){}); */
	function extend(base, name, method){ if (Object.prototype.toString.call(name).replace(/^\[[a-z]+\s+(\w+)\]$/, "$1").toLowerCase() === "array"){ for (var i = 0, l = name.length; i < l; i++){ var fn = name[i]; if(!base.prototype[fn]){ base.prototype[fn] = method; } } } else{ if(!base.prototype[name]){ base.prototype[name] = method; } } }
	/** Object Static Member Extensions */
	/** Object.getType won't work correctly without __typeName = "Object/Array/String/Number/Boolean/Date" defined on each Built-In Object */
	//if (typeof(Object.getType) == "undefined"){ Object.getType = function(b){ var a = b.constructor; if(!a || typeof a !== "function" || !a.__typeName || a.__typeName === "Object"){ return Object; } else{ return a; } }; }
	if (typeof(Object.getTypeName) == "undefined"){ Object.getTypeName = function(instance){ return Object.prototype.toString.call(instance).replace(/^\[object (.+)\]$/, "$1"); }; }
	if (typeof(Object.is) == "undefined"){ Object.is = function(x, y){ if (x === y){ return x !== 0 || 1 / x === 1 / y; } else{ return x !== x && y !== y; } }; }
	if (typeof Object.isObject == "undefined"){ Object.isObject = function(obj){ var t = typeof obj; return t === "object" && !Array.isArray(obj) && !!obj; }; }
	if (typeof Object.isPrimitive == "undefined"){ Object.isPrimitive = function(arg){ return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || typeof arg === "undefined"; }; }
	/*if (typeof(Object.keys) == "undefined"){ Object.keys = (function(){ var hasOwnProperty = Object.prototype.hasOwnProperty; var hasDontEnumBug = !({ toString: null }).propertyIsEnumerable("toString"); var dontEnums = [ "toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor" ]; var dontEnumsLength = dontEnums.length; return function(obj){ if (typeof obj !== "object" && (typeof obj !== "function" || obj === null)){ throw new TypeError("Object.keys called on non-object"); } var ret = []; var prop; var i; for (prop in obj){ if (hasOwnProperty.call(obj, prop)){ ret.push(prop); } } if (hasDontEnumBug){ for (i = 0; i < dontEnumsLength; i++){ if (hasOwnProperty.call(obj, dontEnums[i])){ ret.push(dontEnums[i]); } } } return ret; }; }()); }*/
	/*if (typeof(Object.forEach) == "undefined"){ Object.forEach = function(object, fn, bind){ Object.keys(object).forEach(function(key){ fn.call(bind, object[key], key, object); }); }; }*/
	/*if (typeof(Object.toQueryString) == "undefined"){ Object.toQueryString = function(object, base){ var ret = []; Object.forEach(object, function(value, key){ if (base) key = base + '[' + key + ']'; var result; switch (Object.getTypeName(value)){ case 'object': result = Object.toQueryString(value, key); break; case 'array': var qs = {}; value.forEach(function(val, i){ qs[i] = val; }); result = Object.toQueryString(qs, key); break; default: result = key + '=' + encodeURIComponent(value); } if (value != null) ret.push(result); }); return ret.join('&').replace(/%20/g, '+'); }; }*/
	/*
	** Allows looking up nested properties by path (returns undefined or defaultValue if not found)
	** Examples:
	** Object.resolvePath({ "array": [ "foo", { "bar": "this is bar" } ] }, "array[1].bar");
	** Object.resolvePath(window, "document.body.xyz", "Not Found");
	** Object.resolvePath(window, "document.body.children[0].nodeName", "Not Found");
	*/
	if (typeof Object.resolvePath == "undefined"){ Object.resolvePath = function(obj, path, defaultValue){ return path.split(/[\.\[\]\'\"]/).filter(function(p){ return p; }).reduce(function(o, p){ return (o && typeof o[p] !== "undefined" ? o[p] : defaultValue); }, obj); }; }
	/*
	** Populates specified array with all nested properties/values of specified object
	** Examples:
	** Object.walk({ "array": [ "foo", { "bar": "this is bar" } ] }, "", retArray);
	*/
	if (typeof Object.walk == "undefined"){ Object.walk = function(obj, key, arr){ /*if (Array.isArray(obj)){ return; }*/ if (typeof obj != "object" || obj instanceof Date){ arr.push({ path: key, value: obj }); return; } Object.keys(obj).forEach(function(k){ Object.walk(obj[k], (key ? key + "." + k : k), arr); }); }; }
	/** Object Prototype Extensions */
	/*extend(Object, "assign", function(target){ if (target === undefined || target === null){ throw new TypeError("Object.assign: Cannot convert undefined or null to object"); } var ret = Object(target); for (var index = 1; index < arguments.length; index++){ var source = arguments[index]; if (source !== undefined && source !== null){ for (var nextKey in source){ if (source.hasOwnProperty(nextKey)){ ret[nextKey] = source[nextKey]; } } } } return ret; });*/
	/*extend(Object, "create", function(o, props){ function F(){}; F.prototype = o; var ret = new F(); if (typeof(props) === "object"){ for (prop in props){ if (props.hasOwnProperty((prop))){ ret[prop] = props[prop].value; } } } return ret; });*/
	//extend(Object, "keys",   (function(){ var hasOwnProperty = Object.prototype.hasOwnProperty; var hasDontEnumBug = !({ toString: null }).propertyIsEnumerable("toString"); var dontEnums = [ "toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor" ]; var dontEnumsLength = dontEnums.length; return function(obj){ if (typeof obj !== "object" && (typeof obj !== "function" || obj === null)){ throw new TypeError("Object.keys called on non-object"); } var ret = []; var prop; var i; for (prop in obj){ if (hasOwnProperty.call(obj, prop)){ ret.push(prop); } } if (hasDontEnumBug){ for (i = 0; i < dontEnumsLength; i++){ if (hasOwnProperty.call(obj, dontEnums[i])){ ret.push(dontEnums[i]); } } } return ret; }; }()));
	/** Array Static Member Extensions */
	//if (typeof(Array.isArray) == "undefined"){ Array.isArray = function(arg){ return Object.prototype.toString.call(arg) === "[object Array]"; }; }
	//if (typeof(Array.from) == "undefined"){ Array.from = (function(){ var toStr = Object.prototype.toString; var isCallable = function(fn){ return typeof fn === "function" || toStr.call(fn) === "[object Function]"; }; var toInteger = function(value){ var number = Number(value); if (isNaN(number)){ return 0; } if (number === 0 || !isFinite(number)){ return number; } return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number)); }; var maxSafeInteger = Math.pow(2, 53) - 1; var toLength = function(value){ var len = toInteger(value); return Math.min(Math.max(len, 0), maxSafeInteger); }; return function from(arrayLike/*, mapFn, thisArg */){ var C = this, items = Object(arrayLike); if (arrayLike == null){ throw new TypeError("Array.from requires an array-like object - not null or undefined"); } var T, mapFn = (arguments.length > 1 ? arguments[1] : void undefined); if (typeof mapFn !== "undefined"){ if (!isCallable(mapFn)){ throw new TypeError("Array.from: when provided, the second argument must be a function"); } if (arguments.length > 2){ T = arguments[2]; } } var len = toLength(items.length), A = (isCallable(C) ? Object(new C(len)) : new Array(len)), k = 0, kValue; while (k < len){ kValue = items[k]; if (mapFn){ A[k] = typeof T === "undefined" ? mapFn(kValue, k) : mapFn.call(T, kValue, k); } else { A[k] = kValue; } k += 1; } A.length = len; return A; }; }()); }
	//if (typeof(Array.of) == "undefined"){ Array.of = function(){ return Array.prototype.slice.call(arguments); }; }
	/** Array Prototype Extensions */
	extend(Array, "contains", function(el){ var O = Object(this); var len = parseInt(O.length) || 0; if (len === 0){ return false; } var n = parseInt(arguments[1]) || 0; var k; if (n >= 0){ k = n; } else{ k = len + n; if (k < 0){ k = 0; } } var currentElement; while (k < len){ currentElement = O[k]; if (el === currentElement || (el !== el && currentElement !== currentElement)){ return true; } k++; } return false; });
	//extend(Array, "every",    function(fun, thisp){ if (typeof fun != "function"){ throw new TypeError(); } var len = this.length; for (var i = 0; i < len; i++){ if (i in this && ! fun.call(thisp, this[i], i, this)){ return false; } } return true; });
	extend(Array, "fetch",    function(property){ var ret = this.map(function(v){ return v[property]; }); return ret; });
	extend(Array, "fill",     function(value){ if (this == null){ throw new TypeError("this is null or not defined"); } var O = Object(this); var len = O.length >>> 0; var start = arguments[1]; var relativeStart = start >> 0; var k = (relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len)); var end = arguments[2]; var relativeEnd = (end === undefined ? len : end >> 0); var realEnd = (relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len)); while (k < realEnd){ O[k] = value; k++; } return O; });
	//extend(Array, "filter",   function(fn){ if (this === void 0 || this === null){ throw new TypeError(); } var t = Object(this); var len = (t.length >>> 0); if (typeof fn !== "function"){ throw new TypeError(); } var ret = []; var thisArg = (arguments.length >= 2 ? arguments[1] : void 0); for (var i = 0; i < len; i++){ if (i in t){ var val = t[i]; if (fn.call(thisArg, val, i, t)){ ret.push(val); } } } return ret; });
	//extend(Array, "find",     function(predicate){ if (this == null){ throw new TypeError("Array.prototype.find called on null or undefined"); } if (typeof predicate !== "function"){ throw new TypeError("Array.prototype.find predicate must be a function"); } var list = Object(this); var length = list.length >>> 0; var thisArg = arguments[1]; var value; for (var i = 0; i < length; i++){ value = list[i]; if (predicate.call(thisArg, value, i, list)){ return value; } } return undefined; });
	//extend(Array, "findIndex", function(cb){ if (this === null){ throw new TypeError("Array.prototype.findIndex called on null or undefined"); } else if (typeof cb !== "function"){ throw new TypeError("Array.prototype.findIndex callback must be a function"); } var arr = Object(this); var l = arr.length >>> 0; var thisArg = arguments[1]; for (var i = 0; i < l; i++){ if (cb.call(thisArg, arr[i], i, arr)){ return i; } } return -1; });
	//extend(Array, "forEach",  function(callback, thisArg){ var T, k; if (this == null){ throw new TypeError(" this is null or not defined"); } var O = Object(this); var len = O.length >>> 0; if (typeof callback !== "function"){ throw new TypeError(callback + " is not a function"); } if (arguments.length > 1){ T = thisArg; } k = 0; while (k < len){ var kValue; if (k in O){ kValue = O[k]; callback.call(T, kValue, k, O); } k++; } });
	//extend(Array, "includes", function(searchElement, fromIndex){ if (this == null){ throw new TypeError("Array.prototype.includes called on null or undefined"); } var o = Object(this); var len = o.length >>> 0; if (len === 0){ return false; } var n = fromIndex | 0; var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0); function sameValueZero(x, y){ return x === y || (typeof x === "number" && typeof y === "number" && isNaN(x) && isNaN(y)); } while (k < len){ if (sameValueZero(o[k], searchElement)){ return true; } k++; } return false; });
	//extend(Array, "indexOf",  function(el){ for(var i = 0, c = this.length; i < c; i++){ if (el == this[i]){ return i; } } return -1; });
	extend(Array, "insert",   function(i, el){ this.splice(i, 0, el); return this; });
	//extend(Array, "invoke",   function(method){ var args = [].slice.call(arguments, 1); var ret = this.map(function(v){ return v[method].apply(v, args); }); return ret; });
	//extend(Array, "lookup",   function(member, value){ var find    = function(dict){ return dict[member] == value; }; var matches = this.filter(find); if (matches.length == 0){ return undefined; } else if (matches.length == 1){ return matches[0]; } else{ throw new Error("Failed lookup of member \"" + member + "\" with value \"" + value + "\""); } });
	//extend(Array, "map",      function(fn, scope){ var ret = []; for(var i = 0, l = this.length; i < l; i++){ ret[ret.length] = fn.call(scope || undefined, this[i], i, this); } return ret; });
	//extend(Array, "some",     function(fun){ if (this === void 0 || this === null){ throw new TypeError(); } var t = Object(this); var len = t.length >>> 0; if (typeof fun !== 'function'){ throw new TypeError(); } var thisArg = (arguments.length >= 2 ? arguments[1] : void 0); for (var i = 0; i < len; i++){ if (i in t && fun.call(thisArg, t[i], i, t)){ return true; } } return false; });
	extend(Array, "unique",   function(fun, thisp){ fun = fun || function(value, index, orig, result){ return result.indexOf(value) == -1; }; var ret = []; for (var i = 0; i < this.length; i++){ if (i in this){ var v = this[i]; if (fun.call(thisp, v, i, this, ret)){ ret.push(v); } } } return ret; });
	extend(Array, "min",      function(){ if (this === null || this.length == 0){ return null; } var ret = this[0]; for (var i = 0, l = this.length; i < l; i++){ if (typeof(this[i]) != "undefined" && this[i] < ret){ ret = this[i]; } } return ret; });
	extend(Array, "max",      function(){ if (this === null || this.length == 0){ return null; } var ret = this[0]; for (var i = 0, l = this.length; i < l; i++){ if (typeof(this[i]) != "undefined" && this[i] > ret){ ret = this[i]; } } return ret; });
	extend(Array, "avg",      function(){ if (this.length == 0){ return 0; } var sum = 0.0, len = 0; for (var i = 0, l = this.length; i < l; i++){ if (typeof this[i] != "undefined" && this[i] != null){ sum += this[i]; len++; } } return sum / len; });
	/** String Static Member Extensions */
	if (typeof(String.newGUID) == "undefined"){ String.newGUID = function(){ function s4(){ return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1); } return (s4() + s4() + '-' + s4() + '-4' + s4().substr(1, 3) + '-' + s4() + '-' + s4() + s4() + s4()).toUpperCase(); }; }
	if (typeof(String.empty) == "undefined"){ String.empty = function(){ return ""; }; }
	if (typeof(String.isNullOrEmpty) == "undefined"){ String.isNullOrEmpty = function(str){ return (str === void 0 || typeof str == "undefined" || str == undefined || str == null || str == ""); }; }
	if (typeof(String.isNullOrWhiteSpace) == "undefined"){ String.isNullOrWhiteSpace = function(str){ return (String.isNullOrEmpty(str) || str.trim() == ""); }; }
	if (typeof(String.isString) == "undefined"){ String.isString = function(arg){ return typeof arg === "string"; }; }
	/** String Prototype Extensions */
	extend(String, "collapseSpaces",          function(){ return this.trim().replace(/\s{2,}/g, " ").replace(/{(Keyword):\s*(.*?)\s*}/gi, "{$1:$2}"); });
	extend(String, "contains",                function(it){ return this.indexOf(it) != -1; });
	extend(String, "endsWith",                function(searchString, position){ var subjectString = this.toString(); if (position === undefined || position > subjectString.length){ position = subjectString.length; } position -= searchString.length; var lastIndex = subjectString.indexOf(searchString, position); return lastIndex !== -1 && lastIndex === position; });
	extend(String, "format",                  function(substrings){ var subRegExp = /(?:%(\d+))/mg, currPos = 0, ret = []; do{ var match = subRegExp.exec(this); if(match && match[1]){ if(match.index > currPos){ ret.push(this.substring(currPos, match.index)); } ret.push(substrings[parseInt(match[1])]); currPos = subRegExp.lastIndex; } } while(match){ if(currPos < this.length){ ret.push(this.substring(currPos, this.length)); } }return ret.join(""); });
	extend(String, "includes",                function(search, start){ if (typeof start !== "number"){ start = 0; } if (start + search.length > this.length){ return false; } else{ return this.indexOf(search, start) !== -1; } });
	extend(String, "padLeft",                 function(padString, length){ var ret = this; while (ret.length < length){ ret = padString + ret; } return ret; });
	extend(String, "padRight",                function(padString, length){ var ret = this; while (ret.length < length){ ret = ret + padString; } return ret; });
	extend(String, "repeat",                  function(count, separator){ var t = this, ret = ""; while(--count + 1 > 0){ ret += (separator && count != 0) ? t + separator : t; } return ret; });
	extend(String, "reverse",                 function(){ return this.split("").reverse().join(""); });
	extend(String, "startsWith",              function(searchString, position){ position = position || 0; return this.indexOf(searchString, position) === position; });
	extend(String, "surroundWith",            function(it){ var l = it, r = it; if (it == "{"){ r = "}"; } if (it == "("){ r = ")"; } if (it == "["){ r = "]"; } if (it == "<"){ r = ">"; } /** This next case allows for surrounding with an HTML tag */ if (it.search(/^(<)([^ ]+)([^>]+)?(>)$/) != -1){ r = it.replace(/^(<)([^ ]+)([^>]+)?(>)$/, "$1/$2$4"); } return l + this + r; });
	extend(String, "trim",                    function(){ return this.replace(/^\s+|\s+$/g, ""); });
	extend(String, ["trimLeft","trimStart"],  function(){ return this.replace(/^\s+/, ""); });
	extend(String, ["trimRight", "trimEnd"],  function(){ return this.replace(/\s+$/g, ""); });
	extend(String, "hex2dec",                 function(){ return parseInt(this.replace(/#/, ""), 16); });
	extend(String, "isAlpha",                 function(){ if (this == ""){ return false; } else { return this.search(/[a-zA-Z]/) != -1; } });
	extend(String, "isNumber",                function(){ if (this == ""){ return false; } else { return this.replace(/[,$]/g, "").trim().search(/^\-?([0-9.]+)$/) != -1; } });
	extend(String, "toTitleCase",             function(){ if (this == null || this == "" || this.length == 0){ return this; } else{ return this.toLowerCase().split(" ").map(function(word){ return word.replace(word[0], word[0].toUpperCase()); }).join(" "); } });
	extend(String, "toHashCode",              function(asString){ asString = asString || false; var ret = 0; if (!this.length){ return ret; } for (var i = 0, l = this.length, n; i < l; ++i){ n = this.charCodeAt(i); ret = ((ret << 5) - ret) + n; ret = ret & ret; } if (asString){ return ("0000000" + ret.toString(16)).slice(-8).toUpperCase(); } else{ return Math.abs(ret); } });
	/** Number Prototype Extensions */
	extend(Number, "dec2hex",                 function(len){ var ret = this.toString(16); len = (len || ret.length); return ("0".repeat(len) + ret).slice(len * -1).toUpperCase(); });
	extend(Number, "isBetween",               function(p1, p2){ return (this >= p1) && (this <= (typeof p2 == "undefined" || p2 == null ? this : p2)); });
	extend(Number, "isEven",                  function(){ return (this % 2) == 0; });
	extend(Number, "isOdd",                   function(){ return !this.isEven(); });
	extend(Number, "toHHMMSS",                function(){ var sec_num = parseInt(this, 10); var hours = Math.floor(sec_num / 3600); var minutes = Math.floor((sec_num - (hours * 3600)) / 60); var seconds = sec_num - (hours * 3600) - (minutes * 60); if (hours < 10){ hours = "0" + hours; } if (minutes < 10){ minutes = "0" + minutes; } if (seconds < 10){ seconds = "0" + seconds; } return hours + ':' + minutes + ':' + seconds; })
	extend(Number, "format",                  function(s, c, d, w){ s = (typeof s == "undefined" ? "," : s); c = (typeof c == "undefined" ? "." : c); d = (typeof d == "undefined" ? 2 : d); w = (typeof w == "undefined" ? 3 : w); var re = "\\d(?=(\\d{" + w + "})+" + (d > 0 ? "\\b" : "$") + ")", num = this.toFixed(Math.max(0, ~~d)); return (c ? num.replace(".", c) : num).replace(new RegExp(re, "g"), "$&" + s); });
	/** Boolean Static Member Extensions */
	if (!Boolean.isBoolean){ Boolean.isBoolean = function(arg){ return typeof arg === "boolean"; }; }
	/** RegExp Static Member Extensions */
	if (!RegExp.isRegExp){ RegExp.isRegExp = function(arg){ return Object.isObject(arg) && Object.prototype.toString.call(arg) === "[object RegExp]"; }; }
	/** Error Static Member Extensions */
	if (!Error.isError){ Error.isError = function(arg){ return Object.isObject(arg) && (Object.prototype.toString.call(arg) === "[object Error]" || arg instanceof Error); }; }
	/** Function Static Member Extensions */
	if (!Function.isFunction){ Function.isFunction = function(arg){ return typeof arg === "function"; }; }
	/** Date Static Member Extensions */
	if (!Date.isDate){ Date.isDate = function(arg){ return Object.isObject(arg) && Object.prototype.toString.call(arg) === "[object Date]"; }; }
	if (!Date.now){ Date.now = function(){ return new Date(); /*new Date().getTime();*/ }; }
	if (!Date.today){ Date.today = function(){ var n = new Date(); return new Date(n.setHours(0, 0, 0, 0)); }; }
	if (!Date.WeekDays){ Date.WeekDays = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ]; }
	if (!Date.Months){ Date.Months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]; }
	/** Date Prototype Extensions */
	extend(Date, "dow",         function(){ return Date.WeekDays[this.getDay()]; });
	extend(Date, "monthName",   function(){ return Date.Months[this.getMonth()]; });
	extend(Date, "equals",      function(p_Date){ if (this == null || p_Date == null){ return false; } else{ return this.getTime() == p_Date.getTime(); } });
	extend(Date, "dateOnly",    function(){ return new Date(new Date(this.getTime()).setHours(0, 0, 0, 0)); });
	extend(Date, "endOfDay",    function(){ return new Date(new Date(this.getTime()).setHours(23, 59, 59, 999)); });
	extend(Date, "daysInMonth", function(){ return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate(); });
	extend(Date, "bom",         function(){ return new Date(new Date(this.getFullYear(), this.getMonth(), 1).setHours(0, 0, 0, 0)); });
	extend(Date, "eom",         function(){ return new Date(new Date(this.getFullYear(), this.getMonth() + 1, 0).setHours(0, 0, 0, 0)); });
	extend(Date, "add",         function(p_Number, p_Interval){
		p_Number   = parseFloat(p_Number);
		p_Interval = (typeof p_Interval == "undefined" ? "dd" : p_Interval.toLowerCase());
		var ms_map = {
			"ms"  : 1,
			"s"   : 1000,
			"ss"  : 1000,
			"m"   : 60000,
			"mm"  : 60000,
			"h"   : 3600000,
			"hh"  : 3600000,
			"hour": 3600000,
			"d"   : 86400000,
			"dd"  : 86400000,
			"day" : 86400000
		};
		if (typeof ms_map[p_Interval] != "undefined"){
			var dt = new Date(this.getTime() + (p_Number * ms_map[p_Interval]));
			this.setTime(dt.getTime());
		}
		else{
			throw new TypeError("Invalid interval specified for Date.prototype.add: " + p_Interval);
		}
		return this;
	});
	extend(Date, "format",    function(fmt){
	var ret          = "",
		date         = this,
		day          = date.getDate(),
		month        = date.getMonth() + 1,
		year         = date.getFullYear(),
		hours        = date.getHours(),
		minutes      = date.getMinutes(),
		seconds      = date.getSeconds(),
		milliseconds = date.getMilliseconds(),
		dayOfWeek    = date.dow(),
		monthName    = date.monthName(),
		useAMPM      = false;
	if (!fmt){ fmt = "yyyy-MM-dd"; }
	ret = fmt;
	ret = ret.replace(/\b(MMMM)\b/, monthName);
	ret = ret.replace(/\b(MMM)\b/, monthName.substr(0, 3));
	ret = ret.replace(/\b(MM)\b/, ("00" + month.toString()).slice(-2));
	ret = ret.replace(/\b(yyyy)\b/, year.toString());
	ret = ret.replace(/\b(yy)\b/, year.toString().substr(2, 2));
	ret = ret.replace(/\b(dddd)\b/i, dayOfWeek);
	ret = ret.replace(/\b(ddd)\b/i, dayOfWeek.substr(0, 3));
	ret = ret.replace(/\b(dd)\b/, ("00" + day.toString()).slice(-2));
	if (ret.search(/\b(t{1,2}|am\/pm)\b/i) != -1){
		useAMPM = true;
		ret = ret.replace(/\b(t{1,2}|am\/pm)\b/gi, (hours > 11 ? "PM" : "AM"));
	}
	ret = ret.replace(/\b(HH)\b/, ("00" + hours.toString()).slice(-2));
	if (useAMPM){
		hours = ( (hours > 12) ? (hours - 12) : ( (hours === 0) ? 12 : hours ) );
	}
	ret = ret.replace(/\b(hh)\b/, ("00" + hours.toString()).slice(-2));
	ret = ret.replace(/\b(mm)\b/, ("00" + minutes.toString()).slice(-2));
	ret = ret.replace(/\b(ss)\b/, ("00" + seconds.toString()).slice(-2));
	ret = ret.replace(/\b(ms)\b/, ("000" + milliseconds.toString()).slice(-3));
	return ret;
});
})();
