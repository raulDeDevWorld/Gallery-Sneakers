'use client'
import { useUser } from '@/context'
import { onAuth, signUpWithEmail } from '@/firebase/utils'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Button from '@/components/Button'
import Input from '@/components/Input'
import LoaderBlack from '@/components/LoaderBlack'
import { useRouter } from 'next/navigation';

export default function Home() {
    const { user, introVideo, setSound, setIntroVideo, userDB, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, sound1, sound2, setSound1, setSound2, setModal, modal,  } = useUser()
    const [isDisable, setIsDisable] = useState(false)
    const router = useRouter()

    const signUpHandler = (e) => {
        e.preventDefault()
        setModal('Guardando')
        function callback(err) {
           err !== true && router.push('/Register')
           setModal('')
        }
        let email = e.target[0].value
        let password = e.target[1].value

        if (email.length == 0 || password.length == 0) {
            setUserSuccess('Complete')
            return setTimeout(() => { setIsDisable(false) }, 6000)
        }
        if (email.length < 10 && password.length < 7) {
            setUserSuccess('PasswordMin')
            return setTimeout(() => { setIsDisable(false) }, 6000)
        }
        signUpWithEmail(email, password, setUserProfile, setUserSuccess, callback)
    }
    return (
        <div className='w-screen flex flex-col justify-center items-center p-5'>
            {modal === "Guardando" && <LoaderBlack>{modal}</LoaderBlack>}
            <form className={`w-full max-w-[450px] space-y-4 shadow-2xl bg-white shadow rounded-[20px] px-5 py-10`} onSubmit={!isDisable ? signUpHandler : (e) => e.preventDefault()} >
                <h5 className="text-[18px] text-center text-gray-800">Registrate</h5>
                <div>
                    <label htmlFor="email" className="block mb-2 text-[16px] text-left font-medium text-gray-800">Email</label>
                    <Input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800" placeholder="name@company.com" require />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-[16px] text-left  font-medium text-gray-800">Contraseña</label>
                    <Input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800" require />
                </div>
                <div className="flex items-start">
                    <Link href='/Resetear' className="ml-auto  text-[14px] text-gray-400 underline">Olvidaste tu contraseña?</Link>
                </div>
                <Button type="submit" theme="Primary">Registrarme</Button>
                <div className="text-[14px] text-center font-medium text-gray-800">Ya tienes una cuenta? <Link href="/Login" className="text-gray-400 underline">Inicia Sesión</Link ></div>
            </form>
        </div>
    )
}

