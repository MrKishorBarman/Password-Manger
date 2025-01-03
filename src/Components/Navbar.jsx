import React from 'react'
import { FaGithub } from "react-icons/fa"

const Navbar = () => {
  return (
    <nav className='bg-slate-800 flex justify-between items-center md:px-40 px-5 h-12 text-white'>
      <div className="logo font-bold text-white text-2xl">
        <span className="text-green-500">&lt;</span>
        Pass
        <span className="text-green-500">OP/&gt;</span>
      </div>
      <ul>
        <li className="flex gap-4">
          <div className='flex justify-center  items-center gap-5 bg-green-700 rounded-full p-[5px] py-[0.01px] cursor-pointer ring-white ring-1'>
            <FaGithub />
            <span className='font-extrabold'>
              <a href="https://github.com/MrKishorBarman" target="_blank" className='outline-none'>GitHub</a>
            </span>
          </div>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
