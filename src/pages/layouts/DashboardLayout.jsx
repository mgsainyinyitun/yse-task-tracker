import { Grid,Box } from "@mui/material"
import { useTheme } from "@mui/material";
import { THEME } from "../../themes";

function DashboardLayout(props) {
    const theme = useTheme();

    const background = theme.palette.mode === THEME.DARK.palette.mode ?
        theme.palette.grey[900] : theme.palette.grey[300];
    return (

        <Box    
            sx={{
                display:'flex',
                flexDirection:'column',
                width:'100%',
                height:'100%',
                background:`${background}`,
            }}

        >
            <Box
                sx={{
                    marginLeft:'7px',
                    marginRight:'7px',
                }}
            >
                {props.topbar}
            </Box>
            <Box 
                sx={{
                    display:'flex',
                    flexGrow:'1',
                    alignItems:'space-between',
                }}
            >
                <Box
                    sx={{
                        display:'flex',
                        flexDirection:'column',
                        marginLeft:{
                            xs:0,
                            middle:'7px',
                            md:'7px',
                            lg:'7px',
                        },
                        marginRight:'7px',
                        marginTop:'7px',
                        overflow:'scroll',
                    }}
                >
                {props.leftmenu}
               

                </Box>
                <Box
                    sx={{
                        marginTop:'7px',
                        marginRight:'7px',
                        flexGrow:1,
                    }}
                >
                {props.content}
                </Box>
            </Box>
        </Box>

        // <Grid
        //     container
        //     p={1}
        //     sx=
        //     {{
        //         background: `${background}`,
        //         display: 'flex',
        //     }}
        // >
        //     <Grid item
        //         xs={12}
        //         mb={1}
        //         sx=
        //         {{
        //             overflow: 'scroll',
        //             height: '100%',
        //         }}
        //     >
        //         {/* Top Bar */}
        //         {props.topbar}

        //     </Grid>

        //     <Grid item
        //         sx={{
        //             overflow: 'scroll',
        //             height: '100%',
        //             border: '0.5px solid transparent',
        //         }}
        //     >
        //         {/* Side Menu Bar */}
        //         {props.leftmenu}

        //     </Grid>

        //     <Grid item
        //         ml={{
        //             xs:0,
        //             sm:1,
        //             md:1,
        //             lg:1,
        //         }}
        //         sx={{
        //             flexGrow:1,
        //         }}

        //     >
        //         {/*Content Area  */}
        //         {props.content}
        //     </Grid>
        // </Grid>
    )
}

export default DashboardLayout;