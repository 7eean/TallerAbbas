// FormularioPresupuesto.js
import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; 
import { Link } from "react-router-dom";
import logo from '../utils/Logo.png'; 
import ubi from '../utils/ubi.png';
import inicio from '../utils/inicio.png';


const FormularioPresupuesto = () => {
  const [cliente, setCliente] = useState('');
  const [precio, setPrecio] = useState('');
  const [fecha, setFecha] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [anio, setAnio] = useState('');
  const [dominio, setDominio] = useState('');
  const [manodeobra, setManodeobra] = useState('');
  const [repuestos, setRepuestos] = useState('');

  const generarPDF = () => {
    const doc = new jsPDF();

    // Añadir logo (debe estar en la carpeta 'public')
    doc.addImage(logo, 'PNG', 10, 5, 60, 60); // (src, tipo, x, y, ancho, alto)

    // Título del PDF
    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    doc.text('Presupuesto', 142, 23);

    doc.setFontSize(15);
    doc.setFont("helvetica", "italic");
    doc.text('Alianza 698 - CP 1702', 145, 35);
    doc.text('Contacto: 1134900722', 145, 45);
    doc.text('Cuit: 23-33203404-9', 145, 55);
    doc.text('Email: Ignacio.abbas@hotmail.com', 115, 65);
    
    doc.text('____________________________________________________________', 20, 75);

    // Añadir detalles del presupuesto
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Cliente: ${cliente}`, 20, 90);
    doc.setLineDashPattern([1, 1], 0);// Línea punteada
    doc.line(35, 91, 95, 91);// Línea punteada
    doc.text(`Fecha: ${fecha}`, 20, 100);
    doc.setLineDashPattern([1, 1], 0);// Línea punteada
    doc.line(35, 101, 65, 101);// Línea punteada
    doc.text(`Modelo: ${modelo}`, 70, 100);
    doc.setLineDashPattern([1, 1], 0);// Línea punteada
    doc.line(85, 101, 120, 101);// Línea punteada
    doc.text(`Año: ${anio}`,125 ,100);
    doc.setLineDashPattern([1, 1], 0);// Línea punteada
    doc.line(135, 101, 145, 101);// Línea punteada
    doc.text(`Dominio: ${dominio}`, 150 ,100);
    doc.setLineDashPattern([1, 1], 0);// Línea punteada
    doc.line(170, 101, 190, 101);// Línea punteada
    doc.text(`Marca: ${marca}`, 97.5, 90);
    doc.setLineDashPattern([1, 1], 0);// Línea punteada
    doc.line(112, 91, 190, 91);// Línea punteada

    doc.text('__________________________________________________________________________', 20, 113);
       // Primero, colocamos "Mano de obra" antes de la tabla de repuestos
    // doc.text(`Mano de obra - Chapa y Pintura: ${manodeobra}`, 20, 125); 
    // doc.setLineDashPattern([1, 1], 1); // Línea punteada
    // doc.line(82, 126, 195, 126); // Línea punteada

       doc.autoTable({
        startY: 125, // Aquí comenzamos la tabla después de la mano de obra
        head: [['Mano de obra - Chapa y Pintura: ']],
        body: [[manodeobra]],
        styles: {
          fontSize: 14,
          halign: 'left',
          cellPadding: 2,
          
        },
        headStyles: {
         fillColor:[2, 157, 166],
        },
        margin: { left: 20, right: 20 },
      });
  
   
       // Luego, generamos la tabla de repuestos
       doc.autoTable({
         startY: 155,//Aquí comenzamos la tabla después de la mano de obra
         head: [['Repuestos a reemplazar:']],
         body: [[repuestos]],
         styles: {
           fontSize: 14,
           halign: 'left',
           cellPadding: 2,
           
         },
         headStyles: {
          fillColor:[2, 157, 166],
         },
         margin: { left: 20, right: 20 },
       });
   
  doc.text('_________________________________________________________________________', 20, doc.autoTable.previous.finalY + 7);
  // Precio
  doc.text(`Total: $ ${precio}`, 20, doc.autoTable.previous.finalY + 25);

  // Firma y sello
  doc.text('Firma y sello: ____________________', 120, doc.autoTable.previous.finalY + 25);
  
  doc.setFontSize(10);
  doc.text('Una vez recibido, el presupuesto tiene una válidez de 15 días. Pasado ese tiempo los valores podrán ',20, doc.autoTable.previous.finalY + 42);
  doc.text('sufrir modificaciones sin previo aviso.', 20, doc.autoTable.previous.finalY + 48);
  
    // Descargar el PDF
    doc.save('presupuesto.pdf');
  };

  return (
    <div style={{backgroundColor: 'white', width:'100%', height:'100%', fontFamily: 'cabin'}}>
        <nav style={{textDecoration: 'none', display: 'flex', alignItems:'center', justifyContent: 'space-evenly', paddingTop: '15px'}}>
        <Link to="/">
        <img style={{width: '200px', paddingRight:'120px'}} src={logo} alt="Logo Taller Abbas"  />
        </Link>
          <Link style={{textDecoration: 'none', color:'black', fontSize: '25px', marginLeft:'-40px'}} to="/"> <img src={inicio} style={{width:'20px', marginRight:'5px'}}></img>Inicio</Link>
        </nav>
        
      <div style={{textDecoration: 'none', display: 'flex', alignItems:'center', justifyContent: 'center', marginBottom:'40px'}} >
        <form style={{display:'flex', flexDirection:'column', backgroundColor:'#ffff', borderRadius:'20px' }} >
          <div>
          <h2 style={{fontSize: '35px', color:'#029ea6', display: 'flex', alignItems: 'center',}}>Formulario de Presupuesto</h2>
            <label> </label>
            <div style={{display:'flex', justifyContent:'center'}}>
            <input style={{color:'#029ea6', fontSize:'20px', borderRadius:'10px', width: '300px'}}
              placeholder="Cliente: "
              type="text"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
            />
            </div>
          </div>
          <div style={{margin:'5px', display:'flex', justifyContent:'center',}}>
            <label></label>
            <input style={{color:'#029ea6', fontSize:'20px', display:'flex', justifyContent:'center', borderRadius:'10px', width: '300px'}}
              placeholder="Fecha"
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>
          <div style={{margin:'5px', display:'flex', justifyContent:'center'}}>
            <label></label>
            <textarea style={{color:'#029ea6', fontSize:'20px', display:'flex', justifyContent:'center', borderRadius:'10px', width: '300px'}}
              placeholder="Marca: "
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
            />
          </div>
          <div style={{margin:'5px', display:'flex', justifyContent:'center'}}>
            <label></label>
            <textarea style={{color:'#029ea6', fontSize:'20px', display:'flex', justifyContent:'center', borderRadius:'10px', width: '300px'}}
              placeholder='Modelo: '
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
            />
          </div>
          <div style={{margin:'5px', display:'flex', justifyContent:'center'}}>
            <label></label>
            <textarea style={{color:'#029ea6', fontSize:'20px', display:'flex', justifyContent:'center', borderRadius:'10px', width: '300px'}}
              placeholder='Año: '
              value={anio}
              onChange={(e) => setAnio(e.target.value)}
            />
          </div>
          <div style={{margin:'5px', display:'flex', justifyContent:'center'}}>
            <label></label>
            <textarea style={{color:'#029ea6', fontSize:'20px', display:'flex', justifyContent:'center', borderRadius:'10px', width: '300px'}}
              placeholder='Dominio: '
              value={dominio}
              onChange={(e) => setDominio(e.target.value)}
            />
          </div>
          <div style={{margin:'5px', display:'flex', justifyContent:'center'}}>
            <label></label>
            <textarea style={{color:'#029ea6', fontSize:'20px', display:'flex', justifyContent:'center', borderRadius:'10px', width: '300px'}}
              placeholder='Repuestos a reemplazar: '
              value={repuestos}
              onChange={(e) => setRepuestos(e.target.value)}
            />
          </div>
          <div style={{margin:'5px', display:'flex', justifyContent:'center'}}>
            <label></label>
            <textarea style={{color:'#029ea6', fontSize:'20px', display:'flex', justifyContent:'center', borderRadius:'10px', width: '300px'}}
              placeholder='Mano de obra - chapa y Pintura: '
              value={manodeobra}
              onChange={(e) => setManodeobra(e.target.value)}
            />
          </div>
          <div style={{margin:'5px', display:'flex', justifyContent:'center'}}>
            <label></label>
            <input style={{color:'#029ea6', fontSize:'20px', borderRadius:'10px', width: '300px'}}
              placeholder="$0.00"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />
          </div>
          <button style={{margin:'5px', color:'#029ea6',backgroundColor: 'black' , fontSize:'24px', borderRadius:'20px', height:'45px'}} type="button" onClick={generarPDF}>
            Generar PDF
          </button>
        </form>
      </div>
      <div style={{display: 'flex', justifyContent:'space-around'}}>
        <h4 style={{color:'black'}}><img src={ubi} style={{width:'20px'}}></img>
          Alianza 698 - CP 1702
        </h4>
        <h4 style={{color:'black'}}>
          © 2025 gomezleandro149@gmail.com 
        </h4> 
      </div>
    </div>
  );
};

export default FormularioPresupuesto;
