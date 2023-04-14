import { Avatar, Card, Divider, TextField, Typography } from "@mui/material"
import { Box, Stack } from "@mui/system"
import { formatDateMothName } from "../../../../utils/dateFunction";

function ProjectLeftInfo({ project }) {
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
                            project.startDate?formatDateMothName(project.startDate):'Not Defined'
                        }
                    </Typography>
                </Stack>
                <Stack direction={'row'}>
                    <Typography variant="h6">
                        END &nbsp;&nbsp;&nbsp;&nbsp;: &nbsp; &nbsp;
                    </Typography>

                    <Typography variant="h6">
                        {
                            project.endDate?formatDateMothName(project.endDate):'Not Defined'
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
                    project.members?
                    project.members.map(member => {
                        return (
                            <Box
                                key={member.uid}
                                sx={{
                                    display: 'flex',
                                    gap: 2,
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{ width: 25, height: 25 }}>
                                    {member.username[0]}
                                </Avatar>
                                <Typography>
                                    {member.username}
                                </Typography>
                            </Box>
                        )
                    }):'Empty'
                }
            </Stack>
            </Card>
        </Box>
    )
}

export default ProjectLeftInfo;