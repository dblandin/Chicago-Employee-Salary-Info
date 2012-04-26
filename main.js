/* Chicago Employees Salary Info
   by Devon Blandin, April 2012 
   for IT 238, Spring Quarter 2012 */

function postResult(list) {
    if (list.length > 0) {
    
        var options = ['name'];
        var checkboxes = $(':checkbox');
        $.each( checkboxes, function(i, l){
            if (l.checked) {
                options.push($(l).attr('value'));
            }
         });

        var nameList = "";
        
        for (var i = 0; i < list.length; i += 1) {
                nameList += '<div class="box">'
                nameList += '<span class="name">' + list[i].name.toLowerCase() + "</span>";
            for (var j = 1; j < options.length; j += 1) {
                
                nameList += '<span class="' + options[j] + '">' + list[i][options[j]] + "</span>";
            }
            nameList += '</div>';
        }

        $("#result").html(nameList);
    } else {
        $("#result").html('No matches found.');
    }
}
function submit()
{
    var searchWord = document.getElementById("key-word").value;
    if (searchWord != "") {
        query = new ChicagoEmployeesQuery(searchWord);
        $("#result").html("waiting...");
        query.getList(postResult);
    } else if (confirm("Are you sure you want to return all results? This may take a while...")) {
        query = new ChicagoEmployeesQuery(searchWord);
        $("#result").html("waiting...");
        query.getList(postResult);
    }
}

var googleAPIsLoaded = function() {
	// setup the page
 $("#start").click(submit);

	// set event handlers

};

function loadGoogleAPIs() {
    google.load('visualization', '1.0', {'packages':['corechart']});
    google.setOnLoadCallback(googleAPIsLoaded);
}