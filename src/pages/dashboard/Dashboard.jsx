
import SideMenuBar from "../general/SideMenuBar";
import TopBar from "../general/TopBar";
import DashboardLayout from "../layouts/DashboardLayout";
import Contents from "./Contents";

function Dashboard(props) {
    return (
        <DashboardLayout
            topbar={<TopBar />}
            leftmenu={<SideMenuBar />}
            content={<Contents page={props.page} />}
        />
    )
}

export default Dashboard;