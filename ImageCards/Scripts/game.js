/// <reference path="_references.js" />

$(function () {

    $(window).resize(function () {
        ResizeContent();
    });

    ResizeContent();

    $("img").one('load', function () {
        
        //$(this).css("opacity", 0.5);
        //$(this).animate({ opacity: 0, right: 10 });


    }).each(function () {
        if (this.complete) $(this).load();
    });

    $('img').bind('dragstart', function (event) { event.preventDefault(); });

    $(document).bind("dragstart", function () {
        return false;
    });





});

function ResizeContent()
{
    var windowheight = $(window).height();
    $(".stretch").height(windowheight);

    var imageHeight = windowheight / 2;
    var imageWidth = Math.round((imageHeight / 3) * 4);

    $(".image").width(imageWidth - 5);

    //console.log(activeViewModel.TopCards().length);
    //$("#gameboard").width = ;

}

var previousCard = null;

var card = function (name, id)
{
    var self = this;

    self.Name = ko.observable(name);
    self.Id = ko.observable(id);
    //self.Audio = null;

    self.Select = function ()
    {
        if (previousCard != null)
        {
            previousCard.Selected(false);
            //previousCard.Audio.pause();
        }

        self.Selected(true);

        var myVideo = document.getElementsByTagName('video')[0];
        myVideo.src = "Assets/Sounds/" + self.Id() + ".mp3";
        myVideo.load();
        myVideo.play();

        //self.Audio = new Audio("Assets/Sounds/" + self.Id() + ".wav"); // buffers automatically when created
        //self.Audio.play();

        previousCard = self;
    }

    self.Selected = ko.observable(false);
    //self.Url = ko.observable("Assets/Images/blank.png");

    self.Url = ko.computed(function () {

        if (self.Selected()) {
            return "Assets/Images/" + self.Id() + ".jpg";
        }
        else {
            return "Assets/Images/blank.png";
        }

    }, self);

}

function populateCards()
{
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

    return cards;

}

function randomCard()
{
    var cards = new Array();
    cards[0] = card("Dog", "dog01.jpg");
    cards[1] = card("Cat", "dog01.jpg");
    cards[2] = card("Cat", "dog01.jpg");
    cards[3] = card("Dog", "dog01.jpg");
    cards[4] = card("Cat", "dog01.jpg");
    cards[5] = card("Dog", "dog01.jpg");
    cards[6] = card("Cat", "dog01.jpg");
    cards[7] = card("Dog", "dog01.jpg");
    cards[8] = card("Dog", "dog01.jpg");
    cards[9] = card("Dog", "dog01.jpg");
    cards[10] = card("Dog", "dog01.jpg");

    var randomnumber = Math.floor(Math.random() * 11)

    return cards[randomnumber];

}

var mainViewModel = function ()
{
    var self = this;

    //self.Select = function (data, event) {

    //    PreviousCard.Deselect(false);


    //    console.log(data);

    //    var card = event.currentTarget;
    //    //console.log(card);
    //}

    self.PreviousCard = null;

    self.TopCards = ko.observableArray(populateCards());
    self.BottomCards = ko.observableArray(populateCards());

}