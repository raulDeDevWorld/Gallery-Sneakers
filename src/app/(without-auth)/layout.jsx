'use client'
import { useUser } from '@/context'
import { onAuth } from '@/firebase/utils'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import Msg from '@/components/Msg'
export default function layout({ children }) {
  const { user, userDB, setUserProfile, setUserData, success } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user === undefined) onAuth(setUserProfile, setUserData)
    if (user && user !== undefined && userDB === null) router.push('/Register')
    if (userDB && userDB !== undefined) router.replace('/')
  }, [user, userDB])
  return (
    <main className='relative h-screen min-h-[640px] flex flex-col justify-center items-center '
      style={{
        // backgroundImage: 'url(/bg.jpeg)',
        // backgroundSize: 'cover',
        // backgroundRepeat: 'no-repeat',
        // backgroundPosition: 'center',
        // //  background: 'linear-gradient(0deg, #ffffff 50%, #00E2FF 50%)' 
        // backgroundColor: '#00E2FF'
      }}>
      <div
        className='absolute top-0 w-full h-[50vh] flex flex-col justify-center items-center bg-black z-20'
        // style={{
        //   backgroundImage: 'url(/bg.jpeg)',
        //   backgroundSize: 'cover',
        //   backgroundRepeat: 'no-repeat',
        //   backgroundPosition: 'center',
        //   //  background: 'linear-gradient(0deg, #ffffff 50%, #00E2FF 50%)' 
        //   backgroundColor: '#00E2FF'
        // }}
        ></div>
      <div
        className='absolute top-0 w-full h-[50vh] flex flex-col justify-center items-center z-20'
        // style={{
        //   background: ' #00E2FF80 50%'
        //   //  background: 'linear-gradient(0deg, #ffffff80 50%, #00E2FF80 50%)' 
        // }}
        >
      </div>
      <div className='relative w-full text-center flex justify-center bg-transparent py-5 z-30'>
        <img src="/logo.png" className='h-[80px]' alt="User" />
      </div>
      <div className='z-50'>
        {children}
      </div>
      <div className='pt-[40px] sm:pt-0 sm:fixed sm:top-[50px] sm:left-[50px] z-30 '>
        <a type="button" href='#' download class="flex items-center justify-center w-48 text-white bg-black rounded-lg h-14 border-[1px] border-white">
          <div class="mr-3">
            <svg viewBox="30 336.7 120.9 129.2" width="30">
              <path fill="#FFD400"
                d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7  c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z">
              </path>
              <path fill="#FF3333"
                d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3  c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z">
              </path>
              <path fill="#48FF48" d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1  c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z">
              </path>
              <path fill="#3BCCFF"
                d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6  c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z">
              </path>
            </svg>
          </div>
          <div>
            <div class="text-xs">
              Descargar
            </div>
            <div class="-mt-1 font-sans text-xl font-semibold">
              APK android
            </div>
          </div>
        </a>
      </div>

      {success == 'AccountNonExist' && <Msg>Cuenta inexistente</Msg>}
      {success == 'CompleteEmail' && <Msg>Introduce tu email</Msg>}
      {success == 'Complete' && <Msg>Complete el formulario</Msg>}
      {success == 'PasswordMin' && <Msg>La contraseña es muy corta</Msg>}
      {success == 'Te enviamos un correo...' && <Msg>Te enviamos un correo...</Msg>}
      {success == 'Firebase: Error (auth/email-already-in-use).' && <Msg>La cuenta ya esta en uso</Msg>}
    </main>
  )
}




