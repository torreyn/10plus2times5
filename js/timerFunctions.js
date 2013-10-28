/***************************************************************************************
/*
/* Buttons:
/*  The green button starts the timer sequence
/* 
/*  The red button stops the timer sequence
/* 
/*  The white button resets the timer sequence
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

function beep(beepID) { // takes audio element beepID and plays it
	$(beepID).get(0).play();
}

function invisBar(x,elem) { // takes the xth elem and makes it invisible, but still in the flow of the document
	x = (x == undefined) ? 1 : x; // set the default value of x to 1
	elem = (elem == undefined) ? ".ten" : elem; // set the default value of elem to ".ten"
	$($(elem)[x-1]).animate({opacity:'0'});
//  the below 3 line are the same as the line above
//	allElems = $(elem);
//	firstElem = allElems[x-1];
//	$(firstElem).animate({opacity:'0'});
}

function visibleAll() {
	$(".ten").animate({opacity:'100'},0);
	$(".two").animate({opacity:'100'},0);
}

function minBar(boxWidth) { // make bar fill in one minute
	$("#timeUnit")
	.animate({width:boxWidth},1000*60, 'linear') // set 10 back to 1000
	.animate({width:0},0);
}

// x = amount of times timer goes
// n = hides the nth element of class elem
// elem = element class to hide
// snd = sound to beep at end of function
function timeChunk(x, n, elem, snd) {
	// console.log("timeChunk() called")
	x = (x == undefined) ? 1 : x; // set the default value of x to 1
	var boxWidth = $("#timeBox").css("width");
	for (var i=0; i<x - 1; i++) {	// loop for x - 1 ...
		$("#timeUnit")
		.animate({width:boxWidth},1000*60, 'linear') // set 10 back to 1000
		.animate({width:0},0);
		$("#countdown").html("&#35;");
	}
	$("#timeUnit")				// then execute one more time ...
	.animate({width:boxWidth},1000*60, 'linear')     // set 10 back to 1000
	.animate({width:0},0,
	function(){ 
		beep(snd);				// and then beep ...
		invisBar(n,elem);		// and hide a time bar.
	});
}

function timerSequenceStart(x) {   // loop timeChunk x amount of times
	x = (x == undefined) ? 10 : x; // set the default value of x to 10
	$("#countdown").html("9");     // initiate countdown timer to 9
	for (var i=0; i<x; i++) {
		timeChunk(10,i+1,".ten","#beep1");
		timeChunk(2,i+1,".two", "#beep2");
	}
}

function start(){
	$("#stop").addClass("click");	        // stop button look clickable
	$("#start").removeClass("click");		// start button looks non-clickable
	timerSequenceStart(5);					// run timer sequence
	visibleAll();							// make all bars visible
}

function stop(){
	$("#stop").removeClass("click");		// rest buttons look non-clickable
	$("#start").addClass("click");			// start button looks clickable
	$("#timeUnit").clearQueue();
	$("#timeUnit").stop();
	$("#timeUnit").animate({width:0},0);
	visibleAll();
	$("#countdown").html("10");
}

// Applying START and STOP functions

$(function() { // start button
	$("#start").click(function(){
		start();						// make all bars visible
	});
});

$(function() { // stop button
	$("#stop").click(function() {
		stop();
	});
});