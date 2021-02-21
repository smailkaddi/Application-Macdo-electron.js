$(function () {
    // __________________________GET DATA TABLES ___________________________
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/codepromo',
        success: function (getTables) {
            let table = $('#getPromoData');
            table.html('');

            getTables.forEach(tableRow => {

                table.append(`
                <tr>
                    <td id="tabl">${tableRow.code}</td>
                    <td>${tableRow.pourcentage}</td>
                    <td>${tableRow.isValid}</td>
                    <td class="text-center py-0 align-middle">
                        <div class="btn-group btn-group-sm">
                        <a type="button" onclick="updateCodepromo('${tableRow._id}')" class="btn btn-primary">Edite</a>
                        <a type="button" onclick="deleteCodepromo('${tableRow._id}')" class="btn btn-danger text-white">Delete</a>
                        </div>
                    </td>
                </tr>
            `)
            });
        }
    });

    // __________________________GET PRODUCTS SELECT OPTION ___________________________
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/product',
        success: function (getProdData) {
            $.each(getProdData, function (i, prodPromo) {
                var $selectProd = $('#selectProd');
                $selectProd.append(`<option value="${prodPromo._id}">${prodPromo.code}</option>`)
            });
        },
    });
});

// __________________________ADD NEW CODE PROMO  ___________________________
$('#addCodePromo').on('click', function () {
    var $codePromo = $('#codePromo');
    var $selectProd = $('#percentage');
    var $selectvisble = $('#selectvisble');

    if ($codePromo.val() == "") {
        $codePromo.addClass('is-invalid');

    } else if ($selectProd.val() == "") {
        $selectProd.addClass('is-invalid');
    } else if ($selectvisble.val() == "") {
        $selectvisble.addClass('is-invalid');
    } else {

        $.ajax({
            method: 'POST',
            url: 'http://localhost:8080/codepromo/add',
            data: {
                code: $codePromo.val(),
                pourcentage: $selectProd.val(),
                isValid: $selectvisble.val(),
            },
            timeout: 1000,
            success: function () {
                Swal.fire({
                    icon: 'success',
                    title: '<span style="color:#e0a800">Code promo has been added<span>',
                    showConfirmButton: false,
                    timer: 1500
                }).then(function () {
                    location.reload();
                });
            }
        });
    }
});

// __________________________ delete codepromo ___________________________
function deleteCodepromo(_id) {
    $.ajax({
        method: 'DELETE',
        url: 'http://localhost:8080/codepromo/delete/' + _id,
        success: function () {
            location.reload();
        },
        timeout: 1000
    })
}

// __________________________ update category  ___________________________
function updateCodepromo(_id) {
    var $code = $('#codePromo');
    var $selectProd = $('#percentage');
    var $selectvisble = $('#selectvisble');
    $.ajax({
        method: 'PUT',
        url: 'http://localhost:8080/codepromo/update/' + _id,
        data: {
            code: $code.val(),
            pourcentage: $selectProd.val(),
            isValid: $selectvisble.val()
        },
        success: function (data) {

            location.reload();
        }
    })
}
