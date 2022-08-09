@extends('layouts.layout')
@section('vendor_css_page')
    <link rel="stylesheet" type="text/css" href="{{asset('app-assets/vendors/css/extensions/toastr.css')}}">
@endsection
@section('css_page')
    <link rel="stylesheet" type="text/css" href="{{asset('app-assets/css/plugins/extensions/toastr.css')}}">
@endsection
@section('content')
    <!-- BEGIN: Content-->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1>Add New Article</h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item active">Add Article</li>
                        </ol>
                    </div>
                </div>
            </div><!-- /.container-fluid -->
        </section>
        <section class="content">
            <div class="container-fluid">
                <section id="basic-form-layouts">
                    <div class="row match-height">
                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-header">
                                </div>
                                <div class="card-content collapse show">
                                    <div class="card-body">
                                        <div class="card-text">
                                        </div>
                                        <form class="form form-horizontal" action="{{route('article.store')}}"
                                              method="post">
                                            @csrf
                                            <input name="ArticleContent" type="hidden" value=""/>
                                                <div class="form-body">
                                                    <h4 class="form-section"><i class="feather icon-info"></i> Article Information
                                                    </h4>
                                                    <div class="form-group row">
                                                        <label class="col-md-3 label-control" for="projectinput1"><span class="required" style="color:#c10c0c">*</span>Title</label>
                                                        <div class="col-md-9">
                                                            <input type="text" required="" id="projectinput1" class="form-control" name="title" placeholder="Title">
                                                        </div>
                                                    </div>
                                                    <script src="https://cdn.jsdelivr.net/npm/@editorjs/editorjs@2.25.0/dist/editor.min.js"></script>
                                                    <script src="https://cdn.jsdelivr.net/npm/@editorjs/editorjs@latest"></script>

                                                    <script src="https://cdn.jsdelivr.net/npm/@editorjs/image@2.3.0"></script>
                                                    <h4 class="form-section"><i class="feather icon-eye"></i>Article Content</h4>
                                                    <div class="form-group col-md-12">
                                                     <div id="editorjs"></div>
                                                        <pre class="row" id="output"></pre>
                                                    </div>

                                                </div>
                                            <div class="form-actions right">
                                                <a  href="#" class="btn btn-warning mr-1">
                                                    <i class="feather icon-x"></i> Cancel
                                                </a>
                                                <button type="submit" class="btn btn-primary">
                                                    <i class="fa fa-check-square-o"></i> Save
                                                </button>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </section>
    </div>
    <!-- END: Content-->
    <script src="{{asset('/assets/plugins/jquery/jquery.min.js')  }}"></script>
    <script src="{{ asset('/assets/plugins/jquery-ui/jquery-ui.min.js')}}"></script>
    <scrtip type="module" src="{{asset('gifplugin/gif-image.js')}}"></scrtip>
    <script>
        function SearchGif(qry){
            $('#gif_boxes_container').html('<center><i class="fa fa-spinner spinner" style="color:#333;font-size: 24px;"></i></center>');
                var query=qry;
                var limits=12;
                $.ajax({
                    type: "GET",
                    url: 'http://localhost:3000/api/Gif/SearchForGifImages?q='+$('input[name=q]').val()+"&limits=10",
                    contentType: false,
                    cache: true,
                    processData:false,
                    success: function (response) {
                        $('#gif_boxes_container').html('<center><i class="fa fa-spinner spinner" style="color:#333;font-size: 24px;"></i></center>');
                        var outhtml='<div class="row col-md-12">';
                        response.results.forEach(function(element,index){
                            var gif_url=element.media_formats.tinygif.url;
                            outhtml+='<div class="col-md-3 col-sm-12 Box"  style="margin-bottom:8px;" img_url="'+gif_url+'" onclick="SelectBox($(this))"><img width="100%" height="100%" src="'+element.media_formats.tinygif.url+'" ></div>';
                        })
                        outhtml+='</div>';
                        $('#gif_boxes_container').html(outhtml);

                    },
                })
        }
        class GifImage {
            static get toolbox() {
                return {
                    title: 'GIF',
                    icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
                };
            }
            render(){
              $.ajax({
                    type: "GET",
                    url: 'http://localhost:3000/api/Gif/GetGifImages',
                    data: { limits: 12},
                    contentType: "application/json",
                    cache: true,
                    processData:false,
                    success: function (response) {
                        $('#m_info').modal('show');
                        $('#gif_boxes_container').html('<center><i class="fa fa-spinner spinner" style="color:#333;font-size: 24px;"></i></center>');
                        var outhtml='<div class="row col-md-12">';
                        response.results.forEach(function(element,index){
                            var gif_url=element.media_formats.tinygif.url;
                                outhtml+='<div class="col-md-3 col-sm-12 Box"  style="margin-bottom:8px;" img_url="'+gif_url+'" onclick="SelectBox($(this))"><img width="100%" height="100%" src="'+element.media_formats.tinygif.url+'" ></div>';
                        })
                        outhtml+='</div>';
                        $('#gif_boxes_container').html(outhtml);

                    },
                })
                const images_block = document.createElement('div')
                images_block.setAttribute('id','images_block');
                //images_block.css('width','100%;');
                const el = document.createElement('input');
                el.setAttribute('id', 'gif_div');
                el.setAttribute('type', 'hidden');
                return el;
            }
            _createImage(url){

            }
            save(blockContent){
                return {
                    url: blockContent.value
                }
            }
        }

        const editor = new EditorJS({
            /**
             * Id of Element that should contain Editor instance
             */
            holder: 'editorjs',
            autofocus: true,
            tools: {
                image: GifImage
            }
        });
        const saveButton = document.getElementById('InsertGifButton');
       // const output = document.getElementById('output');
        function SelectBox(url){
            $('input[name=boxes]').val(url.attr('img_url'));
            $('div.Box').css('border','none');
            url.css('border','3px solid green');
            $('input#gif_div').val(url.attr('img_url'));
            $('#images_block').append('<img src="'+url.attr('img_url')+'" width="100%" height="100%" />');
            const image = document.createElement('img');
            image.src = url.attr('img_url');
           // this.wrapper.innerHTML = '';
            //$('#editorjs').append(image);
        }
        $(document).ready(function(){
            $('#InsertGifButton').click(function(){
                editor.save().then( savedData => {
                  //  output.innerHTML = JSON.stringify(savedData, null, 4);
                //    console.log();
                    data=JSON.stringify(savedData, null, 4);
                    //console.log(data);
                    savedData.blocks.forEach(function(element,index){
                        console.log(element);
                        $('#output').append('<div class="col-md-3 col-sm-12"><img src="'+element.data.url+'" width="100%" height="100%" /></div>');
                    });

                    $('input[name=ArticleContent]').val(JSON.stringify(savedData, null, 4));
                    $('#m_info').modal('hide');
                })
            });
        })

    </script>
@endsection
@section('page_vendor_js')
    <script src="{{asset('app-assets/vendors/js/extensions/toastr.min.js')}}"></script>
@endsection
@section('page_js')
    <script src="{{asset('app-assets/js/scripts/extensions/toastr.js')}}"></script>
@endsection
