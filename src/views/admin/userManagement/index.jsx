import React from 'react'
import UserTable from "./components/UserTable"

const index = () => {
  return (
    <div>
    <div className="mt-5 p-4 grid h-full grid-cols-1 gap-5 md:grid-cols-1">
      <UserTable/>
    </div>
  </div>
  )
}

export default index
