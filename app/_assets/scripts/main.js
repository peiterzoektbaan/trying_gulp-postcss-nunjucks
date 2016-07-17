/*
 * Single plain javascript function similar to jQuery $(document).ready().
 * It provides a method of scheduling one or more javascript functions to 
 * run at some later point when the DOM has finished loading.
 *
 * The MIT License (MIT)
 * Copyright (c) 2014, John Friend
 * https://github.com/jfriend00/docReady
*/

(function(funcName, baseObj) {
    "use strict";
    // The public function name defaults to window.docReady
    // but you can modify the last line of this function to pass in a different object or method name
    // if you want to put them in a different namespace and those will be used instead of 
    // window.docReady(...)
    funcName = funcName || "docReady";
    baseObj = baseObj || window;
    var readyList = [];
    var readyFired = false;
    var readyEventHandlersInstalled = false;
    
    // call this when the document is ready
    // this function protects itself against being called more than once
    function ready() {
        if (!readyFired) {
            // this must be set to true before we start calling callbacks
            readyFired = true;
            for (var i = 0; i < readyList.length; i++) {
                // if a callback here happens to add new ready handlers,
                // the docReady() function will see that it already fired
                // and will schedule the callback to run right after
                // this event loop finishes so all handlers will still execute
                // in order and no new ones will be added to the readyList
                // while we are processing the list
                readyList[i].fn.call(window, readyList[i].ctx);
            }
            // allow any closures held by these functions to free
            readyList = [];
        }
    }
    
    function readyStateChange() {
        if ( document.readyState === "complete" ) {
            ready();
        }
    }
    
    // This is the one public interface
    // docReady(fn, context);
    // the context argument is optional - if present, it will be passed
    // as an argument to the callback
    baseObj[funcName] = function(callback, context) {
        // if ready has already fired, then just schedule the callback
        // to fire asynchronously, but right away
        if (readyFired) {
            setTimeout(function() {callback(context);}, 1);
            return;
        } else {
            // add the function and context to the list
            readyList.push({fn: callback, ctx: context});
        }
        // if document already ready to go, schedule the ready function to run
        // IE only safe when readyState is "complete", others safe when readyState is "interactive"
        if (document.readyState === "complete" || (!document.attachEvent && document.readyState === "interactive")) {
            setTimeout(ready, 1);
        } else if (!readyEventHandlersInstalled) {
            // otherwise if we don't have event handlers installed, install them
            if (document.addEventListener) {
                // first choice is DOMContentLoaded event
                document.addEventListener("DOMContentLoaded", ready, false);
                // backup is window load event
                window.addEventListener("load", ready, false);
            } else {
                // must be IE
                document.attachEvent("onreadystatechange", readyStateChange);
                window.attachEvent("onload", ready);
            }
            readyEventHandlersInstalled = true;
        }
    }
})("docReady", window);


