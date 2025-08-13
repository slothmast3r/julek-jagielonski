'use client'

import Link from 'next/link'
import React from 'react'
import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ isOpen, setIsOpen }) => {
  return (
    <header className="container relative z-20 py-8 flex justify-center items-center">
      <Link href="/">
        <Logo loading="eager" priority="high" className="invert" />
      </Link>
      <HeaderNav isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  )
}
