// import { Logo } from '@/assets/logo'

import { Logo } from "@/assets/logo"
import { Card } from "../ui/card"


type AuthLayoutProps = {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className='container grid h-svh max-w-none items-center justify-center'>
      <Card className='mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:w-[420px] sm:px-4 sm:py-8 '>
        <div className='mb-4  flex items-center justify-center'>
          {/* <img alt="logo" src="/assets/logo.png" className='w-8 h-8 sm:h-12 sm:w-12'  /> */}
           <Logo className='me-2' />
          <h1 className='text-xl font-medium'>MDP ADMIN</h1>
        </div>
        {children}
      </Card>
    </div>
  )
}
