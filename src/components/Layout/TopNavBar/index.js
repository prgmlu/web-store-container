import React, {  } from 'obsess_libs/react';
import Button from 'obsess_modules/Button';
import './topNavBar.scss';

export default function TopNavBar(){
    return(<div className='topNavBar'>
        <Button onClick={() => console.log("=> clicked")}/>
    </div>)
}