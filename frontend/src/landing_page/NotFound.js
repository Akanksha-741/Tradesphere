import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

function NotFound () {
    return ( 
        <>
            <Navbar/>
            <div className="container p-5 mb-5">
                <div className='row, text-center' >
                   <h3>404 Not Found</h3>
                   <p className='text-muted'>The page you are looking for does not exist.</p>
                   
            </div>
        </div>
        <Footer/>
        </>
     );
}

export default NotFound;
