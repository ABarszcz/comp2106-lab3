/** 
 * Lab 3: Node.JS Simple Calculator
 * Author: Anthony Barszcz
 * Date: 22/09/2016
 **/

//use connect package
var connect = require('connect');
//use url package
var url = require('url');

//instantiate new connect package
var app = connect();

//holds the response string that is set by the calculate method
var response = 'Error - no response';

//create the connection
var conn = function(req, res, next) {
    //get the querystring from the url
    var qs = url.parse(req.url, true).query;

    //get the values from the querystring
    var method = qs.method;
    var x = qs.x;
    var y = qs.y;

    //perform the calculations based on the values
    calculate(method, x, y);

    //returns the appropriate response
    res.end(response);
};

//create calculate function
var calculate = function(method, x, y) {
    //parse the values as floats
    var x = parseFloat(x);
    var y = parseFloat(y);

    //holds the result of the operation
    var result = '0';

    if(method == 'add') {
        result = x + y;
        response = x + ' + ' + y + ' = ' + result;
    } else if(method == 'subtract') {
        result = x - y;
        response = x + ' - ' + y + ' = ' + result;
    } else if(method == 'multiply') {
        result = x * y;
        response = x + ' * ' + y + ' = ' + result;
    } else if(method == 'divide') {
        result = x / y;
        response = x + ' / ' + y + ' = ' + result;
    } else {
        //return error message
        response = 'Error - not a valid calculation operator.';
    }
};

//tell the app to use the connection
app.use(conn);

//start the server on port 3000
app.listen(3000);

//display a message that our server is running
console.log('Connect running on port 3000');