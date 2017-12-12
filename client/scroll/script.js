(function () {
    
    'use strict';
    
    var stickyEls = document.getElementsByClassName('sticky');
    Array.from(stickyEls).forEach(function(item) {
        Stickyfill.add(item);
    });
    
} ());