import { Box } from '@mui/material';
import CreateCard from './CreateCard';
import EventsCard from './EventsCard';
import HandicapFriendlyPlacesCard from './HandicapFriendlyPlacesCard';
import WeeklyInsightsCard from './WeeklyInsightsCard';
import ProductsToysCard from './ProductsToysCard';
import DoctorsSpecialistsCard from './DoctorsSpecialistsCard';
import CoreProductTeamCard from './CoreProductTeamCard';
import EmailListCard from './EmailListCard';

function FloatingCards() {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 10,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '100px 60px 60px 60px',
        gap: 4,
      }}
    >
      {/* Top Row - 4 Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 3,
          pointerEvents: 'auto',
        }}
      >
        <CreateCard index={0} />
        <EventsCard index={1} />
        <HandicapFriendlyPlacesCard index={2} />
        <WeeklyInsightsCard index={3} />
      </Box>

      {/* Bottom Row - 4 Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 3,
          pointerEvents: 'auto',
        }}
      >
        <ProductsToysCard index={4} />
        <DoctorsSpecialistsCard index={5} />
        <CoreProductTeamCard index={6} />
        <EmailListCard index={7} />
      </Box>
    </Box>
  );
}

export default FloatingCards;