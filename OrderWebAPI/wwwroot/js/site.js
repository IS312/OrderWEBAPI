$(document).ready(function () {
    $("#btn").click(function () {
        resetFormInput();
        $("#details").slideToggle();
    });
});

// Load Order Data From Web API in Table
function loadTableData() {
    // Prepare AJAX request for collecting data of Order
    $.ajax({
        type: "GET",
        url: 'api/Orders',
        cache: false,
        success: function (data) {
            const tableBody = $("#tableBody");

            // Clear Previous Content of Table Body
            $(tableBody).empty();
            console.log(data);
            // If There is No Data
            if (data.length == 0) { 
                const tr = $("<tr></tr>")
                    .append('<td colspan="6" align="center">No Order Details</td>');
                // Add table row in table body
                tr.appendTo(tableBody);
            } else {
                // Iterate all JSON data
                $.each(data, function (key, item) {
                    // prepare a row with table column with data 
                    const tr = $("<tr></tr>")
                        .append($("<td></td>").text(item.productName))
                        .append($("<td></td>").text(item.productID))
                        .append($("<td></td>").text(item.orderStatus))
                        .append($("<td></td>").text(item.orderDate))
                        .append($("<td></td>").append('<button class="btn btn-secondary">Edit Record</button>')
                            .on("click", function () {
                                // Call get Order Details For Edit
                                fetchIssueDetails(item.orderID);
                            })
                        )
                        .append($("<td></td>").append('<button class="btn btn-dark">Delete Record</button>')
                            .on("click", function () {
                                // Call Web API for Remove the Order Details
                                deleteBookIssue(item.orderID);
                            })
                        );
                    // Add The table row at the end of table body
                    tr.appendTo(tableBody)
                });
            }
        }
    });
}


// Reset Form Input to Original State
function resetFormInput() {
    $('#ProductName').val("Tommy Hilfiger Navy Blue Jeans for Men");
    $('#ProductID').val("0");
    $('#OrderDate').val("");
    $('#OrderStatus').val("Shipped");
    $("#OrderID").val("");
}

// Fetch Book Order Details using Web API
function fetchIssueDetails(OrderID) {
    $.ajax({
        type: "GET",
        url: 'api/Orders/' + OrderID,
        contentType: "application/json"
    }).done(function (record) {
        // Set Value of Record to Form Input
        console.log(record);
        $('#ProductName').val(record.productName);
        $('#ProductID').val(record.productID);
        $('#OrderDate').val(record.orderDate);
        $('#OrderStatus').val(record.orderStatus);
        $("#OrderID").val(record.orderID);
        $("#details").slideToggle();
    });
}

// Call Web API to delete Order Details
function deleteBookIssue(OrderID) {
    // Display a Confirm Box to ensure the user decision
    let result = confirm("Wohoo! you want to Remove this Order Details?");

    if (result) {
        // Request Web API to Delete Sale
        $.ajax({
            type: "DELETE",
            url: 'api/Orders/' + OrderID,
        }).done(function (response) {
            // Refresh Sale Details
            loadTableData();
        });
    }
}

// This function used to save Sale or Update Order Details
function saveOrUpdateDetails() {
    // Collect Form Input Data into variable
    let ProductName1 = $('#ProductName').val();
    let ProductID1 = parseInt($('#ProductID').val());
    let OrderDate1 = $('#OrderDate').val();
    let OrderStatus1 = $("#OrderStatus").val();

    // Collect Order ID
    let OrderID = $("#OrderID").val();
    let updateForm = false;

    if (OrderID != "") {
        updateForm = true;
        OrderID = parseInt(OrderID)
    }

    // Save Details in Order in JSON Form
    let issueData = {
        ProductName: ProductName1,
        ProductID: ProductID1,
        OrderDate: OrderDate1,
        OrderStatus: OrderStatus1
    };

    let requestType = "POST";
    let urlAddress = 'api/Orders'
    if (updateForm) {
        issueData['OrderID'] = OrderID;
        requestType = "PUT";
        urlAddress = 'api/Orders/' + OrderID;
    }

    // Request the Web API for Insertion
    $.ajax({
        type: requestType,
        url: urlAddress,
        data: JSON.stringify(issueData),
        contentType: "application/json; charset=utf-8"
    }).done(function (response) {
        // Display Insert or Update Message
        let message = "Order Details are Saved in System";
        if (updateForm) {
            message = "Order Details are Updated in System";
        }
        alert(message);
        $("#details").slideToggle();
        resetFormInput();

        loadTableData();
    }).fail(function (xhr, status) {
        // Error Message
        alert("Order Details are not Saved in System")

        $("#details").slideToggle();
        resetFormInput();
    });
}