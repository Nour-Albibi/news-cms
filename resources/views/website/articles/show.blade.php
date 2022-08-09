@extends('website.layouts.site')
@section('main_content')
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="section-title">
                    <center>
                    <h2 class="my_se_title login_account">{{ $article->title  }}</h2>
                    </center>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12 col-md-12 ">
                <!-- blog-details-wrapper start -->
                <div class="blog-details-wrapper row">
                    @if(!empty($article->content))
                        @php $contents=json_decode($article->content) @endphp
                        @foreach($contents->blocks as $block)
                            @if($block->type=="image")
                                <div class="col-md-3" style="height:200px;width:200px;"><img src="{{$block->data->url}}" width="100%" height="100%"/> </div>
                                @endif
                            @endforeach
                    @endif
                </div>
            </div>
        </div>
@endsection
