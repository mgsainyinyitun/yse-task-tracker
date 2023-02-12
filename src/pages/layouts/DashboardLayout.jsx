import { Grid } from "@mui/material"
import { useTheme } from "@mui/material";
import { THEME } from "../../themes";

function DashboardLayout(props) {
    const theme = useTheme();
    const background = theme.palette.mode === THEME.DARK.palette.mode ?
        theme.palette.grey[900] : theme.palette.grey[300];
    return (
        <Grid
            container
            p={1}
            sx=
            {{
                background: `${background}`,
                display: 'flex',
            }}
        >
            <Grid item
                xs={12}
                mb={1}
                sx=
                {{
                    overflow: 'scroll',
                    height: '100%',
                }}
            >
                {/* Top Bar */}
                {props.topbar}

            </Grid>

            <Grid item
                sx={{
                    overflow: 'scroll',
                    height: '100%',
                    border: '0.5px solid transparent',
                }}
            >
                {/* Side Menu Bar */}
                {props.leftmenu}

            </Grid>

            <Grid item
                ml={{
                    xs:0,
                    sm:1,
                    md:1,
                    lg:1,
                }}
                sx={{
                    flexGrow:1,
                }}

            >
                {/*Content Area  */}
                {props.content}
            </Grid>
        </Grid>
    )
}

export default DashboardLayout;