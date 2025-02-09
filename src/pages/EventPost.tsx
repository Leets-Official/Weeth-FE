import EventEditor from '@/components/Event/EventEditor';
import useCustomBack from '@/hooks/useCustomBack';

const EventPost = () => {
  useCustomBack('/calendar');

  return <EventEditor />;
};

export default EventPost;
