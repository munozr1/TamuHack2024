'use client'
import Image from 'next/image';
import { LifebuoyIcon, NewspaperIcon, PhoneIcon } from '@heroicons/react/20/solid'
import Script from 'next/script';
import React from 'react';



const cards = [
  {
    name: 'Sales',
    description: 'Consectetur vel non. Rerum ut consequatur nobis unde. Enim est quo corrupti consequatur.',
    icon: PhoneIcon,
  },
  {
    name: 'Technical Support',
    description: 'Quod possimus sit modi rerum exercitationem quaerat atque tenetur ullam.',
    icon: LifebuoyIcon,
  },
  {
    name: 'Media Inquiries',
    description: 'Ratione et porro eligendi est sed ratione rerum itaque. Placeat accusantium impedit eum odit.',
    icon: NewspaperIcon,
  },
]
export default function Home() {
  const [expanded, setExpanded] = React.useState('');
  console.log(expanded);
  const handleClick = (el) => {
    if(expanded == el.target.id){
      setExpanded('');
      return;
    }
    setExpanded(el.target.id);
  };

  return (
    <div>
        <Script src='https://cdn.tailwindcss.com'></Script>
   
    <div className='flex min-h-screen min-w-screen'>
   
        <div className={` mr-2 animated-width ${expanded == 'NS' ? 'expanded' : 'w-[100vh]'}  shadow-2xl   bg-[#2A2A2A] mt-16 ml-0 h-[80vh] rounded-r-3xl flex flex-row items-center justify-evenly mx-auto`}>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className={`w-10 h-10 ${expanded === 'NS' ? '' : 'hidden'}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
            </svg>

          </div>
          <div className='mr-2 text-center ml-10 t rounded-3xl'>
            <Image id='NS' src="/greenpoison.png" className='m-2 ransition ease-in-out   hover:-translate-y-1 hover:scale-110 hover:cursor-pointer hover:b g-indigo-500 duration-700 rounded-3xl' alt="Poison Bottle Image" width={350} height={350} onClick={handleClick} />
            <h2 className='mt- font-mono text-2xl text-white font-bold'>Night Shade</h2>
          </div>
          
      </div>
        <div className={`animated-width shadow-2xl ml-2  mt-16 shadow-2xl  h-[80vh] border border-black  rounded-l-3xl border-2 flex flex-row items-center justify-evenly mx-auto ${expanded == 'cvc' ? 'expanded' : 'w-[100vh]'} `}>
          <div  className='text-center mr-10  hover:cursor-pointer'>
            <Image id='cvc' src="/roundwave.png" alt="Wave Image" className='mt-20 ml-16 transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-700' width={350} height={350} onClick={handleClick} />
            <h2 className='mt-16 font-mono text-2xl text-black font-bold'>CVC</h2>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-10 h-10 ${expanded == 'cvc' ? '': 'hidden'}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
            </svg>
          </div>
      </div>
    </div>
    </div>
  );
}

