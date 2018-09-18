$(document).ready(function () {

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAQhZMSlxhQeQd2YWr0hwDN6jIZXjfr_7U",
  authDomain: "train-scheduler-activity.firebaseapp.com",
  databaseURL: "https://train-scheduler-activity.firebaseio.com",
  projectId: "train-scheduler-activity",
  storageBucket: "train-scheduler-activity.appspot.com",
  messagingSenderId: "211722135707"
};
firebase.initializeApp(config);

  // Create a variable to reference the database
  var database = firebase.database();

    // var trainName = "";
    // var destination = "";
    // var trainTime = "";
    // var Frequency = "";
    

    $("#subButton").on("click", function(event) {
      // Prevent the page from refreshing
      event.preventDefault();

      // Get inputs
      trainName = $("#trainName").val().trim();
      destination = $("#destination").val().trim();
      trainTime = $("#trainTime").val().trim();
      Frequency = $("#frequency").val().trim();

      // Change what is saved in firebase
      database.ref().push({
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        Frequency: Frequency,
      });
    });


    database.ref().on("child_added", function (childSnapshot) {

      var viewTrain = childSnapshot.val().trainName;
      var viewLocation = childSnapshot.val().destination;
      var viewtrainTime = childSnapshot.val().trainTime;
      var newFreq = childSnapshot.val().Frequency;
      console.log(viewTrain);
  
      var startTimeConverted = moment(viewtrainTime, "hh:mm").subtract(1, "years");

      // Current Time
      var currentTime = moment();
  
      // Difference between the times
      var diffTime = moment().diff(moment(startTimeConverted), "minutes");
  
      // Time apart (remainder)
      var tRemainder = diffTime % newFreq;
  
      // Minute(s) Until Train
      var tMinutesTillTrain = newFreq - tRemainder;
  
      // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      var catchTrain = moment(nextTrain).format("HH:mm");
  
      // Display On Page
      $("#all-display").append(
        ' <tr><td>' + viewTrain +
        ' </td><td>' + viewLocation +
        ' </td><td>' + newFreq +
        ' </td><td>' + catchTrain +
        ' </td><td>' + tMinutesTillTrain + ' </td></tr>');
  
      // Clear input fields
      $("#trainName, #destination, #trainTime, #interval").val("");
      return false;
    },
      //Handle the errors
      function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });




}); //end document ready