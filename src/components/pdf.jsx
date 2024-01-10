import React from "react";
import ReactPDF, {
    Page,
    Text,
    View,
    Image,
    Document,
    StyleSheet,
    Font
} from "@react-pdf/renderer";
// import roboto300 from '@/roboto/roboto-v30-latin-300.woff2';
import { useState, useRef, useEffect } from 'react'
import { PDFDownloadLink } from "@react-pdf/renderer";
import Button from "@/components/Button";
Font.register({
    family: "Inter",
    fonts: [
        { src: "/roboto/roboto-v30-latin-300.ttf", fontWeight: 'light' },
        { src: "/roboto/roboto-v30-latin-300italic.ttf", fontStyle: 'italic' },
        { src: "/roboto/roboto-v30-latin-500.ttf", fontWeight: 'bold' },
        { src: "/roboto/roboto-v30-latin-500italic.ttf", fontStyle: 'italic', fontWeight: 'bold' },

    ]
})


const styles = StyleSheet.create({

    text: {
        textAlign: 'center',
        paddingVertical: '1px',
        margin: 0,
        fontSize: '5px',
        fontFamily: 'Inter',
        fontWeight: 'light',


    },
    textItalic: {
        textAlign: 'center',
        paddingVertical: '1px',
        margin: 0,
        fontSize: '5px',
        fontFamily: 'Inter',
        fontStyle: 'italic'
    },
    textBold: {
        paddingVertical: '1px',
        margin: 0,
        textAlign: 'center',
        fontSize: '5px',
        fontFamily: 'Inter',
        fontWeight: 'bold',
    },
    key: {
        padding: 0,
        margin: 0,
        fontSize: '5px',
        fontFamily: 'Inter',
        fontStyle: 'italic',
        fontWeight: 'bold'
    },
    value: {
        textAlign: 'center',
        padding: 0,
        margin: 0,
        fontSize: '5px',
        fontFamily: 'Inter',
        fontWeight: 'light'
    },
    table: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',

    },
    row: {
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        fontSize: '10px',
        paddingBottom: '3px',
    },

    celda: {
        textAlign: 'center',
        width: '100%',
        fontSize: '5px',
    },
    celda1: {
        textAlign: 'center',
        width: '140px',
        fontSize: '5px',
    },

    celda4: {
        textAlign: 'center',
        width: '150px',
        fontSize: '5px',
    },
    celda5: {
        textAlign: 'center',
        width: '100px',
        fontSize: '5px',
    },

    celdaWhite: {
        textAlign: 'center',
        width: '100%',
        fontSize: '5px',
    },

})


