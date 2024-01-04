import { Container } from '@/components';
// import { endpoint } from '@/utils/endpoint';
import Link from "next/link"
import Image from "next/image"

export async function getAllCharacters() {
    const data = await fetch(`${$process.env.API_ENDPOINT}characters`)
    
    if (!data.ok) {
        throw new Error('Failed to fetch data')
    }
    return data.json()
}

export async function getCharacterBySlug() {
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
