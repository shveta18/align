// When user clicks the Analyse Data button charts should generate

// Function to pull the data from the database for a given period of time
var frequencyWO = [0, 0, 0, 0, 0, 0, 0];
var freqTimeOfdayWO = [0, 0, 0, 0];
var daysWorkedOut = 0;
var daysMuscleSore = 0;
var daysLazy = 0;

function pullDataForCharts() {
    var alldata = firebase.database().ref();
    alldata.on('value', function (snapshot) {
        dataCharts = snapshot.val();
        console.log(dataCharts);

        $.each(dataCharts, function (key, value) {
            console.log(value.day);
            console.log(value.workoutDays);
            var dayOfweek = value.day;
            var timeOfDay = value.timeOfDay;

            if (value.workoutDays == true) {
                if (dayOfweek === "Sunday") {
                    console.log("Print for Sunday");
                    var oldCount = frequencyWO[0];
                    frequencyWO[0] = oldCount + 1;
                    console.log(frequencyWO);
                } else if (dayOfweek === "Monday") {
                    var oldCount = frequencyWO[1];
                    frequencyWO[1] = oldCount + 1;
                    console.log(frequencyWO);
                } else if (dayOfweek === "Tuesday") {
                    var oldCount = frequencyWO[2];
                    frequencyWO[2] = oldCount + 1;
                    console.log(frequencyWO);
                } else if (dayOfweek === "Wednesday") {
                    var oldCount = frequencyWO[3];
                    frequencyWO[3] = oldCount + 1;
                    console.log(frequencyWO);
                } else if (dayOfweek === "Thursday") {
                    var oldCount = frequencyWO[4];
                    frequencyWO[4] = oldCount + 1;
                    console.log(frequencyWO);
                } else if (dayOfweek === "Friday") {
                    var oldCount = frequencyWO[5];
                    frequencyWO[5] = oldCount + 1;
                    console.log(frequencyWO);
                } else if (dayOfweek === "Saturday") {
                    var oldCount = frequencyWO[6];
                    frequencyWO[6] = oldCount + 1;
                    console.log(frequencyWO);
                }
                console.log("workout days recorded");
            }

            if (value.workoutDays === true) {
                if (timeOfDay === "Morning") {
                    var oldCount = freqTimeOfdayWO[0];
                    freqTimeOfdayWO[0] = oldCount + 1;
                    console.log(freqTimeOfdayWO);
                } else if (timeOfDay === "Afternoon") {
                    var oldCount = freqTimeOfdayWO[1];
                    freqTimeOfdayWO[1] = oldCount + 1;
                } else if (timeOfDay === "Evening") {
                    var oldCount = freqTimeOfdayWO[2];
                    freqTimeOfdayWO[2] = oldCount + 1;
                } else if (timeOfDay === "Late Night") {
                    var oldCount = freqTimeOfdayWO[3];
                    freqTimeOfdayWO[3] = oldCount + 1;
                }
            }

            // if (value.workoutDays === true) {
            //     var oldCount = daysWorkedOut;
            //     daysWorkedOut = oldCount + 1;
            //     console.log(daysWorkedOut);
            // } else if (value.muscleSoreDays === true) {
            //     var oldCount = daysMuscleSore;
            //     daysMuscleSore = oldCount + 1;
            //     console.log(daysMuscleSore);
            // } else if (value.lazyDays === true) {
            //     var oldCount = daysLazy;
            //     daysLazy = oldCount + 1;
            //     console.log(daysLazy);
            // }
        });
    console.log("the total is" + daysWorkedOut);
    console.log("Freq workout: "+ frequencyWO);

    });
};
pullDataForCharts();

$("#generate-chart").on("click", function () {
    event.preventDefault();
    console.log("Freq workout: "+ frequencyWO);
    var ctx1 = document.getElementById('chart-day-freq').getContext('2d');
    var chartDayFreq = new Chart(ctx1, {
        // The type of chart we want to create  
        type: 'bar',

        // The data for our dataset
        data: {
            labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            datasets: [{
                label: 'Days Worked Out',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: frequencyWO
            }]
        },

        // Configuration options go here
        options: {}
    });

    var ctx2 = document.getElementById('chart-date-freq').getContext('2d');
    var chartTimeFreq = new Chart(ctx2, {
        // The type of chart we want to create  
        type: 'bar',

        // The data for our dataset
        data: {
            labels: ['Morning', 'Afternoon', 'Evening', 'Late Night'],
            datasets: [{
                label: 'Time of Day Worked Out',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: freqTimeOfdayWO
            }]
        },

        // Configuration options go here
        options: {}
    });

    // var ctx3 = document.getElementById('chart-activity').getContext('2d');
    // var chartTimeFreq = new Chart(ctx3, {
    //     // The type of chart we want to create  
    //     type: 'bar',

    //     // The data for our dataset
    //     data: {
    //         labels: ['Workout', 'DOMS', 'Lazy'],
    //         datasets: [{
    //             label: 'My First dataset',
    //             backgroundColor: 'rgb(255, 99, 132)',
    //             borderColor: 'rgb(255, 99, 132)',
    //             data: [daysWorkedOut, daysMuscleSore, daysMuscleSore]
    //         }]
    //     },

    //     // Configuration options go here
    //     options: {}
    // });

});




