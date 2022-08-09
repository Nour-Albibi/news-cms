<!DOCTYPE html>
<html lang="en">
@include('layouts.head')
@include('layouts.CSS.style')
<body class="hold-transition sidebar-mini layout-fixed layout-navbar-fixed">
<div class="loadWin"></div>
<div class="wrapper">
    @include('layouts.navbar')
    @include('layouts.sidebar')
    @yield('content')
    @include('layouts.footer')
</div>
@include('layouts.foot')
@include('layouts.modal')
</body>
</html>
