// When user clicks the Analyse Data button charts should generate

// Function to pull the data from the database for a given period of time
var frequencyWO = [0, 0, 0, 0, 0, 0, 0];
var freqTimeOfdayWO = [0, 0, 0, 0];

function pullDataForCharts() {
    var alldata = firebase.database().ref();
    alldata.on('value', function (snapshot) {
        dataCharts = snapshot.val();
        console.log(dataCharts);

        $.each(dataCharts, function (key, value) {
            console.log(value.day);
            var dayOfweek = value.day;
            var timeOfDay = value.timeOfDay;

            if (value.workoutDays === true) {
                if (dayOfweek === "Sunday") {
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

        });
    });
};
pullDataForCharts();

$("#generate-chart").on("click", function () {
    event.preventDefault();

    var ctx1 = document.getElementById('chart-day-freq').getContext('2d');
    var chartDayFreq = new Chart(ctx1, {
        // The type of chart we want to create  
        type: 'bar',

        // The data for our dataset
        data: {
            labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: frequencyWO
            }]
        },

        // Configuration options go here
        options: {}
    });

    var ctx = document.getElementById('chart-date-freq').getContext('2d');
    var chartTimeFreq = new Chart(ctx, {
        // The type of chart we want to create  
        type: 'bar',

        // The data for our dataset
        data: {
            labels: ['Morning', 'Afternoon', 'Evening', 'Late Night'],
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: freqTimeOfdayWO
            }]
        },

        // Configuration options go here
        options: {}
    });

});

