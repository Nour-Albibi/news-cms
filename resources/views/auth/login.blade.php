<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>News CMS | Log in</title>
    <!-- Google Font: Source Sans Pro -->
    <link rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="{{asset('assets/plugins/fontawesome-free/css/all.min.css')}}">
    <!-- icheck bootstrap -->
    <link rel="stylesheet" href="{{asset('assets/plugins/icheck-bootstrap/icheck-bootstrap.min.css')}}">
    <!-- Theme style -->
    <link rel="stylesheet" href="{{asset('assets/css/adminlte.min.css')}}">
   <link rel="stylesheet" href="{{asset('assets/css/mycustom.css')}}"/>
</head>
<body class="hold-transition login-page">
<div class="col-lg-4 col-md-8 col-10 box-shadow-2 p-0" style="margin-top: 140px;">
    <div class="card border-grey border-lighten-3 px-1 py-1 m-0">
        <div class="card-header border-0">
            <div class="card-title text-center">
                <strong>News CMS</strong>
            </div>
        </div>
        <div class="card-content">
            <p class="card-subtitle line-on-side text-muted text-center font-small-3 mx-2 my-1">
                <span>Enter Your Account Details</span>
            </p>
            <div class="card-body">
                <form class="form-horizontal" method="POST" action="{{url('admin/login')}}" novalidate="">
                    @csrf
                    <fieldset class="form-group position-relative has-icon-left validate">
                        <input type="text" class="form-control" id="user-name" name="email" placeholder="Your Username"
                               required="" aria-invalid="false">
                    </fieldset>
                    <fieldset class="form-group position-relative has-icon-left validate">
                        <input type="password" class="form-control" id="user-password" name="password"
                               placeholder="Enter Password" required="" aria-invalid="false">
                    </fieldset>
                    <div class="form-group row">
                        <div class="col-sm-6 col-12 text-center text-sm-left pr-0">
                            <fieldset>
                               Dont Have Account ? <a href="{{route('register')}}">Register here </a>
                            </fieldset>
                        </div>
                        <div class="col-sm-6 col-12 float-sm-left text-center text-sm-right"><a
                                href="{{url('/password/reset')}}" class="card-link">Forgot Password?</a>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Sign In</button>
                </form>
            </div>
        </div>
    </div>
</div>
<!-- jQuery -->
<script src="{{asset('assets/plugins/jquery/jquery.min.js')}}"></script>
<!-- Bootstrap 4 -->
<script src="{{asset('assets/plugins/bootstrap/js/bootstrap.bundle.min.js')}}"></script>
<!-- AdminLTE App -->
<script src="{{ asset('/assets/js/adminlte.min.js')  }}"></script>
</body>
</html>
