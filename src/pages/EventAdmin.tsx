/* eslint-disable no-console */
/* eslint-disable no-alert */
import EventEditor from '@/components/Event/EventEditor';
import useCustomBack from '@/hooks/useCustomBack';
import UserAPI from '@/api/UserAPI';

const EventAdmin = () => {
  useCustomBack('/calendar');

  return (
    <>
      <UserAPI />
      <EventEditor />
    </>
  );
};

export default EventAdmin;
