import { Card, CardContent } from "@mui/material";
import { Box, Container } from "@mui/system";
import cover_image from "../../assets/images/cover.jpg";
import ProfileContents from "./ProfileContents";
import ProfileHeader from "./ProfileHeader";

function Profile() {
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
            <Container>
                <Card
                    sx={{
                        display: 'flex',
                        borderRadius: '10px 10px 10px 10px',
                        flexDirection: 'column',
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
                        <ProfileHeader />
                    </CardContent>
                </Card>

                <Box>
                    <ProfileContents/>
                </Box>

            </Container>
        </Box>
    );
}
export default Profile;