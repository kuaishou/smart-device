(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.logCore = factory());
}(this, (function () { 'use strict';

    var getProto = Object.getPrototypeOf,
        class2type = {},
        hasOwn = class2type.hasOwnProperty,
        fnToString = hasOwn.toString,
        ObjectFunctionString = fnToString.call(Object);
    function isFunction(obj) {
        return typeof obj === "function" && typeof obj.nodeType !== "number";
    }
    function isPlainObject(obj) {
        var proto, Ctor;

        // Detect obvious negatives
        // Use toString instead of jQuery.type to catch host objects
        if (!obj || toString.call(obj) !== "[object Object]") {
            return false;
        }

        proto = getProto(obj);

        // Objects with no prototype (e.g., `Object.create( null )`) are plain
        if (!proto) {
            return true;
        }

        // Objects with prototype are plain iff they were constructed by a global Object function
        Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
        return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
    }

    function mergeOptions() {
        var arguments$1 = arguments;

        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if (typeof target === "boolean") {
            deep = target;

            // Skip the boolean and the target
            target = arguments[i] || {};
            i++;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== "object" && !isFunction(target)) {
            target = {};
        }


        if (i === length) {
            target = this;
            i--;
        }

        for (; i < length; i++) {

            // Only deal with non-null/undefined values
            if ((options = arguments$1[i]) != null) {

                // Extend the base object
                for (name in options) {
                    src = target[name];
                    copy = options[name];

                    // Prevent never-ending loop
                    if (target === copy) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && (isPlainObject(copy) ||
                        (copyIsArray = Array.isArray(copy)))) {

                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && Array.isArray(src) ? src : [];

                        } else {
                            clone = src && isPlainObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[name] = mergeOptions(deep, clone, copy);

                        // Don't bring in undefined values
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    }

    console.log('core:',window.logCore);
    var logCore = mergeOptions(true, {
        //单击次数开启日志
        clickCountOpenLog: 0,
        //最大日志条数
        maxCount: 20,
    }, window.logCore);
    //初始化日志
    logCore.init = function () {

    };

    return logCore;

})));
