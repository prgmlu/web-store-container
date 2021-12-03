import React, {  } from 'obsess_libs/react';
import Button from 'obsess_modules/Button';
import './layout.scss';


export default function Layout({children}){
    return (<>

        {children}


        <div className={'topUILayer'}>
             <TopNavBar/>
        </div>
    </>)
}





const TopNavBar = ()=>{
    return(<div className='topNavBar'>
        <Button onClick={() => console.log("=> clicked")}/>
    </div>)
}