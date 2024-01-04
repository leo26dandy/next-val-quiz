import { Container } from '@/components';
import Image from 'next/image';
import { endpoint } from '@/utils/endpoint';

import { getAllCharacters } from '@/lib/characters';

export const dynamicParams = false;

export async function generateStaticParams() {
  const { characters } = await getAllCharacters();
  return characters.map((character) => ({ slug: character.displayName }));
}

export async function getCharacterBySlug(slug) {
  try {
    const data = await fetch(`https://next-val-quiz.vercel.app/api/characters/${slug}`);
    
    if (!data.ok) {
      throw new Error(`Failed to fetch data: ${data.status} ${data.statusText}`);
    }

    return await data.json();
    
  } catch (error) {
    console.error('There was a problem:', error)
  }

}

export default async function Page({ params }) {
  const {
    character,
    character_poster,
    character_description,
    character_role,
    character_abilities,
  } = await getCharacterBySlug(params.slug);

  return (
    <Container className='flex flex-col gap-5 py-5' as='main'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-2xl font-semibold capitalize'>{character}</h1>
        <p className='text-sm leading-6'>{character_description}</p>
        <Image
                  className='transition-all duration-500 hover:scale-110 hover:rotate-2'
                  src={character_poster}
                  alt=''
                  width={765}
                  height={325}
                />
        <ul className='flex gap-1 text-sm'>
            <li
              key={character_role.displayName}
              className='p-2 italic text-gray-400 border-l-4 border-green-400 rounded-md'
            >
              {character_role.displayName + ': ' + character_role.description}
            </li>
        </ul>
      </div>
      {character_abilities && (
        <>
          <h2 className='text-xl font-bold'>Abilities</h2>
          <ul className='flex flex-wrap gap-1'>
            {character_abilities.map((item) => (
              <li
                key={item.displayName}
                className='flex justify-center flex-grow flex-col items-center px-2 py-1 text-orange-400 rounded-full bg-orange-950'
              >
                {item.displayName}
                <Image
                  className='transition-all duration-500 hover:scale-110 hover:rotate-2'
                  src={item.displayIcon}
                  alt=''
                  width={50}
                  height={100}
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </Container>
  );
}
