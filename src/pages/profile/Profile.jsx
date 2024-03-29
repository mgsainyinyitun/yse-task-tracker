import { Card, CardContent } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useSelector } from "react-redux";
import cover_image from "../../assets/images/cover.jpg";
import ProfileContents from "./ProfileContents";
import ProfileHeader from "./ProfileHeader";

function Profile() {
    const user = useSelector(state=>state.users.user);
    return (
        <Box
            pb={1}
            sx={{
                display: 'flex',
                width: '100%',
                overflow:'auto',
                height: '100%',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Container maxWidth={'md'}>
                <Card
                    elevation={0}
                    sx={{
                        marginTop:1,
                        display: 'flex',
                        borderRadius: '10px 10px 10px 10px',
                        flexDirection: 'column',
                        border:t=>`1px solid ${t.palette.custom.info}`
                    }}
                >
                    <img
                        src={cover_image}
                        style={{
                            width: '100%',
                            height: '200px',
                            objectFit: 'cover',
                            overflow: 'hidden'
                        }}
                    />
                    <CardContent>
                        <ProfileHeader user={user}/>
                    </CardContent>
                </Card>
                <Box>
                    <ProfileContents user={user}/>
                </Box>
            </Container>
        </Box>
    );
}
export default Profile;