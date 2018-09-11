$(function () {

    function displayData(data) {
        $('#schools-table').bootstrapTable({
            data: data,
            pagination: true,
            search: true,
            sortable: true,
            columns: [{
                field: 'URN',
                title: 'URN',
                sortable: true
            }, {
                field: 'Address',
                title: 'Address',
                sortable: true
            }, {
                field: 'PUPILS',
                title: 'Num Pupils',
                sortable: true
            }, {
                field: 'TOTALEXPENDITURE',
                title: 'Spend Per Pupil',
                sortable: true
            },]
        });
    }

    function initFirebase() {
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyAD15SQTbfsE5sYrARvws3MzCaskXmzwjQ",
            authDomain: "tutor-interventi-1523169861738.firebaseapp.com",
            databaseURL: "https://tutor-interventi-1523169861738.firebaseio.com",
            projectId: "tutor-interventi-1523169861738",
            storageBucket: "tutor-interventi-1523169861738.appspot.com",
            messagingSenderId: "122898722954"
        };
        firebase.initializeApp(config);
        var ref = firebase.database().ref();

        ref.on("value", function (snapshot) {
            var data = snapshot.val();
            displayData(data);
        });
    }

    initFirebase();


});