const PDF = ({ i }) => {
    const [isCliente, setisCliente] = useState(false);
    const Br = () => {
        return <View style={{ height: '8px' }}></View>
    }
    useEffect(() => {
        setisCliente(true)
    }, []);
    return (
        <div className="min-w-full height-[30px]">
            {isCliente && <PDFDownloadLink document={
                <Document >
                    <Page size={227} style={{ boxSizing: 'border-box', padding: '5mm', position: 'relative' }}>
                        <View>
                            <Image src="/logo.png" style={{ position: 'relative', right: '0', left: '0', marginHorizontal: 'auto', paddingBottom: '5px', height: '40px', width: '100px' }} />
                            {/* <Text style={styles.textBold}>COMPROBANTE IMPRESO</Text> */}
                            {/* <Text style={styles.text}>{i['sucursal']}</Text> */}
                            <Text style={styles.textBold}>COMPROBANTE DE ENTREGA {i['sucursal']}</Text>
                            <Text style={{ ...styles.textBold, fontSize: '10px' }}>{i['code']}</Text>
                            {/* <Text style={styles.text}>{i['code']}</Text> */}
                            <Text style={styles.textItalic}>CONTACTOS 61278192 - 79588684</Text>
                            <Text style={{ ...styles.key, textAlign: 'center', }}>LA PAZ - BOLIVIA</Text>
                            <Br />
                            <Text style={styles.textRight}>
                                <Text style={styles.key}>Fecha de entrega: </Text><Text style={styles.value}>{i['fecha entrega']}</Text>
                            </Text>
                            <Text style={styles.textRight}>
                                <Text style={styles.key}>Nombre del receptor: </Text><Text style={styles.value}>{i['nombre receptor']}</Text>
                            </Text>
                            <Text style={styles.textRight}>
                                <Text style={styles.key}>Celular del receptor: </Text><Text style={styles.value}>{i['whatsapp receptor']}</Text>
                            </Text>
                            <Text style={styles.textRight}>
                                <Text style={styles.key}>CI del receptor: </Text><Text style={styles.value}>{i['CI receptor']}</Text>
                            </Text>
                            <Br />
                            <View style={styles.row}>
                                <Text style={styles.celda1}>CANTIDAD</Text>
                                <Text style={styles.celda}>DETALLE</Text>
                                <Text style={styles.celda}>OBSERVACIONES</Text>
                                <Text style={styles.celda4}>{'PRECIO\nUNIDAD+\nADICIONAL'}</Text>
                                <Text style={styles.celda5}>{'SUB\nTOTAL'}</Text>
                            </View>

                            {Object.values(i.servicios).map((el, index) => <li key={index}>
                                <View style={styles.row}>
                                    <Text style={{ ...styles.celda1, ...styles.text }}>{el['cantidad']}</Text>
                                    <Text style={{ ...styles.celda, ...styles.text }}>{el['nombre 1']}</Text>
                                    <Text style={{ ...styles.celda, ...styles.text }}>{el['observacion']}</Text>
                                    <Text style={{ ...styles.celda4, ...styles.text }}>{el['costo']} BS {(el['adicional'] ? `(${el['adicional']} BS)` : '')}</Text>
                                    <Text style={{ ...styles.celda5, ...styles.text }}>{(el['costo'] * el['cantidad']) + (el['adicional'] ? el['adicional'] * el['cantidad'] : 0)} BS</Text>
                                </View>
                            </li>)}
                            <Br />
                            <View style={styles.row}>
                                <Text style={styles.celdaWhite}></Text>
                                <Text style={styles.celdaWhite}></Text>
                                <Text style={styles.celdaWhite}></Text>
                                <Text style={styles.celda}>TOTAL</Text>
                                <Text style={styles.celda}>{
                                    Object.values(i.servicios).reduce((acc, i, index) => {
                                        const sum = i['costo'] * i['cantidad']
                                        const sum2 = i.adicional && i.adicional !== undefined ? i['adicional'] * i['cantidad'] : 0
                                        return sum + sum2 + acc
                                    }, 0)
                                } BS
                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.celdaWhite}></Text>
                                <Text style={styles.celdaWhite}></Text>
                                <Text style={styles.celdaWhite}></Text>
                                <Text style={styles.celda}>AC</Text>
                                <Text style={styles.celda}>{
                                    i['ac']
                                } BS
                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.celdaWhite}></Text>
                                <Text style={styles.celdaWhite}></Text>
                                <Text style={styles.celdaWhite}></Text>
                                <Text style={{ ...styles.celda, backgroundColor: 'yellow' }}>SALDO</Text>
                                <Text style={{ ...styles.celda, backgroundColor: 'yellow' }}>{
                                    i['saldo']
                                } BS
                                </Text>
                            </View>
                            <Br />
                            <Br />
                            <Br />
                            <Br />
                            <Text style={{ ...styles.key, textAlign: 'center' }}>!GRACIAS POR SU PREFERENCÍA!</Text>
                        </View>
                    </Page>
                </Document>
            }
                fileName={`Comprobante_${i.code}`}>
                {({ blob, url, loading, error }) =>
                    <Button type="button" theme='PrimaryPrint'>Imprimir Comprobante</Button>
                }
            </PDFDownloadLink>}
        </div>
    );
};

export default PDF





















// import React from "react";
// import ReactPDF, {
//     Page,
//     Text,
//     View,
//     Image,
//     Document,
//     StyleSheet,
//     Font
// } from "@react-pdf/renderer";
// import { useState, useRef, useEffect } from 'react'
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import Button from "@/components/Button";

// Font.register({ family: "Inter", src: "/assets/font.otf" })

// const styles = StyleSheet.create({

//     text: {
//         textAlign: 'center',
//         padding: 0,
//         margin: 0,
//         fontSize: '10px',
//     },
//     textBold: {
//         padding: 0,
//         margin: 0,
//         fontWeight: 800,
//         textAlign: 'center',
//         fontSize: '10px',
//     },
//     textRight: {
//         padding: 0,
//         margin: 0,
//         fontSize: '10px',
//     },
//     table: {
//         display: 'flex',
//         flexDirection: 'column',
//         width: '100%',
//         border: '1px solid black',
//     },
//     row: {
//         position: 'relative',
//         width: '100%',
//         height:'20px',
//         display: 'flex',
//         flexDirection: 'row',
//         fontSize: '10px',
//         paddingBottom: '10px',
//         borderBottom: '1px solid #00000090',
//     },
//     celda: {
//         textAlign: 'center',
//         width: '100%',
//         border: '1px solid black',
//         fontSize: '10px',
//     },
//     celdaWhite: {
//         textAlign: 'center',
//         width: '100%',
//         fontSize: '10px',
//     },

// })





// const PDF = ({ i }) => {
//     const [isCliente, setisCliente] = useState(false);

//     const Br = () => {
//         return <View style={{ height: '8px' }}></View>
//     }

