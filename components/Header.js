import { MicrophoneIcon, SearchIcon, XIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import Avatar from './Avatar';
import HeaderOptions from './HeaderOptions';

function Header() {
  const router = useRouter();
  const searchInputRef = useRef(null);

  const search = e => {
    e.preventDefault();
    const term = searchInputRef.current.value;

    if (!term) {
      return;
    }

    router.push(`/search?term=${term}`);

    searchInputRef.current.value = term;
  };

  return (
    <header className='sticky top-0 bg-white'>
      <div className='flex w-full p-6 items-center'>
        <Image
          src='https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
          alt=''
          width={120}
          height={40}
          onClick={() => router.push('/')}
          className='cursor-pointer'
        />
        <form className='flex flex-grow px-6 py-3 ml-10 mr-5 border border-gray-200 rounded-full shadow-lg max-w-3xl items-center'>
          <input
            className='flex-grow w-full focus:outline-none'
            ref={searchInputRef}
            type='text'
          />
          <XIcon
            className='h-7 sm:mr-3 text-gray-500 cursor-pointer transition duration-100 transform hover:scale-125'
            onClick={() => (searchInputRef.current.value = '')}
          />
          <MicrophoneIcon className='mr-3 h-6 hidden sm:inline-flex text-blue-500 border-l-2 pl-4 border-gray-300 cursor-pointer' />
          <SearchIcon
            onClick={e => {
              search(e);
            }}
            className='h-6 text-blue-500 hidden sm:inline-flex cursor-pointer'
          />
          <button
            hidden
            type='submit'
            onClick={e => {
              search(e);
            }}
          />
        </form>
        <Avatar
          className='ml-auto'
          url='https://avatars.githubusercontent.com/u/26021509?s=40&v=4'
        />
      </div>

      {/* Options */}
      <HeaderOptions />
    </header>
  );
}

export default Header;
