'use client'
import { readUserData, readUserDataLength, writeUserData, readLateData } from '@/firebase/database'
import { useUser } from '@/context'
import Button from '@/components/Button'
import Subtitle from '@/components/Subtitle'
import Card from '@/components/Card'
// import QRreader from '@/components/QRreader'
import Tag from '@/components/Tag'
import Msg from '@/components/Msg'
import Modal from '@/components/Modal'
// import QRscanner from '@/components/QRscanner'
import { useRouter } from 'next/navigation';
import { WithAuth } from '@/HOCs/WithAuth'
import { useEffect } from 'react'
// import QrcodeDecoder from 'qrcode-decoder';
import { QRreaderUtils } from '@/utils/QRreader'
import { useState } from 'react'
import Input from '@/components/Input'
import MiniCard from '@/components/MiniCard'
import { useReactPath } from '@/HOCs/useReactPath'
import { useMask } from '@react-input/mask';
import { getDayMonthYearHour, getMonthYear, formatDayMonthYear, formatDayMonthYearInput } from '@/utils/getDate'
import { generateUUID } from '@/utils/UIDgenerator'
import Link from 'next/link'
import dynamic from "next/dynamic";
const InvoicePDF = dynamic(() => import("@/components/pdfDoc"), {
    ssr: false,
});
function Home() {
    const { filterDis, setFilterDis, Perfil,
        user, userDB, cart, setUserCart,
        modal, setUserData,
        setModal, servicios, setServicios,
        setUserProduct, setUserPedidos, setUserItem, item, filter, setFilter, filterQR, setTienda, setFilterQR, pendienteDB, setPendienteDB, tienda, setIntroClientVideo, search, setSearch, distributorPDB, setUserDistributorPDB, webScann, setWebScann,
        qrBCP, setQrBCP,
        ultimoPedido, setUltimoPedido, success, perfil, clientes } = useUser()
    const [disponibilidad, setDisponibilidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const router = useRouter()
    const [filterNav, setFilterNav] = useState(false)
    const inputRefWhatsApp = useMask({ mask: '+ 591 __ ___ ___', replacement: { _: /\d/ } });
    const [state, setState] = useState({})
    const [pdfDB, setPdfDB] = useState(null)

    const [mode, setMode] = useState('Services')
    const [pdf, setPDF] = useState(false)
    const [lateElement, setLateElement] = useState(undefined)
    const [nextNum, setNextNum] = useState(undefined)
    const path = useReactPath();

    function onChangeHandler(e) {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    function onChangeHandlerDate(e) {
        setState({ ...state, [e.target.name]: formatDayMonthYear(e.target.value) })
    }
    async function HandlerCheckOut(e) {

        const db = Object.values(cart).reduce((acc, i, index) => {
            const data = `Nombre: ${i['nombre 1']},\nCategoria: ${i.categoria},\nCantidad: ${i.cantidad},\n`
            return data + '\r\n' + acc

        }, ``)


        var whatsappMessage = "Solicitud de cotización" + "\r\n\r\n" + db
        whatsappMessage = window.encodeURIComponent(whatsappMessage)
        console.log(whatsappMessage)
        window.open(`https://api.whatsapp.com/send?phone=${perfil.whatsapp.replaceAll(' ', '')}&text=${whatsappMessage}`, '_blank')

    }

    function HandlerOnChange(e) {
        QRreaderUtils(e, setFilterQR, setFilter, readUserData, setPendienteDB)
    }

    function storeConfirm() {
        setTienda(modal)
        setUserCart({})
        setModal('')
    }

    function sortArray(x, y) {
        if (x['nombre 1'].toLowerCase() < y['nombre 1'].toLowerCase()) { return -1 }
        if (x['nombre 1'].toLowerCase() > y['nombre 1'].toLowerCase()) { return 1 }
        return 0
    }
    function handlerSearchFilter(data) {

        setFilter(data)
        setSearch(false)
    }

    function handlerWebScann(e) {
        e.stopPropagation()
        e.preventDefault()
        router.push('/Cliente/Scaner')
    }
    function searchQR(data) {
        filter === data
            ? setFilter('')
            : setFilter(data)
    }

    function generateNO(num) {
        const zero = `${num < 10 ? '00' : ''}${num > 9 && num < 100 ? '0' : ''}${num === 100 ? '100' : ''}${num === 101 ? '001' : ''}`
        return num != 101 && num != 100 ? 'NUMERO_' + zero + num : 'NUMERO_' + zero
    }
    const handlerSubmit = (e) => {
        e.preventDefault()

        if (state.nombre !== undefined &&
            (state.whatsapp !== undefined || state.CI !== undefined) &&
            state.direccion !== undefined) {



            setPDF(true)

            const uuid = generateUUID()

            const data = {
                ...state,
                servicios: cart,
                date: new Date().getTime(),
                fecha: getDayMonthYearHour(),
                mes: getMonthYear(),
                sucursal: userDB.sucursal,
                uuid,
                estado: 'Pendiente',
                ['sucursal uuid']: userDB['sucursal uuid'],
                saldo: state.ac && state.ac !== undefined
                    ? Object.values(cart).reduce((acc, i, index) => {
                        const sum = i['costo'] * i['cantidad']
                        const sum2 = i.adicional && i.adicional !== undefined ? i['adicional'] * i['cantidad'] : 0
                        return sum + sum2 + acc
                    }, 0) - state.ac
                    : Object.values(cart).reduce((acc, i, index) => {
                        const sum = i['costo'] * i['cantidad']
                        const sum2 = i.adicional && i.adicional !== undefined ? i['adicional'] * i['cantidad'] : 0
                        return sum + sum2 + acc
                    }, 0)
            }

            const callback = (length) => {
                const code = length !== undefined ? length : 1
                const callback2 = () => {
                    setModal('')
                    setPdfDB({ ...data, code: generateNO(code) })
                }
                writeUserData(`tareas/${userDB['sucursal uuid']}/${uuid}`, { ...data, code: generateNO(code) }, callback2)
            }

            readUserDataLength(`/tareas/${userDB['sucursal uuid']}`, callback)


            return
        } else {
            setModal('Complete')
        }
    }

    function finish() {
        setState({})
        setUserCart({})
        setPdfDB(undefined)
        setPDF(false)
    }
    function autocompletar() {
        const res = Object.values(clientes).find((i) => i.CI === state.autocomplete || i.whatsapp === state.autocomplete)
        if (res !== undefined) {
            const data = {
                nombre: res.nombre,
                CI: res.CI,
                direccion: res.direccion,
                whatsapp: res.whatsapp
            }
            setState({ ...state, ...data })
        } else {
            setModal('user non exit')
        }
    }
    console.log(location.href)
    return (
        <main className="">
            {(modal == 'Recetar' || modal == 'Comprar') && <Modal funcion={storeConfirm}>Estas seguro de cambiar a {modal}. <br /> {Object.keys(cart).length > 0 && 'Tus datos se borraran'}</Modal>}
            {modal == 'Auth' && <Modal funcion={() => setModal('')}>Tu perfil esta en espera de ser autorizado</Modal>}
            {modal == 'Observacion' && <Modal funcion={() => setModal('')}>Tu perfil esta en espera de ser autorizado</Modal>}
            {modal == 'user non exit' && <Modal funcion={() => setModal('')} alert={true}>El usuario no existe</Modal>}
            {modal === 'Complete' && <Modal alert={true}>Complete los campos requeridos </Modal>}

            <div className={`h-[85vh] w-screen lg:w-full relative z-10 flex flex-col items-center lg:grid ${userDB.rol === 'Cliente' ? 'lg:h-auto' : 'overflow-hidden'} `} style={{ gridTemplateColumns: userDB.rol !== 'Cliente' && '500px auto', gridAutoFlow: 'dense' }}>
                {<div className={`relative  lg:bg-transparent overflow-y-scroll  px-5 pb-[90px]  
                ${userDB.rol === 'Cliente' ? 'py-10 w-full' : 'w-full h-full'} 
                ${(location.href.includes('#Services') || location.href.includes('#Client') || location.href.includes('#QR') || location.href.includes('#Saldo')) ? (userDB.rol === 'Cliente'
                        ? 'flex flex-col  items-center' : 'hidden lg:flex flex-col  items-center')
                        : (userDB.rol === 'Cliente'
                            ? 'flex flex-col  items-center'
                            : 'flex flex-col  items-center'
                        )}`} >
                    {filter.length == 0 &&
                        servicios !== null && servicios !== undefined &&
                        Object.values(servicios).sort(sortArray).map((i, index) => {
                            return i.categoria.includes(categoria) &&
                                <Card
                                    i={i}
                                    costo={i['costos y entregas'][`costo 24 hrs ${userDB && userDB !== undefined && userDB['sucursal uuid']}`]}
                                    inmediato={i['costos y entregas'][`costo inmediato ${userDB && userDB !== undefined && userDB['sucursal uuid']}`]}
                                    key={index} />
                        })
                    }
                    {filter.length > 0 && filterQR.length === 0 && servicios !== null && servicios !== undefined &&
                        Object.values(servicios).sort(sortArray).map((i, index) => {
                            return (i['nombre 1'].toLowerCase().includes(filter.toLowerCase()) ||
                                (i['nombre 2'] && i['nombre 2'].toLowerCase().includes(filter.toLowerCase())) ||
                                (i['nombre 3'] && i['nombre 3'].toLowerCase().includes(filter.toLowerCase()))) &&
                                i.categoria.includes(categoria) &&
                                <Card
                                    i={i}
                                    costo={i['costos y entregas'][`costo 24 hrs ${userDB && userDB !== undefined && userDB['sucursal uuid']}`]}
                                    inmediato={i['costos y entregas'][`costo inmediato ${userDB && userDB !== undefined && userDB['sucursal uuid']}`]}
                                    key={index} />
                        })
                    }
                </div>}
                {userDB !== undefined && userDB.rol !== 'Cliente' && <div className={`relative flex-col items-center w-full max-w-screen bg-red-500 h-[80vh] overflow-y-scroll bg-transparent  transition-all px-[15px]	z-0  lg:flex ${(location.href.includes('#Services') || location.href.includes('#Client') || location.href.includes('#QR') || location.href.includes('#Saldo')) ? 'flex' : 'hidden'} `} >
                    <div className='w-full gap-[10px]'>
                        <ul className="flex border-b">
                            <li className={`mr-1  ${(location.href === 'http://localhost:3000/' || location.href === 'https://app.lavavelox.com/' || location.href === 'http://localhost:3000/#' || location.href === 'https://app.lavavelox.com/#' || location.href.includes('#Services')) ? '-mb-px' : ''}`}>
                                <a href='#Services' className={`bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold cursor-pointer ${(location.href === 'http://localhost:3000/' || location.href === 'https://app.lavavelox.com/' || location.href.includes('#Services')) ? 'border-l border-t border-r rounded-t' : ''}`} >Servicios</a>
                            </li>
                            <li className={`mr-1 ${location.href.includes('#Client') ? '-mb-px' : ''}`}>
                                <a href='#Client' className={`bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold cursor-pointer ${location.href.includes('#Client') ? 'border-l border-t border-r  rounded-t' : ''}`} >Cliente</a>
                            </li>
                            <li className={`mr-1 ${location.href.includes('#QR') ? '-mb-px' : ''}`}>
                                <a href='#QR' className={`bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold cursor-pointer ${location.href.includes('#QR') ? 'border-l border-t border-r  rounded-t' : ''}`} >Pago por QR</a>
                            </li>
                            <li className={`mr-1 ${location.href.includes('#Saldo') ? '-mb-px' : ''}`}>
                                <a href='#Saldo' className={`bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold cursor-pointer ${location.href.includes('#Saldo') ? 'border-l border-t border-r  rounded-t' : ''}`} >Registrar</a>
                            </li>
                        </ul>
                    </div>
                    <div className={`relative w-full overflow-auto ${(location.href === 'http://localhost:3000/' || location.href === 'https://app.lavavelox.com/' || location.href.includes('#Services')) ? (location.href.includes('#Services') ? '' : 'hidden lg:block') : 'hidden'} `}>
                        {Object.values(cart).length > 0
                            ? <table className="w-full mt-[15px] shadow-2xl border-[1px] border-gray-200  min-w-[700px] overflow-hidden text-[14px] text-left text-gray-500">
                                <thead className="w-full text-[16px] text-gray-900 uppercase border-b bg-gray-100">
                                    <tr>
                                        <th scope="col" className="w-[200px] px-2 py-1 font-bold">
                                            Prenda
                                        </th>
                                        <th scope="col" className="px-2 py-1 text-center font-bold">
                                            Velox
                                        </th>
                                        <th scope="col" className="w-[100px] px-2 py-1 text-center font-bold">
                                            Observación
                                        </th>
                                        <th scope="col" className="px-0 py-1 text-center font-bold">
                                            Cantidad
                                        </th>
                                        <th scope="col" className="px-2 py-1 text-center font-bold">
                                            Costo total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.values(cart).map((i, index) => <MiniCard
                                        i={i}
                                        inmediato={i['costos y entregas'][`costo inmediato ${userDB && userDB !== undefined && userDB['sucursal uuid']}`]}
                                        key={index}
                                    />)}
                                    <tr className="bg-white text-[14px] border-b">
                                        <td className="px-2 py-4 text-[16px] text-gray-900">
                                            TOTAL:
                                        </td>
                                        <td className="px-2 py-4 text-[16px] text-gray-900"></td>
                                        <td className="px-2 py-4 text-[16px] text-gray-900 text-center">
                                            {Object.values(cart).reduce((acc, i, index) => {
                                                const sum = i['costo'] * i['cantidad']
                                                const sum2 = i.adicional && i.adicional !== undefined ? i['adicional'] * i['cantidad'] : 0
                                                return sum + sum2 + acc
                                            }, 0)}  Bs.
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                            : <div className="text-center py-[30px]">No tiene servicios asignados</div>}
                        {Object.values(cart).length > 0 ? <div className='fixed left-0 md:relative w-full p-5'>
                            <a href='#Client'><Button type="button" theme="Primary">Continuar</Button></a>
                        </div>
                            : <Button type="button" theme="Primary" styled="md:hidden" click={() => router.replace('/')}>atras</Button>}
                    </div>

                    {
                        location.href.includes('#Client') &&
                        <form className={`w-full max-w-[450px] md:max-w-[600px]  mt-[15px] space-y-4 shadow-2xl bg-white  rounded-[20px] px-5 py-10 md:grid md:grid-cols-2 md:gap-[5px]`}>
                            <div className="md:grid md:grid-cols-2 md:gap-[5px] md:col-span-2">
                                <Input type="text" name="autocomplete" id="email" onChange={onChangeHandler} defValue={state.autocomplete && state.autocomplete !== undefined && state.autocomplete} className="bg-gray-50 border border-gray-300 text-gray-900 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800" placeholder="Introduce el DNI o whatsapp" />
                                <Button type="button" theme="Primary" click={autocompletar}>Autocompletar</Button>
                            </div>
                            <h5 className="text-[18px] text-center text-gray-800 md:col-span-2" >Datos de Cliente</h5>

                            <div>
                                <label htmlFor="email" className="block mb-2 text-[16px] text-left font-medium text-gray-800">Nombre</label>
                                <Input type="text" name="nombre" id="email" onChange={onChangeHandler} defValue={state.nombre && state.nombre !== undefined && state.nombre} className="bg-gray-50 border border-gray-300 text-gray-900 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800" placeholder="" require />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-[16px] text-left font-medium text-gray-800">CI</label>
                                <Input type="text" name="CI" id="email" onChange={onChangeHandler} defValue={state.CI && state.CI !== undefined && state.CI} className="bg-gray-50 border border-gray-300 text-gray-900 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800" placeholder="" require />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-[16px] text-left font-medium text-gray-800">Direccion</label>
                                <Input type="text" name="direccion" id="email" onChange={onChangeHandler} defValue={state.direccion && state.direccion !== undefined && state.direccion} className="bg-gray-50 border border-gray-300 text-gray-900 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800" placeholder="" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-[16px] text-left font-medium text-gray-800">Whatsapp</label>
                                <Input type="text" name="whatsapp" id="email" onChange={onChangeHandler} defValue={state.whatsapp && state.whatsapp !== undefined && state.whatsapp} className="bg-gray-50 border border-gray-300 text-gray-900 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800" reference={inputRefWhatsApp} placeholder="" />
                            </div>

                            <a href='#Services' className="hidden md:block mb-2 text-[16px] text-left font-medium text-gray-800"><Button type="button" theme="Transparent" >Atras</Button></a>
                            <a href='#QR' className="block mb-2 text-[16px] text-left font-medium text-gray-800" ><Button type="button" theme="Primary">Continuar</Button></a>
                        </form>
                    }
                    {
                        location.href.includes('#QR') && <form className={`w-full max-w-[450px] md:max-w-[600px]  mt-[15px] space-y-4 shadow-2xl bg-white rounded-[20px] px-5 py-10 md:grid md:grid-cols-2 md:gap-[5px]`}>
                            <h5 className="text-[18px] text-center text-gray-800 md:col-span-2" >Datos de usuario</h5>
                            <div className='flex justify-center md:col-span-2 '>
                                <img src={perfil.url} className='w-[200px] h-auto ' alt="" />
                            </div>
                            <a href='#Client' className="hidden md:block mb-2 text-[16px] text-left font-medium text-gray-800"><Button type="button" theme="Transparent">Atras</Button></a>
                            <a href='#Saldo' className="block mb-2 text-[16px] text-left font-medium text-gray-800"><Button type="button" theme="Primary">Continuar</Button></a>
                        </form>
                    }
                    {
                        location.href.includes('#Saldo') &&
                        <form className={`w-full max-w-[450px] md:max-w-[600px]  mt-[15px] space-y-4 shadow-2xl bg-white rounded-[20px] px-5 py-10 md:grid md:grid-cols-2 md:gap-[5px]`} onSubmit={handlerSubmit}>
                            <h5 className="text-[18px] text-center text-gray-800 md:col-span-2" >Registrar</h5>
                            {/* <div>
                                <label htmlFor="email" className="block mb-2 text-[16px] text-left font-medium text-gray-800">Fecha recojo de prenda</label>
                                <Input type="date" name="fecha para recojo" id="email" onChange={onChangeHandlerDate} defValue={state['fecha para recojo'] && state['fecha para recojo'] !== undefined ? formatDayMonthYearInput(state['fecha para recojo']) : ''} className="bg-gray-50 border border-gray-300 text-gray-900 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800" placeholder="" require />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-[16px] text-left font-medium text-gray-800">hora recojo de prenda</label>
                                <Input type="time" name="hora para recojo" id="email" onChange={onChangeHandler} defValue={state['hora para recojo'] && state['hora para recojo'] !== undefined ? state['hora para recojo'] : ''} className="bg-gray-50 border border-gray-300 text-gray-900 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800" placeholder="" require />
                            </div> */}
                            <div>
                                <label htmlFor="email" className="block mb-2 text-[16px] text-left font-medium text-gray-800">Monto Cancelado</label>
                                <Input type="text" name="ac" id="email" onChange={onChangeHandler} defValue={state.ac && state.ac !== undefined ? state.ac : 0} className="bg-gray-50 border border-gray-300 text-gray-900 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800" placeholder="" require />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-[16px] text-left font-medium text-gray-800">Monto a cancelar</label>
                                <span className=" border border-gray-300 text-gray-900 text-[16px] rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800" >
                                    {
                                        state.ac && state.ac !== undefined
                                            ? Object.values(cart).reduce((acc, i, index) => {
                                                const sum = i['costo'] * i['cantidad']
                                                const sum2 = i.adicional && i.adicional !== undefined ? i['adicional'] * i['cantidad'] : 0
                                                return sum + sum2 + acc
                                            }, 0) - state.ac
                                            : Object.values(cart).reduce((acc, i, index) => {
                                                const sum = i['costo'] * i['cantidad']
                                                const sum2 = i.adicional && i.adicional !== undefined ? i['adicional'] * i['cantidad'] : 0
                                                return sum + sum2 + acc
                                            }, 0)}
                                </span>
                            </div>
                            {pdf === false && <a href='#QR' className="hidden md:block mb-2 text-[16px] text-left font-medium text-gray-800"><Button type="button" theme="Transparent">Atras</Button></a>}
                            {pdf === false && <Button type="submit" theme="Primary">Registrar</Button>}
                            {pdf && <a href='/#'>
                                    <Button type="button" theme="Danger" click={finish}>Finalizar</Button>
                                </a>
                            }
                            {pdf && pdfDB && <InvoicePDF i={{ ...pdfDB, ...state }} />}
                        </form>
                    }
                </div >}
            </div >


            {Object.entries(cart).length !== 0 && userDB.rol !== 'Cliente' && (location.href === 'http://localhost:3000/' || location.href === 'https://app.lavavelox.com/' || location.href === 'http://localhost:3000/#' || location.href === 'https://app.lavavelox.com/#')
                ? <div className="fixed lg:hidden w-screen sm:w-[500px] px-5 lg:px-0 lg:pr-[14px] bottom-[70px] lg:bottom-5 left-0 right-0 mx-auto z-20">
                    <a href="#Services"><Button theme="SuccessBuy">Asignar Servicio</Button></a>
                </div>
                : Object.entries(cart).length !== 0 && userDB.rol === 'Cliente' && <div className="fixed lg:hidden w-screen sm:w-[500px] px-5 lg:px-0 lg:pr-[14px] bottom-[70px] lg:bottom-5 left-0 right-0 mx-auto z-20">
                    <Button theme="SuccessBuy" click={HandlerCheckOut}>Calcular Pago</Button>
                </div>
            }
        </main>
    )
}

export default Home
