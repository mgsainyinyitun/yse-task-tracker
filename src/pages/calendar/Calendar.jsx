import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useState } from "react";
import { getProjectEvents, getTaskEvents } from "../../backend/controller/eventsController";

function Calendar() {
    const [projectEvents, setProjectEvents] = useState([]);
    const [taskEvents, setTaskEvents] = useState([]);
    useEffect(() => {
        getProjectEvents()
            .then(res => {
                setProjectEvents(res);
            });
        getTaskEvents()
            .then(res => {
                setTaskEvents(res);
            })
    }, [])
    return (
        <Box
            p={2}
            sx={{
                width: '100%',
                height: '100%',
            }}
        >
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                height={'100%'}
                width={'100%'}
                events={[...projectEvents, ...taskEvents]}
            />
        </Box>
    )
}

export default Calendar;