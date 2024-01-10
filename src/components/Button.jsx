'use client';

export default function Button({ theme, styled, click, children, type }) {




    switch (theme) {
        case 'Loading':
            return <button
                type={type}
                className="text-white bg-gray-500 border border-gray-100  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-[16px] w-full px-2 py-3 text-center space-x-2 z-20"
                // className="text-white bg-violet-700 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
                // dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={click}
            >
                <svg className="inline-block h-6 w-6 animate-spin mr-5 stroke-white" viewBox="0 0 256 256"><line x1="128" y1="32" x2="128" y2="64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line><line x1="195.9" y1="60.1" x2="173.3" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line><line x1="224" y1="128" x2="192" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line><line x1="195.9" y1="195.9" x2="173.3" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line><line x1="128" y1="224" x2="128" y2="192" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line><line x1="60.1" y1="195.9" x2="82.7" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line><line x1="32" y1="128" x2="64" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line><line x1="60.1" y1="60.1" x2="82.7" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line></svg>
                En curso...
            </button>
            break
        case 'Transparent':
            return <button
                type={type}
                className={`text-gray-500 bg-transparent border border-gray-500  focus:outline-none focus:ring-blue-300 font-medium rounded-full text-[16px] w-full px-2 py-3 text-center z-20  ${styled}`}
                // className="text-white bg-violet-700 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
                // dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={click}
            >
                {children}
            </button>
            break
        case 'Primary':
            return <button
                type={type}
                className={`text-white bg-[#00095F] text-[16px] border border-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-[16px] w-full px-2 py-3 text-center z-20 ${styled}`}
                // className="text-white bg-violet-700 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
                // dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={click}
            >
                {children}
            </button>
            break
        case 'PrimaryPrint':
            return <button
                type={type}
                className="text-white bg-[#00095F] border border-gray-100  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-[16px] w-full px-2 py-3 text-center z-20"
                // className="text-white bg-violet-700 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
                // dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={click}
            >
                <svg className='inline mr-3 h-[18px] w-[18px]' viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 4H4V1C4 0.71667 4.096 0.479003 4.288 0.287003C4.48 0.0950034 4.71734 -0.000663206 5 3.46021e-06H15C15.2833 3.46021e-06 15.521 0.0960036 15.713 0.288004C15.905 0.480004 16.0007 0.717337 16 1V4ZM16 9.5C16.2833 9.5 16.521 9.404 16.713 9.212C16.905 9.02 17.0007 8.78267 17 8.5C17 8.21667 16.904 7.979 16.712 7.787C16.52 7.595 16.2827 7.49934 16 7.5C15.7167 7.5 15.479 7.596 15.287 7.788C15.095 7.98 14.9993 8.21734 15 8.5C15 8.78334 15.096 9.021 15.288 9.213C15.48 9.405 15.7173 9.50067 16 9.5ZM6 16H14V12H6V16ZM6 18C5.45 18 4.979 17.804 4.587 17.412C4.195 17.02 3.99934 16.5493 4 16V14H1C0.71667 14 0.479003 13.904 0.287003 13.712C0.0950034 13.52 -0.000663206 13.2827 3.46021e-06 13V8C3.46021e-06 7.15 0.29167 6.43734 0.875003 5.862C1.45834 5.28667 2.16667 4.99934 3 5H17C17.85 5 18.5627 5.28767 19.138 5.863C19.7133 6.43834 20.0007 7.15067 20 8V13C20 13.2833 19.904 13.521 19.712 13.713C19.52 13.905 19.2827 14.0007 19 14H16V16C16 16.55 15.804 17.021 15.412 17.413C15.02 17.805 14.5493 18.0007 14 18H6Z" fill="white" />
                </svg>
                {children}
            </button>
            break
        case 'Secondary':
            return <button
                type={type}
                className="text-white bg-black  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-[16px] w-full px-2 py-3 text-center z-20"
                // className="text-white bg-violet-700 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
                // dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={click}
            >
                {children}
            </button>

        case 'Success':
            return <button
                type={type}
                className="text-gray-950 bg-[#32CD32] font-medium focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-[16px] w-full px-2 py-3 text-center z-20"
                // className="text-white bg-violet-700 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
                // dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={click}
            >
                {children}
            </button>
        case 'SuccessBuy':
            return <button
                type={type}
                className="text-white font-bold flex justify-center items-center bg-[#00095F] focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-[18px] w-full px-2 py-2 text-center z-20"
                // className="text-white bg-violet-700 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
                // dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={click}
            >
                {/* <svg className='inline mr-3 h-[30px] w-[30px]' viewBox="0 0 41 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M35.875 29.1125V26.5H11.7875L13.325 23.8875L36.9 21.75L41 7.5H9.48125L7.6875 0.375H0V2.75H5.6375L11.0188 22.7L7.6875 28.875V32.4375C7.6875 34.3375 9.48125 36 11.5312 36C13.5813 36 15.375 34.3375 15.375 32.4375C15.375 30.5375 13.5813 28.875 11.5312 28.875H30.75V32.4375C30.75 34.3375 32.5437 36 34.5938 36C36.6438 36 38.4375 34.3375 38.4375 32.4375C38.4375 30.775 37.4125 29.5875 35.875 29.1125Z" fill="white" />
                </svg> */}
                <span className='inline-block mr-3 h-[35px] w-[35px]  border-4 border-double rounded-full text-[20px] text-white font-bold border-white'>$</span>
                {children}
            </button>
        case 'SuccessReceta':
            return <button
                type={type}
                className="text-gray-900 font-bold flex justify-center items-center border-[1px] border-white bg-[#32CD32]  focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-[18px] w-full min-w-[150px] px-2 py-2 text-center z-20"
                // className="text-white bg-violet-700 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
                // dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={click}
            >
                <svg className='inline mr-3 h-[35px] w-[35px]' viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.7273 5.45455H3.63636V3.63636H12.7273V5.45455ZM16.3636 13.1036V20H0V0H16.3636V3.26L21.2855 8.18182L16.3636 13.1036ZM16.4418 10.4545L14.0909 8.10364L10 12.1945V14.5455H12.3509L16.4418 10.4545ZM16.3636 5.83091L15.3764 6.81818L17.7273 9.16909L18.7145 8.18182L16.3636 5.83091ZM14.5455 14.9218L13.1036 16.3636H3.63636V14.5455H8.18182V12.7273H3.63636V10.9091H8.71455L10.5327 9.09091H3.63636V7.27273H12.3509L14.5455 5.07818V1.81818H1.81818V18.1818H14.5455V14.9218Z" fill="black" />
                </svg>
                {children}
            </button>
        case 'Danger':
            return <button
                type={type}
                className="text-white bg-red-500  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-[16px] w-full min-w-[150px] px-2 py-3 text-center z-20"
                // className="text-white bg-violet-700 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
                // dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={click}
            >
                {children}
            </button>
        case 'Disable':
            return <button
                type={type}
                className="text-white bg-gray-400  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-[16px] w-full px-2 py-3 text-center z-50"
                // className="text-white bg-violet-700 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
                // dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={click}
            >
                {children}
            </button>
        case 'MiniPrimary':
            return <button
                type={type}
                className="relative text-white bg-[#00095F] border border-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-full text-[25px] w-[45px] h-[45px] leading-[0px] block font-medium z-20"
                // className="text-white bg-violet-700 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
                // dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={click}
            >
                {children}
            </button>
            break
        case 'MiniPrimaryComprar':
            return <button
                type={type}
                className="relative text-white bg-[#00095F] border border-gray-100  focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-full text-[16px] w-full px-6 py-3  text-center font-bold z-20"
                // className="text-white bg-violet-700 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
                // dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={click}
            >
                {/* <svg className='inline mr-3 h-[18px] w-[18px]' viewBox="0 0 41 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M35.875 29.1125V26.5H11.7875L13.325 23.8875L36.9 21.75L41 7.5H9.48125L7.6875 0.375H0V2.75H5.6375L11.0188 22.7L7.6875 28.875V32.4375C7.6875 34.3375 9.48125 36 11.5312 36C13.5813 36 15.375 34.3375 15.375 32.4375C15.375 30.5375 13.5813 28.875 11.5312 28.875H30.75V32.4375C30.75 34.3375 32.5437 36 34.5938 36C36.6438 36 38.4375 34.3375 38.4375 32.4375C38.4375 30.775 37.4125 29.5875 35.875 29.1125Z" fill="white" />
                </svg> */}
                <svg className='inline mr-3' width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.2 16.2C16.2 17.199 15.399 18 14.4 18C13.9226 18 13.4648 17.8104 13.1272 17.4728C12.7896 17.1352 12.6 16.6774 12.6 16.2C12.6 15.201 13.401 14.4 14.4 14.4C14.8774 14.4 15.3352 14.5896 15.6728 14.9272C16.0104 15.2648 16.2 15.7226 16.2 16.2ZM5.4 14.4C4.401 14.4 3.6 15.201 3.6 16.2C3.6 16.6774 3.78964 17.1352 4.12721 17.4728C4.46477 17.8104 4.92261 18 5.4 18C6.399 18 7.2 17.199 7.2 16.2C7.2 15.201 6.399 14.4 5.4 14.4ZM5.58 11.367L5.553 11.475C5.553 11.601 5.652 11.7 5.778 11.7H16.2V13.5H5.4C4.92261 13.5 4.46477 13.3104 4.12721 12.9728C3.78964 12.6352 3.6 12.1774 3.6 11.7C3.6 11.385 3.681 11.088 3.816 10.836L5.04 8.631L1.8 1.8H0V0H2.943L3.789 1.8H17.1C17.595 1.8 18 2.205 18 2.7C18 2.853 17.955 3.006 17.892 3.15L14.67 8.973C14.364 9.522 13.77 9.9 13.095 9.9H6.39L5.58 11.367ZM6.75 8.1H8.1V6.3H5.904L6.75 8.1ZM9 6.3V8.1H11.7V6.3H9ZM11.7 5.4V3.6H9V5.4H11.7ZM14.499 6.3H12.6V8.1H13.5L14.499 6.3ZM16.002 3.6H12.6V5.4H15.003L16.002 3.6ZM4.626 3.6L5.472 5.4H8.1V3.6H4.626Z" fill="white" />
                </svg>
                {children}
            </button>
            break
        case 'MiniPrimaryInfo':
            return <button
                type={type}
                className="relative text-white bg-[#2a52BE] border border-gray-100  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-[16px] w-full px-2 py-2  text-center z-20"
                // className="text-white bg-violet-700 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
                // dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={click}
            >
                <svg className='inline mr-3 h-[20px] w-[20px]' viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.3 7.29C12.5 7.11 12.74 7 13 7C13.27 7 13.5 7.11 13.71 7.29C13.9 7.5 14 7.74 14 8C14 8.27 13.9 8.5 13.71 8.71C13.5 8.9 13.27 9 13 9C12.74 9 12.5 8.9 12.3 8.71C12.11 8.5 12 8.27 12 8C12 7.74 12.11 7.5 12.3 7.29ZM9.8 11.97C9.8 11.97 11.97 10.25 12.76 10.18C13.5 10.12 13.35 10.97 13.28 11.41L13.27 11.47C13.13 12 12.96 12.64 12.79 13.25C12.41 14.64 12.04 16 12.13 16.25C12.23 16.59 12.85 16.16 13.3 15.86C13.36 15.82 13.41 15.78 13.46 15.75C13.46 15.75 13.54 15.67 13.62 15.78C13.64 15.81 13.66 15.84 13.68 15.86C13.77 16 13.82 16.05 13.7 16.13L13.66 16.15C13.44 16.3 12.5 16.96 12.12 17.2C11.71 17.47 10.14 18.37 10.38 16.62C10.59 15.39 10.87 14.33 11.09 13.5C11.5 12 11.68 11.32 10.76 11.91C10.39 12.13 10.17 12.27 10.04 12.36C9.93 12.44 9.92 12.44 9.85 12.31L9.82 12.25L9.77 12.17C9.7 12.07 9.7 12.06 9.8 11.97ZM22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12ZM20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12Z" fill="white" />
                </svg>
                {children}
            </button>
            break
        case 'MiniSecondary':
            return <button
                type={type}
                className="relative text-white  bg-black border border-gray-100  focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-full text-[25px] p-0 w-[45px] h-[45px] block text-center font-medium z-20"
                // className="text-white bg-violet-700 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
                // dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={click}
            >
                {children}
            </button>

        case 'MiniSuccess':
            return <button
                type={type}
                className="relative text-white bg-[#32CD32] border border-gray-100  focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-full text-[16px] text-[25px] p-0 w-[45px] h-[45px] text-center font-medium z-20"
                // className="text-white bg-violet-700 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
                // dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={click}
            >
                {children}
            </button>
        case 'MiniSuccessRecetar':
            return <button
                type={type}
                className="text-gray-950 bg-[#32CD32] flex items-center justify-center focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-full text-[16px] w-full px-6 py-3  text-center z-20"
                // className="text-white bg-violet-700 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
                // dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={click}
            >

                <svg className='inline mr-3 h-[20px] w-[20px]' viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.7273 5.45455H3.63636V3.63636H12.7273V5.45455ZM16.3636 13.1036V20H0V0H16.3636V3.26L21.2855 8.18182L16.3636 13.1036ZM16.4418 10.4545L14.0909 8.10364L10 12.1945V14.5455H12.3509L16.4418 10.4545ZM16.3636 5.83091L15.3764 6.81818L17.7273 9.16909L18.7145 8.18182L16.3636 5.83091ZM14.5455 14.9218L13.1036 16.3636H3.63636V14.5455H8.18182V12.7273H3.63636V10.9091H8.71455L10.5327 9.09091H3.63636V7.27273H12.3509L14.5455 5.07818V1.81818H1.81818V18.1818H14.5455V14.9218Z" fill="black" />
                </svg>

                {/* <svg className='inline mr-3 h-[17px] w-[17px]' viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 0C6.46957 0 5.96086 0.210714 5.58579 0.585786C5.21071 0.960859 5 1.46957 5 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V16C16.5304 16 17.0391 15.7893 17.4142 15.4142C17.7893 15.0391 18 14.5304 18 14V2C18 1.46957 17.7893 0.960859 17.4142 0.585786C17.0391 0.210714 16.5304 0 16 0L7 0Z" fill="white" />
                    <path d="M13 20C13.5304 20 14.0391 19.7893 14.4142 19.4142C14.7893 19.0391 15 18.5304 15 18V5C15 4.46957 14.7893 3.96086 14.4142 3.58579C14.0391 3.21071 13.5304 3 13 3H4C3.46957 3 2.96086 3.21071 2.58579 3.58579C2.21071 3.96086 2 4.46957 2 5V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H13ZM9 5H13V10H9V5ZM4 5H8V6H4V5ZM4 7H8V8H4V7ZM4 9H8V10H4V9ZM4 11H13V12H4V11ZM4 13H13V14H4V13ZM4 15H13V16H4V15Z" fill="white" />
                </svg> */}
                {children}
            </button>
        default:

    }
}

