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
                background: `${paper}`,
                justifyContent: 'center',
                alignItems:'center',
                borderRadius:'10px 10px 0 0',
            }}
        >
            <Typography
             variant="h6"
             textAlign={'center'}
             sx={{
                fontSize:{
                    lg:16,
                    md:13,
                    sm:13,
                    xs:11,   
                }
             }}
             >
                Copyright © 2023 Youth Society for Education
            </Typography>
        </Box>
    )
}
export default FooterBar;