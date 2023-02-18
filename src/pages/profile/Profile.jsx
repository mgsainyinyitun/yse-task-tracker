import {  Card, CardContent } from "@mui/material";
import { Box, Container } from "@mui/system";
import cover_image from "../../assets/images/cover.jpg";
import ProfileContents from "./ProfileContents";
import ProfileHeader from "./ProfileHeader";

function Profile() {
    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                height: '83vh',
                overflow:'scroll',
                flexDirection:'column',
            }}
        >
            <Container>
                <Card
                    sx={{
                        display: 'flex',
                        borderRadius: '0px 0px 10px 10px',
                        flexDirection: 'column',
                        height: '100%',
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
                        <ProfileHeader/>
                        <ProfileContents/>
                    </CardContent>
                </Card>
            </Container>

        </Box>
    )
}
export default Profile;