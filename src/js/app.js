/***************************************************************************************
/*
/* Buttons:
/*  The green button starts the timer sequence
/* 
/*  The red button stops the timer sequence
/* 
/*  (The white button resets the timer sequence - White button removed)
/* 
/*  The question mark at the top goes to a help page
/* 
/* Timer sequence:
/*  White bar at bottom take one minute to completely fill, left to right
/*  In 5 minutes, a blue bar disappears (visibility:hidden) and beep1.mp3 plays
/*  In another 2 minutes, an orange bar disappears and beep2.mp3 plays
/*  After all 20 bars have dissappeared, the timer is reset and a third alarm occurs
/* 
/***************************************************************************************

/* $(document).ready(function(){ }); = $(function(){ }); */
$(document).ready(function () {
    window.tenBarHeight = parseInt($(".ten").css("height")); // trick to make variable global
    window.twoBarHeight = parseInt($(".two").css("height"));
    $("#helpPage").hide();
});

var TimerVar; // function calls countSeconds() every second
var Secs = 0; // seconds passed
var Mins = 0; // minutes passed
var ONE_SECOND = 1000; //**** should be 1000 for 1 second, speed up to 10 or 100 for testing

function beep(beepID) { // takes audio element beepID and plays it "#beep1" or "#beep2"
    $(beepID).get(0).play();
}

function visibleAll() {
    $(".ten").animate({
        opacity: '100'
    }, 0);
    $(".two").animate({
        opacity: '100'
    }, 0);
    for (var i = 0; i < 5; i++) {
        $($(".ten")[i]).css({
            "height": window.tenBarHeight,
            top: 0
        });
        $($(".two")[i]).css({
            "height": window.twoBarHeight,
            top: 0
        });
    }
}

function blinkMe(n, elem) {
    console.log('blinkMe(' + elem + '[' + n + ']) called');
    var thing = $(elem)[n];
    for (i = 0; i < 29; i++) {
        $(thing).animate({
            opacity: '1'
        }, ONE_SECOND);
        $(thing).animate({
            opacity: '0.5'
        }, ONE_SECOND);
    }
    $(thing).animate({
        opacity: '1'
    }, ONE_SECOND);
}

function numberCountdown() {
    var countDown = 60 - Mins;
    $("#timeUnit").html("&nbsp;&nbsp;&nbsp;" + countDown + "&nbsp;minutes&nbsp;left");
    //	console.log("countDown = " + countDown);
}

function countMinutes() { // called every minute by CountSeconds
    console.log("minute passed: " + Mins);
    if (Mins < 10) { // 1st 10 minutes
        console.log("Mins < 10: " + Mins);
        countBar(0, ".ten");
        if (Mins < 10) { // Why does this work? Mins jumps the gun? fuck, I don't know/
            blinkMe(0, ".ten");
        } else {
            blinkMe(0, ".two");
        };
    } else if (Mins >= 10 && Mins < 12) { // 1st 2 minutes
        console.log("Mins >= 10 && Mins < 12: " + Mins);
        countBar(0, ".two");
        if (Mins < 12) {
            blinkMe(0, ".two");
        } else {
            blinkMe(1, ".ten");
        };
    } else if (Mins >= 12 && Mins < 22) { // 2nd 10 minutes
        console.log("Mins >= 12 && Mins < 22: " + Mins);
        countBar(1, ".ten");
        if (Mins < 22) {
            blinkMe(1, ".ten");
        } else {
            blinkMe(1, ".two");
        };
    } else if (Mins >= 22 && Mins < 24) { // 2nd 2 minutes
        console.log("Mins >= 22 && Mins < 24: " + Mins);
        countBar(1, ".two");
        if (Mins < 24) {
            blinkMe(1, ".two");
        } else {
            blinkMe(2, ".ten");
        };
    } else if (Mins >= 24 && Mins < 34) { // 3rd 10 minutes
        console.log("Mins >= 24 && Mins < 34: " + Mins);
        countBar(2, ".ten");
        if (Mins < 34) {
            blinkMe(2, ".ten");
        } else {
            blinkMe(2, ".two");
        };
    } else if (Mins >= 34 && Mins < 36) { // 3rd 2 minutes
        console.log("Mins >= 34 && Mins < 36: " + Mins);
        countBar(2, ".two");
        if (Mins < 36) {
            blinkMe(2, ".two");
        } else {
            blinkMe(3, ".ten");
        };
    } else if (Mins >= 36 && Mins < 46) { // 4th 10 minutes
        console.log("Mins >= 36 && Mins < 4: " + Mins);
        countBar(3, ".ten");
        if (Mins < 46) {
            blinkMe(3, ".ten");
        } else {
            blinkMe(3, ".two");
        };
    } else if (Mins >= 46 && Mins < 48) { // 4th 2 minutes
        console.log("Mins >= 46 && Mins < 48: " + Mins);
        countBar(3, ".two");
        if (Mins < 48) {
            blinkMe(3, ".two");
        } else {
            blinkMe(4, ".ten");
        };
    } else if (Mins >= 48 && Mins < 58) { // 5th 10 minute
        console.log("Mins >= 48 && Mins < 58: " + Mins);
        countBar(4, ".ten");
        if (Mins < 58) {
            blinkMe(4, ".ten");
        } else {
            blinkMe(4, ".two");
        };
    } else if (Mins >= 58 && Mins < 60) { // 5th 2 minutes
        console.log("Mins >= 58 && Mins < 60: " + Mins);
        countBar(4, ".two");
        if (Mins < 60) {
            blinkMe(4, ".two");
        };
    };

    if (Mins == 10) {
        beep("#beep2");
        $($(".ten")[0]).animate({
            opacity: '0'
        }, ONE_SECOND);
    };
    if (Mins == 12) {
        beep("#beep1");
        $($(".two")[0]).animate({
            opacity: '0'
        }, ONE_SECOND);
    };
    if (Mins == 22) {
        beep("#beep2");
        $($(".ten")[1]).animate({
            opacity: '0'
        }, ONE_SECOND);
    };
    if (Mins == 24) {
        beep("#beep1");
        $($(".two")[1]).animate({
            opacity: '0'
        }, ONE_SECOND);
    };
    if (Mins == 34) {
        beep("#beep2");
        $($(".ten")[2]).animate({
            opacity: '0'
        }, ONE_SECOND);
    };
    if (Mins == 36) {
        beep("#beep1");
        $($(".two")[2]).animate({
            opacity: '0'
        }, ONE_SECOND);
    };
    if (Mins == 46) {
        beep("#beep2");
        $($(".ten")[3]).animate({
            opacity: '0'
        }, ONE_SECOND);
    };
    if (Mins == 48) {
        beep("#beep1");
        $($(".two")[3]).animate({
            opacity: '0'
        }, ONE_SECOND);
    };
    if (Mins == 58) {
        beep("#beep2");
        $($(".ten")[4]).animate({
            opacity: '0'
        }, ONE_SECOND);
    };
    if (Mins == 60) {
        beep("#beep1");
        stop();
    };
}

