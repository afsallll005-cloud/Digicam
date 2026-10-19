import Sidebar from "../../components/Sidebar/Sidebar";
import "./Dashboard.css";

function Dashboard() {
    return (
        <div className="dash">

            <Sidebar />

            <div className="main">

                {/* TOPBAR */}
                <div className="topbar">
                    <div className="menu">
                        <a>Overview</a>
                        <a>Customers</a>
                        <a>Products</a>
                        <a>Settings</a>
                    </div>

                    <div className="top-right">
                        <input type="text" placeholder="Search" />
                        <button className="download">Download</button>
                    </div>
                </div>

                <h1>Dashboard</h1>

                {/* CARDS */}
                <div className="cards">

                    <div className="card">
                        <h4>Total Revenue</h4>
                        <h2>$45,231.89</h2>
                        <p>+20.1% from last month</p>
                    </div>

                    <div className="card">
                        <h4>Subscriptions</h4>
                        <h2>+2350</h2>
                        <p>+180.1% from last month</p>
                    </div>

                    <div className="card">
                        <h4>Sales</h4>
                        <h2>+12,234</h2>
                        <p>+19% from last month</p>
                    </div>

                    <div className="card">
                        <h4>Active Now</h4>
                        <h2>+573</h2>
                        <p>+201 since last hour</p>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;