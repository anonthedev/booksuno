import Link from 'next/link';

export default function DonateButton(){
  return (
    <Link className='bg-yellow-500 py-2 px-4 rounded-md text-black font-bold font-raleway' target='_blank' href={"/support"}>
        Buy me a thing!
    </Link>
  )
};