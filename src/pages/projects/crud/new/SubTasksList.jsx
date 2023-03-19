import { Box } from "@mui/material";

function SubTasksList(){
    return(
        <Box
            sx={{
                height:'100%',
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                border:theme=>`1px solid ${theme.palette.primary.main}`,
                borderRadius:'10px',
            }}
        >
            Empty
        </Box>
    )
}

export default SubTasksList;