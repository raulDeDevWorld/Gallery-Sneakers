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
import { writeUserData, readUserData, removeData } from '@/firebase/database'
import { uploadStorage } from '@/firebase/storage'
import { categoria, recepcion } from '@/constants'
import LoaderBlack from '@/components/LoaderBlack'

function Home() {
    const { user, setUserUuid, userDB, msg, setMsg, modal, setModal, temporal, setTemporal, distributorPDB, setUserDistributorPDB, setUserItem, item, setUserData, setUserSuccess, servicios, setServicios, sucursales, setSucursales, perfil } = useUser()

    const router = useRouter()
    const [state, setState] = useState({})
    const [stateDynamic, setStateDynamic] = useState({})
    const [postImage, setPostImage] = useState({})
    const [urlPostImage, setUrlPostImage] = useState({})

    const [filter, setFilter] = useState('')
    const refFirst = useRef(null);

    function onChangeHandlerCheck(e) {
        setState({ ...state, ['dias de atencion']: { ...state['dias de atencion'], [e.target.name]: e.target.checked } })
    }

    function onChangeHandler(e, i) {
        setState({ ...state, [i.uuid]: { ...state[i.uuid], uuid: i.uuid, [e.target.name]: e.target.value } })
    }
    function onChangeHandlerDynamic(e, i) {
        setStateDynamic({ ...stateDynamic, [i.uuid]: { ...stateDynamic[i.uuid], [e.target.name]: e.target.value } })
    }
    const onClickHandlerSelect = (name, value, uuid) => {
        setState({ ...state, [uuid]: { ...state[uuid], uuid, [name]: value } })
    }
    function manageInputIMG(e, uuid) {
        const file = e.target.files[0]
        setPostImage({ ...postImage, [uuid]: file })
        setUrlPostImage({ ...urlPostImage, [uuid]: URL.createObjectURL(file) })
        setState({ ...state, [uuid]: { ...state[uuid], uuid } })
    }
    function save(i) {
        setModal('Guardando')
        const data = {
            ...state[i.uuid],
            ['costos y entregas']: {
                ...i['costos y entregas'],
                ...stateDynamic[i.uuid]
            }
        }
        const callback = () => {
            const obj = { ...state }
            delete obj[i.uuid]
            setState(obj)
            const obj2 = { ...stateDynamic }
            delete obj2[i.uuid]
            setStateDynamic(obj2)
            readUserData(`servicios/`, setServicios)
            setModal('')
        }

        writeUserData(`servicios/${i.uuid}`, data, callback)
        // uploadStorage(`servicios/${uuid}`, postImage, { ...state, uuid, ['costos y entregas']: costos }, callback)

        postImage[i.uuid] && uploadStorage(`servicios/${i.uuid}`, postImage[i.uuid], data, callback)
    }
    function delet(i) {
        setUserItem(i)
        setModal('Delete')
    }
    function deletConfirm() {
        const callback = () => {
            readUserData(`servicios`, setServicios)
            setModal('')
        }
        removeData(`servicios/${item.uuid}`, callback)
    }
    function buttonHandler(i, action) {
        setUserItem(i)
        setModal(action)
    }
    function redirect() {
        router.push('Servicios/Agregar')
    }

    function sortArray(x, y) {
        if (x['nombre 1'].toLowerCase() < y['nombre 1'].toLowerCase()) { return -1 }
        if (x['nombre 1'].toLowerCase() > y['nombre 1'].toLowerCase()) { return 1 }
        return 0
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
    console.log(state)
    useEffect(() => {
        readUserData('servicios', setServicios)
        readUserData('sucursales', setSucursales)
    }, [])

    return (
        <div className='h-full'>
            {modal === "Guardando" && <LoaderBlack>{modal}</LoaderBlack>}
            {modal === 'Delete' && <Modal funcion={deletConfirm}>Estas seguro de eliminar al siguiente usuario {msg}</Modal>}
            <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block left-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:left-[20px]' onClick={prev}>{'<'}</button>
            <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block right-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:right-[20px]' onClick={next}>{'>'}</button>
            <div className="relative h-full overflow-auto shadow-2xl p-5 bg-white min-h-[80vh] scroll-smooth" ref={refFirst}>
                <h3 className='font-medium text-[16px]'>Productos</h3>
                <br />
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

                            return (i['nombre 1'].toLowerCase().includes(filter) ||
                                i['nombre 2'].toLowerCase().includes(filter) ||
                                i['nombre 3'].toLowerCase().includes(filter)) &&
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
                <div className='lg:flex hidden lg:fixed top-[90px] right-[65px] '>
                    <div className='flex justify-center items-center h-[50px] text-white text-[14px] font-bold bg-blue-500 border border-gray-200 rounded-[10px] px-10 cursor-pointer mr-2' onClick={redirect}>Agregar Producto</div>
              
                    <div className='flex justify-center items-center h-[50px] text-white text-[14px] font-bold bg-green-500 border border-gray-200 rounded-[10px] px-10 cursor-pointer mr-2' onClick={redirect}>Registrar venta</div>
               
                    <div className='flex justify-center items-center h-[50px] text-white text-[14px] font-bold bg-yellow-500 border border-gray-200 rounded-[10px] px-10 cursor-pointer mr-2' onClick={redirect}>Transferir stock</div>
                </div>
                {/* <div className='lg:flex hidden lg:fixed top-[100px] right-[65px] '>
                    <div className='flex justify-center items-center h-[50px] text-white text-[14px] font-bold bg-black border border-gray-200 rounded-[10px] px-10 cursor-pointer mr-2' onClick={redirect}>Agregar Producto</div>
                    <div className='flex justify-center items-center bg-black h-[50px] w-[50px]  rounded-full text-white cursor-pointer' onClick={redirect}> <span className='text-white text-[30px]'>+</span> </div>
                </div> */}
            </div>
        </div>
    )
}


export default Home