/* 
 * classList.js: Cross-browser full element.classList implementation.
 * 2014-07-23
 *
 * By Eli Grey, http://eligrey.com
 * Public Domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/

if ("document" in self) {

  // Full polyfill for browsers with no classList support
  if (!("classList" in document.createElement("_"))) {

    (function (view) {

    "use strict";

    if (!('Element' in view)) return;

    var
          classListProp = "classList"
        , protoProp = "prototype"
        , elemCtrProto = view.Element[protoProp]
        , objCtr = Object
        , strTrim = String[protoProp].trim || function () {
            return this.replace(/^\s+|\s+$/g, "");
        }
        , arrIndexOf = Array[protoProp].indexOf || function (item) {
            var
                  i = 0
                , len = this.length
            ;
            for (; i < len; i++) {
                if (i in this && this[i] === item) {
                    return i;
                }
            }
            return -1;
        }
        // Vendors: please allow content code to instantiate DOMExceptions
        , DOMEx = function (type, message) {
            this.name = type;
            this.code = DOMException[type];
            this.message = message;
        }
        , checkTokenAndGetIndex = function (classList, token) {
            if (token === "") {
                throw new DOMEx(
                      "SYNTAX_ERR"
                    , "An invalid or illegal string was specified"
                );
            }
            if (/\s/.test(token)) {
                throw new DOMEx(
                      "INVALID_CHARACTER_ERR"
                    , "String contains an invalid character"
                );
            }
            return arrIndexOf.call(classList, token);
        }
        , ClassList = function (elem) {
            var
                  trimmedClasses = strTrim.call(elem.getAttribute("class") || "")
                , classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
                , i = 0
                , len = classes.length
            ;
            for (; i < len; i++) {
                this.push(classes[i]);
            }
            this._updateClassName = function () {
                elem.setAttribute("class", this.toString());
            };
        }
        , classListProto = ClassList[protoProp] = []
        , classListGetter = function () {
            return new ClassList(this);
        }
    ;
    // Most DOMException implementations don't allow calling DOMException's toString()
    // on non-DOMExceptions. Error's toString() is sufficient here.
    DOMEx[protoProp] = Error[protoProp];
    classListProto.item = function (i) {
        return this[i] || null;
    };
    classListProto.contains = function (token) {
        token += "";
        return checkTokenAndGetIndex(this, token) !== -1;
    };
    classListProto.add = function () {
        var
              tokens = arguments
            , i = 0
            , l = tokens.length
            , token
            , updated = false
        ;
        do {
            token = tokens[i] + "";
            if (checkTokenAndGetIndex(this, token) === -1) {
                this.push(token);
                updated = true;
            }
        }
        while (++i < l);

        if (updated) {
            this._updateClassName();
        }
    };
    classListProto.remove = function () {
        var
              tokens = arguments
            , i = 0
            , l = tokens.length
            , token
            , updated = false
            , index
        ;
        do {
            token = tokens[i] + "";
            index = checkTokenAndGetIndex(this, token);
            while (index !== -1) {
                this.splice(index, 1);
                updated = true;
                index = checkTokenAndGetIndex(this, token);
            }
        }
        while (++i < l);

        if (updated) {
            this._updateClassName();
        }
    };
    classListProto.toggle = function (token, force) {
        token += "";

        var
              result = this.contains(token)
            , method = result ?
                force !== true && "remove"
            :
                force !== false && "add"
        ;

        if (method) {
            this[method](token);
        }

        if (force === true || force === false) {
            return force;
        } else {
            return !result;
        }
    };
    classListProto.toString = function () {
        return this.join(" ");
    };

    if (objCtr.defineProperty) {
        var classListPropDesc = {
              get: classListGetter
            , enumerable: true
            , configurable: true
        };
        try {
            objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
        } catch (ex) { // IE 8 doesn't support enumerable:true
            if (ex.number === -0x7FF5EC54) {
                classListPropDesc.enumerable = false;
                objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
            }
        }
    } else if (objCtr[protoProp].__defineGetter__) {
        elemCtrProto.__defineGetter__(classListProp, classListGetter);
    }

    }(self));

  } else {
  // There is full or partial native classList support, so just check if we need
  // to normalize the add/remove and toggle APIs.

    (function () {
        "use strict";

        var testElement = document.createElement("_");

        testElement.classList.add("c1", "c2");

        // Polyfill for IE 10/11 and Firefox <26, where classList.add and
        // classList.remove exist but support only one argument at a time.
        if (!testElement.classList.contains("c2")) {
            var createMethod = function(method) {
                var original = DOMTokenList.prototype[method];

                DOMTokenList.prototype[method] = function(token) {
                    var i, len = arguments.length;

                    for (i = 0; i < len; i++) {
                        token = arguments[i];
                        original.call(this, token);
                    }
                };
            };
            createMethod('add');
            createMethod('remove');
        }

        testElement.classList.toggle("c3", false);

        // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
        // support the second argument.
        if (testElement.classList.contains("c3")) {
            var _toggle = DOMTokenList.prototype.toggle;

            DOMTokenList.prototype.toggle = function(token, force) {
                if (1 in arguments && !this.contains(token) === !force) {
                    return force;
                } else {
                    return _toggle.call(this, token);
                }
            };

        }

        testElement = null;
    }());
  }
}







(function() {

  var header, nav, navItems, maincontent, contentSections;
  
  function initVariables() {   
    splash = document.getElementById('splash');
    header = document.getElementById('header');
    nav = document.getElementById('nav--main');
    navItems = nav.getElementsByTagName('a');    
    mainContent = document.getElementById('content--main');
    contentSections = mainContent.getElementsByClassName('section');   
  }
  
  /**
   * Helper functions
   */
   
  // Helper function to get an element's height
  function getSize(el) {
    var h = 0;
    var w = 0;
   
    while (el) {
      if (el == window) {
        h = Math.min(el.innerHeight, el.outerHeight);
        w = Math.min(el.innerWidth, el.outerWidtht);
      } else {
        // for all other non-window elements
        h = el.offsetHeight;
        w = el.offsetWidth;
      }
      
      el = el.offsetParent;
    }
    return {
      h: h,
      w: w
    };
  };    
  
  // Helper function to get an element's exact position
  function getPosition(el) {
    var xPos = 0;
    var yPos = 0;
   
    while (el) {
      if (el.tagName == "BODY") {
        // deal with browser quirks with body/window/document and page scroll
        var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
        var yScroll = el.scrollTop || document.documentElement.scrollTop;
   
        xPos += (el.offsetLeft - xScroll + el.clientLeft);
        yPos += (el.offsetTop - yScroll + el.clientTop);
      } else {
        // for all other non-BODY elements
        xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
        yPos += (el.offsetTop - el.scrollTop + el.clientTop);
      }
   
      el = el.offsetParent;
    }
    return {
      x: xPos,
      y: yPos
    };
  }  
  // deal with the page getting resized or scrolled
  window.addEventListener("resize", updatePosition, false);
  function updatePosition() {
    scroll.settings();
  }  

  function roundToTen (val) {
    var v = 0;
    
    v = val ? Math.ceil(val/10)*10 : v;
    
    return v;    
  }  
  
  
  

  // Navigation  
  function initNav() {
    var el, rel, items;
    
    items = navItems;

    for (i = 0; i < items.length ; i++) {
      el = items[i];
      rel = el.getAttribute('rel');      
    
      el.addEventListener('click', function() {
        navScroll(rel);
      });          
    }
  };  
  function navScroll(id) {
  
    var elem = document.getElementById(id),
        pos = Math.ceil(elem.getBoundingClientRect().top);

    // document.documentElement.scrollTop = document.body.scrollTop = 1000;
    
    console.log(id,pos)
  }
    
  function navSetActive(id) {
    var el, id, isActive, hasActive, activeClass, items;
    
    id = id;
    isActive = false;
    hasActive = false;
    activeClass = 'active';
    items = navItems;
        
    for (i = 0; i < items.length ; i++) {
      el = items[i];
      isActive = el.getAttribute('rel') == id;
      hasActive = el.classList.contains(activeClass);

      if ( isActive && !hasActive) {
        el.classList.add(activeClass);
      } else if ( !isActive && hasActive ) {
        el.classList.remove(activeClass);        
      }
      
    };
  }  
  

  // OnScroll
  function onScroll (c, t) {
      onscroll = function () {
          clearTimeout(t);
          t = setTimeout(c, 10)
      };
      return c
  };    
  // initOnScroll
  function initOnScroll() {
    smoothScroll.init();
    scroll.init();
    scroll.nav(header);
    //scroll.splash(splash);
    
    onScroll(function () { 
      scrollTop = roundToTen( (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0) );
      
      scroll.nav(header);
      //scroll.splash(splash);      
    })();
  }  
  
  var navPosY, mainPosY, splashHeight, navOffset, mainOffset, scrollTop;  
  var scroll = {
    settings: function() {
      navPosY = getPosition(header).y;
      mainPosY = getPosition(mainContent).y;
      splashHeight = getSize(splash).h;
      
      var tempNavOffset = navPosY < splashHeight ? splashHeight : navPosY;
          tempMainOffset = mainPosY < splashHeight ? splashHeight : mainPosY;
          tempScrollTop = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);
      
      navOffset = roundToTen(tempNavOffset);
      mainOffset = roundToTen(tempMainOffset);
      scrollTop = roundToTen(tempScrollTop);
    },
    
    nav: function(el) {
      var offset = navOffset - (splashHeight / 4) ;
      
      if( scrollTop >= offset && !el.classList.contains('fixed') ) {
        el.classList.add('fixed');
      } else if (scrollTop < offset && el.classList.contains('fixed')) {
        el.classList.remove('fixed');
      }
    }, 
    /*
    splash: function(el) {  
      if(scrollTop < mainOffset) {
        var scrollY,
            p = (Math.round( 20 * (scrollTop / mainOffset)) / 20).toFixed(2), // relative scrolled amount
            e = el.getElementsByClassName('content__row')[0], // element to manipulate on scroll
            s = Math.ceil(p * scrollTop); // amount of px to scroll
        
        el.style.opacity = 1 - (1 * p);
        e.style.opacity = 1 - (1 * p);
        e.getElementsByTagName('h2')[0].style.lineHeight = 1 - p + 'em';
        
      } else {
        var e = el.getElementsByClassName('content__row')[0]; // element to manipulate on scroll
        
        el.style.opacity = 0.25;
        e.style.opacity = 0;
        e.getElementsByTagName('h2')[0].style.lineHeight = 0 + 'em';
      }
    },
    */
    init: function() {      
      scroll.settings()
    }
  };

  var activeClass = 'section--active';  
  // Waypoints  
  function waypointsHandler(element, direction) {
    var el = element,
        id = el.element.id,
        previousWaypoint = el.previous(),
        nextWaypoint = el.next(); 
    
    if (previousWaypoint) {
      previousWaypoint.element.classList.remove(activeClass);
    }
    if (nextWaypoint) {
      nextWaypoint.element.classList.remove(activeClass);
    }
    el.element.classList.add(activeClass);     
    navSetActive(id);
  }
  
  function initWaypoints( items ) {    
    for (i = 0; i < items.length ; i++) {
      var el = items[i];
      
      new Waypoint({
        element: el,
        handler: function(direction) {
          if (direction === 'down') {
            waypointsHandler(this, direction);
          }
        },
        continuous: false,
        group: 'sections',
        offset: '40%'
      });  
      
      new Waypoint({
        element: el,
        handler: function(direction) {
          if (direction === 'up') {
            waypointsHandler(this, direction);
          }
        },    
        continuous: false,
        group: 'sections',
        offset: '-35%'         
      });      
    }
  }

  
  (function() {
    initVariables();
    initNav();
  })();

  window.onload = function() {
    initOnScroll();
    initWaypoints(contentSections)
  };
  
})();


(function() {
// Google analytics

  function initGA () {
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-2947158-4']);
    _gaq.push(['_trackPageview']);

    (function () {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();
  }

  (function() {
    //initGA();
  });
  
})();