$(function () {

    // GET CATEGORIES SELECT OPTION
    var $selectCateg = $('#selectCateg');
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/category',
        success: function (getCategory) {
            $.each(getCategory, function (i, categoryRow) {
                $selectCateg.append(`<option value="${categoryRow._id}">${categoryRow.nom}</option>
                
                
                `)
            });
        },
    });

    // GET SOUS CATEGORIES TABLE
    var $sousCateg = $('#getSousCategory');

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/souscategory',
        success: function (sousCategory) {
            $.each(sousCategory, function (i, rowSC) {
                let categName;
                if (rowSC.nom == "") {
                    categName = "<b>-</b>";
                } else {
                    categName = rowSC.nom
                }
                $sousCateg.append(`<tr>
                        <td>${categName}</td>
                        <td>${rowSC._id}</td>
                        <td class="text-center py-0 align-middle">
                            <div class="btn-group btn-group-sm">
                            <a type="button" onclick="updateSousCategory('${rowSC._id}')" class="btn btn-primary">Edite</a>
                            <a type="button" onclick="deleteSousCategory('${rowSC._id}')" class="btn btn-danger text-white">Delete</a>
                            </div>
                        </td>
                    </tr>
                `)
            });
        },
    });
})

// ADD NEW SOUS CATEGORIE        
$('#add_sous_categ').on('click', function (e) {
    var $sCateg_name = $('#sCateg_name');
    var $selectCateg = $('#selectCateg');
    if ($selectCateg.val() == "") {
        $selectCateg.addClass('is-invalid');
        e.preventDefault();
    } else {
        $.post({
            method: 'POST',
            url: 'http://localhost:8080/souscategory/add',
            data: {
                nom: $sCateg_name.val(),
                _id: $selectCateg.val()
            },
            success: function () {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: '<span style="color:#138496">Sous categorie has been saved<span>',
                    showConfirmButton: false,
                    color: '#17a2b8',
                    timer: 1500
                }).then(function () {
                    location.reload();
                });
            },
            timeout: 1000
        })
    }
});

// DELETE SOUS CATEGORIE
function deleteSousCategory(_id) {
    $.ajax({
        method: 'DELETE',
        url: 'http://localhost:8080/souscategory/delete/' + _id,
        success: function () {
            location.reload();
        },
        timeout: 1000
    })
}

// update category 
function updateSousCategory(_id) {
    var $nom = $('#sCateg_name');
    var $id = $('#selectCateg');
    $.ajax({
        method: 'PUT',
        url: 'http://localhost:8080/souscategory/update/' + _id,
        data: {
            nom: $nom.val()
        },
        success: function (data) {

            location.reload();
        }
    })
}
