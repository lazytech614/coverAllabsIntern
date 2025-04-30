import React from 'react'

const page = () => {
  return (
    <div className='w-full h-[calc(100vh-10rem)] flex flex-col items-center justify-center gap-y-4'>
      <div className='text-5xl sm:text-6xl max-w-[600px] text-center font-semibold'>
        <h1>What will you</h1>
        <h1><span className='text-[#00A82D]'>achieve</span> today?</h1>
      </div>
      <p className='text-md sm:text-xl max-w-[600px] text-center'>Remember everything and tackle any project with your notes, tasks, and schedule all in one place.</p>
    </div>
  )
}

export default page