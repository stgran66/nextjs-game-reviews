import Heading from '@/components/Heading';

export const metadata = {
  title: 'About',
};

export default function NotFoundPage() {
  return (
    <>
      <Heading>Not found</Heading>
      <p>Ooops, the page you requested has not been created yet.</p>
    </>
  );
}
