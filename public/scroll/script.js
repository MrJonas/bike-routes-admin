(function () {
    
    'use strict';
    
    var stickyEls = document.getElementsByClassName('sticky');
    [].slice.call(stickyEls).forEach(function(item) {
        Stickyfill.add(item);
    });
    
} ());