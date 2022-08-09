<style>
 .btn-search {
        border: medium none;
        font-size: 16px;
        padding: 7px 15px;
        position: absolute;
        right: 0;
        top: 0;
        background: #ddd;
    }
</style>
<div class="modal fade text-left" id="m_info" style="z-index: 1000000" tabindex="-1" role="dialog" aria-labelledby="myModalLabel8"
     aria-hidden="true" >
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content" id="m_info_content">
            <div class="modal-body">
            <form method="get" action="#"  name="query_gif_form" id="query_gif_form">
                @csrf
                <input type="hidden" name="boxes" value=""/>
                <div class="row form-group" style="justify-content: center">
                    <div class="col-md-6 col-md-offset-2">
                        <input type="text" class="form-control" placeholder="Search GIF.." name="q" style="position:relative;" onchange="SearchGif(this.value)"/>
                        <button class=" btn-search" type="button" id="btn-search" onclick="SearchGif($('input[name=q]').val())"><i class="fa fa-search"></i></button>
                    </div>
                </div>
                <div id="gif_boxes_container"></div>
            </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" style="width: 180px;background: #333" id="InsertGifButton">Insert</button>
            </div>
        </div>
    </div>
</div>
