import { Avatar, Box, ListItem, ListItemIcon, ListItemText, Stack } from "@mui/material";

function SubTasksList({ tasks }) {
    return (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                border: theme => `1px solid ${theme.palette.primary.main}`,
                borderRadius: '10px',
            }}
        >
            <Stack
                spacing={1}
                sx={{
                    borderRadius: '5px',
                    padding: '0.3rem',
                }}
            >
                {
                    tasks.map((task, index) => {
                        return (
                            <ListItem key={index}>
                                <ListItemIcon>
                                    <Avatar>{index+1}</Avatar>
                                </ListItemIcon>
                                <ListItemText
                                    primary={task.title}
                                    secondary={task.description}
                                />
                            </ListItem>
                        )
                    })
                }
            </Stack>
        </Box>
    )
}

export default SubTasksList;