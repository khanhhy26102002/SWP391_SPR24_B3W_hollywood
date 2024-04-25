import "../styles/admin.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Dashboard = () => {
    return(
    <div className="container-scroller">
      <Sidebar />
      <div className="container-fluid page-body-wrapper">
        <Navbar />
        <div className="main-panel">
          <div class="content-wrapper" style={{backgroundColor: "white", top: "50px"}}>
            <div class="page-header">
              
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}

export default Dashboard;