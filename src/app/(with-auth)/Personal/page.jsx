'use client'

import Button from '@/components/Button'
import Subtitle from '@/components/Subtitle'
import Modal from '@/components/Modal'
import Select from '@/components/Select'
import { useUser } from '@/context/'
import Tag from '@/components/Tag'
import { useRouter } from 'next/navigation';
import { WithAuth } from '@/HOCs/WithAuth'
import { useEffect, useState, useRef } from 'react'
import {  writeUserData, readUserData, removeData } from '@/firebase/database'
import { roles } from '@/constants'

function Home() {
    const { user, setUserUuid, userDB, msg, setMsg, modal, setModal, temporal, setTemporal, distributorPDB, setUserDistributorPDB, setUserItem, setUserData, setUserSuccess, sucursales, setSucursales, setClientes, clientes } = useUser()

    const router = useRouter()
    const [state, setState] = useState({})
    const [filter, setFilter] = useState('')
    const refFirst = useRef(null);


    function onChangeHandler(e) {
        setFilter(e.target.value.toLowerCase())
    }
    const onClickHandlerSelect = (name, value, uuid) => {
        console.log(uuid)
        setState({ ...state, [uuid]: { ...state[uuid], [name]: value } })
    }  
    const onClickHandlerSelect2 = (name, value, uuid) => {
        const res = Object.values(sucursales).find((i)=> i.nombre === value)
        console.log(res.uuid)
        setState({ ...state, [uuid]: { ...state[uuid], [name]: value, ['sucursal uuid']: res.uuid } })
    }  
    console.log(state)
    // console.log(sucursales)
    function save(i) {
        const callback = () => {
            const obj = { ...state }
            delete obj[i.uuid]
            setState(obj)
            readUserData('/usuarios', setClientes)
        }
        writeUserData(`usuarios/${i.uuid}`, state[i.uuid], callback)
    }
    function delet(i) {
        setUserItem(i)
        setModal('Delete')
    }
    function deletConfirm() {
        const callback = () => {
            readUserData(`usuarios`, setClientes)
            setModal('')
        }
        removeData(`usuarios/${i.uuid}`, callback)
    }
    const prev = () => {
        requestAnimationFrame(() => {
            const scrollLeft = refFirst.current.scrollLeft;
            console.log(scrollLeft)
            const itemWidth = screen.width - 50
            refFirst.current.scrollLeft = scrollLeft - itemWidth;
        });
    };
    const next = () => {
        requestAnimationFrame(() => {
            const scrollLeft = refFirst.current.scrollLeft;
            console.log(scrollLeft)
            const itemWidth = screen.width - 50
            console.log(itemWidth)
            refFirst.current.scrollLeft = scrollLeft + itemWidth;
        });
    };
    function sortArray(x, y) {
        if (x['nombre'].toLowerCase() < y['nombre'].toLowerCase()) { return -1 }
        if (x['nombre'].toLowerCase() > y['nombre'].toLowerCase()) { return 1 }
        return 0
    }

    useEffect(() => {
        readUserData('usuarios', setClientes)
        readUserData('sucursales', setSucursales)
    }, [])

    return (

        <div className='h-full'>
            <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block left-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:left-[20px]' onClick={prev}>{'<'}</button>
            <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block right-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:right-[20px]' onClick={next}>{'>'}</button>

            <div className="relative h-full w-full overflow-auto shadow-2xl p-5 bg-white min-h-[80vh] scroll-smooth" ref={refFirst}>
                {modal === 'Delete' && <Modal click={deletConfirm} funcion={() => delet(i)}>Estas seguro de eliminar al siguiente usuario {msg}</Modal>}
                <h3 className='font-medium text-[16px]'>Personal</h3>
                <br />
                <div className='flex justify-center w-full'>
                    <input type="text" className='border-b border-gray-300 gap-4 text-center focus:outline-none  w-[300px]' onChange={onChangeHandler} placeholder='Filtrar por nombre' />
                </div>
                <br />
                <table className="min-w-[1500px]  text-[14px] text-left text-gray-500 border-t-4 border-gray-400">
                    <thead className="text-[14px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="min-w-[50px] px-3 py-3">
                                #
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Nombre
                            </th>
                            <th scope="col" className="px-3 py-3">
                                CI
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Dirección
                            </th>
                            
                            <th scope="col" className="px-3 py-3">
                                Whatsapp
                            </th>
                            <th scope="col" className="text-center px-3 py-3">
                                Rol
                            </th>
                            <th scope="col" className="text-center px-3 py-3">
                                Sucursal
                            </th>  
                            <th scope="col" className="text-center px-3 py-3">
                                Eliminar
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes !== undefined && sucursales !== undefined && Object.values(clientes).sort(sortArray).map((i, index) => {

                            return i.rol !== 'Cliente' && i.nombre.toLowerCase().includes(filter) && <tr className="bg-white text-[14px] border-b dark:bg-gray-800  hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
                                <td className="min-w-[50px] h-full px-3 py-4 text-gray-900 align-middle">
                                   {index + 1}
                                </td>
                                <td className="min-w-[250px] px-3 py-4  text-gray-900 " onClick={(e) => redirect(i.uuid)}>
                                    {/* <textarea id="message" rows="1" onChange={(e) => onChangeHandler(e, i)} cols="6" name='nombre de producto 1' defaultValue={i['nombre de producto 1']} className="block p-1.5  w-full h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aqui..."></textarea> */}
                                    {i['nombre']}
                                </td>
                                <td className="min-w-[150px] px-3 py-4  text-gray-900 " onClick={(e) => redirect(i.uuid)}>
                                    {/* <textarea id="message" rows="1" onChange={(e) => onChangeHandler(e, i)} cols="6" name='nombre de producto 1' defaultValue={i['nombre de producto 1']} className="block p-1.5  w-full h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aqui..."></textarea> */}
                                    {i['CI']}
                                </td>
                                <td className="min-w-[250px] px-3 py-4  text-gray-900 " onClick={(e) => redirect(i.uuid)}>
                                    {/* <textarea id="message" rows="1" onChange={(e) => onChangeHandler(e, i)} cols="6" name='nombre de producto 1' defaultValue={i['nombre de producto 1']} className="block p-1.5  w-full h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aqui..."></textarea> */}
                                    {i['direccion']}
                                </td>
                                <td className="min-w-[150px] px-3 py-4  text-gray-900 ">
                                    {/* <textarea id="message" rows="1" onChange={(e) => onChangeHandler(e, i)} name='costo' cols="4" defaultValue={i['costo']} className="block p-1.5 h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aqui..."></textarea> */}
                                    {i['whatsapp']}
                                </td>
                                <td className="min-w-[200px] px-3 py-4  text-gray-900 " >
                                    <Select arr={roles} name='rol' uuid={i.uuid} defaultValue={i.rol} click={onClickHandlerSelect} />
                                </td>
                                <td className="min-w-[200px] px-3 py-4  text-gray-900 " >
                                    <Select arr={Object.values(sucursales).map((i) => i.nombre)} name='sucursal' uuid={i.uuid} defaultValue={i.sucursal ? i.sucursal : 'No asignado'} click={onClickHandlerSelect2} />
                                </td>
                                <td className="min-w-[200px] px-3 py-4">
                                    {state[i.uuid]
                                        ? <Button theme={"Primary"} click={() => save(i)}>Guardar</Button>
                                        : <Button theme={"Danger"} click={() => delet(i)}>Eliminar</Button>
                                    }
                                </td>
                            </tr>
                        })
                        }
                    </tbody>
                </table>
{/* 
                <div className='lg:flex hidden lg:fixed top-[100px] right-[65px] '>
                    <div className='flex justify-center items-center h-[50px] text-white text-[14px] font-bold bg-[#00E2FF] border border-gray-200 rounded-[10px] px-10 cursor-pointer mr-2' onClick={redirect}>Agregar Sucursal</div>
                    <div className='flex justify-center items-center bg-[#00E2FF] h-[50px] w-[50px]  rounded-full text-white cursor-pointer' onClick={redirect}> <span className='text-white text-[30px]'>+</span> </div>
                </div> */}
            </div>
        </div>

    )
}


export default Home





