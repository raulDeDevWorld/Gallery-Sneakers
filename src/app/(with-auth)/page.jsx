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
    const { user, setUserUuid, filter, setFilter, userDB, msg, setMsg, modal, setModal, temporal, setTemporal, distributorPDB, setUserDistributorPDB, setUserItem, item, setUserData, setUserSuccess, servicios, setServicios, sucursales, setSucursales, perfil } = useUser()

    const router = useRouter()
    const [state, setState] = useState({})
    const [stateDynamic, setStateDynamic] = useState({})
    const [postImage, setPostImage] = useState({})
    const [urlPostImage, setUrlPostImage] = useState({})

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
    function redirect(ref) {
        router.push(ref)
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
                {/* <div className='flex justify-center w-full'>
                    <input type="text" className='border-b border-gray-300 gap-4 text-center focus:outline-none  w-[300px]' onChange={onChangeHandler} placeholder='Filtrar por nombre' />
                </div> */}
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
                    <div className='flex justify-center items-center h-[50px] text-white text-[14px] font-bold bg-blue-500 border border-gray-200 rounded-[10px] px-10 cursor-pointer mr-2' onClick={()=>redirect('Servicios/Agregar')}>Agregar Producto</div>
              
                    <div className='flex justify-center items-center h-[50px] text-white text-[14px] font-bold bg-green-500 border border-gray-200 rounded-[10px] px-10 cursor-pointer mr-2' onClick={()=>redirect('RegistrarVenta')}>Registrar venta</div>
               
                    <div className='flex justify-center items-center h-[50px] text-white text-[14px] font-bold bg-yellow-500 border border-gray-200 rounded-[10px] px-10 cursor-pointer mr-2' onClick={()=>redirect('/')}>Transferir stock</div>
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












































// 'use client'
// import { readUserData, readUserDataLength, writeUserData, readLateData } from '@/firebase/database'
// import { useUser } from '@/context'
// import Button from '@/components/Button'
// import Subtitle from '@/components/Subtitle'
// import Card from '@/components/Card'
// // import QRreader from '@/components/QRreader'
// import Tag from '@/components/Tag'
// import Msg from '@/components/Msg'
// import Modal from '@/components/Modal'
// // import QRscanner from '@/components/QRscanner'
// import { useRouter } from 'next/navigation';
// import { WithAuth } from '@/HOCs/WithAuth'
// import { useEffect } from 'react'
// // import QrcodeDecoder from 'qrcode-decoder';
// import { QRreaderUtils } from '@/utils/QRreader'
// import { useState } from 'react'
// import Input from '@/components/Input'
// import MiniCard from '@/components/MiniCard'
// import { useReactPath } from '@/HOCs/useReactPath'
// import { useMask } from '@react-input/mask';
// import { getDayMonthYearHour, getMonthYear, formatDayMonthYear, formatDayMonthYearInput } from '@/utils/getDate'
// import { generateUUID } from '@/utils/UIDgenerator'
// import Link from 'next/link'
// import dynamic from "next/dynamic";
// const InvoicePDF = dynamic(() => import("@/components/pdfDoc"), {
//     ssr: false,
// });
// function Home() {
//     const { filterDis, setFilterDis, Perfil,
//         user, userDB, cart, setUserCart,
//         modal, setUserData,
//         setModal, servicios, setServicios,
//         setUserProduct, setUserPedidos, setUserItem, item, filter, setFilter, filterQR, setTienda, setFilterQR, pendienteDB, setPendienteDB, tienda, setIntroClientVideo, search, setSearch, distributorPDB, setUserDistributorPDB, webScann, setWebScann,
//         qrBCP, setQrBCP,
//         ultimoPedido, setUltimoPedido, success, perfil, clientes } = useUser()
//     const [disponibilidad, setDisponibilidad] = useState('')
//     const [categoria, setCategoria] = useState('')
//     const router = useRouter()
//     const [filterNav, setFilterNav] = useState(false)
//     const inputRefWhatsApp = useMask({ mask: '+ 591 __ ___ ___', replacement: { _: /\d/ } });
//     const [state, setState] = useState({})
//     const [pdfDB, setPdfDB] = useState(null)

//     const [mode, setMode] = useState('Services')
//     const [pdf, setPDF] = useState(false)
//     const [lateElement, setLateElement] = useState(undefined)
//     const [nextNum, setNextNum] = useState(undefined)
//     const path = useReactPath();

//     function onChangeHandler(e) {
//         setState({ ...state, [e.target.name]: e.target.value })
//     }
//     function onChangeHandlerDate(e) {
//         setState({ ...state, [e.target.name]: formatDayMonthYear(e.target.value) })
//     }
//     async function HandlerCheckOut(e) {

//         const db = Object.values(cart).reduce((acc, i, index) => {
//             const data = `Nombre: ${i['nombre 1']},\nCategoria: ${i.categoria},\nCantidad: ${i.cantidad},\n`
//             return data + '\r\n' + acc

//         }, ``)


//         var whatsappMessage = "Solicitud de cotización" + "\r\n\r\n" + db
//         whatsappMessage = window.encodeURIComponent(whatsappMessage)
//         console.log(whatsappMessage)
//         window.open(`https://api.whatsapp.com/send?phone=${perfil.whatsapp.replaceAll(' ', '')}&text=${whatsappMessage}`, '_blank')

//     }

//     function HandlerOnChange(e) {
//         QRreaderUtils(e, setFilterQR, setFilter, readUserData, setPendienteDB)
//     }

//     function storeConfirm() {
//         setTienda(modal)
//         setUserCart({})
//         setModal('')
//     }

//     function sortArray(x, y) {
//         if (x['nombre 1'].toLowerCase() < y['nombre 1'].toLowerCase()) { return -1 }
//         if (x['nombre 1'].toLowerCase() > y['nombre 1'].toLowerCase()) { return 1 }
//         return 0
//     }
//     function handlerSearchFilter(data) {

//         setFilter(data)
//         setSearch(false)
//     }

//     function handlerWebScann(e) {
//         e.stopPropagation()
//         e.preventDefault()
//         router.push('/Cliente/Scaner')
//     }
//     function searchQR(data) {
//         filter === data
//             ? setFilter('')
//             : setFilter(data)
//     }

//     function generateNO(num) {
//         const zero = `${num < 10 ? '00' : ''}${num > 9 && num < 100 ? '0' : ''}${num === 100 ? '100' : ''}${num === 101 ? '001' : ''}`
//         return num != 101 && num != 100 ? 'NUMERO_' + zero + num : 'NUMERO_' + zero
//     }
//     const handlerSubmit = (e) => {
//         e.preventDefault()

//         if (state.nombre !== undefined &&
//             (state.whatsapp !== undefined || state.CI !== undefined) &&
//             state.direccion !== undefined) {



//             setPDF(true)

//             const uuid = generateUUID()

//             const data = {
//                 ...state,
//                 servicios: cart,
//                 date: new Date().getTime(),
//                 fecha: getDayMonthYearHour(),
//                 mes: getMonthYear(),
//                 sucursal: userDB.sucursal,
//                 uuid,
//                 estado: 'Pendiente',
//                 ['sucursal uuid']: userDB['sucursal uuid'],
//                 saldo: state.ac && state.ac !== undefined
//                     ? Object.values(cart).reduce((acc, i, index) => {
//                         const sum = i['costo'] * i['cantidad']
//                         const sum2 = i.adicional && i.adicional !== undefined ? i['adicional'] * i['cantidad'] : 0
//                         return sum + sum2 + acc
//                     }, 0) - state.ac
//                     : Object.values(cart).reduce((acc, i, index) => {
//                         const sum = i['costo'] * i['cantidad']
//                         const sum2 = i.adicional && i.adicional !== undefined ? i['adicional'] * i['cantidad'] : 0
//                         return sum + sum2 + acc
//                     }, 0)
//             }

//             const callback = (length) => {
//                 const code = length !== undefined ? length : 1
//                 const callback2 = () => {
//                     setModal('')
//                     setPdfDB({ ...data, code: generateNO(code) })
//                 }
//                 writeUserData(`tareas/${userDB['sucursal uuid']}/${uuid}`, { ...data, code: generateNO(code) }, callback2)
//             }

//             readUserDataLength(`/tareas/${userDB['sucursal uuid']}`, callback)


//             return
//         } else {
//             setModal('Complete')
//         }
//     }

//     function finish() {
//         setState({})
//         setUserCart({})
//         setPdfDB(undefined)
//         setPDF(false)
//     }
//     function autocompletar() {
//         const res = Object.values(clientes).find((i) => i.CI === state.autocomplete || i.whatsapp === state.autocomplete)
//         if (res !== undefined) {
//             const data = {
//                 nombre: res.nombre,
//                 CI: res.CI,
//                 direccion: res.direccion,
//                 whatsapp: res.whatsapp
//             }
//             setState({ ...state, ...data })
//         } else {
//             setModal('user non exit')
//         }
//     }
//     console.log(cart)
//     return (
//         <main className="">
//             {(modal == 'Recetar' || modal == 'Comprar') && <Modal funcion={storeConfirm}>Estas seguro de cambiar a {modal}. <br /> {Object.keys(cart).length > 0 && 'Tus datos se borraran'}</Modal>}
//             {modal == 'Auth' && <Modal funcion={() => setModal('')}>Tu perfil esta en espera de ser autorizado</Modal>}
//             {modal == 'Observacion' && <Modal funcion={() => setModal('')}>Tu perfil esta en espera de ser autorizado</Modal>}
//             {modal == 'user non exit' && <Modal funcion={() => setModal('')} alert={true}>El usuario no existe</Modal>}
//             {modal === 'Complete' && <Modal alert={true}>Complete los campos requeridos </Modal>}

//             <div className={`h-[85vh] w-screen lg:w-full relative z-10 flex flex-col items-center lg:grid ${userDB.rol === 'Cliente' ? 'lg:h-auto' : 'overflow-hidden'} `} style={{ gridTemplateColumns: userDB.rol !== 'Cliente' && '500px auto', gridAutoFlow: 'dense' }}>
//                 {<div className={`relative  lg:bg-transparent overflow-y-scroll  px-5 pb-[90px]  
//                 ${userDB.rol === 'Cliente' ? 'py-10 w-full' : 'w-full h-full'} 
//                 ${(location.href.includes('#Services') || location.href.includes('#Client') || location.href.includes('#QR') || location.href.includes('#Saldo')) ? (userDB.rol === 'Cliente'
//                         ? 'flex flex-col  items-center' : 'hidden lg:flex flex-col  items-center')
//                         : (userDB.rol === 'Cliente'
//                             ? 'flex flex-col  items-center'
//                             : 'flex flex-col  items-center'
//                         )}`} >
//                     {filter.length == 0 &&
//                         servicios !== null && servicios !== undefined &&
//                         Object.values(servicios).sort(sortArray).map((i, index) => {
//                             return i.categoria.includes(categoria) &&
//                                 <Card
//                                     i={i}
//                                     costo={i['costos y entregas'][`costo 24 hrs ${userDB && userDB !== undefined && userDB['sucursal uuid']}`]}
//                                     inmediato={i['costos y entregas'][`costo inmediato ${userDB && userDB !== undefined && userDB['sucursal uuid']}`]}
//                                     key={index} />
//                         })
//                     }
//                     {filter.length > 0 && filterQR.length === 0 && servicios !== null && servicios !== undefined &&
//                         Object.values(servicios).sort(sortArray).map((i, index) => {
//                             return (i['nombre 1'].toLowerCase().includes(filter.toLowerCase()) ||
//                                 (i['nombre 2'] && i['nombre 2'].toLowerCase().includes(filter.toLowerCase())) ||
//                                 (i['nombre 3'] && i['nombre 3'].toLowerCase().includes(filter.toLowerCase()))) &&
//                                 i.categoria.includes(categoria) &&
//                                 <Card
//                                     i={i}
//                                     costo={i['costos y entregas'][`costo 24 hrs ${userDB && userDB !== undefined && userDB['sucursal uuid']}`]}
//                                     inmediato={i['costos y entregas'][`costo inmediato ${userDB && userDB !== undefined && userDB['sucursal uuid']}`]}
//                                     key={index} />
//                         })
//                     }
//                 </div>}
//                 {userDB !== undefined && userDB.rol !== 'Cliente' && <div className={`relative flex-col items-center w-full max-w-screen bg-red-500 h-[80vh] overflow-y-scroll bg-transparent  transition-all px-[15px]	z-0  lg:flex ${(location.href.includes('#Services') || location.href.includes('#Client') || location.href.includes('#QR') || location.href.includes('#Saldo')) ? 'flex' : 'hidden'} `} >
//                     <div className='w-full gap-[10px]'>
//                         <ul className="flex border-b">
//                             <li className={`mr-1  ${(location.href === 'http://localhost:3000/' || location.href === 'https://app.lavavelox.com/' || location.href === 'http://localhost:3000/#' || location.href === 'https://app.lavavelox.com/#' || location.href.includes('#Services')) ? '-mb-px' : ''}`}>
//                                 <a href='#Services' className={`bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold cursor-pointer ${(location.href === 'http://localhost:3000/' || location.href === 'https://app.lavavelox.com/' || location.href.includes('#Services')) ? 'border-l border-t border-r rounded-t' : ''}`} >Carrito</a>
//                             </li>
//                             <li className={`mr-1 ${location.href.includes('#Client') ? '-mb-px' : ''}`}>
//                                 <a href='#Client' className={`bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold cursor-pointer ${location.href.includes('#Client') ? 'border-l border-t border-r  rounded-t' : ''}`} >Cliente</a>
//                             </li>
//                             <li className={`mr-1 ${location.href.includes('#QR') ? '-mb-px' : ''}`}>
//                                 <a href='#QR' className={`bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold cursor-pointer ${location.href.includes('#QR') ? 'border-l border-t border-r  rounded-t' : ''}`} >Pago por QR</a>
//                             </li>
//                             <li className={`mr-1 ${location.href.includes('#Saldo') ? '-mb-px' : ''}`}>
//                                 <a href='#Saldo' className={`bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold cursor-pointer ${location.href.includes('#Saldo') ? 'border-l border-t border-r  rounded-t' : ''}`} >Registrar</a>
//                             </li>
//                         </ul>
//                     </div>
//                     <div className={`relative w-full overflow-auto ${(location.href === 'http://localhost:3000/' || location.href === 'https://app.lavavelox.com/' || location.href.includes('#Services')) ? (location.href.includes('#Services') ? '' : 'hidden lg:block') : 'hidden'} `}>
//                         {Object.values(cart).length > 0
//                             ? <table className="w-full mt-[15px] shadow-2xl border-[1px] border-gray-200  min-w-[700px] overflow-hidden text-[14px] text-left text-gray-500">
//                                 <thead className="w-full text-[16px] text-gray-900 uppercase border-b bg-gray-100">
//                                     <tr>
//                                         <th scope="col" className="w-[200px] px-2 py-1 font-bold">
//                                             Prenda
//                                         </th>
//                                         <th scope="col" className="px-2 py-1 text-center font-bold">
//                                             Velox
//                                         </th>
//                                         <th scope="col" className="w-[100px] px-2 py-1 text-center font-bold">
//                                             Observación
//                                         </th>
//                                         <th scope="col" className="px-0 py-1 text-center font-bold">
//                                             Cantidad
//                                         </th>
//                                         <th scope="col" className="px-2 py-1 text-center font-bold">
//                                             Costo total
//                                         </th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {Object.values(cart).map((i, index) => <MiniCard
//                                         i={i}
//                                         inmediato={i['costos y entregas'][`costo inmediato ${userDB && userDB !== undefined && userDB['sucursal uuid']}`]}
//                                         key={index}
//                                     />)}
//                                     <tr className="bg-white text-[14px] border-b">
//                                         <td className="px-2 py-4 text-[16px] text-gray-900">
//                                             TOTAL:
//                                         </td>
//                                         <td className="px-2 py-4 text-[16px] text-gray-900"></td>
//                                         <td className="px-2 py-4 text-[16px] text-gray-900 text-center">
//                                             {Object.values(cart).reduce((acc, i, index) => {
//                                                 const sum = i['costo'] * i['cantidad']
//                                                 const sum2 = i.adicional && i.adicional !== undefined ? i['adicional'] * i['cantidad'] : 0
//                                                 return sum + sum2 + acc
//                                             }, 0)}  Bs.
//                                         </td>
//                                     </tr>

//                                 </tbody>
//                             </table>
//                             : <div className="text-center py-[30px]">No tiene servicios asignados</div>}
//                         {Object.values(cart).length > 0 ? <div className='fixed left-0 md:relative w-full p-5'>
//                             <a href='#Client'><Button type="button" theme="Primary">Continuar</Button></a>
//                         </div>
//                             : <Button type="button" theme="Primary" styled="md:hidden" click={() => router.replace('/')}>atras</Button>}
//                     </div>

//                     {
//                         location.href.includes('#Client') &&
//                         <form className={`w-full max-w-[450px] md:max-w-[600px]  mt-[15px] space-y-4 shadow-2xl bg-white  rounded-[20px] px-5 py-10 md:grid md:grid-cols-2 md:gap-[5px]`}>
//                             <div className="md:grid md:grid-cols-2 md:gap-[5px] md:col-span-2">
//                                 <Input type="text" name="autocomplete" id="email" onChange={onChangeHandler} defValue={state.autocomplete && state.autocomplete !== undefined && state.autocomplete} className="bg-gray-50 border border-gray-300 text-gray-900 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800" placeholder="Introduce el DNI o whatsapp" />
//                                 <Button type="button" theme="Primary" click={autocompletar}>Autocompletar</Button>
//                             </div>
//                             <h5 className="text-[18px] text-center text-gray-800 md:col-span-2" >Datos de Cliente</h5>

//                             <div>
//                                 <label htmlFor="email" className="block mb-2 text-[16px] text-left font-medium text-gray-800">Nombre</label>
//                                 <Input type="text" name="nombre" id="email" onChange={onChangeHandler} defValue={state.nombre && state.nombre !== undefined && state.nombre} className="bg-gray-50 border border-gray-300 text-gray-900 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800" placeholder="" require />
//                             </div>
//                             <div>
//                                 <label htmlFor="email" className="block mb-2 text-[16px] text-left font-medium text-gray-800">CI</label>
//                                 <Input type="text" name="CI" id="email" onChange={onChangeHandler} defValue={state.CI && state.CI !== undefined && state.CI} className="bg-gray-50 border border-gray-300 text-gray-900 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800" placeholder="" require />
//                             </div>
//                             <div>
//                                 <label htmlFor="email" className="block mb-2 text-[16px] text-left font-medium text-gray-800">Direccion</label>
//                                 <Input type="text" name="direccion" id="email" onChange={onChangeHandler} defValue={state.direccion && state.direccion !== undefined && state.direccion} className="bg-gray-50 border border-gray-300 text-gray-900 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800" placeholder="" />
//                             </div>
//                             <div>
//                                 <label htmlFor="email" className="block mb-2 text-[16px] text-left font-medium text-gray-800">Whatsapp</label>
//                                 <Input type="text" name="whatsapp" id="email" onChange={onChangeHandler} defValue={state.whatsapp && state.whatsapp !== undefined && state.whatsapp} className="bg-gray-50 border border-gray-300 text-gray-900 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800" reference={inputRefWhatsApp} placeholder="" />
//                             </div>

//                             <a href='#Services' className="hidden md:block mb-2 text-[16px] text-left font-medium text-gray-800"><Button type="button" theme="Transparent" >Atras</Button></a>
//                             <a href='#QR' className="block mb-2 text-[16px] text-left font-medium text-gray-800" ><Button type="button" theme="Primary">Continuar</Button></a>
//                         </form>
//                     }
//                     {
//                         location.href.includes('#QR') && <form className={`w-full max-w-[450px] md:max-w-[600px]  mt-[15px] space-y-4 shadow-2xl bg-white rounded-[20px] px-5 py-10 md:grid md:grid-cols-2 md:gap-[5px]`}>
//                             <h5 className="text-[18px] text-center text-gray-800 md:col-span-2" >Datos de usuario</h5>
//                             <div className='flex justify-center md:col-span-2 '>
//                                 <img src={perfil.url} className='w-[200px] h-auto ' alt="" />
//                             </div>
//                             <a href='#Client' className="hidden md:block mb-2 text-[16px] text-left font-medium text-gray-800"><Button type="button" theme="Transparent">Atras</Button></a>
//                             <a href='#Saldo' className="block mb-2 text-[16px] text-left font-medium text-gray-800"><Button type="button" theme="Primary">Continuar</Button></a>
//                         </form>
//                     }
//                     {
//                         location.href.includes('#Saldo') &&
//                         <form className={`w-full max-w-[450px] md:max-w-[600px]  mt-[15px] space-y-4 shadow-2xl bg-white rounded-[20px] px-5 py-10 md:grid md:grid-cols-2 md:gap-[5px]`} onSubmit={handlerSubmit}>
//                             <h5 className="text-[18px] text-center text-gray-800 md:col-span-2" >Registrar</h5>
                           
//                             <div>
//                                 <label htmlFor="email" className="block mb-2 text-[16px] text-left font-medium text-gray-800">Monto Cancelado</label>
//                                 <Input type="text" name="ac" id="email" onChange={onChangeHandler} defValue={state.ac && state.ac !== undefined ? state.ac : 0} className="bg-gray-50 border border-gray-300 text-gray-900 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800" placeholder="" require />
//                             </div>
//                             <div>
//                                 <label htmlFor="email" className="block mb-2 text-[16px] text-left font-medium text-gray-800">Monto a cancelar</label>
//                                 <span className=" border border-gray-300 text-gray-900 text-[16px] rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800" >
//                                     {
//                                         state.ac && state.ac !== undefined
//                                             ? Object.values(cart).reduce((acc, i, index) => {
//                                                 const sum = i['costo'] * i['cantidad']
//                                                 const sum2 = i.adicional && i.adicional !== undefined ? i['adicional'] * i['cantidad'] : 0
//                                                 return sum + sum2 + acc
//                                             }, 0) - state.ac
//                                             : Object.values(cart).reduce((acc, i, index) => {
//                                                 const sum = i['costo'] * i['cantidad']
//                                                 const sum2 = i.adicional && i.adicional !== undefined ? i['adicional'] * i['cantidad'] : 0
//                                                 return sum + sum2 + acc
//                                             }, 0)}
//                                 </span>
//                             </div>
//                             {pdf === false && <a href='#QR' className="hidden md:block mb-2 text-[16px] text-left font-medium text-gray-800"><Button type="button" theme="Transparent">Atras</Button></a>}
//                             {pdf === false && <Button type="submit" theme="Primary">Registrar</Button>}
//                             {pdf && <a href='/#'>
//                                     <Button type="button" theme="Danger" click={finish}>Finalizar</Button>
//                                 </a>
//                             }
//                             {pdf && pdfDB && <InvoicePDF i={{ ...pdfDB, ...state }} />}
//                         </form>
//                     }
//                 </div >}
//             </div >


//             {Object.entries(cart).length !== 0 && userDB.rol !== 'Cliente' && (location.href === 'http://localhost:3000/' || location.href === 'https://app.lavavelox.com/' || location.href === 'http://localhost:3000/#' || location.href === 'https://app.lavavelox.com/#')
//                 ? <div className="fixed lg:hidden w-screen sm:w-[500px] px-5 lg:px-0 lg:pr-[14px] bottom-[70px] lg:bottom-5 left-0 right-0 mx-auto z-20">
//                     <a href="#Services"><Button theme="SuccessBuy">Asignar Servicio</Button></a>
//                 </div>
//                 : Object.entries(cart).length !== 0 && userDB.rol === 'Cliente' && <div className="fixed lg:hidden w-screen sm:w-[500px] px-5 lg:px-0 lg:pr-[14px] bottom-[70px] lg:bottom-5 left-0 right-0 mx-auto z-20">
//                     <Button theme="SuccessBuy" click={HandlerCheckOut}>Calcular Pago</Button>
//                 </div>
//             }
//         </main>
//     )
// }

// export default Home
