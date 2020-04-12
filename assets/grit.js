// Display today's date on the page
function refreshTime() {
    var todaysDate = moment().format("DD-MMMM-YYYY");
    var dayOfWeek = moment().format('dddd');
    $("#display-todays-date").html(todaysDate);
    $("#display-day-of-week").html(dayOfWeek);
};
refreshTime();


// clear out all selections on the buttons 
function clearSelections() {
    $("#workout").attr("aria-pressed", "false").removeClass("active");
    $("#skip-lazy").attr({ 'aria-pressed': "false" }).removeClass("active");
    $("#skip-musclesoreness").attr("aria-pressed", "false").removeClass("active");
    $("#timeOfDay-buttons").css("display", "none");
};

// clear out all stored data in firebase
function resetData() {
    clickWorkout = false;
    clickMuscleSore = false;
    clickLazy = false;
    clickTimeOfDay = "";
};

function resetTimeOfDay() {
    $(".timeOfDay").attr("aria-pressed", "false").removeClass("active");
};

var firebaseConfig = {
    apiKey: "AIzaSyA6KPfNXqtMU0Xb8zJxuk7XpOVqZiuaIIE",
    authDomain: "project-align.firebaseapp.com",
    databaseURL: "https://project-align.firebaseio.com",
    projectId: "project-align",
    storageBucket: "project-align.appspot.com",
    messagingSenderId: "992009557306",
    appId: "1:992009557306:web:ece9a9460a4b8f5403ec03"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var storedInFirebase = firebase.database();

// create variables to store the number of instances when a button was clicked
var clickWorkout = false;
var clickLazy = false;
var clickMuscleSore = false;
var date = $("#display-todays-date").text(); // grab the value of the date from what is populated on the page
var day = $("#display-day-of-week").text(); // grab value of day from what is populated on the page
var clickTimeOfDay = "";
var weight = 0;

//setInterval(function () { refreshTime() }, 10000);
// grab the existing data from firebase for a particular date
function pullFromDb() {
    // check if data exists for the current date
    var checkData = firebase.database().ref(date);

    checkData.on('value', function(snapshot) {
        clearSelections();
        resetTimeOfDay();
        dataReturned = snapshot.val();

        if (dataReturned != null) {
            console.log("Okay something exists for this date");

            if (dataReturned.workoutDays === true) {
                console.log("workout recorded for this date");
                $("#workout").attr("aria-pressed", "true").addClass("active");
                $("#timeOfDay-buttons").css("display", "block");

                if (dataReturned.timeOfDay != null) {
                    if (dataReturned.timeOfDay === "Morning") {
                        console.log("Morning was selected");
                        $("#morning").attr("aria-pressed", "true").addClass("active");
                    }

                    else if (dataReturned.timeOfDay === "Afternoon") {
                        console.log("Afternoon was selected");
                        $("#afternoon").attr("aria-pressed", "true").addClass("active");
                    }

                    else if (dataReturned.timeOfDay === "Evening") {
                        console.log("Evening was selected");
                        $("#evening").attr("aria-pressed", "true").addClass("active");
                    }

                    else {
                        console.log("Late night was selected");
                        $("#late-night").attr("aria-pressed", "true").addClass("active");
                    }
                }
                else {
                    console.log("No time of day was selected");
                }
            }

            else if (dataReturned.muscleSoreDays === true) {
                console.log("muscles sore recorded for this date");
                $("#skip-musclesoreness").attr("aria-pressed", "true").addClass("active");
            }

            else if (dataReturned.lazyDays === true) {
                console.log("lazy day recorded for this date");
                $("#skip-lazy").attr({ 'aria-pressed': "true" }).addClass("active");
            }
            else {
                console.log("None clicked");
            }
        }
        else {
            console.log("No data stored for this date.");
        }
    });
};

pullFromDb();


// if the user wants, they can toggle  back and forth between dates
var currentDate = moment();
$(".back-date").on("click", function () {
    function getBackDate() {
        var backDate = currentDate.subtract(1, 'days').format("DD-MMMM-YYYY");
        var backDay = currentDate.format('dddd');
        console.log("back date: " + backDate);
        $("#display-todays-date").html(backDate);
        $("#display-day-of-week").html(backDay);
        date = backDate;
        day = backDay;
    };
    getBackDate();
    pullFromDb();
    checkWeightEntry();
});

$(".forward-date").on("click", function () {
    function getForwardDate() {
        var forwardDate = currentDate.add(1, 'days').format("DD-MMMM-YYYY");
        var forwardDay = currentDate.format('dddd');
        console.log("forward date: " + forwardDate);
        $("#display-todays-date").html(forwardDate);
        $("#display-day-of-week").html(forwardDay);
        date = forwardDate;
        day = forwardDay;
    };
    getForwardDate();
    pullFromDb();
    checkWeightEntry();
});

// function to check if weight exists
// if yes, then store this value in a var and push to db

function checkWeightEntry() {
    var checkData = firebase.database().ref(date);
    checkData.on('value', function (snapshot) {
        var dataReturned = snapshot.val();
        try {
            var weightReturned = parseFloat(dataReturned.weight);
            if (weightReturned > 0.0) {
                weight = weightReturned;
                console.log("weight exists for today already: " + weight);
                $("#input-weight").val(weight);
            }
            else {
                $("#input-weight").val("");
            }

        } catch (error) {
            console.log("No weight key in the db exists");
            $("#input-weight").val("");
        }
    });
};
checkWeightEntry();


// click event for workout days
$("#workout").on("click", function () {
    resetData();
    clearSelections();
    checkWeightEntry();
    clickWorkout = true;
    $("#timeOfDay-buttons").css("display", "block");

    $(".timeOfDay").on("click", function () {
        resetTimeOfDay();
        clickTimeOfDay = $(this).val();

        firebase.database().ref(date).set({
            workoutDays: clickWorkout,
            muscleSoreDays: clickMuscleSore,
            lazyDays: clickLazy,
            timeOfDay: clickTimeOfDay,
            weight: weight,
            day: day
        });
    });
});

// click event for muscle sore days
$("#skip-musclesoreness").on("click", function () {
    resetData();
    clearSelections();
    clickMuscleSore = true;
  
    firebase.database().ref(date).set({
        workoutDays: clickWorkout,
        muscleSoreDays: clickMuscleSore,
        lazyDays: clickLazy,
        timeOfDay: clickTimeOfDay,
        day: day
    });
});

// click event for lazy days
$("#skip-lazy").on("click", function () {
    resetData();
    clearSelections();
    clickLazy = true;

    firebase.database().ref(date).set({
        workoutDays: clickWorkout,
        muscleSoreDays: clickMuscleSore,
        lazyDays: clickLazy,
        timeOfDay: clickTimeOfDay,
        day: day
    });
});

// The isNumeric function taken from --
// https://rosettacode.org/wiki/Determine_if_a_string_is_numeric#JavaScript
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

$("#input-weight").keypress(function () {
    var value = $("#input-weight").val().trim();
    if (isNumeric(value)) {
        // change the box to blue
        $("#input-weight").removeClass("is-invalid").removeClass("form-control");
        $("#errordiv").remove();
    }
    else {
        // change the box to red and disable submit button.
        // if a string is being added, remove the is-invalid class and div and re-add
        // so that for each keypress a new div with error message doesn't display.
        $("#input-weight").removeClass("is-invalid").removeClass("form-control");
        $("#errordiv").remove();
        $("#input-weight").addClass("is-invalid").addClass("form-control");
        var newDiv = $("<div id='errordiv'>");
        newDiv.addClass("invalid-feedback");
        newDiv.append("<p>Please enter a valid number</p>");
        $("#input-weight").parent().append(newDiv);
    }
});


// when the weight is submitted, update the database with the weight and
// do not override the existing data for the workout selection
$(".submit-button").on("click", function () {
    event.preventDefault();
    var weight = $("#input-weight").val().trim();
    var update = { weight: weight };
    firebase.database().ref(date).update(update);
});

// weather API
var cityName = "Toronto";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=142364713f5047ff8aab04a72c5a2317"

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    var temp = response.main.temp;
    var tempFeelsLike = response.main.feels_like;
    var weatherDesc = response.weather[0].main;

    $("#temp").text(temp);
    $("#temp-feels-like").text(tempFeelsLike);
    $("#weather-desc").text(weatherDesc);
});

// INSPIRATIONAL Quote of the day API
// 10 requests per hour MAX
var quoteURL = "https://quotes.rest/qod?category=inspire";

$.ajax({
    url: quoteURL,
    method: "GET",
    dataType: "json"
}).then(function (response) {
    var quote = response.contents.quotes[0].quote;
    $("#qotd").text(quote);
});
