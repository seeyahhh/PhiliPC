import React from 'react'

const Banner = () => {
  return (
    <div className='flex w-full justify-center h-100 p-10 grid-rows-1 grid-cols-2'>
        <div className="bg-blue-100 w-md rounded-l-3xl">
            <div className="flex flex-col gap-4 text-black p-7">
                <h1 className='font-extrabold text-4xl'>Tech Enthusiasts, Welcome Home</h1>
                <span className='text-neutral'>Performance-grade GPUs, high refresh monitors, and custom-key peripherals: the hardware to perfect your setup</span>
            </div>
        </div>
        <div className="bg-light-primary w-4xl rounded-r-3xl">asf</div>
    </div>
  )
}

export default Banner