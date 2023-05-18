import Link from 'next/link';

const Page = () => {
  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center">
      <Link href={'/form-examples'}>form-examples</Link>
      <Link href={'/calendar-examples'}>calendar-examples</Link>
    </div>
  );
};

export default Page;
