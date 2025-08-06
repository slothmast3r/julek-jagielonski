'use client'

import React, { useEffect, useState } from 'react'
import { XIcon, MenuIcon, SearchIcon } from 'lucide-react'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import clsx from 'clsx'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false)
  const navItems = data?.navItems || []

  useEffect(() => {
    const main = document.querySelector('main')
    if (main) {
      if (isOpen) {
        main.classList.add('menu-open')
      } else {
        main.classList.remove('menu-open')
      }
    }
  }, [isOpen])

  return (
    <>
      {/* Burger/X toggle button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative z-50 p-2 bg-white text-black rounded-full shadow-md"
        aria-label="Toggle menu"
      >
        {/* Ikony na siebie nałożone, widoczna tylko jedna */}
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

      {/* Fullscreen overlay menu */}
      {isOpen && (
        <div className="nav-overlay fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center gap-8 text-2xl">
          {navItems.map(({ link }, i) => (
            <CMSLink key={i} {...link} className="text-black text-2xl" />
          ))}

          <Link
            href="/search"
            className="flex items-center gap-2 text-black"
            onClick={() => setIsOpen(false)}
          >
            <SearchIcon className="w-5" /> Search
          </Link>
        </div>
      )}
    </>
  )
}
