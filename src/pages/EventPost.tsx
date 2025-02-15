import AdminOnly from '@/components/common/AdminOnly';
import EventEditor from '@/components/Event/EventEditor';
import useCustomBack from '@/hooks/useCustomBack';

const EventPost = () => {
  useCustomBack('/calendar');

  return (
    <>
      <AdminOnly />
      <EventEditor />
    </>
  );
};

export default EventPost;
