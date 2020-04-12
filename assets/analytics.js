// When user clicks the Analyse Data button charts should generate

// Function to pull the data from the database for a given period of time
var frequencyWO = [0, 0, 0, 0, 0, 0, 0];

function pullDataForCharts() {
    var alldata = firebase.database().ref();
    alldata.on('value', function (snapshot) {
        dataCharts = snapshot.val();
        console.log(dataCharts);

        $.each(dataCharts, function (key, value) {
            console.log(value.day);
            var dayOfweek = value.day;

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

});