//     useEffect(() => {
//         setisCliente(true)
//     }, []);
//     return (
//         <div className="min-w-full height-[30px]">
//             {isCliente && <PDFDownloadLink document={
//                 <Document >
//                     <Page size="A4" style={{ boxSizing: 'border-box', padding: '2cm', position: 'relative' }}>
//                         <Image src="/logo.png" style={{ position: 'absolute', top: '1cm', left: '2cm', height: '40px', width: '100px' }} />
//                         <Text style={styles.textBold}>COMPROBANTE DE ENTREGA {i['sucursal']}</Text>
//                         <Text style={styles.text}>CONTACTOS 61278192 - 79588684</Text>
//                         <Text style={styles.text}>LA PAZ - BOLIVIA</Text>
//                         <Br />
//                         <Text style={styles.textRight}>FECHA Y HORA DE RECEPCIÓN: {i['fecha']}</Text>
//                         <Text style={styles.textRight}>FECHA DE ENTREGA: {i['fecha entrega']}</Text>
//                         <Text style={styles.textRight}>NOMBRE DEL CLIENTE: {i['nombre']}</Text>
//                         <Text style={styles.textRight}>NOMBRE DE RECEPTOR: {i['nombre receptor']}</Text>
//                         <Text style={styles.textRight}>CELULAR DE RECEPTOR: {i['whatsapp receptor']}</Text>
//                         <Text style={styles.textRight}>CI DE RECEPTOR: {i['CI receptor']}</Text>
//                         <Br />
//                         <View style={styles.row}>
//                             <Text style={styles.celda}>CANTIDAD</Text>
//                             <Text style={styles.celda}>DETALLE</Text>
//                             <Text style={styles.celda}>OBSERVACIONES</Text>
//                             <Text style={styles.celda}>PRECIO POR UNIDAD</Text>
//                             <Text style={styles.celda}>SUB TOTAL</Text>
//                         </View>

//                         {Object.values(i.servicios).map((el, index) => <li key={index}>
//                             <View style={styles.row}>
//                                 <Text style={styles.celda}>{el['cantidad']}</Text>
//                                 <Text style={styles.celda}>{el['nombre 1']}</Text>
//                                 <Text style={styles.celda}>{el['observacion']}</Text>
//                                 <Text style={styles.celda}>{el['costo']}{(el['adicional'] ? `(${el['adicional'] * el['cantidad']} BS)` : '')}</Text>
//                                 <Text style={styles.celda}>{(el['costo'] * el['cantidad']) + (el['adicional'] ? el['adicional'] * el['cantidad'] : 0)} BS</Text>
//                             </View>
//                         </li>)}
//                         <Br />
//                         <View style={styles.row}>
//                             <Text style={styles.celdaWhite}></Text>
//                             <Text style={styles.celdaWhite}></Text>
//                             <Text style={styles.celdaWhite}></Text>
//                             <Text style={styles.celda}>TOTAL</Text>
//                             <Text style={styles.celda}>{
//                                 Object.values(i.servicios).reduce((acc, i, index) => {
//                                     const sum = i['costo'] * i['cantidad']
//                                     const sum2 = i.adicional && i.adicional !== undefined ? i['adicional'] * i['cantidad'] : 0
//                                     return sum + sum2 + acc
//                                 }, 0)
//                             } BS
//                             </Text>
//                         </View>
//                         <View style={styles.row}>
//                             <Text style={styles.celdaWhite}></Text>
//                             <Text style={styles.celdaWhite}></Text>
//                             <Text style={styles.celdaWhite}></Text>
//                             <Text style={styles.celda}>AC</Text>
//                             <Text style={styles.celda}>{
//                                 i['ac']
//                             } BS
//                             </Text>
//                         </View>
//                         <View style={styles.row}>
//                             <Text style={styles.celdaWhite}></Text>
//                             <Text style={styles.celdaWhite}></Text>
//                             <Text style={styles.celdaWhite}></Text>
//                             <Text style={{ ...styles.celda, backgroundColor: 'yellow' }}>SALDO</Text>
//                             <Text style={{ ...styles.celda, backgroundColor: 'yellow' }}>{
//                                 i['saldo']
//                             } BS
//                             </Text>
//                         </View>
//                         <Br />

//                         <Text style={styles.text}>!GRACIAS POR SU PREFERENCÍA!</Text>
//                         <Text style={styles.text}>SERVIRLES ES UN PLACER</Text>
//                     </Page>
//                 </Document>
//             }
//                 fileName={i['code']}>
//                 {({ blob, url, loading, error }) =>
//                     <Button type="button" theme='PrimaryPrint'>PDF</Button>
//                 }
//             </PDFDownloadLink>}
//         </div>
//     );
// };

// export default PDF
