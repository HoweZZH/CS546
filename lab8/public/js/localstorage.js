// Remember, we're in a browser: prevent global variables from happening
// I am passing the jQuery variable into the IIFE so that
// I don't have to rely on global variable name changes in the future
(function ($, localStorage) {
    //location hash:
    if (!localStorage["locationHash"]) {
        localStorage["locationHash"] = location.hash;
    }
    $(window).bind('hashchange', function() {
        localStorage["locationHash"] =location.hash;
        resetTable();
        console.log(localStorage["locationHash"]);
    }); 
    //interval
    if (!localStorage["1.5secondsOccurred"]) {
        localStorage["1.5secondsOccurred"] = JSON.stringify(0);
    }
    var currentIterations =JSON.parse(localStorage["1.5secondsOccurred"]);
    var iteration=currentIterations;
    var intervalResult = $("#the-interval .result");

    var intervalId = window.setInterval(function () {
        
        iteration = ++currentIterations;
        var message = iteration === 1 ? iteration + " interval has now occurred" : iteration + " intervals have occurred";

        intervalResult.text(message);
        localStorage["1.5secondsOccurred"] = JSON.stringify(iteration);
       
    }, 1500);
    //interval ends here

    //form
    var localStorageTableBody = $("#localstorage-data tbody");
    var clearStorage = $("#clear-storage");

    var keyValueInput = $("#localstorage-value");
    var kvpForm = $("#localstorage-form");
    var formAlert = $("#form-alert");

    function resetTable() {
        localStorageTableBody.empty();

        // We use the localStorage.key(number) property to get the key name at index number
        for (var i = 0; i < localStorage.length; i++) {
            var currentKey = localStorage.key(i);
            var curentValue = localStorage[currentKey];

            var newHtmlString = "<tr><td>" + currentKey + "</td><td>" + curentValue + "</td></tr>"
            localStorageTableBody.append(newHtmlString);
        }
    }

    clearStorage.click(function () {
        localStorage.clear();
        iteration=0;
        submitCount=0;
        currentIterations=0;
        localStorage["1.5secondsOccurred"] = JSON.stringify(0);
        localStorage["locationHash"] = "";
        localStorage["submitCount"]=JSON.stringify(0);
        localStorage["lastInputed"]="";
        window.history.pushState({}, '', '/');
        resetTable();
    });

    // submit count:
    localStorage["submitCount"]=JSON.stringify(0);
    localStorage["lastInputed"]="";
    var submitCount=0;
    kvpForm.submit(function (event) {
        event.preventDefault();
        formAlert.addClass('hidden');
        formAlert.text('');
        ++submitCount;

        var valStr = keyValueInput.val();
        
        if (!valStr) {
            formAlert.text('You must provide a value');
            formAlert.removeClass('hidden');
            return;
        }
        
        // check if it's in the format of an object
        var jsonString = valStr;
        
        try {
            // this will throw when given a non JSON string
            JSON.parse(valStr);
        
            // if this succeeded, the user passed us something we could parse, and we don't have to encode it further
        } catch (e) {
            // this did not succeed, which means that the user passed us some sort of string
            jsonString = JSON.stringify(valStr);
        }
        localStorage["submitCount"] = submitCount;
        localStorage["lastInputed"]=jsonString;
        keyValueInput.val('');
        console.log(localStorage["lastInputed"]);
        resetTable();
    });

    // Now we setup our table
    resetTable();
})(jQuery, window.localStorage);
// jQuery is exported as $ and jQuery
// the location API is accessed via the window.location variable
