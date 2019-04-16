  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC61-jvAq_u1HQyaBNtmiTDvtQq9sKmjI8",
    authDomain: "cslane64.firebaseapp.com",
    databaseURL: "https://cslane64.firebaseio.com",
    projectId: "cslane64",
    storageBucket: "cslane64.appspot.com",
    messagingSenderId: "369623799386"
  };
  firebase.initializeApp(config);

  var trainData = firebase.database();
  

    $("#add-train-data-btn").on("click", function(){
    var name = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = moment($("#first-train-input").val().trim(), "HH:mm").format("X");
    var frequency = $("#frequency-input").val().trim();

    var trains = {
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    }

    trainData.ref().push(trains);

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");

    return false;
});

trainData.ref().on("child_added", function(snapshot) {
    
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var firstTrain = snapshot.val().firstTrain;
    var frequency = snapshot.val().frequency;

    var lastTrain = moment().diff(moment.unix(firstTrain), "minutes")%frequency;
    var nextTrain = frequency - lastTrain;
    var arrival = moment().add(nextTrain, "m").format("hh:mm A");

    console.log(lastTrain);
    console.log(nextTrain);
    console.log(arrival);
  
    
    
    $("#schedule-table > tBody").append("<tr class='train-row'><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td><span class = 'span'>"+nextTrain+"</span></td></tr>");

    
});
