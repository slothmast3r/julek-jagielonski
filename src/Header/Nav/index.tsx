'use client'

import React from 'react'
import { XIcon, MenuIcon, SearchIcon } from 'lucide-react'
import clsx from 'clsx'

export const HeaderNav: React.FC<{
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}> = ({ isOpen, setIsOpen }) => {
  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 p-2 bg-white text-black rounded-full shadow-md"
        aria-label="Toggle menu"
      >
        <span className="sr-only">Toggle menu</span>
        <MenuIcon
          className={clsx('w-6 h-6 transition-opacity duration-300', isOpen && 'opacity-0')}
        />
        <XIcon
          className={clsx(
            'w-6 h-6 absolute inset-0 transition-opacity duration-300',
            !isOpen && 'opacity-0',
          )}
        />
      </button>
    </>
  )
}
