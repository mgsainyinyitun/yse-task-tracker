import { Box } from "@mui/system";
import { useTheme } from "@mui/material";
import { THEME } from "../../themes";


function DashboardLayout2(props){
    const theme = useTheme();
    const background = theme.palette.mode === THEME.DARK.palette.mode ?
    theme.palette.grey[900] :  theme.palette.custom.background;
    return(
        <Box
            name={'container'}
            sx={{
                display:'flex',
                flexDirection:'column',
                height:'100%',
                background:`${background}`,
            }} 
        >
            <Box
                name={'header'}
                sx={{
                    marginLeft:'7px',
                    marginRight:'7px',
                }}
            >
                {props.topbar}
            </Box>
            <Box
                name={'main'}
                sx={{
                    overflow:'hidden',
                    display:'flex',
                    flex:1,
                }}
            >
                <Box
                    name={'leftmenu'}
                    sx={{
                        flex:'0 0 0',
                        marginLeft:{
                            xs:0,
                            middle:'7px',
                            md:'7px',
                            lg:'7px',
                        },
                        marginRight:'7px',
                        marginTop:'7px',
                    }}
                >
                    {props.leftmenu}
                </Box>
                <Box
                    name={'data'}
                    sx={{
                        display:'flex',
                        flex:1,
                        flexDirection:'column',
                    }}
                >
                    <Box
                        sx={{
                            overflow:'auto',
                            marginTop:'7px',
                            marginRight:'7px',
                            flex:1,
                            display:'flex',
                        }}
                    >
                        {props.content}
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    marginLeft:'7px',
                    marginRight:'7px',
                    marginTop:'7px',
                }}
            >
                {props.footer}
            </Box>
        </Box>
    )
}

export default DashboardLayout2;