
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
  const [precioRepuestos, setPrecioRepuestos] = useState('');

  const generarPDF = () => {
    const doc = new jsPDF();
    doc.addImage(logo, 'PNG', 10, 5, 60, 60); // (src, tipo, x, y, ancho, alto)

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
    doc.text(`Cliente: ${cliente}`, 20, 85);
    doc.setLineDashPattern([1, 1], 0);// Línea punteada
    doc.line(35, 86, 95, 86);// Línea punteada
    doc.text(`Fecha: ${fecha}`, 20, 95);
    doc.setLineDashPattern([1, 1], 0);// Línea punteada
    doc.line(35, 96, 65, 96);// Línea punteada
    doc.text(`Modelo: ${modelo}`, 70, 95);
    doc.setLineDashPattern([1, 1], 0);// Línea punteada
    doc.line(85, 96, 120, 96);// Línea punteada
    doc.text(`Año: ${anio}`,125 , 95);
    doc.setLineDashPattern([1, 1], 0);// Línea punteada
    doc.line(135, 96, 145, 96);// Línea punteada
    doc.text(`Dominio: ${dominio}`, 150 , 95);
    doc.setLineDashPattern([1, 1], 0);// Línea punteada
    doc.line(170, 96, 190, 96);// Línea punteada
    doc.text(`Marca: ${marca}`, 97.5, 85);
    doc.setLineDashPattern([1, 1], 0);// Línea punteada
    doc.line(112, 86, 190, 86);// Línea punteada

    doc.text('__________________________________________________________________________', 20, 105);

      // VARIANTE DE TABLA CON PRECIOS Y REPUESTOS SEPARADOS
      const headers = [["Repuestos a reemplazar", "Precio"]];
      const data = repuestos.split(',').map((repuesto, index) => [
        repuesto.trim(),
        `$${precioRepuestos.split(',')[index].trim() || '0.00'}`,
      ]);

      doc.autoTable({
         head: headers,
        body: data,
        startY: 110, // Posición inicial de la tabla
        styles: {
          fontSize: 14,
          halign: 'left',
          cellPadding: 2,
          
        },
        headStyles: {
         fillColor:[2, 157, 166],
        },
        margin: { left: 20, right: 20 },
        didDrawPage: (data) => {
          // Pie de página
          const pageCount = doc.internal.getNumberOfPages();
          const currentPage = doc.internal.getCurrentPageInfo().pageNumber;
          const footerText = `Página ${currentPage} de ${pageCount}`;
          doc.setFontSize(10);
          doc.text(footerText, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 10, {
            align: "right",
          }); }
      });
      

   
       //doc.autoTable({
        // startY: 155,
        // head: [['Repuestos a reemplazar:']],
       //  body: [[repuestos]],
       //  styles: {
       //    fontSize: 14,
       //    halign: 'left',
       //    cellPadding: 2,
       //    
       //  },
       //  headStyles: {
       //   fillColor:[2, 157, 166],
       //  },
       //  margin: { left: 20, right: 20 },
      // });

      doc.autoTable({
        startY: (20, doc.autoTable.previous.finalY + 10), // Aquí comenzamos la tabla después de la mano de obra
        head: [['Mano de obra - Chapa y Pintura: ']],
        body: [[` $ ${manodeobra}`]],
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
  doc.setFont('helvetica', 'bold');
  doc.text(`Total: $ ${precio}`, 20, doc.autoTable.previous.finalY + 25);

  // Firma y sello
  doc.setFont('helvetica', 'normal');
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
          <Link style={{textDecoration: 'none', color:'black', fontSize: '25px', marginLeft:'-40px'}} to="/"> <img src={inicio} alt='Logo' style={{width:'20px', marginRight:'5px'}}></img>Inicio</Link>
        </nav>
        
      <div style={{textDecoration: 'none', display: 'flex', alignItems:'center', justifyContent: 'center', marginBottom:'40px'}} >
        <form style={{display:'flex', flexDirection:'column', backgroundColor:'#ffff', borderRadius:'20px' }} >
          <div>
          <h2 style={{fontSize: '35px', color:'#029ea6', display: 'flex', alignItems: 'center',}}>Formulario de Presupuesto</h2>
            <label> </label>
            <div style={{display:'flex', justifyContent:'center'}}>
            <input style={{color:'#029ea6', fontSize:'20px', borderRadius:'10px', width: '300px'}}
              placeholder="Nombre del cliente: "
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
              placeholder='Mano de obra - Chapa y Pintura: '
              value={manodeobra}
              onChange={(e) => setManodeobra(e.target.value)}
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
              placeholder='Precio de repuestos $: '
              value={precioRepuestos}
              onChange={(e) => setPrecioRepuestos(e.target.value)}
            />
          </div>
          <div style={{margin:'5px', display:'flex', justifyContent:'center'}}>
            <label></label>
            <input style={{color:'#029ea6', fontSize:'20px', borderRadius:'10px', width: '300px'}}
              placeholder="Precio total $:"
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
        <h4 style={{color:'black'}}><img src={ubi} alt='logo' style={{width:'20px'}}></img>
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
