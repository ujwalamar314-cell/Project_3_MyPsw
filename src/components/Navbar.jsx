import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-mauve-800 text-white text-2xl flex w-full items-center pl-5 md:pl-20 h-17'>
      <div className="font-bold flex items-center">
        <span className='mr-2'>
          <img className='w-10' src="/public/logo.png" alt="" />
        </span>
        <span>My</span>
        <span className='text-red-400'>PsW</span>
      </div>
    </div>
  )
}

export default Navbar
