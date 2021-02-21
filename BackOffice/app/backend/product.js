$(function () {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/products',
        success: function (products) {
            let getProd = $('#getProduct');
            getProd.html('');
            products.forEach(prodRow => {
                let scIsN = prodRow._id;

                getProd.append(`
        <tr>
            <td><img src="upload/${prodRow.picname}.png" alt="" width="100"></td>
            <td>${prodRow.nom}</td>
            <td>${prodRow.prix} Dhs</td>
            <td>${prodRow.ingrediens}</td>
            <td>${prodRow.codePromo}</td>
            <td>${prodRow.points}</td>
            <td>${prodRow.sousCategory}</td>
            <td class="text-center py-0 align-middle">
                <div class="btn-group btn-group-sm">
                <a type="button" onclick="updateProduct('${prodRow._id}')" class="btn btn-primary">Edite</a>
                <a type="button" onclick="deleteProduct('${prodRow._id}')" class="btn btn-danger text-white">Delete</a>
                </div>
            </td>
        </tr>
        `)
            });
        }
    });
});

// GET CATEGORIES SELECT OPTION
var $selectSousCateg = $('#sousCategID');
$.ajax({
    type: 'GET',
    url: 'http://localhost:8080/souscategory',
    success: function (getSCategory) {
        $.each(getSCategory, function (i, sCategoryRow) {
            let selectSC;
            $selectSousCateg.append(
                `<option value="${sCategoryRow._id}">${sCategoryRow.nom}</option>`)
        });
    },
});
// GET codepromo SELECT OPTION
var $selectCodePromo = $('#tablecodepromo');
$.ajax({
    type: 'GET',
    url: 'http://localhost:8080/codepromo',
    success: function (getcodepromo) {
        $.each(getcodepromo, function (i, codepromo) {
            let selectCP;
            $selectCodePromo.append(
                `<option value="${codepromo.code}">${codepromo.code}</option>`)
        });
    },
});
// add new product        
$('#add_product').on('click', function (e) {
    let $productName = $('#productName');
    let $productPrice = $('#productPrice');
    let $ingrediens = $('#ingrediens');
    let $tablecodepromo = $('#tablecodepromo');
    let $productpicname = $('#productpicname');
    let $sousCategID = $('#sousCategID');



    if ($productName.val() == "") {
        e.preventDefault();
        $productName.addClass('is-invalid');

    } else if ($productPrice.val() == "") {
        e.preventDefault();
        $productPrice.addClass('is-invalid');
    } else if ($ingrediens.val() == "") {
        e.preventDefault();
        $ingrediens.addClass('is-invalid');
    } else if ($tablecodepromo.val() == "") {
        e.preventDefault();
        $tablecodepromo.addClass('is-invalid');
    } else if ($productpicname.val() == "") {
        e.preventDefault();
        $productpicname.addClass('is-invalid');
    } else if ($sousCategID.val() == "") {
        e.preventDefault();
        $sousCategID.addClass('is-invalid');
    } else {

        $.post({
            method: 'POST',
            url: 'http://localhost:8080/product/add',
            processData: true,
            data: {
                nom: $productName.val(),
                prix: $productPrice.val(),
                ingrediens: $ingrediens.val(),
                codePromo: $tablecodepromo.val(),
                sousCategory: $sousCategID.val(),
                picname: $productpicname.val(),
            },
            success: function () {
                Swal.fire({
                    icon: 'success',
                    title: '<span style="color:#e0a800">Product has been saved<span>',
                    showConfirmButton: false,
                    timer: 1500
                }).then(function () {
                    location.reload();
                });
            },
        })
    }
});

// DELETE PRODUCT
function deleteProduct(id) {
    $.ajax({
        method: 'DELETE',
        url: 'http://localhost:8080/products/delete/' + id,
        success: function () {
            location.reload();
        },
        timeout: 1000
    })
}


// __________________________ update Product  ___________________________
function updateProduct(_id) {
    var $nom = $('#productName');
    var $prix = $('#productPrice');
    var $ingrediens = $('#ingrediens');
    var $picname = $('#productpicname');
    var $codePromo = $('#tablecodepromo');
    var $sousCategory = $('#sousCategID');

    $.ajax({
        method: 'PUT',
        url: 'http://localhost:8080/products/update/' + _id,
        data: {
            nom: $nom.val(),
            prix: $prix.val(),
            ingrediens: $ingrediens.val(),
            picname: $picname.val(),
            codePromo: $codePromo.val(),
            sousCategory: $sousCategory.val()
        },
        success: function (data) {

            location.reload();
        }
    })
}
