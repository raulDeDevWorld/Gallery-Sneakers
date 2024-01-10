'use client'
import { useUser } from '@/context'
import { writeUserData, readUserData } from '@/firebase/database'
import LoaderWithLogo from '@/components/LoaderWithLogo'

import { useEffect } from 'react'
import { onAuth, handleSignOut } from '@/firebase/utils'
import { useRouter } from 'next/navigation';
import Cart from '@/components/Cart'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import BottomNavigation from '@/components/BottomNavigation'
import Navbar from '@/components/Navbar'
import Modal from '@/components/Modal'
import { useReactPath } from '@/HOCs/useReactPath'

function Home({ children }) {
  const { user, userDB, setUserProfile, setUserCart, businessData, setUserProduct, setRecetaDB, precioJustoPDB, setPrecioJustoPDB, whatsapp, setUserData, filter, setFilter, nav, setNav, modal, setModal, cart, introClientVideo, setIntroClientVideo, pendienteDB, setPendienteDB, productDB, search, setSearch, videoClientRef, setFilterQR, webScann, setWebScann, setTienda, setBusinessData, servicios, setServicios, perfil, setPerfil, clientes, setClientes } = useUser()
  const router = useRouter()
  const pathname = usePathname()
  const path = useReactPath();


  const handlerFilter = (e) => {
    const data = e.target.value
    data.length > 0 ? setSearch(true) : setSearch(false)
    setFilter(data)
    setFilterQR('')
  }
  const back = () => {
    router.back()
  }
  function openNav(e) {
    e.preventDefault()
    e.stopPropagation()
    setNav(!nav)
  }

  const signOutConfirm = async () => {
    handleSignOut()
    setUserProfile(null)
    setUserCart({})
    setUserProduct(undefined),
      setRecetaDB(undefined),
      setUserData(undefined)
    setModal('')
    return router.push('/Login')
  }

  function sortArray(x, y) {
    if (x['nombre de producto 1'].toLowerCase() < y['nombre de producto 1'].toLowerCase()) { return -1 }
    if (x['nombre de producto 1'].toLowerCase() > y['nombre de producto 1'].toLowerCase()) { return 1 }
    return 0
  }
  function handlerSearchFilter(data) {
    setFilter(data)
    setSearch(false)
  }

  const soporte = () => {
    businessData && window.open(`https://api.whatsapp.com/send?phone=+59169941749&text=hola%20necesito%20un%20implante%20de%20osteosintesis%20y%20mi%20cuenta%20esta%20bloqueada%20¿Pueden%20ayudarme?%20`, '_blank')
    setNav(false)
    // setWhatsapp(!whatsapp)
  }

  useEffect(() => {
    if (user === undefined) onAuth(setUserProfile, setUserData)
    if (user === null) router.push('/Login')
    if (clientes === undefined) readUserData('usuarios', setClientes)
    if (servicios === undefined) readUserData('servicios', setServicios)
    if (perfil === undefined) readUserData('perfil', setPerfil)
  }, [user, clientes, servicios, perfil, path])

  return (

    <div >

      {user && perfil !== undefined

        ? <div className="h-screen bg-gray-white">
          {userDB && userDB.bloqueado === true ? <Modal funcion={soporte} close={true} cancel={signOutConfirm} cancelText="Cerrar sesión" successText="Contactar">
            Esta cuenta esta bloqueada, <br />por favor comuniquese con soporte.
            <br />
            {/* <button type="button" onClick={soporte} className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg  inline-flex items-center px-5 py-4 text-center">
              Contactar
            </button> */}
          </Modal> : ''}
          {modal == 'SignOut' && <Modal funcion={signOutConfirm}>
            Estas seguro de salir...? <br /> {Object.keys(cart).length > 0 && 'Tus compras no han sido efectuadas'}
          </Modal>}
          {modal == 'Exit' && <Modal funcion={signOutConfirm}>
            Estas seguro de salir...? <br /> {Object.keys(cart).length > 0 && 'Tus compras no han sido efectuadas'}
          </Modal>}
          {modal == 'VerificaM' && <Modal funcion={() => { router.push(`/${userDB.rol}`); setModal('') }}>
            Completa tu perfil para hacer tu primera receta.
          </Modal>}
          <div className={`fixed top-0 w-[220px] lg:w-[280px] shadow-xl  h-screen bg-white transition-all	z-40  ${nav ? 'left-0  ' : 'left-[-220px] lg:left-[-280px] '} z-50`} >
            <div className="py-0 overflow-y-auto ">
              {userDB && userDB !== undefined && perfil !== undefined && <Navbar rol={userDB.rol} />}
            </div>
          </div>

          {nav && <div className='fixed top-0 left-0 w-screen h-screen bg-[#00000000] z-40' onClick={() => setNav(false)}></div>}
          {whatsapp && <div className='fixed top-0 left-0 w-screen h-screen bg-[#ffffff00] z-40' onClick={handlerWhatsapp}></div>}
          {search && <div className='fixed top-0 left-0 w-screen h-screen bg-[#ffffff00] z-40' onClick={() => setSearch(false)}></div>}

          <main className={`relative w-screen min-w-screen  lg:pb-0  lg:min-w-auto my-[0px] bg-white lg:min-h-screen  ${nav ? 'w-screen pl-[220px] lg:pl-[280px] ' : '  lg:px-[0px]'}`} onClick={() => setNav(false)} style={{ transition: 'all 0.5' }} >
            <nav className="w-screen fixed top-0 border-b border-gray-200 shadow-sm  flex items-center justify-between bg-[#00E2FF]  p-4 h-[70px] z-30" onClick={() => setNav(false)}>

              <div
                className='absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center'
                style={{
                  backgroundImage: 'url(/bg.jpeg)',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  //  background: 'linear-gradient(0deg, #ffffff 50%, #00E2FF 50%)' 
                  backgroundColor: '#00E2FF'
                }}></div>
              <div
                className='absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center'
                style={{
                  background: ' #00E2FF80 50%'
                  //  background: 'linear-gradient(0deg, #ffffff80 50%, #00E2FF80 50%)' 
                }}>
              </div>

              {pathname === '/' && (!location.href.includes('#') || location.href === 'http://localhost:3000/#' || location.href === 'https://app.lavavelox.com/#') ?
                <div className='flex lg:block z-10'>
                  <div className='flex '>
                    <button type="button" className="inline-flex items-center bg-white p-[2px] text-[14px] text-white rounded-lg  lg:block" onClick={openNav}>
                      <svg className="w-9 h-9 text-white" aria-hidden="true" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="#00E2FF" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"  ></path></svg>
                    </button>
                    <h1 className='text-[18px] hidden lg:flex lg:justify-between ml-5 lg:w-[240px] lg:items-center text-white font-medium'> <img src="/logo.png" className='h-[50px]' alt="" /> </h1>
                  </div>
                </div>
                :
                <button type="button" className="inline-flex items-center p-2 text-[14px] text-white rounded-lg   z-10" onClick={() => back(!nav)}>
                  <svg width="19" height="34" viewBox="0 0 19 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 32L2 17L17 2" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>}
              {pathname === '/' && !location.href.includes('#') && <div className="relative  md:block lg:min-w-[500px]  z-10">
                <div className="absolute inset-y-0 right-[5px] flex items-center py-3 z-50 ">
                  <svg className="w-8 h-8  bg-transparent " aria-hidden="true" fill="text-gray-100" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="#00E2FF" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                  <span className="sr-only">Search icon</span>
                </div>
                <input type="text" id="search-navbar" onChange={handlerFilter} className="block w-full bg-white rounded-full lg:min-w-[400px] p-2 pl-10 text-[14px] text-gray-950 text-center border-b border-gray-300  bg-transparent focus:ring-white focus:border-white focus:outline-transparent" defaultValue={filter} placeholder="Buscar servicio..." />
              </div>}
              {location.href.includes('#') && <div className="relative hidden md:block lg:min-w-[500px]  z-10">
                <div className="absolute inset-y-0 right-[5px] flex items-center py-3 z-50 ">
                  <svg className="w-8 h-8  bg-transparent " aria-hidden="true" fill="text-gray-100" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="#00E2FF" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                  <span className="sr-only">Search icon</span>
                </div>
                <input type="text" id="search-navbar" onChange={handlerFilter} className="block w-full bg-white rounded-full lg:min-w-[400px] p-2 pl-10 text-[14px] text-gray-950 text-center border-b border-gray-300  bg-transparent focus:ring-white focus:border-white focus:outline-transparent" defaultValue={filter} placeholder="Buscar servicio..." />
              </div>}
              {userDB && userDB !== undefined && userDB.rol !== 'Distribuidor' && pathname === '/' && <Cart />}
            </nav>

            {
              search
              && filter.length > 0
              && precioJustoPDB !== null
              && precioJustoPDB !== undefined && <div className='w-[100vw] max-w-[800px] fixed top-[70px] left-0 right-0 mx-auto border-[2px] border-white max-h-[40vh] overflow-y-auto z-50 bg-white'>
                {search
                  && filter.length > 0
                  && precioJustoPDB !== null
                  && precioJustoPDB !== undefined
                  && precioJustoPDB.filter((obj, index) => index === precioJustoPDB.findIndex(o => obj['nombre de producto 1'] === o['nombre de producto 1'])).sort(sortArray).filter((i, index) => {
                    if (i['nombre de producto 1'].toLowerCase().includes(filter.toLowerCase())) { return i }
                    if (i['nombre de producto 2'] && i['nombre de producto 2'].toLowerCase().includes(filter.toLowerCase())) { return i }
                    if (i['nombre de producto 3'] && i['nombre de producto 3'].toLowerCase().includes(filter.toLowerCase())) { return i }
                  }
                  ).map((i, index) => <div className={`w-full text-[14px] px-5 py-2  z-10 ${(index + 1) % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`} style={{ display: 'grid', gridTemplateColumns: '30px auto', }} onClick={() => handlerSearchFilter(i['nombre de producto 1'])}>
                    <svg className="w-8 h-8 text-white " aria-hidden="true" fill="text-gray-100" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="#00E2FF" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    <div className='pl-5'>{i['nombre de producto 1'] && i['nombre de producto 1']}</div>
                  </div>)}
              </div>
            }
            <div className="lg:px-[50px] pt-[85px] pb-[10px] md:pt-[85px] md:pb-5 h-screen w-full overflow-y-auto">
              {children}
            </div>

            {userDB && userDB !== undefined && perfil !== undefined && <div className="fixed bottom-0  z-30 w-full h-[65px] bg-[#00E2FF] rounded-t-[40px] border-t-[1px] border-gray-50  lg:hidden">
              <div
                className='absolute top-0 w-full h-full flex flex-col justify-center items-center rounded-t-[40px] '
                style={{
                  backgroundImage: 'url(/bg.jpeg)',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center bottom',
                  //  background: 'linear-gradient(0deg, #ffffff 50%, #00E2FF 50%)' 
                  backgroundColor: '#00E2FF'
                }}></div>
              <div
                className='absolute bottom-0 w-full h-full flex flex-col justify-center items-center rounded-t-[40px] '
                style={{
                  background: ' #00E2FF80 50%'
                  //  background: 'linear-gradient(0deg, #ffffff80 50%, #00E2FF80 50%)' 
                }}>
              </div>
              <BottomNavigation rol={userDB.rol} />
            </div>}

          </main>
        </div>

        : <LoaderWithLogo></LoaderWithLogo>
      }

    </div>

  )
}






export default Home





{/* {pathname !== '/' && <div className='flex  hidden lg:block'>
                <div className='flex '>
                  <button type="button" className="inline-flex items-center bg-white p-[2px] text-[14px] text-white rounded-lg lg:block" onClick={openNav}>
                    <svg className="w-9 h-9 text-white" aria-hidden="true" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="#00E2FF" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"  ></path></svg>
                  </button>
                  <h1 className='text-[18px] hidden lg:flex lg:justify-between ml-5 lg:w-[240px] lg:items-center text-white font-medium'> <img src="/logo.png" className='h-[50px]' alt="" /> </h1>
                </div>
              </div>} */}





