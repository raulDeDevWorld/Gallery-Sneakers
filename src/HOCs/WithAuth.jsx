'use client'
import { useUser } from '@/context'
import { readUserData, writeUserData } from '@/firebase/database'
import LoaderWithLogo from '@/components/LoaderWithLogo'

import { useState, useEffect } from 'react'
import { signOut } from '@/firebase/utils'
import { useRouter } from 'next/navigation';
import Cart from '@/components/Cart'



export function WithAuth(Component) {
    return () => {
        const { user, userDB, setUserProfile, setUserCart, businessData, setUserProduct, setRecetaDB, precioJustoPDB, setPrecioJustoPDB, whatsapp, setWhatsapp, setUserData, filter, setFilter, nav, setNav, modal, setModal, cart, introClientVideo, setIntroClientVideo, pendienteDB, setPendienteDB, productDB, search, setSearch, videoClientRef, setFilterQR, webScann, setWebScann, setTienda, setBusinessData, servicios, setServicios } = useUser()
        const router = useRouter()
        useEffect(() => {
            if (user === undefined) onAuth(setUserProfile)
            if (user === null) router.push('/Login')
            if(user !== undefined && user !== null && userDB === undefined) {
              readUserData('Usuarios', userDB.uuid, setUserData, null, true)} 
            user !== undefined && user !== null && readUserData('Servicios', setServicios)
          }, [user, userDB])
        
        
        return (
            <>
                {user === undefined && <Loader />}
                {user && <Component {...arguments} />}
            </>
        )
    }
}