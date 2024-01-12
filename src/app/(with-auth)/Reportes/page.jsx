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
                <table className={` w-full text-[14px] text-left text-gray-500 border-t-4 border-gray-400`} style={{minWidth: `${sucursales && sucursales !== undefined ? sucursales.length * 200 + 1500 : 1500}px`}}>
                    <thead className="text-[14px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="min-w-[50px] px-3 py-3">
                                #
                            </th>
                            <th scope="col" className="min-w-[80px] px-3 py-3">
                                Marca
                            </th>
                            <th scope="col" className="min-w-[80px] px-3 py-3">
                                Modelo
                            </th>
                            <th scope="col" className="min-w-[80px] px-3 py-3">
                                nombre
                            </th>
                            {/* <th scope="col" className="px-3 py-3">
                                Descripcion basica
                            </th> */}
                            {/* <th scope="col" className="text-center px-3 py-3">
                                Categoria
                            </th>
                            <th scope="col" className="text-center px-3 py-3">
                                Categoria 2
                            </th> */}
                            <th scope="col" className="text-center px-3 py-3">
                                Precio
                            </th>
                            {sucursales && sucursales !== undefined && Object.values(sucursales).map((i) => {
                                return <>
                                    <th scope="col" className="  px-3 py-3">
                                        Stock {i.nombre}
                                    </th>
                                    {/* <th scope="col" className="min-w-[100px] text-center px-3 py-3">
                                        Adicional inmediato <br />
                                        {i.nombre}
                                    </th> */}
                                </>
                            })}
                            <th scope="col" className="px-3 py-3">
                                Imagen
                            </th>
                            <th scope="col" className="text-center px-3 py-3">
                                Editar
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {servicios && Object.values(servicios).sort(sortArray).map((i, index) => {

                            return ((i['nombre 1'].toLowerCase().includes(filter) ||
                                i['nombre 2'].toLowerCase().includes(filter))) &&
                                <tr className="bg-white text-[14px] border-b dark:bg-gray-800  hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
                                    <td className="min-w-[50px] px-3 py-4 text-gray-900 align-middle">
                                        {index + 1}
                                    </td>
                                    <td className=" px-3 py-4  text-gray-900 " >
                                        {/* <textarea id="message" rows="1" onChange={(e) => onChangeHandler(e, i)} cols="6" name='nombre 1' defaultValue={i['nombre 1']} className="block p-1.5  w-full h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aqui..."></textarea> */}
                                        {i['nombre 1']} 
                                    </td>
                                    <td className=" px-3 py-4  text-gray-900 " >
                                        {/* <textarea id="message" rows="1" onChange={(e) => onChangeHandler(e, i)} cols="6" name='nombre 2' defaultValue={i['nombre 2']} className="block p-1.5  w-full h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aqui..."></textarea> */}
                                        {i['nombre 2']} 
                                    </td>
                                    <td className=" px-3 py-4  text-gray-900 " >
                                        {/* <textarea id="message" rows="1" onChange={(e) => onChangeHandler(e, i)} cols="6" name='nombre 2' defaultValue={i['nombre 2']} className="block p-1.5  w-full h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aqui..."></textarea> */}
                                        {i['nombre 3']} 
                                    </td>
                                    <td className=" px-3 py-4  text-gray-900 " >
                                        {/* <textarea id="message" rows="1" onChange={(e) => onChangeHandler(e, i)} cols="6" name='nombre 3' defaultValue={i['nombre 3']} className="block p-1.5  w-full h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aqui..."></textarea> */}
                                         {i['precio']}
                                    </td>
                                    {/* <td className="px-3 py-4  text-gray-900 " >
                                        <textarea id="message" rows="1" onChange={(e) => onChangeHandler(e, i)} cols="6" name='descripcion basica' defaultValue={i['descripcion basica']} className="block p-1.5  w-full h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aqui..."></textarea>
                                    </td>
                                    <td className="min-w-[200px] px-3 py-4  text-gray-900 " >
                                        <Select arr={perfil.categoria} name='categoria' uuid={i.uuid} defaultValue={i.categoria} click={onClickHandlerSelect} />
                                    </td>
                                    <td className="min-w-[200px] px-3 py-4  text-gray-900 " >
                                        <Select arr={perfil['recepcion por']} name='recepcion por' uuid={i.uuid} defaultValue={i['recepcion por']} click={onClickHandlerSelect} />
                                    </td>
                                    <td className="px-3 py-4  text-gray-900 " >
                                        <textarea id="message" rows="1" onChange={(e) => onChangeHandler(e, i)} cols="6" name='precio' defaultValue={i['precio']} className="block p-1.5  w-full h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aqui..."></textarea>
                                    </td> */}
                                    {/* {JSON.parse(i['costos y entregas'])[`costo inmediato ${item.uuid}`]}  */}
                                    {sucursales && sucursales !== undefined && Object.values(sucursales).map((item) => {

                                        return <>

                                            {/* <td>
                                                <textarea id="message" rows="1" onChange={(e) => onChangeHandlerDynamic(e, i)} cols="6" name={`costo 24 hrs ${item.uuid}`} defaultValue={i['costos y entregas'] !== undefined ? i['costos y entregas'][`costo 24 hrs ${item.uuid}`] : 0} className="block p-1.5  w-full text-center h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aqui..."></textarea>
                                            </td> */}
                                            <td>
                                                {i['costos y entregas'][`${item.uuid}`] !== undefined && Array(Object.values(i['costos y entregas'][`${item.uuid}`]).length/2).fill('').map((e, index)=>{
                                                    console.log(i['costos y entregas'][`${item.uuid}`][`talla${index}`])
                                               return <>Talla {i['costos y entregas'][`${item.uuid}`][`talla${index}`]}/ {i['costos y entregas'][`${item.uuid}`][`stock${index}`]}unidades <br /></>  
                                                 } )
                                                }
                                             {/* {i['costos y entregas'][`${item.uuid}`]} / {i['costos y entregas'][`stock ${item.uuid}`]} */}
                                            </td>
                                            {/* <td>
                                                <textarea id="message" rows="1" onChange={(e) => onChangeHandlerDynamic(e, i)} cols="6" name={`costo inmediato ${item.uuid}`} defaultValue={i['costos y entregas'] !== undefined ? i['costos y entregas'][`costo inmediato ${item.uuid}`] : 0} className="block p-1.5  w-full h-full text-center text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aqui..."></textarea>
                                            </td> */}
                                        </>
                                    }
                                    )}

                                    {/* {sucursales && sucursales !== undefined && Object.values(sucursales).map((item) => {
                                        return <>
                                            <td scope="col" className="px-3 py-3">
                                                Costo 24 hrs <br />
                                                {item.nombre}

                                            </td>
                                            <td scope="col" className="px-3 py-3">
                                                costo inmediato <br />
                                                {item.nombre}
                                            </td>
                                        </>
                                    })} */}


                                    <td className="w-32 p-4">
                                        <label htmlFor={`img${index}`}>
                                            <img src={urlPostImage[i.uuid] ? urlPostImage[i.uuid] : i.url} alt="Apple Watch" />
                                            <input id={`img${index}`} type="file" onChange={(e) => manageInputIMG(e, i.uuid)} className='hidden' />
                                        </label>
                                    </td>
                                    <td className="min-w-[200px] px-3 py-4">
                                        {state[i.uuid] || stateDynamic[i.uuid]
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
                    <div className='flex justify-center items-center h-[50px] text-white text-[14px] font-normal font-medium bg-[#32CD32] border border-gray-200 rounded-[10px] px-10 cursor-pointer mr-2' onClick={redirect}>Agregar Sucursal</div>
                    <div className='flex justify-center items-center bg-[#0064FA] h-[50px] w-[50px]  rounded-full text-white cursor-pointer' onClick={redirect}> <span className='text-white text-[30px]'>+</span> </div>
                </div>
            </div>
        </div>

    )
}


export default WithAuth(Home)





