document.addEventListener('DOMContentLoaded', bindButtons(event));


function bindButtons(event) {
    viewLog(event);
    document.getElementById('wSubmit').addEventListener('click', function(event) {
        addWorkout(event);
        viewLog(event);
    });
}


function addWorkout(event) {
    //Base URL for 'insert' request
    const url = 'http://flip1.engr.oregonstate.edu:42560/insert?';

    //Get workout Name
    var name = document.getElementById('wName').value;
    console.log("Name: " + name);
    if (name === '') {
        name = undefined;
    }
    else {
        url = url + 'name=' + name + '&';
    }
    console.log("Name after: " + name);

    //Get workout Reps
    var reps = document.getElementById('wReps').value;
    console.log("Reps: " + reps);
    if (reps === '') {
        reps = undefined;

    }
    else {
        url = url + 'reps=' + reps + '&';
    }
    console.log("Reps after: " + reps);

    //Get workout weight
    var weight = document.getElementById('wWeight').value;
    console.log("Weight: " + weight);
    if (weight === '') {
        weight = undefined;
    }
    else {
        url = url + 'weight=' + weight + '&';
    }
    console.log("Weight after: " + weight);

    var date = document.getElementById('wDate').value;
    console.log("Date before: " + date);
    if (date === '') {
        date = undefined;
    }
    else {
        url = url + 'date=' + date + '&';
    }
    console.log("Date after: " + date);

    var lbs = document.getElementById('wlbs').checked;
    var kgs = document.getElementById('wkgs').checked;
    console.log("Pounds before: " + lbs);
    if (lbs === true) {

        console.log("in pounds");
        lbs = 1;
        url = url + 'lbs=' + lbs;
    }
    else if (kgs === true ) {

        console.log("in kgs");
        lbs = 0;
        url = url + 'lbs=' + lbs;
    }
    else {
        console.log("unit not selected");
        lbs = undefined;
    }
    console.log("Pounds after: " + lbs);

    console.log("Url: " + url);

    var insert = new XMLHttpRequest();
    insert.open('GET', url, true);

    insert.addEventListener('load', function() {
        if(insert.status >= 200 && insert.status < 400) {
            console.log("Insertion successful");
        }
        else {
            console.log("Error in network request: " + insert.statusText);
        }
    });
    insert.send(null);
    event.preventDefault();



}

function viewLog(event){

    var req = new XMLHttpRequest();
    req.open('GET', 'http://flip1.engr.oregonstate.edu:42560/view', true);

    req.addEventListener('load', function() {
        if(req.status >= 200 && req.status < 400){
            var response = JSON.parse(req.responseText);
            console.log(response);


            var removeMe = document.getElementById('tbody');
            if (removeMe != null) {
                var parent = removeMe.parentNode;
                parent.removeChild(removeMe);
            }
            /*
            var deleteMyChildren = document.getElementById('tbody');

            if (deleteMyChildren != null) {
                while (deleteMyChildren.firstChild) {
                    deleteMyChildren.removeChild(deleteMyChildren.firstChild);
                }
            }
            */

            var tb = document.getElementById('tableLog');
            var tbody = document.createElement('tbody');
            tbody.setAttribute("id", "tbody");


            tb.appendChild(tbody);

            for (var i in response) {

                var newRow = document.createElement('tr');
                var e1 = document.createElement('td');
                var e2 = document.createElement('td');
                var e3 = document.createElement('td');
                var e4 = document.createElement('td');
                var e5 = document.createElement('td');
                var e6 = document.createElement('td');

                var nameText = document.createTextNode(response[i].name);
                var repsText = document.createTextNode(response[i].reps);
                var weightText = document.createTextNode(response[i].weight);
                var dateText = document.createTextNode(response[i].date);
                var lbsText = document.createTextNode(response[i].lbs);

                var editButton = document.createElement('input');
                editButton.setAttribute("type", "button");
                editButton.setAttribute("value", "edit");

                var deleteButton = document.createElement('input');
                deleteButton.setAttribute("type", "button");
                deleteButton.setAttribute("value", "delete");

                var hidden = document.createElement('input');
                hidden.setAttribute("type", "hidden");
                hidden.setAttribute("id", response[i].id);

                // Append new row information to existing table
                tbody.appendChild(newRow);

                newRow.appendChild(e1);
                e1.appendChild(nameText);

                newRow.appendChild(e2);
                e2.appendChild(repsText);

                newRow.appendChild(e3);
                e3.appendChild(weightText);

                newRow.appendChild(e4);
                e4.appendChild(dateText);

                newRow.appendChild(e5);
                e5.appendChild(lbsText);

                newRow.appendChild(e6);
                e6.appendChild(hidden);
                e6.appendChild(editButton);
                e6.appendChild(deleteButton);


                console.log("Name " + response[i].name + "\n");
                console.log("Reps " + response[i].reps + "\n");
                console.log("Weight " + response[i].weight + "\n");
                console.log("Date " + response[i].date + "\n");
                console.log("Lbs " + response[i].lbs + "\n");




            }



        }
        else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send(null);
    //event.preventDefault();
}
	