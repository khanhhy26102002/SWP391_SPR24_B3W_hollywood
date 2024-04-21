import "../styles/admin.css";
import Sidebar from "./Sidebar";
import "./Navbar.css";

const Navbar = () => {
    return(
        <>
        <nav class="navbar p-0 fixed-top d-flex flex-row">
          
          <div class="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
            
            <ul class="navbar-nav navbar-nav-right">
            <li><a href="#">
                    <div class="navbar-profile">
                        <img class="img-xs rounded-circle" src="../../assets/images/faces/face15.jpg" alt=""/>
                    </div>
                </a>
                                    <ul className="dropdown">
                                        <li><h6 class="p-3 mb-0">Profile</h6></li>
                                        <li><div class="preview-thumbnail">
                                                <div class="preview-icon bg-dark rounded-circle">
                                                    <i class="mdi mdi-settings text-success"></i>
                                                </div>
                                            </div>
                                            <div class="preview-item-content">
                                                <p class="preview-subject mb-1">Settings</p>
                                            </div>
                                        </li>
                                        <li><div class="preview-thumbnail">
                                                <div class="preview-icon bg-dark rounded-circle">
                                                    <i class="mdi mdi-settings text-success"></i>
                                                </div>
                                            </div>
                                            <div class="preview-item-content">
                                                <p class="preview-subject mb-1">Logout</p>
                                            </div>
                                        </li>
                                    </ul>
                                </li>
            </ul>
            <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
              <span class="mdi mdi-format-line-spacing"></span>
            </button>
          </div>
        </nav>
        </>
    );
}

export default Navbar;