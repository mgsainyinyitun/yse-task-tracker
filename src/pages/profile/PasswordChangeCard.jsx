import { Box, FormGroup, TextField, Typography, Button } from "@mui/material";
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined';
function PasswordChangeCard() {
    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Typography variant="h5">
                Change Password
            </Typography>

            <FormGroup sx={{ padding: '10px' }}>
                <TextField
                    size="small"
                    sx={{ marginBottom: '20px' }}
                    className="inputRounded"
                    label="Old Password"
                    type="password"
                    autoComplete="current-password"
                    fullWidth
                />
                <TextField
                    size="small"
                    sx={{ marginBottom: '20px' }}
                    className="inputRounded"
                    label="New Password"
                    type="password"
                    autoComplete="current-password"
                    fullWidth
                />
                <TextField
                    size="small"
                    sx={{ marginBottom: '20px' }}
                    className="inputRounded"
                    label="Confirm Password"
                    type="password"
                    autoComplete="current-password"
                    fullWidth
                />
                <div>
                    <Button variant="contained" width={200} size={'small'} startIcon={<BrushOutlinedIcon />}>Change</Button>
                </div>
            </FormGroup>
        </Box>
    )
}
export default PasswordChangeCard;