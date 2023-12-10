import React from 'react'

function Loading() {
  return (
    <div className='h-[50vh] flex justify-center items-center col-span-full'>
        <div className='text-lg md:text-xl font-medium flex items-center space-x-2 text-gray-500'>
            <h4>Loading</h4> <span className="loading loading-ring loading-lg"></span>
        </div>
    </div>
  )
}

export default Loading