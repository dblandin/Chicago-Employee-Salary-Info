/*
 * Library for querying information on Chicago employees
 *
 * Written by Craig Miller, April 2012
 *
 * This library queries a database of Chicago employees.  Given a
 * string, it provides all records that match the string in one of its
 * fields.
 *
 * Its usage requires an event handler function (callback function)
 * for receiving the array of matching records.
 *
 * Usage Example:
 *     query = new ChicagoEmployeesQuery("rahm");
 *
 *     showResult = function(list)
 *     {
 *        alert("Rahm's salary: " + list[0].salary);
 *     }
 *
 *     query.getList(showResult);
 *
 * The getList method calls the given function with one parameter:
 * an array of objects, each with the following properties:
 *   name - employee name (last name, first name)
 *   title - title of the employee's position
 *   department - unit name of the employee
 *   salary - yearly salary
 */

function ChicagoEmployeesQuery(searchKey)
{
    var url,
    url = 
        "https://data.cityofchicago.org/api/views/xzkq-xp2w/rows.json" +
        "?search=key_word&jsonp=?";
    this.query = url.replace("key_word", searchKey);
}

ChicagoEmployeesQuery.prototype.getList = function(callBack)
{
    $.getJSON(this.query, function(response) {
        var i, results;
        results = [];
        for (i = 0; i < response.data.length; i += 1) {
            row = { 
                name: response.data[i][8],
                title: response.data[i][9],
                department: response.data[i][10],
                salary: response.data[i][11]
            }
            results.push(row);
        }
        callBack(results);
    })
}
