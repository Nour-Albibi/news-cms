<script>
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
                    $('.upimageCon[no='+activeUploader+'] div[list]').append('<div data-toggle="modal" data-target="#Imgs" class="fl uibox " style="background-image: url('+data[2]+')" \
				no="'+data[0]+'" org="'+data[1]+'" group="'+activeUploader+'" sc="0" w="'+data[3]+'" h="'+data[4]+'"></div>');

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
</script>
