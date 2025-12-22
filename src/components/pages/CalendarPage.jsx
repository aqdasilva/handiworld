import { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function CalendarPage() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Team Meeting',
      start: new Date(2024, 11, 22, 10, 0),
      end: new Date(2024, 11, 22, 11, 0),
    },
    {
      id: 2,
      title: 'Project Review',
      start: new Date(2024, 11, 23, 14, 0),
      end: new Date(2024, 11, 23, 15, 30),
    },
    {
      id: 3,
      title: 'Client Presentation',
      start: new Date(2024, 11, 25, 9, 0),
      end: new Date(2024, 11, 25, 10, 30),
    },
  ]);

  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt('New Event name');
    if (title) {
      setEvents([
        ...events,
        {
          id: events.length + 1,
          title,
          start,
          end,
        },
      ]);
    }
  };

  const handleSelectEvent = (event) => {
    const confirmDelete = window.confirm(
      `Do you want to delete the event '${event.title}'?`
    );
    if (confirmDelete) {
      setEvents(events.filter((e) => e.id !== event.id));
    }
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 64,
        left: 70,
        right: 0,
        bottom: 0,
        p: 4,
        zIndex: 10,
        overflowY: 'auto',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 3,
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(25px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Title with Icon */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
            }}
          >
            <CalendarMonthIcon sx={{ fontSize: 40, color: '#fff' }} />
          </Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: '#fff',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)',
            }}
          >
            Calendar
          </Typography>
        </Box>

        <Box
          sx={{
            height: 'calc(100vh - 250px)',
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: 2,
            p: 2,
            '& .rbc-calendar': {
              fontFamily: 'inherit',
            },
            '& .rbc-header': {
              padding: '12px 4px',
              fontWeight: 600,
              fontSize: '0.95rem',
              borderBottom: '2px solid #667eea',
              background: 'rgba(102, 126, 234, 0.1)',
            },
            '& .rbc-today': {
              backgroundColor: 'rgba(102, 126, 234, 0.15)',
            },
            '& .rbc-event': {
              backgroundColor: '#667eea',
              borderRadius: '4px',
              border: 'none',
              padding: '4px 8px',
              '&:hover': {
                backgroundColor: '#764ba2',
              },
            },
            '& .rbc-event-label': {
              fontSize: '0.75rem',
            },
            '& .rbc-event-content': {
              fontSize: '0.85rem',
            },
            '& .rbc-toolbar button': {
              color: '#667eea',
              border: '1px solid #667eea',
              borderRadius: '6px',
              padding: '6px 12px',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
              },
              '&.rbc-active': {
                backgroundColor: '#667eea',
                color: '#fff',
              },
            },
            '& .rbc-toolbar-label': {
              fontWeight: 700,
              fontSize: '1.1rem',
              color: '#333',
            },
            '& .rbc-off-range-bg': {
              backgroundColor: 'rgba(0, 0, 0, 0.03)',
            },
          }}
        >
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            selectable
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            views={['month', 'week', 'day', 'agenda']}
            defaultView="month"
            popup
            style={{ height: '100%' }}
          />
        </Box>

        <Typography
          variant="caption"
          sx={{ 
            display: 'block', 
            mt: 2, 
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
          }}
        >
          Click on a time slot to create a new event. Click on an event to delete it.
        </Typography>
      </Paper>
    </Box>
  );
}

export default CalendarPage;