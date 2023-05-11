import Link from 'next/link';

const Page = () => {
  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <Link href={'/form-examples'}>form-examples</Link>
    </div>
  );
};

export default Page;
