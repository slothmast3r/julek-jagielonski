// app/AppShell.tsx
'use client'

import { useState } from 'react'
import type { Header } from '@/payload-types'
import { HeaderClient } from '@/Header/Component.client'
import { CMSLink } from '@/components/Link'
import { SearchIcon } from 'lucide-react'
import Link from 'next/link'

export default function AppShell({
  headerData,
  children,
}: {
  headerData: Header
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <HeaderClient isOpen={isOpen} setIsOpen={setIsOpen} />

      {isOpen ? (
        <div className="z-40 py-12 px-6 w-full flex flex-col items-center justify-center gap-8 text-2xl bg-white">
          {headerData?.navItems?.map(({ link }, i) => (
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
      ) : (
        <>
          <main>{children}</main>
        </>
      )}
    </>
  )
}
