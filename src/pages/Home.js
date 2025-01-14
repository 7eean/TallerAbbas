import React from "react";
import { Link } from "react-router-dom";
import logo from '../utils/Logo.jpeg';
import ubi from '../utils/ubi.png';
import wsp from '../utils/wsp.png';


const Home = () => {
  return (
    <div style={{backgroundColor: 'black', fontFamily: 'cabin', width:'100%', height:'120vh', display:'flex', flexDirection:'column', alignContent:'center', alignItems:'center'}}>
      <Link to="/">
      <img style={{width: '250px', marginTop:'30px'}} src={logo} alt="Logo Taller Abbas"  />
      </Link>
      <nav style={{fontSize: '30px', color:'#029ea6', marginTop:'60px', marginBottom:'40px'}}>
        <Link style={{textDecoration: 'none', color:'#029ea6'}} to="/order">Crear presupuesto a PDF</Link>
      </nav>
      <h3 style={{color:'white'}}>
        Software creado para Abbas Carrocería y Pintura con fines internos.
      </h3>
      <h4 style={{color:'white'}}><img src={ubi} style={{width:'20px'}}></img>
        Alianza 698 - CP 1702 
      </h4>
      <h4 style={{color:'white'}}> <img src={wsp} style={{width:'20px'}}></img>
        Contacto: 1134900722
      </h4>
      <h4 style={{color:'white'}}>
        © 2025 gomezleandro149@gmail.com 
      </h4>
    </div>
      
  );
};

export default Home;
