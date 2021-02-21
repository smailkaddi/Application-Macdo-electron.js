$(function () {

    // GET DATA TABLES 
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/table',
        success: function (getTables) {
            let table = $('#GetDataTableService');
            table.html('');

            getTables.forEach(tableRow => {
                var $tabSts = [];
                if (tableRow.isOcuped == true) {
                    $tabSts = '<span class="badge badge-success">Available</span>';
                } else if (tableRow.isOcuped == false) {
                    $tabSts = '<span class="badge badge-danger">Unavailable</span>';
                } else {
                    $tabSts = '<span class="badge badge-secondary">Null</span>';
                }
                table.append(`
                    <tr>
                        <td id="tabl">${tableRow.numTable}</td>
                        <td>${$tabSts}</td>
                        <td class="text-center py-0 align-middle">
                            <div class="btn-group btn-group-sm">
                            
                        <a type="button" onclick="updateTable('${tableRow._id}')" class="btn btn-primary">Edite</a>
                        <a type="button" onclick="deleteTable('${tableRow._id}')" class="btn btn-danger text-white">Delete</a>
                            </div>
                        </td>
                    </tr>
                `)
            });
        }
    });


});

// ADD NEW SERVICE TABLE 
$('#addTable').on('click', function () {
    var $tableMatricul = $('#tableMatricul');
    var $tableStatus = $('#tableStatus');
    var $helpTable = $('#helpTableMatricul');

    if ($tableMatricul.val() == "") {
        $tableMatricul.addClass('is-invalid');
        $helpTable.html('This field is required!!')
    } else {

        $.ajax({
            method: 'POST',
            url: 'http://localhost:8080/table/add',
            data: {
                numTable: $tableMatricul.val(),
                isOcuped: $tableStatus.val()
            },
            timeout: 1000,
            success: function () {
                Swal.fire({
                    icon: 'success',
                    title: '<span style="color:#e0a800">Table has been added<span>',
                    showConfirmButton: false,
                    timer: 1500
                }).then(function () {
                    location.reload();
                });
            }
        });
    }
});

// DELETE TABLE 
function deleteTable(_id) {
    $.ajax({
        method: 'DELETE',
        url: 'http://localhost:8080/table/delete/' + _id,
        success: function () {
            location.reload();
        },
        timeout: 1000
    })
}

// EDIT TABLE STATUS 
function updateTable(_id) {
    var $numTable = $('#tableMatricul');
    var $isOcuped = $('#tableStatus');
    $.ajax({
        method: 'PUT',
        url: 'http://localhost:8080/table/update/' + _id,
        data: {
            numTable: $numTable.val(),
            isOcuped: $isOcuped.val()
        },
        success: function (data) {

            location.reload();
        }
    })
}
