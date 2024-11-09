/* eslint-disable no-console */
/* eslint-disable no-alert */
import EventEditor from '@/components/Event/EventEditor';
import useCustomBack from '@/router/useCustomBack';
import UserAPI from '@/service/UserAPI';

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
