/*global $*/

// READ recods on page load
$(document).ready(function () {
    readRecords(); // calling function
});

// READ records
function readRecords() {
    $.get("/food/", {}, function (data, status) {
        data.forEach(function(value) {
            var row = '<tr id="row_id_'+ value.id +'">'
            			+ displayColumns(value)
        				+ '</tr>';
            $('#articles').append(row);
        });
    });
}

function displayColumns(value) {
    return 	'<td>'+value.id+'</td>'
            + '<td class="category_id">'+ value.category_id +'</td>'
            + '<td class="name">'+value.name+'</td>'
			+ '<td class="description">'+value.description+'</td>'
			+ '<td class="price">'+value.price+'</td>'
			+ '<td class="isMenuOfTheDay">'+value.isMenuOfTheDay+'</td>'
			+ '<td class="image">'+value.image+'</td>'
					
			+ '<td align="center">'
			+	'<button onclick="viewRecord('+ value.id +')" class="btn btn-edit">Update</button>'
			+ '</td>'
			+ '<td align="center">'
			+	'<button onclick="deleteRecord('+ value.id +')" class="btn btn-danger">Delete</button>'
			+ '</td>';
}

function addRecord() {
    $('#id').val('');
    $('#category_id').val('');
    $('#name').val('');
    $('#description').val('');
    $('#price').val('');
    $('#isMenuOfTheDay').val('');
    $('#image').val('');
    
    $('#myModalLabel').html('Add New Product');
}

function viewRecord(id) {
    var url = "/food/" + id;
    
    $.get(url, {}, function (data, status) {
        //bind the values to the form fields
        $('#category_id').val(data.category_id);
        $('#name').val(data.name);
        $('#description').val(data.description);
        $('#price').val(data.price);
        $('#isMenuOfTheDay').val(data.isMenuOfTheDay);
        $('#image').val(data.image);
        $('#id').val(id);
        $('#myModalLabel').html('Edit Product');
        
        $('#add_new_record_modal').modal('show');
    });
}

function saveRecord() {
    //get data from the html form
    var formData = $('#record_form').serializeObject();
    
    //decide if it's an edit or create
    if(formData.id) {
        updateRecord(formData);
    } else {
        createRecord(formData);
    }
}

function createRecord(formData) {
    $.ajax({
        url: '/food/',
        type: 'POST',
        accepts: {
            json: 'application/json'
        },
        data: formData,
        success: function(data) {
            $('#add_new_record_modal').modal('hide');
            
            var row = '<tr id="row_id_'+ data.id +'">'
            			+ displayColumns(data)
        				+ '</tr>';
            $('#articles').append(row);
        } 
    });
}

function updateRecord(formData) {
    $.ajax({
        url: '/food/'+formData.id,
        type: 'PUT',
        accepts: {
            json: 'application/json'
        },
        data: formData,
        success: function(data) {
            $('#row_id_'+formData.id+'>td.category_id').html(formData.category_id);
            $('#row_id_'+formData.id+'>td.name').html(formData.name);
            $('#row_id_'+formData.id+'>td.description').html(formData.description);
            $('#row_id_'+formData.id+'>td.price').html(formData.price);
            $('#row_id_'+formData.id+'>td.isMenuOfTheDay').html(formData.isMenuOfTheDay);
            $('#row_id_'+formData.id+'>td.image').html(formData.image);
            $('#add_new_record_modal').modal('hide');
        } 
    });
}

function deleteRecord(id) {
    $.ajax({
        url: '/food/'+id,
        type: 'DELETE',
        success: function(data) {
            $('#row_id_'+id).remove();
        }
    });
}