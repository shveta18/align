// Display today's date on the page
function refreshTime() {
    var todaysDate = moment().format("DD-MMMM-YYYY");
    var dayOfWeek = moment().format('dddd');
    $("#display-todays-date").html(todaysDate);
    $("#display-day-of-week").html(dayOfWeek);
    console.log("Ran refreshTime function");
};
refreshTime();


// clear out button selections on page
function clearSelections() {
    $("#workout").attr("aria-pressed", "false").removeClass("active btn-success");
    $("#skip-lazy").attr({ 'aria-pressed': "false" }).removeClass("active btn-danger");
    $("#skip-musclesoreness").attr("aria-pressed", "false").removeClass("active btn-primary");
    $("#timeOfDay-buttons").css("display", "none");
    console.log("Ran clearSelections function");
    
};

// clear out all stored data in firebase
function resetData() {
    clickWorkout = false;
    clickMuscleSore = false;
    clickLazy = false;
    clickTimeOfDay = "";
    console.log("ran resetData function");
};

// clear out time of day button selections on page
function resetTimeOfDay() {
    $(".timeOfDay").attr("aria-pressed", "false").removeClass("active btn-info").addClass("inactive btn-outline-info");
    console.log("Ran resetTimeOfDay function");
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


// grab the existing data from firebase for a particular date
function pullFromDb() {
    // check if data exists for the current date in firebase
    var checkData = firebase.database().ref(date);

    checkData.on('value', function(snapshot) {
        // on page load clear out any button selections on main buttons and time of day buttons
        clearSelections();
        resetTimeOfDay();
        
        dataReturned = snapshot.val();

        if (dataReturned != null) {
            if (dataReturned.workoutDays === true) {
                $("#workout").attr("aria-pressed", "true").addClass("active btn-success");
                $("#timeOfDay-buttons").css("display", "block");

                if (dataReturned.timeOfDay != null) {
                    if (dataReturned.timeOfDay === "Morning") {
                        $("#morning").attr("aria-pressed", "true").addClass("active btn-info");
                    }
                    else if (dataReturned.timeOfDay === "Afternoon") {
                        $("#afternoon").attr("aria-pressed", "true").addClass("active btn-info");
                    }
                    else if (dataReturned.timeOfDay === "Evening") {
                        $("#evening").attr("aria-pressed", "true").addClass("active btn-info");
                    }
                    else {
                        $("#late-night").attr("aria-pressed", "true").addClass("active btn-info");
                    }
                }
                else {
                    console.log("No time of day was selected");
                }
            }
            else if (dataReturned.muscleSoreDays === true) {
                console.log("muscles sore recorded for this date");
                $("#skip-musclesoreness").attr("aria-pressed", "true").addClass("active btn-primary");
            }
            else if (dataReturned.lazyDays === true) {
                console.log("lazy day recorded for this date");
                $("#skip-lazy").attr({ 'aria-pressed': "true" }).addClass("active btn-danger");
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
        console.log("Ran getBackDate function - back date: " + backDate);
        $("#display-todays-date").html(backDate);
        $("#display-day-of-week").html(backDay);
        date = backDate;
        day = backDay;
    };
    getBackDate();
    pullFromDb();
    checkWeightEntry();
    resetAnalyzeDataButton();
});

$(".forward-date").on("click", function () {
    function getForwardDate() {
        var forwardDate = currentDate.add(1, 'days').format("DD-MMMM-YYYY");
        var forwardDay = currentDate.format('dddd');
        console.log("Ran getForwardDate function - forward date: " + forwardDate);
        $("#display-todays-date").html(forwardDate);
        $("#display-day-of-week").html(forwardDay);
        date = forwardDate;
        day = forwardDay;
    };
    getForwardDate();
    pullFromDb();
    checkWeightEntry();
    resetAnalyzeDataButton();
});

// function to check if weight exists in firebase
// if yes, then store this value in the weight var to display on text field on page
// if no, then display empty field on page load
function checkWeightEntry() {
    var checkData = firebase.database().ref(date);
    checkData.on('value', function (snapshot) {
        var dataReturned = snapshot.val();
        try {
            var weightReturned = parseFloat(dataReturned.weight);
            if (weightReturned > 0.0) {
                weight = weightReturned;
                $("#input-weight").val(weight);
            }
            else {
                $("#input-weight").val("");
            }
        } catch (error) {
            console.log("ERROR: No weight key in the db exists");
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
    

//    $(".timeOfDay").on("click", function () {
//         // get which button was clicked and store in var
        
//         clickTimeOfDay = $(this).val();
//         $(this).addClass("active btn-info").removeClass("inactive btn-outline-info");
//         console.log("The time of day clicked is: " + clickTimeOfDay);
        

//         firebase.database().ref(date).set({
//             workoutDays: clickWorkout,
//             muscleSoreDays: clickMuscleSore,
//             lazyDays: clickLazy,
//             timeOfDay: clickTimeOfDay,
//             weight: weight,
//             day: day
//         });
//     });
});

$(".timeOfDay").on("click", function () {
        
    //resetTimeOfDay();
    clickWorkout = true;
    
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


// If user enters anything other than numbers for weight the box should be red
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

