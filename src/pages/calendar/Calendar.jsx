import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { Box } from "@mui/system";

function Calendar(){
    return (
        <Box 
            p={2}
            sx={{
                width:'100%',
                height: '83vh',
                overflow: 'scroll',
            }}
        >
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            height={'100%'}
            width={'100%'}
            events={[
                { title: 'IELTS Content', date: '2023-02-25' },
                { title: 'General Graphic', date: '2023-02-27',end:'2023-02-29' }
              ]}
        />
        </Box>
    )
}

export default Calendar;