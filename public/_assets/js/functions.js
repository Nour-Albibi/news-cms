var www=0;
var hhh=0;
var sendingParsToForm='';
var form_type=new Array();
var form_id='';
var win_level_pointer=0;
var backCall='';
var column='';
var parent_loader='';
var Sub='';
var actListEvent='';
var z_page_name='';
var act_parNum=0;
var mouseY;var mouseX;
$(document).mousemove(function(e){mouseX=e.pageX;mouseY=e.pageY;});
// $( function() {
//     $( "#sortable" ).sortable();
//     $( "#sortable" ).disableSelection();
// } );
$(document).ready(
    function (e){
        www=$(window).width();
        hhh=$(window).height();
        fil_h=$('.styleswitcher').height();
        $('.filterForm').height(fil_h-40);
        //    product_get_properties3(16);.
        set_modMenu();
        $('input[par=per_mm]').click(function(){
            if($(this).prop("checked"))ch=1;else ch=0;
            no=$(this).val();
            // alert(no);
            form=$(this).closest('form').attr('id');
            // alert( );$('input[par=per_sel_'+no+']').val()
            $('#'+form).find('input[par=per_sel_'+no+']').each(function(index,element){
                //    id=$(this).attr('id');
                no2=$(this).val();
                // alert(no2);
                if(ch==1) $(this).attr('checked','');
                else  $(this).removeAttr('checked');
                // $(this).addProp('checked');
                if(ch==1){$(this).closest('tr').css('background-color','#eee');}
                else{$(this).closest('tr').css('background-color','');}
                $('#'+form).find("input[par=per_in_"+no2+"]").each(function(index,element){
                    if(ch==1){$(this).attr('checked','');
                        //$(this).addProp('checked');
                        $(this).show(500);
                    }else{$(this).hide(500);$(this).removeAttr('checked');}
                });

            });
        })
        // $('form[name=list_users_by_role]').onsubmit(function(){
        //    alert('test');
        // });
        //   alert(hhh);
        //    $('input[type=checkbox]').each(function(index,element){
        //        rand=Math.floor((Math.random()*1000000)+1);
        //        ch_val=$(this).val();
        //        ch_name=$(this).attr('name');
        //        //alert($(this).attr('name'));
        //        par=$(this).attr('par');
        //    if(typeof par == typeof undefined && par==false){par='';}else{par='par="'+par+'"';}
        //    ch_ch='off';
        //    if($(this).is(":checked")){ch_ch='on';}
        //    ch_input='<div id="c_'+rand+'" '+par+' class="form_checkBox cur fl " ch_name="'+ch_name+'" ch_val="'+ch_val+'">\
        //    <div ch="'+ch_ch+'">';
        //    if(ch_ch=='on'){
        //        ch_input+='<input type="hidden" name="'+ch_name+'" value="'+ ch_val+'"/>';
        //    }
        //    ch_input+='</div></div>';
        //    $(this).replaceWith(ch_input);
        //        $('#c_'+rand).click(function(){
        //            checkBoxClick($(this),'');
        //        })
        //        g_switch_buttons();
        //
        //    });
        //toastr.success("You clicked Success toast");
    }
);
$(document).resize(function(e){
    www=$(window).width();
    hhh=$(window).height();
});
function product_get_properties3(category_id){
    //product/get_properties
    // alert(category_id);
    $('#product_properties').html('<center><i class="fa fa-spinner spinner" style="color:#333;font-size: 24px;"></i></center>');
    $.post('http://localhost/phone/public/admin/product/get_properties',{category_id:category_id},function(data){
        $('#product_properties').html(data);
    });
}
function menuOrder2(id){
    $('#m_info_content').html('<center><i class="fa fa-spinner spinner" style="color:#333;font-size: 24px;"></i></center>');
    $.post('http://localhost/phone/public/admin/menu_order',{id:id},function(data){
        $('#m_info_content').html(data);
        setMenuOrder();
    });
}
//********************************I have to seperate this file into files as system and as project//
var ord_data=new Array();
var t_ord=new Array();
var c_ord=new Array();
var activeOrder=0;
function startOrder(u){activeOrder=u.item.closest('tbody').attr('rNo');}
function setMenuOrder(){
    $('.mOrdMod').sortable(
        {
            axis:"y",
            distance:3,
            items:"div",
            placeholder:"orderPlace",
            revert:true,
            tolerance:"move",
            create:function(event,ui){createOrderMArray();
                //$('.d_res').droppable("disable");$('.d_res2').droppable("disable");
            },
            start:function(event,ui){
                // $('.d_res').droppable("disable");$('.d_res2').droppable("disable");
            },
            stop:function(event,ui){SendOrderMChange();},
        }
    );
}
function createOrderMArray(){
    o=0;
    $(".mOrdMod div").each(function(index,element){
        o_id=$(this).attr('no');
        ord=$(this).attr('ord');
        ord_data[o]=[o_id,ord];
        o++;
    })
}
function SendOrderMChange(){
    o=0;
    f_ord=0;
    ord_change='';
    $(".mOrdMod div").each(function(index,element){
        o_id=$(this).attr('no');
        ord=$(this).attr('ord');
        //  alert(ord_data[o][0]);
        if(o_id!=ord_data[o][0]){
            if(f_ord!=0){
                ord_change+='|';
            }
            ord_change+=o_id+":"+ord_data[o][1];
            $(this).attr('ord',ord_data[o][1]);
            f_ord=1;
        }
        o++;
    });
    //  alert(ord_change);
    if(ord_change!=''){saveOrdMChange(ord_change);createOrderArray(activeOrder)}
}
function saveOrdMChange(ord_change){
    $.post('http://localhost/phone/public/admin/menu_order_ord',{d:ord_change},function(data){
        location.reload(true);
        //LoadModuleMenu
        //SetOrderArray
    });
}
function new_menu(id){
    $('#m_info_content').html('<center><i class="fa fa-spinner spinner" style="color:#333;font-size: 24px;"></i></center>');
    $.post('http://localhost/phone/public/admin/new_menu',{id:id},function(data){
        $('#m_info_content').html(data);
    });
}
function set_modMenu(){
    $(function(){
        $('.d_move').draggable({
            cursor:'all-scroll',
            opacity:0.9,
            start:function(event,ui){
                $('.d_move[movemodMe]').attr('movemodMe',0);
                $(this).attr('movemodMe',1);
                mf_id=$(this).attr('no');
                mf_type=$(this).attr('type');
                mf_p=$(this).attr('p');
                $(this).css('position','relative');
                $(this).css('z-index','500000');
                $(this).css('background-color','#ea2f2f');
                $(this).css('top',mouseY);
                $(this).css('left',mouseX);
                $(this).closest('.modm_mod_list').css('overflow-x','visible');
            },
            drag:function(event,ui){
                $(this).css('top',mouseY);
                $(this).css('left',mouseX);
            },
            revert:true,
            stop:function(event,ui){
                $('.d_res').css('background-color','');
                $(this).css('background-color','');
                $(this).css('z-index','');
            }
        });
        $('.d_res').droppable({
            over: function(event,ui){$(this).css('background-color','eee');},
            out: function(event,ui){$(this).css('background-color','');},
            drop: function(event,ui){
                mt_id=$(this).attr('no');
                mt_type=$(this).attr('type');
                data=mf_id+'|'+mt_id+'|'+mf_type+'|'+mt_type;
                if(mf_p!=mt_id){
                    menuEffect(data);
                    $('div[movemodMe=1]').hide(500);
                }
            }
        });
        $('.d_res2').droppable({
            over: function(event,ui){$(this).css('background-color','eee');
                $('.d_res').droppable("disable");
            },
            out: function(event,ui){$(this).css('background-color','');},
            drop: function(event,ui){
                mt_id=$(this).attr('no');
                mt_type=$(this).attr('type');
                data=mf_id+'|'+mt_id+'|'+mf_type+'|'+mt_type;
                if(mf_p!=mt_id){
                    menuEffect(data);
                    $('div[movemodMe=1]').hide(500);
                }
            }
        });
    })
}
function menuEffect(data){
    $.post('http://localhost/phone/public/admin/menu_move',{data:data},function(data){
        location.reload();
    });
}
function delItemList2(id){
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        confirmButtonClass: "btn btn-primary",
        cancelButtonClass: "btn btn-danger ml-1",
        buttonsStyling: false
    }).then(function (isConfirm) {
        if (isConfirm) {
            delItemListDo(id);
        }
    });
}
function delItemListDo(id){
    $.post('http://localhost/phone/public/admin/menu_del',{id:id},function(data){
        // alert(data);
        if(data==1){
            Swal.fire({
                type: "success",
                title: "Deleted!",
                text: "Your Item has been deleted.",
                confirmButtonClass: "btn btn-success"
            });
            location.reload(true);
        }
    });
}
function createOrderArray(n){
    t_ord[n]=$('tbody[rNo='+n+']').closest('.g_ord').attr('t_ord');
    c_ord[n]=$('tbody[rNo='+n+']').closest('.g_ord').attr('c_ord');
    o=0;
    $('.g_ord tbody[rNo='+n+']').children('tr').each(function(index,element){
        o_id=$(this).attr('row_id');
        ord=$(this).attr('row_ord');
        if(typeof o_id!= typeof  undefined && o_id!=false){
            ord_data[n+'-'+o]=[o_id,ord];
            o++;
        }
    });
}
function checkBoxClick(this_ch,v){
    this_ch_val=this_ch.attr('ch_val');
    this_ch_name=this_ch.attr('ch_name');
    if(v==''){
        this_v=this_ch.children().attr('ch');
    }else{
        if(v=='on')this_v='off';else this_v='on';
    }
    if(this_v=='on'){
        this_ch.children().attr('ch','off');
        this_ch.children().html('');
    }else{
        this_ch.children().attr('ch','on');
        this_ch.children().html('<input type="hidden" name="'+this_ch_name+'" value="'+ this_ch_val+'"/>');
    }
}
function g_switch_buttons(){

    $('.switch_butt').click(function(){
        v=(this).attr('v');
        if(v!='x'){
            id=$(this).attr('id');
            f=$(this).attr('f');
            r=$(this).attr('r');
            alert('here')
            if(v==1){alert('here')
                coll="#ccc";xv=0;
                $('#'+id+' div').css('margin-left',2);
                //  $('#'+id+' div').animate({marginLeft:2},300);
            }else{
                coll="#00b5b8";xv=1;
                $('#'+id+' div').css('margin-left',24);
                // $('#'+id+' div').animate({marginLeft:24},300);
            }
            $('#'+id).attr('v','x');
            $('#'+id+ 'div').css('background-color','#00b5b8');
            $('#'+id).attr('v',xv);
        }
    });
}
function co_loadForm(){

}
function imgClick3(){
    $('.imgUpHol').click(function(){upimg=1;})
    $('.uibox2[sc=0]').each(function(index,element){
        $(this).click(function(){
            no=$(this).attr('no');
            alert(no);
            showImg2(no);
        })
        $(this).attr('sc',1);
    });
}
function imgClick(){
    $('.imgUpHol').click(function(){upimg=1;})
    $('.uibox[sc=0]').each(function(index,element){
        $(this).click(function(){
            no=$(this).attr('no');
            showImg(no);
        })
        $(this).attr('sc',1);
    });
    $('.uibox2[sc=0]').each(function(index,element){
        $(this).click(function(){
            no=$(this).attr('no');
            showImg2(no);
        })
        $(this).attr('sc',1);
    });
}
// function showImg(id){
//     $('.loadWin').show();
//     org=$('.uibox[no='+id+']').attr('org');
//     group=$('.uibox[no='+id+']').attr('group');
//     i_w=$('.uibox[no='+id+']').attr('w');
//     i_h=$('.uibox[no='+id+']').attr('h');
//     $('.imgHolder').width(www-20);
//     $('.imgHolder').height(hhh-70);
//     $('.loadWin').html('<div class="imagw_h_bar">\
// 	<div class="winButts">\
// 	<div class="wB_x" onClick="closeImage();"></div>\
// 	<div class=""></div>\
// 	<div class="wB_del" onClick="delUpImage('+id+');"></div>\
// 	</div>\
// 	</div>\
// 	<div class="imgHolder" onclick="">\
// 	<img src="'+org+'" height="100%" w="'+i_w+'" h="'+i_h+'"/></div>');
//     fixImage();
// }
function fixImage(){
    if($('.imgHolder').length>0){
        i_w=$('.imgHolder').children('img').attr('w');
        i_h=$('.imgHolder').children('img').attr('h');
        if(((www-20)/(hhh-20))>(i_w/i_h)){
            $('.imgHolder').children('img').attr('height',hhh-70);
            $('.imgHolder').children('img').attr('width','');
            $('.imgHolder').children('img').css('margin-top','');
        }else{
            $('.imgHolder').children('img').attr('width',www-20);
            $('.imgHolder').children('img').attr('height','');
            img_m=((hhh-80)-(((www-20)*i_h)/i_w))/2;
            $('.imgHolder').children('img').css('margin-top',img_m);

        }
    }
}
var actModItem=0;
var actCoupon=0;
function CouponItem(id,type){
    $('#general_full_win_content').html('<center><i class="fa fa-spinner spinner" style="color:#333;font-size: 24px;"></i></center>');
    $.post('http://localhost/phone/public/admin/get_coupon_items',{id:id,type:type},function(data){
        $('#general_full_win_content').html(data);
    });
}
/********************************************/
function modItem(id){
    actModItem==1;
    // $("#full_win1").modal();
    //$('#full_win1').modal('show')
    $('#full_win_modal_content').html('<center><i class="fa fa-spinner spinner" style="color:#333;font-size: 24px;"></i></center>');
    $.post('http://localhost/phone/public/admin/get_modules_items',{id:id},function(data){
        $('#full_win_modal_content').html(data);
    });
}
var txtT='';
function changeColType(id,type,prams){
    // alert(prams);
    out_d='';
    $('#pars_'+id).html('');
    $('#def_'+id).html('');
    $('#req_'+id).html('');
    loadReqDefInput(id,type);
    $('#filter_'+id).val('0');
    linkText='';
    if(type==5){linkText='Can not select the relation unless you save the data';}
    $('#link_'+id).html(linkText);
    if(type==1){
        out_d+=txtT.replace('[id]',id);

        $('#pars_'+id).html(out_d);
    }
    if(type==2){
        out_d+='<select name="date_'+id+'" class="form-control"><option value="0" selected>Normal Date</option><option value="1">Date in seconds</option><option value="2">TimeStamp Date</option></select>';
        $('#pars_'+id).html(out_d);
    }
    if(type==3){
        out_d+='<input type="checkbox" name="actShow_'+id+'" value="1" checked/><div class="fl f1 lin40"></div>';
        $('#pars_'+id).html(out_d);
    }
    if(type==5){
        out_d='<input type="hidden" name="parent_'+id+'" id="parent_'+id+'" value=""/>\
		<div class="f1 colr5 Over" onclick="parlist('+id+')" data-toggle="modal" data-target="#m_info" >Edit properties</div><div id="parent_t'+id+'" dir="ltr"></div>';
        $('#pars_'+id).html(out_d);
    }
    if(type==10){
        $('#pars_'+id).html(loader_win);
        $.post(f_path+"M/_co_get_mit.php",{id:id,type:type,prams:prams}, function(data){
            // d=GAD(data);
            $('#pars_'+id).html(data);
        })
    }
    if(type==4){
        out_d='<select name="photo_'+id+'" class="form-control"><option value="0" selected >One photo</option><option value="1" >Many Photos</option></select>';
        $('#pars_'+id).html(out_d);
    }
    if(type==8){
        out_d+='<select name="file_'+id+'" class="form-control"><option value="0">All types</option><option value="1">Documents</option> <option value="2">Compressed Files</option> </select>';
        $('#pars_'+id).html(out_d);
    }
    if(type==11){
        out_d+='<table cellpadding="4"><tr>\
		<td>'+k_type+'<br><select name="static_'+id+'" onchange="static_ch('+id+',this.value)" ><option value="1">User ID</option><option value="2">GET ID</option><option value="3">POST ID</option><option value="4">GET</option><option value="5">POST</option><option value="6">Variable</option><option value="7">Static Value</option></select></td>\
		<td id="show_sta_'+id+'" class="hide">Value<br><input type="text" name="static_val_'+id+'"/></td></tr></table>';
        $('#pars_'+id).html(out_d);
    }
    if(type==6){
        out_d+='<input type="hidden" name="list_'+id+'" id="list_'+id+'"/>\
		<div class="f1 colr5 Over" data-toggle="modal" data-target="#m_info" onclick="addTolist2('+id+')">Edit menu</div>\
		<div id="list_t'+id+'"></div>';
        $('#pars_'+id).html(out_d);
    }
    if(type==15 || type==14){
        out_d+=k_val+' : <input style="width:100px" type="text" name="cus_val_'+id+'"/>';
        $('#pars_'+id).html(out_d);
    }
    //loadFormElements('#modForm');
}
/*******************************************/
function saveToListVals2(id){
    var myPars=new Array();
    var myVal="";
    $('#list_t'+id).html("");
    $('#list_'+id).val(myVal);
    $('#list_all option').each(function(){
        if($(this).val()!=""){
            myPars.push($(this).val());
            if(myVal!=""){
                myVal+="|";
            }
            myVal+=$(this).val();
            $('#list_t'+id).append('<div>'+$(this).val()+'</div>');
        }
    });
    $('#list_'+id).val(myVal);
    $('#m_info').modal('toggle');
    //  alert(actModItem);
    //   $.post('saveItemList',{pars:myPars,id:id},function(data){
    //
    //   });
}
var upFile_Size=0;
var activeUploader='';
var upimg=0;
function fileSelected(id){
    var count=document.getElementById('fi_'+id).files.length;
    for(var index=0; index < count ;index++){
        var file=document.getElementById('fi_'+id).files[index];
        var fileSize=0;
        upFile_Size=file.size;
        uploadImage(id);
        upimg=1;
    }
}
function uploadImage(id){
    activeUploader=id;
    $('.loadWin').show();
    $('.loadWin').html('<div class="load_img_con hide f1 font22" style="font-size: 22px;">Uploading Photo...' +
        '<div class="progressShow"><div></div></div>' +
        '<div class="progressData " style="font-size: 24px;">0%</div>' +
        '</div>');
    $('.load_img_con').slideDown(500);
    var fd = new FormData();
    var count = document.getElementById('fi_'+id).files.length;
    for (var index = 0; index < count; index ++){
        var file = document.getElementById('fi_'+id).files[index];
        fd.append(file.name, file);
    }
    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", uploadProgress, false);
    xhr.addEventListener("load", uploadComplete, false);
    xhr.addEventListener("error", uploadFailed, false);
    xhr.addEventListener("abort", uploadCanceled, false);
    xhr.open("POST","http://localhost/phone/public/admin/upImage");
    xhr.send(fd);
}
function uploadProgress(evt){
    if(evt.lengthComputable){
        per=evt.loaded * 100 / evt.total;
        var percentComplete = Math.round(per);
        if (upFile_Size > 1024 * 1024){
            fileSize = (Math.round(upFile_Size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
        }else{
            fileSize = (Math.round(upFile_Size * 100 / 1024) / 100).toString() + 'KB';
        }
        loadSize=upFile_Size*per/100
        if (loadSize > 1024 * 1024){
            loadSize2 = (Math.round(loadSize * 100 / (1024 * 1024)) / 100).toString() + 'MB';
        }else{
            loadSize2 = (Math.round(loadSize * 100 / 1024) / 100).toString() + 'KB';
        }
        $('.progressShow').children('div').width(percentComplete+'%');
        $('.progressData').html(percentComplete.toString() + '% - '+fileSize+' / '+loadSize2);
    }else{
        //document.getElementById('progress').innerHTML = 'unable to compute';
    }
}
function uploadComplete(evt){
    upimg=0;
    out=evt.target.responseText;
    d=out.split('<!--***-->');
    errr=0;
    er_msg='';
    if(d[1]!=''){
        data=d[1].split(',');
        if(data[0]!='xxx'){
            if(data[2]!=''){
                // if(z_page_name=='create_products'){
                //     $('.upimageCon[no='+activeUploader+'] div[list]').append('<div data-toggle="modal" data-target="#Imgs" class="fl uibox2 grid-item" \
                // no="'+data[0]+'" org="'+data[1]+'" group="'+activeUploader+'" sc="0" w="'+data[3]+'" h="'+data[4]+'">' +
                //     ' <figure class="card" itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject">' +
                //     ' <a href="#" itemprop="contentUrl" data-size="600x441">' +
                //     ' <img class="img-thumbnail" src="'+data[1]+'" itemprop="thumbnail" alt="Image description" />' +
                //     '</a></figure></div>');
                //
                // }
                //else {
                $('.upimageCon[no='+activeUploader+'] div[list]').append('<div data-toggle="modal" data-target="#Imgs" class="fl uibox " style="background-image: url('+data[2]+')" \
				no="'+data[0]+'" org="'+data[1]+'" group="'+activeUploader+'" sc="0" w="'+data[3]+'" h="'+data[4]+'"></div>');
                //}

                if(z_page_name=='account_settings'){
                    $('#account_settings_img').find('img').attr('src',data[1]);
                }
            }
            idess=checkImagesIds(activeUploader);
            upCB=$('.upimageCon[no='+activeUploader+']').attr('cb');
            if(upCB!=''){
                upCB=upCB.replace('[id]',data[0]);
                upCB=upCB.replace('[ids]',idess);
                doScript(upCB);
            }
        }else{
            errr=1;
            if(data[1]==1){er_msg='لم يتم ارسال ملف';}
            if(data[1]==2){er_msg='خطأ اثناء التحميل';}
            if(data[1]==3){er_msg='الملف أكبر من الحجم المتاح';}
            if(data[1]==4){er_msg='الملف ليس من النوع المطلوب';}
            if(data[1]==5){er_msg='لم يتم نسخ الملف';}
            if(data[1]==6){er_msg='لم يتم تسجيل الملف بقاعدة البيانات ';}
        }
    }
    if(errr==1){
        $('.lod_img_con').html('<span class="f1 winOprNote_err">'+er_msg+'</span>');
        setTimeout(function(){$('.loadWin').hide();},1000);
    }else{
        setTimeout(function(){$('.progressShow').slideUp(500,function(){$('.loadWin').hide();})},500);
    }
    //document.getElementById('out').innerHTML = evt.target.responseText;
}
function doScript(str){eval(str);}
function checkImagesIds(id){
    ides='';
    $('.uibox[group='+id+']').each(function(index, element) {
        if(ides!='')ides+=',';
        ides+=$(this).attr('no');
    });
    $('.uibox2[group='+id+']').each(function(index, element) {
        if(ides!='')ides+=',';
        ides+=$(this).attr('no');
    });
    $('.upimageCon[no='+id+']').children('input[name='+id+']').val(ides);
    imgClick();
    return ides;
}
function imgClick(){
    $('.imgUpHol').click(function(){upimg=1;})
    $('.uibox[sc=0]').each(function(index,element){
        $(this).click(function(){
            no=$(this).attr('no');
            showImg(no);
        });
        $(this).attr('sc',1);
    });
    $('.uibox2[sc=0]').each(function(index,element){
        $(this).click(function(){
            no=$(this).attr('no');
            showImg2(no);
        });
        $(this).attr('sc',1);
    });
}
function DeleteThisImage(){
    id= $('#delte_img_attr').attr('no');
    //alert(id)
    $('.uibox[no='+id+']').remove();
    vals=$('input[name=cover_img]').val();
    if(vals==null)
    {
        vals=$('input[name=img_id]').val();
    }
    val_arr=vals.split(',');
    val_txt='';
    for(i=0;i<val_arr.length;i++){
        if(val_arr[i]!=id){
            if(val_txt!='') val_txt+=',';
            val_txt+=val_arr[i];
        }
    }
    $('input[name=cover_img]').val(val_txt);
    $('#Imgs').modal('toggle');
    //  $(function () {
    //      $('#Imgs').modal('toggle');
    //  });
}
function showImg2(id){
    //  $('.loadWin').show();
    //alert('gete');
    org=$('.uibox2[no='+id+']').attr('org');
    // alert(id);
    group=$('.uibox2[no='+id+']').attr('group');
    i_w=$('.uibox2[no='+id+']').attr('w');
    i_h=$('.uibox2[no='+id+']').attr('h');
    $('.imgHolder').width(www-20);
    $('.imgHolder').height(hhh-70);
    //  $('.loadWin').html('');
    //  alert('here');
    $('#delte_img_attr').attr('no',id);
    $('#Imgs_content').html('<center><img src="'+org+'"width="auto" height="auto"/></div></center>');
    //fixImage();
}
function showImg(id){
    //  $('.loadWin').show();
    org=$('.uibox[no='+id+']').attr('org');
    group=$('.uibox[no='+id+']').attr('group');
    i_w=$('.uibox[no='+id+']').attr('w');
    i_h=$('.uibox[no='+id+']').attr('h');
    $('.imgHolder').width(www-20);
    $('.imgHolder').height(hhh-70);
    //  $('.loadWin').html('');
    $('#delte_img_attr').attr('no',id);
    $('#Imgs_content').html('<center><img src="'+org+'"width="auto" height="auto"/></div></center>');
    //fixImage();
}
function fixImage(){
    if($('.imgHolder').length>0){
        i_w=$('.imgHolder').children('img').attr('w');
        i_h=$('.imgHolder').children('img').attr('h');
        if(((www-20)/(hhh-20))>(i_w/i_h)){
            $('.imgHolder').children('img').attr('height',hhh-70);
            $('.imgHolder').children('img').attr('width','');
            $('.imgHolder').children('img').css('margin-top','');
        }else{
            $('.imgHolder').children('img').attr('width',www-20);
            $('.imgHolder').children('img').attr('height','');
            img_m=((hhh-80)-(((www-20)*i_h)/i_w))/2;
            $('.imgHolder').children('img').css('margin-top',img_m);

        }
    }
}
function closeImage(){
    $('.loadWin').html('');
    $('.loadWin').hide();
}
function uploadFailed(evt){upimg=0;alert("There was an error attempting to upload the file.");}
function uploadCanceled(evt){upimg=0;alert("The upload has been canceled by the user or the browser dropped the connection.");}
/*******************************************************************************/
function co_per_save(){

}
function addTolist2(id){
    val=$('#list_'+id).val();
    $('#m_info_content').html('<center><i class="fa fa-spinner spinner" style="color:#333;font-size: 24px;"></i></center>');
    $.post('add_to_list',{id:id,val:val},function(data){
        // alert(data);
        $('#m_info_content').html(data);
    });
}
function edit_addTolist(type){
    if(type==1){
        //Add
        list_name=$('#list_name').val();
        list_val=$('#list_val').val();
        ll='<option value="'+list_val+':'+list_name+'">'+list_name+'</option>';
        $('#list_all').append(ll);
    }else if(type==2){
        //Update
        list_name=$('#list_name').val();
        list_val=$('#list_val').val();
        rm_val=$('#list_all').val();
        $('#list_all option[value="'+rm_val+'"]').each(function(){
            //    alert($(this).html());
            //  alert($(this).val());
            $(this).remove();
        });
        ll='<option value="'+list_val+':'+list_name+'">'+list_name+'</option>';
        $('#list_all').append(ll);
    }else if(type==3){
        //Remove
        rm_val=$('#list_all').val();
        $('#list_all option[value="'+rm_val+'"]').each(function(){
            $(this).remove();
        });
    }
    //val=$('#list_'+id).val();
    // $('#m_info_content').html('<center><i class="fa fa-spinner spinner" style="color:#333;font-size: 24px;"></i></center>');
    // $.post('add_to_list',{id:id,val:val},function(data){
    //     // alert(data);
    //     $('#m_info_content').html(data);
    // });
}
function parlist(id){
    act_parNum=id;
    val=$('#parent_'+id).val();
    // alert($('#parent_128').val());
    $('#m_info_content').html('<center><i class="fa fa-spinner spinner" style="color:#333;font-size: 24px;"></i></center>');

    $.post('get_mod_col_parent',{id:id,val:val},function(data){
        // alert(data);
        $('#m_info_content').html(data);
    });
}
function loadReqDefInput(id,type){
    if(type==1 || type==7 || type==13){
        $('#def_'+id).html('<input class="form-control" type="text" name="defult_'+id+'" />');
    }
    if(type==3){
        $('#def_'+id).html('<input class="form-control" type="checkbox" value="1" name="defult_'+id+'" /><div class="fl f1 lin40">Active</div>');
    }
    if(type==1 || type==2 || type==4|| type==7 || type==8|| type==12 || type==13){
        $('#req_'+id).html('<input class="form-control" type="checkbox" name="req_'+id+'" />');
    }
    if(type==5  || type==6){
        $('#def_'+id).html('<input class="form-control" type="checkbox" value="1" name="par_m_'+id+'" /><div class="fl f1 lin40">Multiple Value</div>');
    }
}
function LoadFields(table,c_link,fildName){
    $('div[link='+c_link+']').html('loading');
    $.post('load_columns',{table:table},function(data){
        $('div[link='+c_link+']').each(function(index,element){
            id=$(this).attr('link_id');
            $(this).html(data);
        });
        makeColumrName(c_link);
    });
}
function makeColumrName(c_link){
    $('div[link='+c_link+']').each(function(index, element){
        id=$(this).attr('link_id');
        $(this).children('select').attr('name',id);
        $(this).children('select').attr('id',id);
    });
}
function saveParentVals(){
    vals='';
    // alert(act_parNum);
    t=$('#parent_table_'+act_parNum).val();
    n=$('#par_val_'+act_parNum).val();
    v=$('#par_txt_'+act_parNum).val();
    m=$('#par_mod_'+act_parNum).val();
    c=$('#par_con_'+act_parNum).val();
    //e=$('#par_evn_'+act_parNum).val();
    if(t!=''){
        // alert(c);
        vals=t+'|'+n+'|'+v+'|'+m+'|'+c;
        $('#parent_t'+act_parNum).html(vals);
        $('#parent_'+act_parNum).val(vals);
    }
    $('#m_info').modal('toggle');
}
function submitForm(form){
    //   alert(form);
    $('#'+form).submit();
    $('#full_win1').modal('toggle');
    // $('#m_info').modal('toggle');
}

function mLinkWin(id){
    $('#m_info_content').html('<center><i class="fa fa-spinner spinner" style="color:#333;font-size: 24px;"></i></center>');

    $.post('link_set',{id:id},function(data){
        $('#m_info_content').html(data);
    });
}
function link_setVal(p_id,s_id){
    $('#m_info_content').html('<center><i class="fa fa-spinner spinner" style="color:#333;font-size: 24px;"></i></center>');

    $.post('link_set_col',{p_id:p_id,s_id:s_id},function(data){
        $('#m_info_content').html(data);
    });
}
function linksetSave(p_id,s_id,col){

    $.post('link_set_save',{p_id:p_id,s_id:s_id,col:col},function(data){
        //    submitForm('modForm');
        setTimeout(function(){modItem(actModItem);},2000);
        $('#m_info').modal('toggle');
    });
}
var form_win_set=new Array();
function setupForm(id,win){
    form_win_set[win_level_pointer]=win;
}
function perwin(type,id){
    $.post('http://localhost/phone/public/admin/list/co_per',{id:id,type:type},function(data){
        $('#permissions_content').html(data);
    });
}
function GetUsersByRole(role_val){
    $.post('http://localhost/phone/public/admin/list_users_by_role',{group_id:role_val},function(data){
        $('#mod_card_list').html(data);
    });
}
function ViewMod2(mod,id){
    $('#m_info_content').html('<center><i class="fa fa-spinner spinner" style="color:#333;font-size: 24px;"></i></center>');
    $.post('http://localhost/phone/public/admin/module/view',{mod:mod,id:id},function(data){
        $('#m_info_content').html(data);
    });
}
// function FireDelMod2(mod,id){
//     swal({
//         title: "Are You Sure",
//         text: "You Can't recover this Item",
//         icon: "warning",
// //            confirmButtonText: "OK"
//         buttons: [
//             'No, cancel it!',
//             'Yes, I am sure!'
//         ],
//         dangerMode: true
//     }).then(function (isConfirm) {
//         if (isConfirm) {
//             deleteItemAjax(mod,id);
//         } else {
//             swal("Cancelled", "Your imaginary file is safe :)", "error");
//         }
//     });
//     event.preventDefault();
// }
// function deleteItemAjax(mod,id){
//     $.post('http://localhost/phone/public/model/destroy',{mod:mod,id:id},function(data){
//         if(data==1){
//             swal({
//                 title: 'Done!',
//                 text: 'Deleted Successfully!',
//                 icon: 'success'
//             });
//             location. reload(true);
//         }
//     });
//
// }
function LogOut(){
    $.post('http://localhost/phone/public/admin/logout',{},function(data){
        if(data==1){
            location.href='http://localhost/phone/public/admin/login';
        }
    });
}
function imgClick4(){
    $('.imgUpHol').click(function(){upimg=1;})
    $('.uibox2[sc=0]').each(function(index,element){
        $(this).click(function(){
            no=$(this).attr('no');
            alert(no);
            showImg2(no);
        })
        $(this).attr('sc',1);
    });
}
function KindOfApplyCoupon(){
    // $('#coupons_items').html('<i class="fa fa-spinner spinner" style="color:#333;font-size: 24px;"></i>');
    // $.post('http://localhost/phone/public/choose_coupon_items',{type:type},function(data){
    //         // $('.coupons_items').css('display','block');
    //         $('#coupons_items').html(data);
    // });
    $('#m_info_content').html('<center><i class="fa fa-spinner spinner" style="color:#333;font-size: 24px;"></i></center>');

    $.post('http://localhost/phone/public/admin/choose_coupon_items',{},function(data){
        // $('.coupons_items').css('display','block');
        $('#m_info_content').html(data);
        // $('#m_info').modal('toggle');
    });
}
function get_choosen_type_data(type){
    $.post('http://localhost/phone/public/admin/choose_coupon_items',{type:type},function(data){
        $('#select_items').html(data);
        $('.items_list_coupon div').css('display','none');
        setTimeout(function(){$('.items_list_coupon div').slideDown(400);},400);
        $('#coupon_sel_items').html('<input type="hidden" name="items_ids" value="" />');
        $('#iconLeft6').attr('type',type);
        $('input[name=affected_item_type]').val(type);
        $('#m_info').modal('toggle');
    });
}
var actItemCoupon=0;
function checkCouponItemsIds(){
    var ides='';
    $('#coupon_sel_items div').each(function(index, element) {
        if(ides!='')ides+=',';
        ides+=$(this).attr('item_id');
    });
    return ides;
}
function coupons_sel_items(){
    item_busy=0;
    $('.items_list_coupon div').click(function(){
        item_busy=1;
        item_id=$(this).attr('item_id');
        name=$(this).attr('name');
        $(this).attr('del',1);
        buttn_m='<div class="selected_item selected_item_hover" item_id="'+item_id+'" style="color:#ccc">'+name+'</div>';
        $('#coupon_sel_items').append(buttn_m);
        ids=checkCouponItemsIds();
        $('input[name=items_ids]').val(ids);
        $(this).slideUp(400,function(){
            items_list_coupon2();
        });
    });
}
var just_once=0;
function items_list_coupon2(){
    $('.items_list_coupon div[del=1]').hide();
    $('.selected_item').click(function(){
        m_id=$(this).attr('item_id');
        name=$(this).html();
        $('.selected_item[item_id='+m_id+']').slideUp(400,function(){
            $('.selected_item[item_id='+m_id+']').remove();
            //test
            //   if($(this).hasClass('for_edit')){
            //       $('.items_list_coupon').append('<div class="col-md-11 norCat" item_id="'+m_id+'"  name="'+name+'"  style="position:relative;display:none">'+name+'</div>');
            //      // coupons_sel_items();
            //   }
            $('.items_list_coupon div[item_id='+m_id+']').slideDown(400);
            $('.items_list_coupon div[item_id='+m_id+']').attr('del','0');
            vals=$('input[name=items_ids]').val();
            val_arr=vals.split(',');
            val_txt='';
            for(i=0;i<val_arr.length;i++){
                if(val_arr[i]!=m_id){
                    if(val_txt!='') val_txt+=',';
                    val_txt+=val_arr[i];
                }
            }
            $('input[name=items_ids]').val(val_txt);
            // $('.items_list_coupon div[item_id='+m_id+']').removeClass('DisplayNone');
        });
    });
}
function checkPrefix(){
    v=$('input[name=prefix]').val();
    if(v.length<=4){
        if($('input[name=prefix]').hasClass('border_error')){
            $('input[name=prefix]').removeClass('border_error');
        }
    }
}
var coupons_code=new Array();
function getRandomStringCoupon() {
    var prefix=$('input[name=prefix]').val();
    if(prefix.length!=4){$('input[name=prefix]').addClass('border_error');
        toastr.error('Error Prefix should be only 4 charachters', {'showMethod': 'slideDown' , 'hideMethod': 'slideUp','positionClass': 'toast-top-center', timeOut: 2000});
    }else if($('input[name=count]').val()<1)
    {
        toastr.error('Please define count of coupons', {'showMethod': 'slideDown' , 'hideMethod': 'slideUp','positionClass': 'toast-top-center', timeOut: 2000});

    }else{
        prefix=prefix+"_";
        var suffix=$('input[name=suffix]').val();
        if(suffix!=null && suffix!="") suffix="_"+suffix;
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        var start_code='';
        var end_code='';
        var length=6;
        var count=$('input[name=count]').val();
        for(j=0;j<count;j++){
            result='';
            for ( var i = 0; i < length; i++ ) {
                result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));

            }
            if(j==0){start_code=result;}

            coupons_code[j]=prefix+result+suffix;
        }

        $('input[name=code]').val(prefix+start_code+suffix);
        $('input[name=code_generated]').val('First Coupon is: '+prefix+start_code+suffix);
        $('#coupons_codes').val(coupons_code);
        if($('#check_generated_codes').hasClass('hidden')){
            $('#check_generated_codes').removeClass('hidden')
        }else{
            $('#check_generated_codes').addClass('hidden')
        }
    }
}
function getRandomStringCouponOld() {
    var prefix=$('input[name=prefix]').val();
    if(prefix.length!=4){$('input[name=prefix]').addClass('border_error');
        toastr.error('Error Prefix should be only 4 charachters', {'showMethod': 'slideDown' , 'hideMethod': 'slideUp','positionClass': 'toast-top-center', timeOut: 2000});
    }else if($('input[name=count]').val()<1)
    {
        toastr.error('Please define count of coupons', {'showMethod': 'slideDown' , 'hideMethod': 'slideUp','positionClass': 'toast-top-center', timeOut: 2000});

    }else{
        prefix=prefix+"_";
        var suffix=$('input[name=suffix]').val();
        if(suffix!=null && suffix!="") suffix="_"+suffix;
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        var start_code='';
        var end_code='';
        var length=6;
        var count=$('input[name=count]').val();
        var j=0;
        //  for(j=0;j<count;j++){
        result='';
        for ( var i = 0; i < length; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));

        }
        if(j==0){start_code=result;}

        coupons_code[j]=prefix+result+suffix;
        //   }

        $('input[name=code]').val(prefix+start_code+suffix);
        $('input[name=code_generated]').val(prefix+start_code+suffix);
        $('#coupons_codes').val(coupons_code);
        // if($('#check_generated_codes').hasClass('hidden')){
        //     $('#check_generated_codes').removeClass('hidden')
        // }else{
        //     $('#check_generated_codes').addClass('hidden')
        // }
    }
}
function CheckGeneratedCodes(){
    var out='<div class="modal-header bg-primary white">\n' +
        '    <h4 class="modal-title" id="myModalLabel8">Coupon Codes</h4>\n' +
        '    <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
        '        <span aria-hidden="true">&times;</span>\n' +
        '    </button>\n' +
        '</div>\n' +
        '<div class="modal-body">\n' +
        '    <table class="table table-hover text-center" border="0" cellpadding="4" cellspacing="0">\n' +
        '        <thead>\n' +
        '        <tr>\n' +
        '            <th class="text-center">Id</th>\n' +
        '            <th class="text-center">Code</th>\n' +
        '        </tr>\n' +
        '        </thead>\n' +
        '        <tbody>';
    var rows='';
    for(i=0;i<coupons_code.length;i++){
        out+='<tr><td>'+(i+1)+'</td><td>'+coupons_code[i]+'</td></tr>';
    }
    out+=' </tbody>\n' +
        '    </table>\n' +
        '</div>\n' +
        '<div class="modal-footer">\n' +
        '    <button type="button" class="btn grey btn-outline-secondary" data-dismiss="modal">Close</button>\n' +
        '</div>\n';
    $('#m_info_content').html(out);
}
function DoSearchCoupItm(){
    type= $('#iconLeft6').attr('type');
    val=$('input[name=search]').val();
    // if(val !=''){
    $('#select_items').html('');
    $.post('http://localhost/phone/public/admin/do_search_coup_itm',{type:type,val:val},function(data) {
        $('#select_items').html(data);
        $('.items_list_coupon div').css('display', 'none');

        $('.items_list_coupon div').slideDown(400);
        $('.items_list_coupon div').each(function (index, element){
            var testtt = $(this).attr('item_id');
            var hide=0;
            $('#coupon_sel_items div').each(function (index, element) {
                if (testtt == $(this).attr('item_id')) {
                    hide=1;
                    $('.items_list_coupon div[item_id='+testtt+']').attr('del','1');
                    //$('.items_list_coupon div[item_id="' + testtt + '"]').css('display','none');
                }
            });
            if(hide==1){
                $(this).addClass('DisplayNone');
                //$('.items_list_coupon div[del=1]').hide();
                items_list_coupon2();
            }
        });
    });
}
function CouponCodes(id){
    $('#general_full_win_content').html('<center><i class="fa fa-spinner spinner" style="color:#333;font-size: 24px;"></i></center>');
    $.post('http://localhost/phone/public/admin/coupon/get_codes',{id:id},function(data){
        $('#general_full_win_content').html(data);

    });
}
$(document).ready(function(){
    imgClick();
});

