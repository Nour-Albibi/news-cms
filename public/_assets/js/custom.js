function refresh_attributes(){
    $.post('http://localhost/phone/public/admin/fields/get_attributes',{},function(data){
        $('#possible_attributes').html(data);
    });
}
