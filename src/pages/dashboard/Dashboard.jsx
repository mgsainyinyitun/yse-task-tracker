
import FooterBar from "../general/FooterBar";
import SideMenuBar from "../general/SideMenuBar";
import TopBar from "../general/TopBar";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardLayout2 from "../layouts/DashboardLayout2";
import Contents from "./Contents";

function Dashboard(props) {
    return (
        <DashboardLayout2
            topbar={<TopBar />}
            leftmenu={<SideMenuBar />}
            content={<Contents page={props.page} />}
            footer={<FooterBar/>}
        />
    )
}

export default Dashboard;