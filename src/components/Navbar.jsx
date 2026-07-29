import React from 'react'

const logoUrl = new URL('/logo.png', import.meta.url).href

const Navbar = () => {
  return (
    <div className='bg-mauve-800 text-white text-2xl flex w-full items-center pl-5 md:pl-20 h-16'>
      <div className="font-bold flex items-center">
        <span className='mr-2'>
          <img className='w-10 h-10 object-contain' src={logoUrl} alt="MyPsW logo" />
        </span>
        <span>My</span>
        <span className='text-red-400'>PsW</span>
      </div>
    </div>
  )
}

export default Navbar
