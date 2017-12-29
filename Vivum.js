/* Vivum
 * A micro JavaScript library for beautiful animations.
 * Vivum Copyright (c) FelisPhasma 2014, 2017
 */
"use strict";
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame  ||
    window.mozRequestAnimationFrame     ||
    window.oRequestAnimationFrame       ||
    window.msRequestAnimationFrame      ||
    function (callback){
        return window.setTimeout(callback, 1e3 / 60);
    };
}());
(function(window, undefined){
	/*
	 *
	 * TERMS OF USE - EASING EQUATIONS
	 *
	 * Open source under the BSD License.
	 *
	 * Copyright © 2001 Robert Penner
	 * All rights reserved.
	 *
	 * Redistribution and use in source and binary forms, with or without modification,
	 * are permitted provided that the following conditions are met:
	 *
	 * Redistributions of source code must retain the above copyright notice, this list of
	 * conditions and the following disclaimer.
	 * Redistributions in binary form must reproduce the above copyright notice, this list
	 * of conditions and the following disclaimer in the documentation and/or other materials
	 * provided with the distribution.
	 *
	 * Neither the name of the author nor the names of contributors may be used to endorse
	 * or promote products derived from this software without specific prior written permission.
	 *
	 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
	 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
	 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
	 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
	 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
	 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
	 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
	 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
	 * OF THE POSSIBILITY OF SUCH DAMAGE.
	 *
	 */
	var easings = {
			linear: function(t, b, c, d){
				return c * ( t / d ) + b;
			},
			easeInQuad: function (t, b, c, d) {
				return c * (t /= d) * t + b;
			},
			easeOutQuad: function (t, b, c, d) {
				return -c * (t /= d) * (t - 2) + b;
			},
			easeInOutQuad: function (t, b, c, d) {
				if ((t /= d / 2) < 1)
					return c / 2 * t * t + b;
				return -c / 2 * ((--t) * (t - 2) - 1) + b;
			},
			easeInCubic: function (t, b, c, d) {
				return c * (t /= d) * t * t + b;
			},
			easeOutCubic: function (t, b, c, d) {
				return c * (( t = t / d - 1) * t * t + 1) + b;
			},
			easeInOutCubic: function (t, b, c, d) {
				if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
				return c / 2 * ((t -= 2) * t * t + 2) + b;
			},
			easeInQuart: function (t, b, c, d) {
				return c * (t /= d) * t * t * t + b;
			},
			easeOutQuart: function (t, b, c, d) {
				return -c * ((t = t / d - 1) * t * t * t - 1) + b;
			},
			easeInOutQuart: function (t, b, c, d) {
				if ((t /= d / 2) < 1)
					return c / 2 * t * t * t * t + b;
				return -c / 2 * ((t-=2)*t*t*t - 2) + b;
			},
			easeInQuint: function (t, b, c, d) {
				return c * (t /= d) * t * t * t * t + b;
			},
			easeOutQuint: function (t, b, c, d) {
				return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
			},
			easeInOutQuint: function (t, b, c, d) {
				if ((t /= d / 2) < 1)
					return c / 2 * t * t * t * t * t + b;
				return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
			},
			easeInSine: function (t, b, c, d) {
				return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
			},
			easeOutSine: function (t, b, c, d) {
				return c * Math.sin(t / d * (Math.PI / 2)) + b;
			},
			easeInOutSine: function (t, b, c, d) {
				return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
			},
			easeInExpo: function (t, b, c, d) {
				return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
			},
			easeOutExpo: function (t, b, c, d) {
				return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
			},
			easeInOutExpo: function (t, b, c, d) {
				if (t == 0)
					return b;
				if (t == d)
					return b + c;
				if ((t /= d / 2) < 1)
					return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
				return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
			},
			easeInCirc: function (t, b, c, d) {
				return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
			},
			easeOutCirc: function (t, b, c, d) {
				return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
			},
			easeInOutCirc: function (t, b, c, d) {
				if ((t /= d / 2) < 1)
					return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
				return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
			},
			easeInElastic: function (t, b, c, d) {
				var s = 1.70158,
					p = 0,
					a = c;
				if (t == 0)
					return b;
				if ((t /= d) == 1)
					return b + c;
				if (!p)
					p = d * .3;
				if (a < Math.abs(c)){
					a=c;
					var s = p / 4;
				} else
					var s = p / (2 * Math.PI) * Math.asin(c / a);
				return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p )) + b;
			},
			easeOutElastic: function (t, b, c, d) {
				var s = 1.70158,
					p = 0,
					a = c;
				if (t == 0)
					return b;
				if ((t /= d) == 1)
					return b + c;
				if (!p)
					p = d * .3;
				if (a < Math.abs(c)){
					a = c;
					var s = p / 4;
				} else
					var s = p / (2 * Math.PI) * Math.asin(c / a);
				return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
			},
			easeInOutElastic: function (t, b, c, d) {
				var s = 1.70158,
					p = 0,
					a = c;
				if (t == 0)
					return b;
				if ((t /= d / 2) == 2)
					return b + c;
				if (!p)
					p = d * (.3 * 1.5);
				if (a < Math.abs(c)){
					a = c;
					var s = p / 4;
				} else
					var s = p / (2 * Math.PI) * Math.asin (c / a);
				if (t < 1)
					return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
				return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p ) * .5 + c + b;
			},
			easeInBack: function (t, b, c, d, s) {
				if (s == undefined)
					s = 1.70158;
				return c * (t /= d) * t * ((s + 1) * t - s) + b;
			},
			easeOutBack: function (t, b, c, d, s) {
				if (s == undefined)
					s = 1.70158;
				return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
			},
			easeInOutBack: function (t, b, c, d, s) {
				if (s == undefined)
					s = 1.70158;
				if ((t /= d / 2) < 1)
					return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
				return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
			},
			easeInBounce: function (t, b, c, d) {
				return c - easings["easeOutBounce"](d - t, 0, c, d) + b;
			},
			easeOutBounce: function (t, b, c, d) {
				if ((t /= d) < (1 / 2.75)) {
					return c * (7.5625 * t * t) + b;
				} else if (t < (2 / 2.75)) {
					return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
				} else if (t < (2.5 / 2.75)) {
					return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
				} else {
					return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
				}
			},
			easeInOutBounce: function (t, b, c, d) {
				if (t < d / 2)
					return easings["easeInBounce"](t * 2, 0, c, d) * .5 + b;
				return easings["easeOutBounce"](t * 2 - d, 0, c, d) * .5 + c * .5 + b;
			}
		};
	var types = {
			"[object Boolean]": "boolean",
			"[object Number]": "number",
			"[object String]": "string",
			"[object Function]": "function",
			"[object Array]": "array",
			"[object Date]": "date",
			"[object RegExp]": "regexp",
			"[object Object]": "object",
			"[object Error]": "error"
		},
		stringTypes = types.toString;
	function type(obj) {
		if (obj == null)
			return String(obj);
		return typeof obj === "object" || typeof obj === "function" ? types[stringTypes.call(obj)] || "object" : typeof obj;
	}
	// Date.now() is faster than performance.now()
	// https://jsperf.com/timebenchmarking/1
	// High resolution timing isn't needed for animations
	var timer = (() => {return Date.now;})();
	var animations = [],
		animationTimerRunning = false;
	function animationTimer() {
		// Request anim frame at beginning
		if(animations.length == 0){
			animationTimerRunning = false;
			return;
		}
		else
			window.requestAnimFrame(animationTimer);
		// Animate each anim
		var step,
			d,
			a;
		for(var i = 0, l = animations.length; i < l; i++){
			a = animations[i];
			d = timer();
			if(a.toAbort){
				// remove anim
				animations.splice(i, 1);
				// queue is now one shorter
				l--;
				// there's now a new item at index i, so to make i be hit again this cycle
				i--;
				continue;
			}

			step = easings[a.easing](d - a.start, a.from, a.diff, a.duration);
			a.action(step);
			if(d >= a.end) {
				// remove anim
				animations.splice(i, 1);
				// queue is now one shorter
				l--;
				// there's now a new item at index i, so to make i be hit again this cycle
				i--;
				a.complete(a.to);
			}
		}
	}
	function Vivum(properties, action){
		// Validate arguments
		let t = ["from", "to", "duration"],
			t_default = [0, 1, "default"];
		for(let i = 0, l = t.length; i < l; i++){
			properties[t[i]] = parseFloat(properties[t[i]]);
			if(properties[t[i]] == NaN) {
				//console.warn(`Vivum - property ${t[i]} cannot be resolved to a number`);
				properties[t[i]] = t_default[i];
				//return false;
			}
		}
		properties.complete = properties.complete || (() => {});
		if(type(properties.complete) != "function"){
			throw new Error("Vivum - Animation complete not a function");
			return false;
		}
		if(type(action) != "function"){
			throw new Error("Vivum - Animation action must be defined and be a function");
			return false;
		}
		if(properties.easing == undefined)
			properties.easing = "linear";
		else if(easings[properties.easing] == undefined) {
			throw new Error(`Vivum - unknown easing "${properties.easing}"`);
			return false;
		}
		var d = timer();
		animations.push({
			start: d,
			end: d + properties.duration,
			toAbort: false,

			easing: properties.easing,
			from: properties.from,
			to: properties.to,
			diff: properties.to - properties.from,
			duration: properties.duration,
			action: action,
			complete: properties.complete
		});
		if(!animationTimerRunning){
			animationTimerRunning = true;
			animationTimer();
		}
	}
	// Define the rest of the Vivum namespace
	Vivum.speeds = {
		slow: 600,
		fast: 200,
		// Default speed
		def: 400,
		// Keeping in 'def' for backwards compatability although I don't think
		// anyone else uses this library
		default: 400
	};
	Vivum.easings = easings; // Make them accessible.
	// TODO animation cancel
	window.Vivum = Vivum;
})(window);
