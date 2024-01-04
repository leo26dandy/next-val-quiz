/**

Renders a Next.js page component that displays a grid of character avatars with links to individual character pages.
@component
@returns {JSX.Element} The rendered page component.
*/

import { Container } from '@/components'
import Image from 'next/image'
import Link from 'next/link'
import { endpoint } from '@/utils/endpoint'

async function getAllCharacters() {
  const apiEndpoints = process.env.API_ENDPOINT
  const data = await fetch(apiEndpoints`/characters`)

  if (!data.ok) {
    throw new Error('Failed to fetch data')
  }
  return data.json()
}

export default async function Page() {
  const data = await getAllCharacters()

  return(
    <main>
      <Container className='grid grid-cols-2 gap-1 py-5 md:grid-cols-3 lg:grid-cols-4'>
        {data?.characters?.map(item => {
          return (
            <Link
              href={`/characters/${item.displayName}`}
              key={item.displayName}
              className='overflow-hidden rounded-md'
            >
              <Image
                src={item.bustPortrait}
                alt=''
                className='transition-all duration-500 hover:scale-110 hover:-rotate-2'
                width={500}
                height={500}
                />
            </Link>
          )
        })}
      </Container>
    </main>
  )
}
