import React from 'react'
import Banner from './components/Banner'
import PasswordChange from './components/passwordChange'

const index = () => {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
        <div className="col-span-7 lg:!mb-0">
          <Banner />
        </div>
        <div className="col-span-5 lg:!mb-0 grid h-full w-full grid-cols-1 gap-3 rounded-[20px] bg-white bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none 2xl:grid-cols-11">
          <PasswordChange/>
        </div>
      </div>
     

    
    </div>
  )
}

export default index