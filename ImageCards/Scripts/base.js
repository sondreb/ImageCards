/// <reference path="_references.js" />

$(function () {

    $("img").one('load', function () {

    }).each(function () {
        if (this.complete) $(this).load();
    });

    $('img').bind('dragstart', function (event) { event.preventDefault(); });

    $(document).bind("dragstart", function () {
        return false;
    });

    var tiles = $(".tile_narrow");

    //tiles.each(function () {
    //    $(this).css("transform-origin", this.offsetLeft * -1 - 24 + "px 50%");
    //    $(this).css("transform", "perspective(800px) rotateY(-90deg)");
    //});

    //setTimeout(function () {
    //    tiles.each(function (idx) { 

    //        $(this).css({
    //            "transform" : "rotateY(0deg)", 
    //            "transition-duration": "1s"
    //        });

    //    });

    //    $(this).bind("transitionend", function () {
    //        $(this).css({
    //            "transition": "none",
    //            "transform-origin": "50% 50%"
    //        })
    //    });

    //    }, 500);


    //tiles.bind("MSPointerMove MSPointerUp MSPointerCancel", function (event) {
    //    switch (event.type)
    //    {
    //        case "MSPointerUp":
    //        case "MSPointerCancel":
    //            tiles.each(function () {
    //                $(this).css("transform", "rotate3d(1, 1, 1, 0deg)");
    //            });
    //            break;
    //        case "MSPointerMove":
    //            //$(this).css("transform", calculateTransform(event.originalEvent.offsetX);
    //            break;
    //    }
    //});

});

var previousCard = null;

var card = function (name, id) {
    var self = this;
    self._name = name;
    self.Id = ko.observable(id);

    self.Select = function (event, source) {

        if (previousCard != null) {
            previousCard.Selected(false);
        }

        previousCard = self;

        var target = $(source.currentTarget);

        target.removeClass("flip").addClass("flip");
        var wait = window.setTimeout(function () {
            target.removeClass("flip")
        },
			1200
		);

        var wait = window.setTimeout(function () {

            self.Selected(true);

            var myVideo = document.getElementsByTagName('audio')[0];
            myVideo.src = "Assets/Sounds/" + self.Id() + ".mp3";
            myVideo.load();
            myVideo.play();

        }, 200);



        //self.Audio = new Audio("Assets/Sounds/" + self.Id() + ".wav"); // buffers automatically when created
        //self.Audio.play();
    }


    self.Selected = ko.observable(false);

    self.Url = ko.computed(function () {

        if (self.Selected()) {
            return "url(Assets/Images/" + self.Id() + ".jpg)";
        }
        else {
            return "url()";
        }

    }, self);

    self.Name = ko.computed(function () {

        if (self.Selected()) {
            return self._name;
        }
        else {
            return "?";
        }

    }, self);

}

function changeTheme(theme)
{
    mainViewModel.Theme(theme);

    if (theme == "True")
    {
        $("body").css("color", "white");
    }
    else
    {
        $("body").css("color", "black");
        //$(".icon").css("filter", "invert");
    }
}

function populateCards() {
    var cards = new Array();

    cards[0] = new card("Dog", "dog01");
    cards[1] = new card("Dog", "dog02");
    cards[2] = new card("Dog", "dog03");
    cards[3] = new card("Dog", "dog04");
    cards[4] = new card("Cat", "cat01");
    cards[5] = new card("Cat", "cat02");
    cards[6] = new card("Cat", "cat03");
    cards[7] = new card("Cat", "cat04");
    cards[8] = new card("Bird", "bird01");
    cards[9] = new card("Bird", "bird02");
    cards[10] = new card("Bird", "bird03");
    cards[11] = new card("Bird", "bird04");
    cards[12] = new card("Mouse", "mouse01");
    cards[13] = new card("Mouse", "mouse02");
    cards[14] = new card("Mouse", "mouse03");
    cards[15] = new card("Turtle", "turtle01");
    cards[16] = new card("Turtle", "turtle02");
    cards[17] = new card("Turtle", "turtle03");

    arrayShuffle(cards);

    return cards;
}

function arrayShuffle(theArray) {
    var len = theArray.length;
    var i = len;
    while (i--) {
        var p = parseInt(Math.random() * len);
        var t = theArray[i];
        theArray[i] = theArray[p];
        theArray[p] = t;
    }
};

var mainViewModel = function () {
    var self = this;

    self.PreviousCard = null;
    self.Cards = ko.observableArray(populateCards());


    self.Theme = ko.observable("Dark");

    self.LogoUrl = ko.computed(function () {
        return "Assets/brain_" + self.Theme() + ".png";
    }, self);

    self.BackIconUrl = ko.computed(function () {
        return "Assets/Icons/" + self.Theme() + "/back.png";
    }, self);

    self.BackIconBackgroundUrl = ko.computed(function () {
        return "url(Assets/Icons/" + self.Theme() + "/basecircle.png)";
    }, self);

    self.About = function () {
        if ($("#about").is(":visible")) {
            $("#about").hide();
            $("#gameboard").fadeIn();
        }
        else {
            $("#gameboard").hide();
            $("#about").fadeIn();
        }
    }
}