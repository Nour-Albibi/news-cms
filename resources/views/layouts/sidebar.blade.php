<aside class="main-sidebar sidebar-dark-primary elevation-4">
    <a href="{{url('/')}}" class="brand-link logo-switch" style="text-align: center">
        <span>News CMS</span>
    </a>
    <div class="sidebar">
        <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar nav-child-indent flex-column" data-widget="treeview" role="menu">
                <li class="nav-item menu-open">
                    <a href="{{url('admin/home')}}" class="nav-link active">
                        <i class="nav-icon fas fa-tachometer-alt"></i>
                        <p>
                            Dashboard
                        </p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link ">
                        <i class="nav-icon fas fa-user-circle"></i>
                        <p>
                            Account Settings
                            <i class="fas fa-angle-left right"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a class="nav-link" href="{{url('admin/account_settings')}}"><i class="nav-icon fas fa-user-edit"></i><p>
                                        My Account</p></a>
                        </li>
                        <li>
                            <form action="{{route('logout')}}" method="post" >
                                @csrf
                            <button class="nav-link" type="submit" style="background: transparent; border: none;color: #c2c7d0;text-align: left;" ><i class="nav-icon fas fa-user-lock"></i><p>
                                       Logout</p></button>
                            </form>
                        </li>
                    </ul>
                </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">
                            <i class="nav-icon fas fa-book"></i>
                            <p>
                                Articles
                                    <i class="fas fa-angle-left right"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li  class="nav-item"><a class="nav-link" href="{{url('admin/article/create')}}" data-i18n="nav.starter_kit.1_column">
                                    <i class="fas fa-list nav-icon"></i> <p>Create Article</p></a>
                            </li>
                            <li  class="nav-item"><a class="nav-link" href="{{url('admin/article')}}" data-i18n="nav.starter_kit.1_column">
                                    <i class="fas fa-list nav-icon"></i> <p>All Articles</p></a>
                            </li>
                        </ul>
                    </li>
            </ul>
        </nav>
    </div>
</aside>
