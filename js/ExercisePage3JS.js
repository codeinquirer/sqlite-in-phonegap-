//  Declare SQL Query for SQLite
 
var createStatement = "CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, usernumber TEXT)";
 
var selectAllStatement = "SELECT * FROM Contacts";
 
var insertStatement = "INSERT INTO Contacts (username, usernumber) VALUES (?, ?)";
 
var updateStatement = "UPDATE Contacts SET username = ?, usernumber = ? WHERE id=?";
 
var deleteStatement = "DELETE FROM Contacts WHERE id=?";
 
var dropStatement = "DROP TABLE Contacts";
 
 var db = openDatabase("AddressBook", "1.0", "Address Book", 200000);  // Open SQLite Database
 
var dataset;
 
var DataType;
 
 function initDatabase()  
 
{
 
    try {
 
        if (!window.openDatabase)  
 
        {
 
            alert('Databases are not supported in this browser.');
 
        }
 
        else {
 
            createTable();  
 
        }
 
    }
 
    catch (e) {
 
        if (e == 2) {
 
        
 
            console.log("Invalid database version.");
 
        } else {
 
            console.log("Unknown error " + e + ".");
 
        }
 
        return;
 
    }
 
}
 
function createTable()  
 
{
 
    db.transaction(function (tx) { tx.executeSql(createStatement, [], showRecords, onError); });
 
}
 
function insertRecord() 
 
{
 
        var usernametemp = $('input:text[id=username]').val();
 
        var usernumbertemp = $('input:text[id=usernumber]').val();
        db.transaction(function (tx) { tx.executeSql(insertStatement, [usernametemp, usernumbertemp], loadAndReset, onError); });
 
      
}
 
function deleteRecord(id) 
 
{
 
    var iddelete = id.toString();
 
    db.transaction(function (tx) { tx.executeSql(deleteStatement, [id], showRecords, onError); alert("Delete Sucessfully"); });
 
    resetForm();
 
}
 
function updateRecord() 
 
{
 
    var usernameupdate = $('input:text[id=username]').val().toString();
 
    var usernumberupdate = $('input:text[id=usernumber]').val().toString();
 
    var useridupdate = $("#id").val();
 
    db.transaction(function (tx) { tx.executeSql(updateStatement, [usernameupdate, usernumberupdate, Number(useridupdate)], loadAndReset, onError); });
 
}
 
function dropTable() 
 
{
 
    db.transaction(function (tx) { tx.executeSql(dropStatement, [], showRecords, onError); });
 
    resetForm();
 
    initDatabase();
 
}
 
function loadRecord(i) 
 
{
 
    var item = dataset.item(i);
 
    $("#username").val((item['username']).toString());
 
    $("#usernumber").val((item['usernumber']).toString());
 
    $("#id").val((item['id']).toString());
 
}
 
function resetForm() // Function for reset form input values.
 
{
 
    $("#username").val("");
 
    $("#usernumber").val("");
 
    $("#id").val("");
 
}
 
function loadAndReset() //Function for Load and Reset...
 
{
 
    resetForm();
 
    showRecords()
 
}
 
function onError(tx, error) // Function for Hendeling Error...
 
{
 
    alert(error.message);
 
}
 
function showRecords() // Function For Retrive data from Database Display records as list
 
{
 
    $("#results table tbody").html('')
 
    db.transaction(function (tx) {
 
        tx.executeSql(selectAllStatement, [], function (tx, result) {
 
            dataset = result.rows;
			
            for (var i = 0, item = null; i < dataset.length; i++) {
 
                item = dataset.item(i);
 
                var linkeditdelete = '<tr><td>' + item['username'] + ' </td><td> ' + item['usernumber'] + '  </td><td>  ' + '<a href="#" class="btn btn-info" onclick="loadRecord(' + i + ');"> <span class="glyphicon glyphicon-pencil"> </span> </a>' + '    ' +
 
                                            '<a href="#" class="btn btn-danger" onclick="deleteRecord(' + item['id'] + ');"><span class="glyphicon glyphicon-remove"> </span></a></td></tr>';
 
                
				$("#results table tbody").append(linkeditdelete);
            }
			
        });
 
    });
 
}
 
$(document).ready(function () // Call function when page is ready for load..
 
{
;
 
    $("body").fadeIn(2000); 
 
    initDatabase();
 
    $("#submitButton").click( function(e) {
		e.preventDefault();
		insertRecord();
	});  
 
    $("#btnUpdate").click(function() {
		updateRecord();
	});
 
    $("#btnReset").click(function(e) {
		resetForm();
	});
 
    $("#btnDrop").click(function(e) {
		dropTable();
	});
 
});
 