function countBar(n, elem) { // the nth element is effected
    //	console.log('countBar(' + n + ',' + elem + ') called');
    Mins = Mins + 1;
    var minsMod = Mins % 12;
    var bar = $(elem)[n];
    if (elem == ".ten") {
        var barHeight = window.tenBarHeight;
        var barSegment = barHeight / 10;
        var minsFact = minsMod;
    } else if (elem == ".two") {
        var barHeight = window.twoBarHeight;
        var barSegment = barHeight / 2;
        var minsFact = (minsMod == 11 ? 1 : 2);
    }
    var barChunk = barSegment * minsFact;
    $(bar).css({
        "height": barHeight - (barChunk),
        "top": barChunk
    });
    numberCountdown();
    return barHeight;
    // console.log(barHeight + " - " + barChunk + " = " + (barHeight - barChunk));
}

function timerSequenceStart() {
    //	console.log("timerSequenceStart() called");
    TimerVar = setInterval(function () {
        countSeconds()
    }, ONE_SECOND);
}

function countSeconds() {
    //	console.log("countSeconds() called");
    Secs = Secs + 1;
    var boxWidth = $("#timeBox").css("width");
    var boxSec = parseInt(boxWidth) / 60;
    // console.log("Secs = " + Secs + " | Secs mod 60 = " + Secs % 60 + " | boxWidth = " + boxWidth);
    $("#timeUnit").animate({
        width: boxSec * (Secs % 60)
    }, ONE_SECOND, 'linear');
    if (Secs % 60 == 0) {
        countMinutes();
    }
}

function start() {
    //	console.log("start() called");
    blinkMe(0, '.ten');
    beep("#beep1");
    $("#stop").addClass("click"); // stop button look clickable
    $("#start").removeClass("click"); // start button looks non-clickable
    reset(); // make all bars visible
    timerSequenceStart(); // run timer sequence
}

function stop() {
    //	console.log("stop() called");
    $(".ten").stop(true,true);
    $(".two").stop(true,true);
    $("#stop").removeClass("click"); // rest buttons look non-clickable
    $("#start").addClass("click"); // start button looks clickable
    clearInterval(TimerVar); // stop timer
    reset();
}

function reset() { // for reset button to maybe be put in a later version
    //	console.log('reset() called')
    $("#timeUnit").clearQueue();
    $("#timeUnit").stop();
    $("#timeUnit").animate({
        width: 0
    }, 0);
    $("#timeUnit").html("&nbsp;&nbsp;&nbsp;" + 60 + "&nbspminutes&nbspleft");
    visibleAll();
    clearInterval(TimerVar); // stop timer
    Secs = 0; // reset second counter to 0
    Mins = 0; // reset minute counter to 0
}

function helpPage() {
    // console.log('helpPage() called')
    $("#helpPage").css({
        'display': 'block'
    });
    $("#main").hide();
}

function back() {
    // console.log('back() called')
    $("#main").css({
        'display': 'block'
    });
    $("#helpPage").hide();
}

// Applying START and STOP functions to click state of buttons

$(function () { // start button
    $("#start").click(function () {
        start(); // make all bars visible
    });
});

$(function () { // stop button
    $("#stop").click(function () {
        stop();
    });
});

$(function () { // stop button
    $("#help").click(function () {
        helpPage();
    });
});

$(function () { // stop button
    $("#back").click(function () {
        back();
    });
});