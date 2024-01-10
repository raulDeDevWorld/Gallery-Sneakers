'use client'

import Button from '@/components/Button'
import Subtitle from '@/components/Subtitle'
import Modal from '@/components/Modal'
import Loader from '@/components/Loader'

import Select from '@/components/Select'
import { useUser } from '@/context/'
import Tag from '@/components/Tag'
import { useRouter } from 'next/navigation';
import { WithAuth } from '@/HOCs/WithAuth'
import { useEffect, useState, useRef } from 'react'
import {  writeUserData, readUserData, removeData,  } from '@/firebase/database'

function Home() {
    const { user, setUserUuid, userDB, msg, setMsg, modal, setModal, temporal, setTemporal, distributorPDB, setUserDistributorPDB, setUserItem, setUserData, setUserSuccess, sucursales, setSucursales, setServicios, item } = useUser()

    const router = useRouter()
    const [state, setState] = useState({})
    const [tag, setTag] = useState('')
    const [filter, setFilter] = useState('')
    const refFirst = useRef(null);


    function onChangeHandler(e, i) {
        setState({ ...state, [i.uuid]: { ...state[i.uuid], uuid: i.uuid, [e.target.name]: e.target.value } })
    }
    async function save(i) {
        const callback = () => {
            const obj = { ...state }
            delete obj[i.uuid]
            setState(obj)
            readUserData(`sucursales/${i.uuid}`, setServicios)
        }

        await writeUserData(`sucursales/${i.uuid}`, {...state[i.uuid]}, callback)
    }
    
    function deletConfirm() {
        const callback2 = () => {
            setModal('')
            console.log('ejec')
        }
        const callback = () => {
            readUserData(`sucursales/`, setServicios, callback2)
        }
        removeData(`sucursales/${item.uuid}`, setUserSuccess, callback)
    }
    function delet(i) {
        setUserItem(i)
        setModal('Delete')
    }
    function redirect(id) {
        setUserUuid(id)
        return router.push('Sucursales/Agregar/')
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
    console.log('sucursales')

    console.log(sucursales)
    useEffect(() => {
        sucursales === undefined && readUserData('sucursales', setSucursales)
    }, [sucursales])

    return (

        <div className='h-full'>
                 <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block left-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:left-[20px]' onClick={prev}>{'<'}</button>
            <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block right-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:right-[20px]' onClick={next}>{'>'}</button>

            <div className="relative h-full overflow-x-auto shadow-2xl p-5 bg-white min-h-[80vh] scroll-smooth"  ref={refFirst}>
                {modal === 'Delete' && <Modal funcion={deletConfirm}>Estas seguro de eliminar a la siguiente sucursal {msg}</Modal>}
                <h3 className='font-medium text-[16px]'>Sucursales</h3>
                <br />
                <div className='flex justify-center w-full'>
                    <input type="text" className='border-b border-gray-300 gap-4 text-center focus:outline-none  w-[300px]' onChange={onChangeHandler} placeholder='Filtrar por nombre' />
                </div>
                <br />
                <table className="w-full min-w-[1000px]  text-[14px] text-left text-gray-500 border-t-4 border-gray-400">
                    <thead className="text-[14px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="min-w-[50px] px-3 py-3">
                                #
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Nombre de sucursal
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Dirección
                            </th>

                            <th scope="col" className="px-3 py-3">
                                Whatsapp
                            </th>

                            <th scope="col" className="text-center px-3 py-3">
                                Eliminar
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sucursales && sucursales !== undefined && Object.values(sucursales).sort(sortArray).map((i, index) => {

                            return  i.nombre.toLowerCase().includes(filter) && <tr className="bg-white text-[14px] border-b dark:bg-gray-800  hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
                                <td className="min-w-[50px] px-3 py-4  text-gray-900 align-middle">
                                    {index + 1}
                                </td>
                                <td className="min-w-[250px] px-3 py-4  text-gray-900 ">
                                    {/* <textarea id="message" rows="1" onChange={(e) => onChangeHandler(e, i)} cols="6" name='nombre de producto 1' defaultValue={i['nombre de producto 1']} className="block p-1.5  w-full h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aqui..."></textarea> */}
                                    {i['nombre']}
                                </td>
                                <td className="min-w-[250px] px-3 py-4  text-gray-900 ">
                                    <textarea id="message" rows="1" onChange={(e) => onChangeHandler(e, i)} cols="6" name='nombre de producto 1' defaultValue={i['direccion']} className="block p-1.5  w-full h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aqui..."></textarea>
                                    {/* {i['direccion']} */}
                                </td>
                                <td className="min-w-[200px] px-3 py-4  text-gray-900 ">
                                    <textarea id="message" rows="1" onChange={(e) => onChangeHandler(e, i)} name='costo' cols="4" defaultValue={i['whatsapp']} className="block p-1.5  w-full h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aqui..."></textarea>
                                    {/* {i['whatsapp']} */}
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

                <div className='lg:flex hidden lg:fixed top-[100px] right-[65px] '>
                    <div className='flex justify-center items-center h-[50px] text-white text-[14px] font-normal font-medium bg-[#00E2FF] border border-gray-200 rounded-[10px] px-10 cursor-pointer mr-2' onClick={redirect}>Agregar Sucursal</div>
                    <div className='flex justify-center items-center bg-[#00E2FF] h-[50px] w-[50px]  rounded-full text-white cursor-pointer' onClick={redirect}> <span className='text-white text-[30px]'>+</span> </div>
                </div>
            </div>
        </div>
    )
}


export default Home





