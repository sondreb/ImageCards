/// <reference path="_references.js" />

var previousCard = null;
var phone = navigator.userAgent.match(/Windows Phone/i);

$(function () {

	// Notify the app host that we are running the onload operation.
	// This will ensure text resources are loaded.
	if (phone != null)
	{
		window.external.notify("onload");
	}

	$("img").one('load', function () {

	}).each(function () {
		if (this.complete) $(this).load();
	});

	$('img').bind('dragstart', function (event) { event.preventDefault(); });

	$(document).bind("dragstart", function () {
		return false;
	});

	var tiles = $(".tile_narrow");

	// If the external host is not available, we will make sure to run Initialize on our own.
	if (phone == null) {
		Initialize({
			"AppBarButtonText": "add",
			"ResourceLanguage": "en-US",
			"Turtle": "Turtle",
			"By": "by:",
			"Dog": "Dog",
			"Cat": "Cat",
			"About": "<p>For more games, visit www.brain.no</p>            <p>For your kids' protection, our apps and games for kids will not contain ads or links.</p>            <p>Attributions:</p>            <p>                Martin L(EuroMagic), Magnus Bråth, elizabeth tersigni(ETersigni), John Talbot(jpctalbot),                NoiseCollector, mich3d.            </p>            <p>All content used under Creative Commons Attribution. For complete attribution, visit brain.no</p>",
			"Mouse": "Mouse",
			"AboutBox": "About Image Cards",
			"AppBarMenuItemText": "Menu Item",
			"ResourceFlowDirection": "LeftToRight",
			"ApplicationTitle": "IMAGE CARDS FOR KIDS",
			"Bird": "Bird",
			"Version": "Version: 1.0"
		}
		, false);
	}

});

function BackButton()
{
    mainViewModel.CloseDialog();
}

function Initialize(text, isJSON)
{
	// Create the view model and apply bindings.
	var vm = new mainViewModel();

	// Define the global MainViewModel property.
	mainViewModel = vm;

	// Parse the text resources,  needs to be run before populateCards().
	if (isJSON == null)
	{
		mainViewModel.Text(ko.mapping.fromJSON(text));
	}
	else
	{
		mainViewModel.Text(ko.mapping.fromJS(text));
	}
	
	mainViewModel.Cards = ko.observableArray(populateCards());

	ko.applyBindings(mainViewModel, document.body);
}

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

		//self.Audio = new Audio("Assets/Sounds/" + self.Id() + ".mp3"); // buffers automatically when created
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

	if (theme == "Dark")
	{
		$("body").css("color", "white");
	}
	else
	{
		$("body").css("color", "black");
	}
}

function populateCards() {
	var cards = new Array();

	cards[0] = new card(mainViewModel.Text().Dog(), "dog01");
	cards[1] = new card(mainViewModel.Text().Dog(), "dog02");
	cards[2] = new card(mainViewModel.Text().Dog(), "dog03");
	cards[3] = new card(mainViewModel.Text().Dog(), "dog04");
	cards[4] = new card(mainViewModel.Text().Cat(), "cat01");
	cards[5] = new card(mainViewModel.Text().Cat(), "cat02");
	cards[6] = new card(mainViewModel.Text().Cat(), "cat03");
	cards[7] = new card(mainViewModel.Text().Cat(), "cat04");
	cards[8] = new card(mainViewModel.Text().Bird(), "bird01");
	cards[9] = new card(mainViewModel.Text().Bird(), "bird02");
	cards[10] = new card(mainViewModel.Text().Bird(), "bird03");
	cards[11] = new card(mainViewModel.Text().Bird(), "bird04");
	cards[12] = new card(mainViewModel.Text().Mouse(), "mouse01");
	cards[13] = new card(mainViewModel.Text().Mouse(), "mouse02");
	cards[14] = new card(mainViewModel.Text().Mouse(), "mouse03");
	cards[15] = new card(mainViewModel.Text().Turtle(), "turtle01");
	cards[16] = new card(mainViewModel.Text().Turtle(), "turtle02");
	cards[17] = new card(mainViewModel.Text().Turtle(), "turtle03");

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

var mainViewModel = function (text) {
	var self = this;

	self.PreviousCard = null;

	self.Text = ko.observable();
	self.Cards = ko.observableArray();
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

	self.CloseDialog = function ()
	{
	    if ($("#about").is(":visible")) {
	        self.About();
	    }
	}

	self.About = function () {
	    if ($("#about").is(":visible")) {

			$("#about").hide();
			$("#gameboard").fadeIn();

			if (phone != null) {
			    window.external.notify("closedialog");
			}

		}
	    else {

			$("#gameboard").hide();
			$("#about").fadeIn();

			if (phone != null) {
			    window.external.notify("opendialog");
			}

		}
	}
}