function showOfferOptions(type){
    if(type==1){
        $('#offer_options_type1').css('display','block');
        $('#offer_options_type2').css('display','none');
        $('#l_note').css('display','none');
    }else if(type==2){
        $('#offer_options_type2').css('display','block');
        $('#offer_options_type1').css('display','none');
        $('#l_note').css('display','none');
    }else{
        $('#l_note').css('display','block');
        $('#offer_options_type2').css('display','none');
        $('#offer_options_type1').css('display','none');
    }
}
//*******************************Order Maganism **********************************//
var ActOrderId=0;
var ActOrderItemReplace=0;
function AddToReplace(id){
    replace=$('table tr[item_id='+id+']').attr('replace');
    var ntype=0;
    if(replace==1){
        ntype=1;ActOrderItemReplace=1;$('table tr[item_id='+id+']').attr('replace','0');
        $('table tr[item_id='+id+']').css('background-color','#FFF9C4');
    }else{ ntype=2; ActOrderItemReplace=0;$('table tr[item_id='+id+']').attr('replace','1');
        $('table tr[item_id='+id+']').css('background-color','transparent');
        //   alert(ntype);
    }
    $.post('http://localhost/phone/public/admin/order/update_order_item_status',{ntype:ntype,id:id},function(data){
        //    alert(data);
        if(data==1){
            $('select[name=next_status]').val('2');
        }else{
            $('select[name=next_status]').val('4');
        }
    });
    // $('table tr[item_id='+id+'] td').each(function(index,element){
    // if($(this).find('div').attr('item_id')==id){
    //  $(this).find('div[item_id='+id+']').css('background-image','url("http://")')
    // }
    // });
}
function PassForwardOrder(){
    var order_id=$('input[name=order_id]').val();
    var next_status=$('select[name=next_status]').val();
    var pass_forward=0;
    //  if($('input[name=order_pass_forward]').prop("checked"))
    if($('input[name=order_status_id]')==2)  pass_forward=0;
    else pass_forward=1;
    var replace=0;
    var comment=$('textarea').val();;
    $('#review_products tr').each(function(index,element){
        if($(this).attr('replace')==0){replace=1;}
    })
    if(replace==1 && next_status==4){
        toastr.error('There are items have to be replaced ! you can not choose progress next status', {'showMethod': 'slideDown' , 'hideMethod': 'slideUp','positionClass': 'toast-top-center', timeOut: 2000});
    }else if(comment=="" || comment==null){
        toastr.error('Please Add Comment', {'showMethod': 'slideDown' , 'hideMethod': 'slideUp','positionClass': 'toast-top-center', timeOut: 2000});
    }else{
        $.post('http://localhost/phone/public/admin/order/PassForward',{comment:comment,order_id:order_id,choosed_status:next_status,pass_forward:pass_forward},function(data){
            // alert(data);
            if(data==1){
                swal({
                    type: "success",
                    title: "Order Passed Sucessfuly !",
                    icon: 'success',
                    text: "This order has been passed to next status.",
                    confirmButtonClass: "btn btn-success"
                });
                location.reload(true);
            }
        });
    }
}
function get_workflow_transactions(id){
    $('#general_full_win_content').html('<center><i class="fa fa-spinner spinner" style="color:#333;font-size: 24px;"></i></center>');
    $.post('http://localhost/phone/public/admin/order/get_workflow_transactions',{id:id},function(data){
        $('#general_full_win_content').html(data);
    });
}
function get_order_product_det(id){
    $('#general_full_win_content').html('<center><i class="fa fa-spinner spinner" style="color:#333;font-size: 24px;"></i></center>');
    $.post('http://localhost/phone/public/admin/order/view_product_det',{id:id},function(data){
        $('#general_full_win_content').html(data);
    });
}
function cancel_order(id){
    swal({
        title: "Are you sure you want to cancel this order?",
        text: "You won't be able to revert this Item!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        confirmButtonClass: "btn btn-primary",
        cancelButtonClass: "btn btn-danger ml-1",
        buttonsStyling: false,
        buttons: [
            'No, cancel it!',
            'Yes, I am sure!'
        ],
        dangerMode: true
    }).then(function (isConfirm) {
        if (isConfirm) {
            //   alert('fuck')
            do_cancel_order(id);
        } else {
            swal("Cancelled", "Your imaginary file is safe :)", "error");
        }
    });
}
function do_cancel_order(id){
    $.post('http://localhost/phone/public/admin/order/cancel_order',{id:id},function(data){
        if(data==1){
            swal({
                type: "success",
                title: "Order Canceled !",
                icon: 'success',
                text: "Your Item has been deleted.",
                confirmButtonClass: "btn btn-success"
            });
            location.reload(true);
        }
    });
}
function ajax_get_cust_orders(customer_id){
    $('#general_full_win_content').html('<center><i class="fa fa-spinner spinner" style="color:#333;font-size: 24px;"></i></center>');
    $.post('http://localhost/phone/public/admin/order/ajax_get_customer_orders',{customer_id:customer_id},function(data){
        $('#general_full_win_content').html(data);
    });
}
function submitNewVPOST(){
    var title_ar=$('input[name=title_ar]').val()
    var title_en=$('input[name=title_en]').val()
    var comments=0;
    if($('input[name=comments]').prop("checked")) comments=1;
    var myContent_ar = tinymce.get("editor1").getContent();
    var myContent_en = tinymce.get("editor").getContent();
    var url=$('input[name=url]').val();
    var video_id=$('input[name=video_id]').val();
    var cover_img=$('input[name=cover_img]').val();
    if(cover_img==""){
        toastr.error('Error Please Add Featured image for your post', {'showMethod': 'slideDown' , 'hideMethod': 'slideUp','positionClass': 'toast-top-center', timeOut: 2000});
    }else{
        $.post('http://localhost/phone/public/admin/vlog/save_vlog',{title_ar:title_ar,title_en:title_en,comments:comments,content_ar:myContent_ar,content_en:myContent_en
            ,url:url,video_id:video_id,cover_img:cover_img},function(data){
            if(data>0){
                swal({
                    type: "success",
                    title: "Added Sucessfuly !",
                    icon: 'success',
                    text: "Your Item has been Added.",
                    confirmButtonClass: "btn btn-success"
                });
                location.reload(true);
            }
        });
    }

}
function submitUpdateVPOST(){
    var title_ar=$('input[name=title_ar]').val();
    var title_en=$('input[name=title_en]').val();
    var id=$('input[name=id]').val();
    var comments=0;
    if($('input[name=comments]').prop("checked")) comments=1;
    var myContent_en = tinymce.get("editor1").getContent();
    var myContent_ar = tinymce.get("editor").getContent();
    var url=$('input[name=url]').val();
    var video_id=$('input[name=video_id]').val();
    var cover_img=$('input[name=cover_img]').val();
    if(cover_img==""){
        toastr.error('Error Please Add Featured image for your post', {'showMethod': 'slideDown' , 'hideMethod': 'slideUp','positionClass': 'toast-top-center', timeOut: 2000});
    }else{
        $.post('http://localhost/phone/public/admin/vlog/update_vlog',{id:id,title_ar:title_ar,title_en:title_en,comments:comments,content_ar:myContent_ar,content_en:myContent_en
            ,url:url,video_id:video_id,cover_img:cover_img},function(data){
            if(data==1){
                swal({
                    type: "success",
                    title: "Updated Sucessfuly !",
                    icon: 'success',
                    text: "Your Item has been Added.",
                    confirmButtonClass: "btn btn-success"
                });
                location.reload(true);
            }
        });
    }

}
function send_notification_manually(order_id){
    $('#m_info_content').html('<center><i class="fa fa-spinner spinner" style="color:#333;font-size: 24px;"></i></center>');
    $.post('http://localhost/phone/public/admin/order/send_notification_manually',{order_id:order_id},function(data){
        $('#m_info_content').html(data);
    });
}
//**************************************************************//
function ShowHideDescription(){
    if($('#description').hasClass('hidden')){
        $('#description').removeClass('hidden');
    }else{
        $('#description').addClass('hidden');
    }
}
function CreateNewEvent(){
    // alert($('td.day.active').html())
    var event_day=$('td.day.active').attr('data-day');
    var event_hour=$('td span.timepicker-hour').html();
    var event_minute=$('td span.timepicker-minute').html();
    $('input[name=event_day]').val(event_day);
    $('input[name=event_hour]').val(event_hour);
    $('input[name=event_minute]').val(event_minute);
    myContent = tinymce.get("editor1").getContent();
    $('textarea[name=content_en]').html(myContent);
    myContent = tinymce.get("editor").getContent();
    $('textarea[name=content_ar]').html(myContent);
    form=document.getElementById('event_form');
    $.ajax({
        type: "POST",
        url: 'http://localhost/phone/public/admin/event/save',
        data: new FormData(form),
        contentType: false,       // The content type used when sending data to the server.
        cache: false,             // To unable request pages to be cached
        processData:false,
        success: function (response) {
            if(response==1){
                toastr.success('Event created successfuly', {'showMethod': 'slideDown' , 'hideMethod': 'slideUp','positionClass': 'toast-top-center', timeOut: 2000});
                location.reload();
            }else{
                toastr.error('Error Data', {'showMethod': 'slideDown' , 'hideMethod': 'slideUp','positionClass': 'toast-top-center', timeOut: 2000});

            }
            // if (response!='يرجى المحاولة لاحقا') {
            //     //  alert(response);
            //     toastr["success"](response);
            //
            //     $('#save').attr('disabled',false);
            //     location.reload();
            // } else {
            //     toastr["error"](response);
            //     $('#save').attr('disabled',false);
            // }
        },
    })
}
function UpdateEvent2(){
    // alert($('td.day.active').html())
    var event_day=$('td.day.active').attr('data-day');
    var event_hour=$('td span.timepicker-hour').html();
    var event_minute=$('td span.timepicker-minute').html();
    $('input[name=event_day]').val(event_day);
    $('input[name=event_hour]').val(event_hour);
    $('input[name=event_minute]').val(event_minute);
    myContent = tinymce.get("editor1").getContent();
    $('textarea[name=content_en]').html(myContent);
    myContent = tinymce.get("editor").getContent();
    $('textarea[name=content_ar]').html(myContent);
    form=document.getElementById('event_form');
    $.ajax({
        type: "POST",
        url: 'http://localhost/phone/public/admin/event/update',
        data: new FormData(form),
        contentType: false,       // The content type used when sending data to the server.
        cache: false,             // To unable request pages to be cached
        processData:false,
        success: function (response) {
            if(response==1){
                toastr.success('Event Updated successfuly', {'showMethod': 'slideDown' , 'hideMethod': 'slideUp','positionClass': 'toast-top-center', timeOut: 2000});
                location.reload();
            }else{
                toastr.error('Error Data', {'showMethod': 'slideDown' , 'hideMethod': 'slideUp','positionClass': 'toast-top-center', timeOut: 2000});

            }
            // if (response!='يرجى المحاولة لاحقا') {
            //     //  alert(response);
            //     toastr["success"](response);
            //
            //     $('#save').attr('disabled',false);
            //     location.reload();
            // } else {
            //     toastr["error"](response);
            //     $('#save').attr('disabled',false);
            // }
        },
    })
}
//*****************************************//
function ChangeInvoicePaymentStatus(id){
    $.post('http://localhost/phone/public/admin/Invoice/ChangePaymentStatus',{id:id},function(data){
        if(data==1){
            swal({
                type: "success",
                title: "Updated Sucessfuly !",
                icon: 'success',
                text: "Payment Status Updated",
                confirmButtonClass: "btn btn-success"
            });
        }
    })
}
function do_order_search2(){
    $('#data_tables').html('<center><i class="fa fa-spinner spinner" style="color:#333;font-size: 24px;"></i></center>');
    var form=document.getElementById('do_order_search');
    $.ajax({
        type: "POST",
        url: 'http://localhost/phone/public/admin/order/order_do_search',
        data: new FormData(form),
        contentType: false,
        cache: false,
        processData:false,
        success: function (response) {
            $('#data_tables').html(response);

        },
    })
}
function do_invoice_search2(){
    $('#app-invoice-wrapper').html('<center><i class="fa fa-spinner spinner" style="color:#333;font-size: 24px;"></i></center>');
    var form=document.getElementById('invoice_do_search');
    $.ajax({
        type: "POST",
        url: 'http://localhost/phone/public/admin/Invoice/invoice_do_search',
        data: new FormData(form),
        contentType: false,
        cache: false,
        processData:false,
        success: function (response) {
            $('#app-invoice-wrapper').html(response);

        },
    })
}
function do_module_search(){
    $('.styleswitcher').toggleClass('hidden');
    $('.styleswitcher_toggle').toggleClass('hidden');
    $('#data_tables').toggleClass('col-9');
    $('#data_tables').html('<center><i class="fa fa-spinner spinner" style="color:#333;font-size: 24px;"></i></center>');
    var form=document.getElementById('module_search_form');
    $.ajax({
        type: "POST",
        url: 'http://localhost/phone/public/admin/module/module_do_search',
        data: new FormData(form),
        contentType: false,
        cache: false,
        processData:false,
        success: function (response) {
            $('#data_tables').html(response);
            $('.styleswitcher').toggleClass('active');
            $('.styleswitcher_toggle').toggleClass('active');
            $('.styleswitcher').toggleClass('hidden');
            $('.styleswitcher_toggle').toggleClass('hidden');
        },
    })
}
//*********************************Website --> Carts******************************************//
function add_pro_to_cart(id){
    $.post('http://localhost/phone/public/carts/add_pro_to_cart',{id:id},function(data){

    });
}
function SubmitAddCatNewField(category_id){
    // alert($('td.day.active').html())
    // var event_day=$('td.day.active').attr('data-day');
    // var event_hour=$('td span.timepicker-hour').html();
    // var event_minute=$('td span.timepicker-minute').html();
    // $('input[name=event_day]').val(event_day);
    // $('input[name=event_hour]').val(event_hour);
    // $('input[name=event_minute]').val(event_minute);
    // myContent = tinymce.get("editor1").getContent();
    // $('textarea[name=content_en]').html(myContent);
    // myContent = tinymce.get("editor").getContent();
    // $('textarea[name=content_ar]').html(myContent);
    form=document.getElementById('add_new_cat_field');
    $.ajax({
        type: "POST",
        url: 'http://localhost/phone/public/admin/new_cat_field_save',
        data: new FormData(form),
        contentType: false,       // The content type used when sending data to the server.
        cache: false,             // To unable request pages to be cached
        processData:false,
        success: function (response) {
            if(response==1){
                // toastr.success('Event Updated successfuly', {'showMethod': 'slideDown' , 'hideMethod': 'slideUp','positionClass': 'toast-top-center', timeOut: 2000});
                // location.reload();
                product_get_properties3(category_id);
                $('#m_info').modal('toggle');
            }else{
                toastr.error('Error Data', {'showMethod': 'slideDown' , 'hideMethod': 'slideUp','positionClass': 'toast-top-center', timeOut: 2000});

            }
            // if (response!='يرجى المحاولة لاحقا') {
            //     //  alert(response);
            //     toastr["success"](response);
            //
            //     $('#save').attr('disabled',false);
            //     location.reload();
            // } else {
            //     toastr["error"](response);
            //     $('#save').attr('disabled',false);
            // }
        },
    })
}
function preview_post2(){
    title_ar=$('input[name=title_ar]').val();
    title_en=$('input[name=title_en]').val();
    myContent_ar = tinymce.get("editor1").getContent();
    // $('textarea[name=content_en]').html(myContent);
    myContent_en = tinymce.get("editor").getContent();
    // $('textarea[name=content_ar]').html(myContent);
    cover_img=$('input[name="cover_img"]').val();
    window.open('http://localhost/phone/public/vlog/article/preview?cover_image='+cover_img+'&title='+title_en+'&content='+JSON.stringify(myContent_en), '_blank');
}
function publish_post(){
    var title_ar=$('input[name=title_ar]').val()
    var title_en=$('input[name=title_en]').val()
    var comments=0;
    if($('input[name=comments]').prop("checked")) comments=1;
    var myContent_ar = tinymce.get("editor1").getContent();
    var myContent_en = tinymce.get("editor").getContent();
    var url=$('input[name=url]').val();
    var video_id=$('input[name=video_id]').val();
    var cover_img=$('input[name=cover_img]').val();
    if(cover_img==""){
        toastr.error('Error Please Add Featured image for your post', {'showMethod': 'slideDown' , 'hideMethod': 'slideUp','positionClass': 'toast-top-center', timeOut: 2000});
    }else{
        $.post('http://localhost/phone/public/admin/vlog/save_vlog',{title_ar:title_ar,title_en:title_en,comments:comments,content_ar:myContent_ar,content_en:myContent_en
            ,url:url,video_id:video_id,cover_img:cover_img},function(data){
            if(data>0){
                window.open("http://localhost/phone/public/V-log/Articles/"+id,"_blank");
                location.reload(true);
            }
        });
    }
}
function update_save_as_draft(){
    //  $('input[name=save_as_draft]').val(1);
    var title_ar=$('input[name=title_ar]').val();
    var title_en=$('input[name=title_en]').val();
    var id=$('input[name=id]').val();
    var comments=0;
    if($('input[name=comments]').prop("checked")) comments=1;
    var myContent_en = tinymce.get("editor1").getContent();
    var myContent_ar = tinymce.get("editor").getContent();
    var url=$('input[name=url]').val();
    var video_id=$('input[name=video_id]').val();
    var cover_img=$('input[name=cover_img]').val();
    if(cover_img==""){
        toastr.error('Error Please Add Featured image for your post', {'showMethod': 'slideDown' , 'hideMethod': 'slideUp','positionClass': 'toast-top-center', timeOut: 2000});
    }else{
        $.post('http://localhost/phone/public/admin/vlog/update_vlog',{save_as_draft:1,id:id,title_ar:title_ar,title_en:title_en,comments:comments,content_ar:myContent_ar,content_en:myContent_en
            ,url:url,video_id:video_id,cover_img:cover_img},function(data){
            if(data==1){
                location.href='http://localhost/phone/public/admin/vlog/posts';
            }
        });
    }
}
function create_save_as_draft(){
    // $('input[name=save_as_draft]').val(1);
    var title_ar=$('input[name=title_ar]').val()
    var title_en=$('input[name=title_en]').val()
    var comments=0;
    if($('input[name=comments]').prop("checked")) comments=1;
    var myContent_ar = tinymce.get("editor1").getContent();
    var myContent_en = tinymce.get("editor").getContent();
    var url=$('input[name=url]').val();
    var video_id=$('input[name=video_id]').val();
    var cover_img=$('input[name=cover_img]').val();
    if(cover_img==""){
        toastr.error('Error Please Add Featured image for your post', {'showMethod': 'slideDown' , 'hideMethod': 'slideUp','positionClass': 'toast-top-center', timeOut: 2000});
    }else{
        $.post('http://localhost/phone/public/admin/vlog/save_vlog',{save_as_draft:1,title_ar:title_ar,title_en:title_en,comments:comments,content_ar:myContent_ar,content_en:myContent_en
            ,url:url,video_id:video_id,cover_img:cover_img},function(data){
            if(data>0){
                //   http://localhost/phone/public/admin/vlog/posts
                location.href='http://localhost/phone/public/admin/vlog/posts';
            }
        });
    }
}
