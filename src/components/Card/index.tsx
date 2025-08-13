'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  const FEATURED_CATEGORY_ID: string | number | undefined = process.env
    .NEXT_PUBLIC_FEATURED_CATEGORY_ID as any // or hardcode
  const FEATURED_CATEGORY_SLUG = 'featured' // change if yours differs (e.g., 'wyroznione')

  // normalize relationship values coming from Payload
  const normalizeRel = (c: any) => {
    if (!c) return undefined
    if (typeof c === 'object') return c
    // primitive id
    return { id: c }
  }

  const isFeaturedCat = (c: any) => {
    if (!c || typeof c !== 'object') return false
    const id = c.id ?? c.value
    const slug = (c.slug ?? c?.value?.slug ?? '').toString().toLowerCase()
    const title = (c.title ?? '').toString().toLowerCase()
    const matchesId = FEATURED_CATEGORY_ID != null && String(id) === String(FEATURED_CATEGORY_ID)
    const matchesSlug = slug === FEATURED_CATEGORY_SLUG
    const matchesTitle = title === FEATURED_CATEGORY_SLUG
    return Boolean(matchesId || matchesSlug || matchesTitle)
  }

  const primaryCategoryTitle = React.useMemo(() => {
    if (!Array.isArray(categories) || categories.length === 0) return null

    const objs = categories.map(normalizeRel).filter((c: any) => typeof c === 'object')

    if (!objs.length) return null

    // pick the first NON-featured category
    const nonFeatured = objs.find((c: any) => !isFeaturedCat(c))
    const chosen = nonFeatured ?? objs[0]

    return chosen?.title || chosen?.name || 'Untitled category'
  }, [categories])

  return (
    <article
      className={cn('overflow-hidden bg-card hover:cursor-pointer', className)}
      ref={card.ref}
    >
      <div className="relative w-full aspect-[5/3] overflow-hidden">
        {!metaImage && <div className="flex items-center justify-center bg-gray-200">No image</div>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media resource={metaImage} size="33vw" fill />
        )}
        {showCategories && primaryCategoryTitle && (
          <span
            className={cn(
              'absolute top-2 right-2 rounded-full px-3 py-1 text-xs font-medium',
              'bg-black/80 text-white backdrop-blur-sm',
            )}
          >
            {primaryCategoryTitle}
          </span>
        )}
      </div>
      <div className="p-4">
        {titleToUse && (
          <div className="prose">
            <h3>
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {description && <div className="mt-2">{description && <p>{sanitizedDescription}</p>}</div>}
      </div>
    </article>
  )
}
