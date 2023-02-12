import { Box } from "@mui/system";
import { Typography, useTheme } from "@mui/material";

function FooterBar() {
    const theme = useTheme();
    const paper = theme.palette.background.paper;
    return (
        <Box
            p={1}
            sx={{
                display: 'flex',
                width: '100%',
                // height:'100px',
                background: `${paper}`,
                borderRadius: '10px',
                justifyContent: 'center',
                alignItems:'center',
            }}
        >
            <Typography
             variant="h6"
             textAlign={'center'}
             sx={{
                fontSize:{
                    lg:20,
                    md:15,
                    sm:15,
                    xs:15,   
                }
             }}
             >
                Copyright © 2023 Youth Society for Education
            </Typography>

        </Box>
    )
}
export default FooterBar;