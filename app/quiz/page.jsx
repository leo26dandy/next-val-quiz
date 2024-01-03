/**
Renders a Next.js page component that displays a quiz introduction with an image and a link to start the quiz.
@component
@returns {JSX.Element} The rendered page component.
*/

import { Container } from '@/components'
import Image from 'next/image'
import Link from 'next/link'
import { endpoint } from '@/utils/endpoint'
import { TbArrowBigRightFilled } from 'react-icons/tb'


export async function getRandomQuizQuestion() {
  const data = await fetch(`${endpoint}/quiz/random`, {cache: 'no-store'})

  if (!data.ok) {
    throw new Error('Failed to fetch data')
  }

  return data.json()
}

export default async function Page() {
  const data = await getRandomQuizQuestion()
  
  return (
    <Container
      as='main'
      className='flex flex-col gap-5 py-5 md:flex-row-reverse md:justify-between'
    >
      <div className='relative overflow-hidden rounded-2xl'>
        <div className='md:w-[24rem]'>
          <Image src="/wallpaper.jpg" alt='' width={700} height={700} />
        </div>
        <div className='absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent md:bg-grandient-to-r'></div>
      </div>

      <div className='md:w-[50%] flex flex-col gap-5'>
        <h1 className='text-2xl font-semibold'>Valorant Quiz</h1>
        <p className='text-sm leading-6 text-gray-300'>
          Ready to prove your Valorant expertise? This 16-question quiz throws out the gauntlet, covering agents, abilities, maps, and even some tricky environmental details. From iconic weapons to strategic maneuvers, it's all here to challenge your understanding of the Valorant universe. So, grab your friends, equip your knowledge, and prepare to reign supreme as the Valorant trivia champion!
        </p>
        <Link
          href={`/quiz/${data.randomQuestion}`}
          className='flex items-center justify-center gap-1 px-5 py-4 font-semibold text-orang-500 transition-colors rounded-md outline duration-600 hover:bg-orange-950'
        >
          <TbArrowBigRightFilled className='text-lg' />
          Take Quiz Now!
        </Link>
      </div>
    </Container>
  )
}
