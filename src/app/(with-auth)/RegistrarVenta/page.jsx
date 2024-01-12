'use client'
import { writeUserData, readUserData } from '@/firebase/database'
import { uploadStorage } from '@/firebase/storage'
import { useState, useRef, useEffect } from 'react'
import { useUser } from '@/context'
import Input from '@/components/Input'
import Select from '@/components/Select'
import Label from '@/components/Label'
import LoaderBlack from '@/components/LoaderBlack'
import Success from '@/components/Success'
import Modal from '@/components/Modal'

import Button from '@/components/Button'
import { useRouter } from 'next/navigation';
import { generateUUID } from '@/utils/UIDgenerator'
import { categoria, recepcion } from '@/constants'


function Home() {
    const router = useRouter()

    const { user, userDB, setUserData, setUserSuccess, success, setModal, modal, sucursales, setSucursales, perfil } = useUser()
    const [state, setState] = useState({['nombre 1']: perfil.categoria[0]})
    const [costos, setCostos] = useState({})

    const [postImage, setPostImage] = useState(null)
    const [urlPostImage, setUrlPostImage] = useState(null)
    const [counter, setCounter] = useState({})

    const inputRef1 = useRef(null)
    const inputRef2 = useRef(null)
    const inputRef3 = useRef(null)
    const inputRef4 = useRef(null)
    const inputRef5 = useRef(null)



    const onClickHandlerSelect = (name, value) => {
        setState({ ...state, [name]: value })
    }

    function manageInputIMG(e) {
        const file = e.target.files[0]
        setPostImage(file)
        setUrlPostImage(URL.createObjectURL(file))
    }

    function onChangeHandler(e) {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    function onChangeHandlerDynimic(e, uuid) {
        setCostos({ ...costos, [uuid]: costos[uuid] !== undefined ? {...costos[uuid], [e.target.name]: e.target.value} :{[e.target.name]: e.target.value} })
    }
    console.log(state)
    function callback() {

        inputRef2.current.value = ''
        inputRef4.current.value = ''


        setPostImage(null)
        setUrlPostImage(null)
        setUserSuccess('')
        setModal('')
    }

    async function save(e) {
        e.preventDefault()
        setModal('Guardando')
        const uuid = generateUUID()
        console.log({ categoria: perfil.categoria[0], ['recepcion por']: perfil['recepcion por'][0], ...state, uuid, ['costos y entregas']: costos })
        uploadStorage(`servicios/${uuid}`, postImage, { categoria: perfil.categoria[0], ['recepcion por']: perfil['recepcion por'][0], ...state, uuid, ['costos y entregas']: costos }, callback)
    }

    console.log(costos)
    function add(name) {
        setCounter({...counter, [name]:counter[name] !== undefined ? counter[name] +1 : 1})
    }
    function less(name) {
        setCounter({...counter, [name]:counter[name] !== undefined && counter[name] !== 1 ? counter[name] -1 : 1})
    }
    useEffect(() => {
        sucursales === undefined && readUserData('sucursales', setSucursales)
    }, [sucursales, counter])
console.log(counter)

    return (
        <div className='min-h-full p-5 pb-[30px] lg:pb-5'>
            {modal === "Guardando" && <LoaderBlack>{modal}</LoaderBlack>}

            <form className='p-10 min-w-screen  lg:min-w-auto bg-white shadow-2xl min-h-[80vh]' onSubmit={save}>
                <h3 className='text-center text-[16px] pb-3'>REGISTRAR VENTA</h3>

                
                <div className="md:grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <Label htmlFor="">Marca</Label>
                        <Select arr={perfil.categoria} name='nombre 1' click={onClickHandlerSelect} />
                    </div>
                    <div>
                        <Label htmlFor="">Modelo</Label>
                        <Select arr={perfil.categoria} name='nombre 1' click={onClickHandlerSelect} />
                    </div>
                    <div>
                        <Label htmlFor="">Cantidad </Label>
                        <Input type="text" name="precio" reference={inputRef4} onChange={onChangeHandler} require />
                    </div>
                    <div>
                        <Label htmlFor="">Costo Total </Label>
                        <Input type="text" name="precio" reference={inputRef4} onChange={onChangeHandler} require />
                    </div>
                   
                </div>
                <div className='flex w-full justify-around'>
                    <Button theme='Primary' >Registrar Venta</Button>
                </div>
                {success == 'Se ha guardado correctamente' && <LoaderBlack />}
                {modal == 'Seleccione una categoria.' && <Modal funcion={() => setUserSuccess('')} alert={true}>{modal}</Modal>}
                {success == 'Se ha guardado correctamente' && <Success>Guardado correctamente</Success>}

            </form>

        </div>
    )
}


export default Home