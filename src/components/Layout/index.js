import React, {  } from 'obsess_libs/react';
import TopNavBar from "./TopNavBar";
import './layout.scss';


export default function Layout({children}){
    return (<>

        {children}


        <div className={'topUILayer'}>
             <TopNavBar/>
        </div>
    </>)
}





