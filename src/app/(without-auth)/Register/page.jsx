'use client'
import { useUser } from '@/context'
import { signOut, signInWithEmailAndPassword, passwordRedirect, writeUserData } from '@/firebase/database'
import { useRouter } from 'next/navigation';

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { useMask } from '@react-input/mask';

export default function Home() {
    const { user, introVideo, setSound, userDB, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, sound1, sound2, setSound1, setSound2, } = useUser()
    const [isDisable, setIsDisable] = useState(false)
    const inputRefWhatsApp = useMask({ mask: '+ 591 __ ___ ___', replacement: { _: /\d/ } });
    const router = useRouter()

    console.log(user)

    const signInHandler = (e) => {
        e.preventDefault()
        const data = {
            nombre: e.target[0].value,
            CI: e.target[1].value,
            direccion: e.target[2].value,
            whatsapp: e.target[3].value,
            rol: 'Cliente',
            bloqueado: false,
            uuid: user.uid
        }
        const callback = () => {
            setUserProfile(data)
            router.replace('/')
        }
        writeUserData(`/usuarios/${user.uid}`, data, callback)
    }
    const handleSignOut = () => {
        setUserProfile(null)
        signOut()
    }

    return (
        <div className='w-screen  flex flex-col justify-center items-center p-5 '>
            <form className={`w-full sm:max-w-[450px] md:max-w-[600px] space-y-4 shadow-2xl bg-white rounded-[20px] px-5 py-10 md:mt-[0px] md:grid md:grid-cols-2 md:gap-[5px]`} onSubmit={signInHandler} >
                <h5 className="text-[18px] text-center text-gray-800 md:col-span-2" >Registrate</h5>
                <div>
                    <label htmlFor="email" className="block mb-2 text-[16px] text-left font-medium text-gray-800">Nombre</label>
                    <Input type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800" placeholder="" require />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2 text-[16px] text-left font-medium text-gray-800">CI</label>
                    <Input type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800" placeholder="" require />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2 text-[16px] text-left font-medium text-gray-800">Direccion</label>
                    <Input type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800" placeholder="" require />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2 text-[16px] text-left font-medium text-gray-800">Whatsapp</label>
                    <Input type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800" reference={inputRefWhatsApp} placeholder="" require />
                </div>
                <Button type="submit" theme={isDisable === false ? "Primary" : "Loading"} styled={"md:col-span-2"}>Registrarme</Button>
                <div className="text-[14px] text-center font-medium text-gray-800 md:col-span-2">Ya tienes una cuenta? <Link href="/Login" className="text-gray-400 underline" onClick={handleSignOut}>Inicia Sesión</Link ></div>
            </form>
        </div>
    )
}
