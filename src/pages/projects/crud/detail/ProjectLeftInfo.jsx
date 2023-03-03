import { Avatar, Card, Divider, TextField, Typography } from "@mui/material"
import { Box, Stack } from "@mui/system"

function ProjectLeftInfo({ project }) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return (
        <Box
            p={2}
            sx={{
                height: '100%',
                width: '100%',
            }}
        >
            <Typography variant="body1">
                DESCRIPTION:
            </Typography>
            <TextField
                color="primary"
                defaultValue={project.description}
                multiline
                fullWidth
                rows={3}
            />

            {/** Start Date and End Date */}
            <Card 
                sx={{
                    borderRadius:'10px',
                    padding:'1rem',
                    marginTop:'2rem',
                }}
            >
                <Stack direction={'row'}>
                    <Typography variant="h6">
                        START&nbsp;: &nbsp; &nbsp;
                    </Typography>

                    <Typography variant="h6">
                        {
                            project.startDate ?
                                `${monthNames[project.startDate.getMonth()]} ,
                         ${project.startDate.getDay()} ,
                         ${project.startDate.getFullYear()}
                        `
                                :
                                'Not Defined'
                        }
                    </Typography>
                </Stack>
                <Stack direction={'row'}>
                    <Typography variant="h6">
                        END &nbsp;&nbsp;&nbsp;&nbsp;: &nbsp; &nbsp;
                    </Typography>

                    <Typography variant="h6">
                        {
                            project.startDate ?
                                `${monthNames[project.endDate.getMonth()]},
                         ${project.endDate.getDay()} ,
                         ${project.endDate.getFullYear()}
                        `
                                :
                                'Not Defined'
                        }
                    </Typography>
                </Stack>
            </Card>
            {/**Members Lists */}
            <Card
             sx={{
                marginTop: '2rem',
                borderRadius:'10px',
                padding:'1rem',
            }}
            >
            <Stack
                direction={'column'}
                spacing={1}
            >
                <Typography variant="h5">
                    Member Lists
                </Typography>
                <Divider sx={{
                    margin:'10px 0 10px 0'
                }}/>
                {
                    project.members.map(member => {
                        return (
                            <Box
                                key={member.id}
                                sx={{
                                    display: 'flex',
                                    gap: 2,
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{ width: 25, height: 25 }}>
                                    {member.name[0]}
                                </Avatar>
                                <Typography>
                                    {member.name}
                                </Typography>
                            </Box>
                        )
                    })
                }
            </Stack>
            </Card>
        </Box>
    )
}

export default ProjectLeftInfo;