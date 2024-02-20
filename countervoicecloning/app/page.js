'use client'
import Image from 'next/image';
import { LifebuoyIcon, NewspaperIcon, PhoneIcon } from '@heroicons/react/20/solid'
import Script from 'next/script';
import { ExclamationCircleIcon, ShieldCheckIcon, LockClosedIcon } from '@heroicons/react/20/solid';
import React from 'react';

  const vPhishingReasons = [
  {
    name: 'Voice Manipulation',
    description:
      'Attackers can manipulate their voice to imitate someone you know or a trusted authority, making their messages more convincing.',
    href: '#',
    icon: ExclamationCircleIcon,
  },
  {
    name: 'Caller ID Spoofing',
    description:
      'Vishing attackers often use techniques to spoof caller IDs, making it appear as if the call is coming from a legitimate source.',
    href: '#',
    icon: LockClosedIcon,
  },
  {
    name: 'Social Engineering Tactics',
    description:
      'Vishing involves social engineering tactics where attackers exploit human psychology to extract sensitive information over the phone.',
    href: '#',
    icon: ShieldCheckIcon,
  },
];
  

export default function Home() {
  const [expanded, setExpanded] = React.useState('');
  const handleFileChange = async (event) => {
    console.log('handleFileChange');
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = async (event) => {
        const fileContent = event.target.result;

        try {
          // Upload the file to the Google Cloud Storage bucket
          const response = await fetch('http://localhost:8080/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              fileContent: Array.from(new Uint8Array(fileContent)),
              fileName: selectedFile.name,
            }),
          });

          if (response.ok) {
            console.log('File uploaded successfully');
          } else {
            console.error('Error uploading file');
          }
        } catch (error) {
          console.error(error);
        }
      };

      reader.readAsArrayBuffer(selectedFile);
    }
  };




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
      <div>
        <div className="bg-gray-900 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-indigo-400">Stay Informed</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Reasons to be Aware of vPhishing Attacks
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Be vigilant against vPhishing attacks by understanding the tactics used by attackers and staying informed about potential threats.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                {vPhishingReasons.map((reason) => (
                  <div key={reason.name} className="flex flex-col">
                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                      <reason.icon className="h-5 w-5 flex-none text-indigo-400" aria-hidden="true" />
                      {reason.name}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                      <p className="flex-auto">{reason.description}</p>
                      <p className="mt-6">
                        <a href={reason.href} className="text-sm font-semibold leading-6 text-indigo-400">
                          Learn more <span aria-hidden="true">→</span>
                        </a>
                      </p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div> 
    <div className='flex flex-row min-h-screen min-w-screen'>
        
        <div className={` mr-2 animated-width ${expanded == 'NS' ? 'expanded' : 'w-[100vh]'}  shadow-2xl   bg-[#2A2A2A] mt-16 ml-0 h-[80vh] rounded-r-3xl flex flex-row items-center justify-evenly mx-auto`}>
        
          <div class={`flex items-center justify-center w-full ${expanded === 'NS' ? '' : 'hidden'}`}>
            <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer  dark:hover:bg-bray-800 drk:bg-gray-700  dark:border-gray-600 dark:hover:borer-gray-500 dark:hover:bg-[#3a3939b3]">
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
              <input id="dropzone-file" type="file" class="hidden" onChange={handleFileChange} />
            </label>
          </div> 
          <div className='mr-2 text-center ml-10 t rounded-3xl'>
            <Image id='NS' src="/greenpoison.png" className='m-2 ransition ease-in-out   hover:-translate-y-1 hover:scale-110 hover:cursor-pointer hover:b g-indigo-500 duration-700 rounded-3xl' alt="Poison Bottle Image" width={350} height={350} onClick={handleClick} />
            <h2 className='mt- font-mono text-2xl text-white font-bold'>Night Shade</h2>
          </div>
          
      </div>
        <div className={`animated-width shadow-2xl ml-2  mt-16 shadow-2xl  h-[80vh] border border-black  rounded-l-3xl border-2 flex flex-row items-center justify-between mx-auto ${expanded == 'cvc' ? 'expanded' : 'w-[100vh]'} `}>
          <div  className='text-center mr-10  hover:cursor-pointer   ml-16'>
            <Image id='cvc' src="/roundwave.png" alt="Wave Image" className='mt-20  transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-700' width={350} height={350} onClick={handleClick} />
            <h2 className='mt-16 font-mono text-2xl text-black font-bold'>CVC</h2>
          </div>
          <div class={`flex items-center justify-center w-full ${expanded === 'cvc' ? '' : 'hidden'}`}>
            <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer  dark:hover:bg-bray-800 drk:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:borer-gray-500 dark:hove:bg-gray-600">
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">MP4, MOV, WAV (Max 6s long)</p>
              </div>
              <input id="dropzone-file" type="file" class="hidden" accept='.mov, .wav, mp4' onChange={handleFileChange} />
            </label>
          </div> 

      </div>
    </div>
    </div>
  );
}

