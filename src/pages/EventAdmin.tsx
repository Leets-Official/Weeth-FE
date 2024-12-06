/* eslint-disable no-console */
/* eslint-disable no-alert */
import EventEditor from '@/components/Event/EventEditor';
import useCustomBack from '@/hooks/useCustomBack';

const EventAdmin = () => {
  useCustomBack('/calendar');

  return <EventEditor />;
};

export default EventAdmin;
