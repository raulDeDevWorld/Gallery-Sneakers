'use client'

import Button from '@/components/Button'
import Subtitle from '@/components/Subtitle'
import Modal from '@/components/Modal'
import Select from '@/components/Select'
import { useUser } from '@/context/'
import Tag from '@/components/Tag'
import { useRouter } from 'next/navigation';
import { WithAuth } from '@/HOCs/WithAuth'
import { useEffect, useState } from 'react'
import {  writeUserData, readUserData, removeData } from '@/firebase/database'

function Home() {
    const { user, setUserUuid, userDB, msg, setMsg, modal, setModal, temporal, setTemporal, distributorPDB, setUserDistributorPDB, setUserItem, setUserData, setUserSuccess, sucursales, setSucursales } = useUser()

    const router = useRouter()
    const [state, setState] = useState({})
    const [postImage, setPostImage] = useState({})
    const [urlPostImage, setUrlPostImage] = useState({})
    const [disponibilidad, setDisponibilidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [ciudad, setCiudad] = useState('')
    const [filter, setFilter] = useState('')


    function onChangeHandler(e) {
        setFilter(e.target.value.toLowerCase())
    }
    // async function save(i) {
    //     awai  t writeUserData('Producto', state[i.uuid], i.uuid)
    //     postImage[i.uuid] && await uploadStorage('Producto', postImage[i.uuid], i.uuid, writeUserData, true)
    //     const obj = { ...state }
    //     delete obj[i.uuid]
    //     setState(obj)
    //     readUserData('Producto', userDB.uuid, setUserDistributorPDB, 'distribuidor')
    // }
    function deletConfirm() {
        const callback = () => {
            readUserData(`producto`, setUserDistributorPDB)
            setModal('')
        }
        removeData(`producto/${i.uuid}`, callback)
    }
    function delet(i) {
        setUserItem(i)
        setModal('Delete')
    }
    function redirect(id) {
        setUserUuid(id)
        return router.push('Administrador/Distribuidores/Productos')
    }
    function redirectPedidos(id) {
        setUserUuid(id)
        return router.push('Administrador/Distribuidores/Pedidos')
    }
    function sortArray(x, y) {
        if (x['nombre'].toLowerCase() < y['nombre'].toLowerCase()) { return -1 }
        if (x['nombre'].toLowerCase() > y['nombre'].toLowerCase()) { return 1 }
        return 0
    }
    console.log('sucursales')

    console.log(sucursales)
    useEffect(() => {
        readUserData('Sucursales', setSucursales)
    }, [])

    return (

        <div className='h-full'>
   
            <div className="relative h-full overflow-x-auto shadow-2xl p-5 bg-white min-h-[80vh]">
                {modal === 'Delete' && <Modal click={deletConfirm} funcion={() => delet(i)}>Estas seguro de eliminar al siguiente usuario {msg}</Modal>}
                <h3 className='font-medium text-[16px]'>Historial</h3>
                <br />
                <div className='min-w-[1500px] flex justify-start items-center my-5 '>
                    <h3 className="flex pr-12 text-[14px]" htmlFor="">Sucursal</h3>
                    {sucursales && sucursales !== undefined && <div className="w-full grid gap-4 grid-cols-10" style={{ gridTemplateColumns: `repeat(${sucursales && sucursales !== undefined ? sucursales.length : 2}, 150px)` }}>
                        {
                            sucursales && sucursales !== undefined && Object.values(sucursales).map(i => <Tag theme={tag == i.nombre ? 'Primary' : 'Secondary'} click={() => setTag(tag == i.nombre ? '' : i.nombre)}>{i.nombre}</Tag>)
                        }
                    </div>}
                </div>
                <div className='flex justify-center w-full'>
                    <input type="text" className='border-b border-gray-300 gap-4 text-center focus:outline-none  w-[300px]' onChange={onChangeHandler} placeholder='Filtrar por nombre' />
                </div>
                <br />
                <table className="min-w-full  text-[14px] text-left text-gray-500 border-t-4 border-gray-400">
                    <thead className="text-[14px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-3 py-3">
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
                            <th scope="col" className="px-3 py-3">
                                Eliminar
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sucursales && temporal !== undefined && Object.values(sucursales).sort(sortArray).map((i, index) => {

                            return i.ciudad.includes(ciudad) && i.nombre.toLowerCase().includes(filter) && <tr className="bg-white text-[14px] border-b dark:bg-gray-800  hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
                                <td className="px-3 py-4  flex font-semibold text-gray-900 ">
                                    <span className='h-full flex py-2'>{index + 1}</span>
                                </td>
                                <td className="px-3 py-4 font-semibold text-gray-900 " onClick={(e) => redirect(i.uuid)}>
                                    {/* <textarea id="message" rows="1" onChange={(e) => onChangeHandler(e, i)} cols="6" name='nombre de producto 1' defaultValue={i['nombre de producto 1']} className="block p-1.5  w-full h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aqui..."></textarea> */}
                                    {i['nombre']}
                                </td>
                                <td className="px-3 py-4 font-semibold text-gray-900 " onClick={(e) => redirect(i.uuid)}>
                                    {/* <textarea id="message" rows="1" onChange={(e) => onChangeHandler(e, i)} cols="6" name='nombre de producto 1' defaultValue={i['nombre de producto 1']} className="block p-1.5  w-full h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aqui..."></textarea> */}
                                    {i['CI']}
                                </td>
                                <td className="px-3 py-4 font-semibold text-gray-900 " onClick={(e) => redirect(i.uuid)}>
                                    {/* <textarea id="message" rows="1" onChange={(e) => onChangeHandler(e, i)} cols="6" name='nombre de producto 1' defaultValue={i['nombre de producto 1']} className="block p-1.5  w-full h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aqui..."></textarea> */}
                                    {i['Direccion']}
                                </td>
                                <td className="px-3 py-4 font-semibold text-gray-900 ">
                                    {/* <textarea id="message" rows="1" onChange={(e) => onChangeHandler(e, i)} name='costo' cols="4" defaultValue={i['costo']} className="block p-1.5 h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aqui..."></textarea> */}
                                    {i['whatsapp']}
                                </td>

                                <td className="px-3 py-4">
                                    <Button theme={"Danger"} click={() => delet(i)}>Eliminar</Button>
                                </td>
                            </tr>
                        })
                        }
                    </tbody>
                </table>

                <div className='lg:flex hidden lg:fixed top-[100px] right-[65px] '>
                    <div className='flex justify-center items-center h-[50px] text-white text-[14px] font-normal font-medium bg-[#32CD32] border border-gray-200 rounded-[10px] px-10 cursor-pointer mr-2' onClick={redirect}>Agregar Sucursal</div>
                    <div className='flex justify-center items-center bg-[#0064FA] h-[50px] w-[50px]  rounded-full text-white cursor-pointer' onClick={redirect}> <span className='text-white text-[30px]'>+</span> </div>
                </div>
            </div>
        </div>

    )
}


export default WithAuth(Home)





