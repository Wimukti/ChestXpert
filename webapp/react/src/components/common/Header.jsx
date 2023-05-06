import React from 'react'
import './styles.css';
import { Button } from '@mui/material';

function Header({title, subtitle, showActionButton=false, navigate=undefined}) {
    return (
        <div className='header'>
            <div className='container'>
                <div className='titles-container'>
                    <div className='page-title'>{title}</div>
                    <div className='page-sub-title'>{subtitle}</div>
                    {/*{showActionButton && (<div style={{paddingTop:10}}>*/}
                    {/*     <Button sx={{*/}
                    {/*                backgroundColor: '#c52a25',*/}
                    {/*                '&:hover': {*/}
                    {/*                backgroundColor: '#7a100c',*/}
                    {/*            },*/}
                    {/*            }} */}
                    {/*    variant='contained' style={{marginRight:10}}*/}
                    {/*    onClick={()=>navigate('ChestXpert')}*/}
                    {/*    >Start ChestXpert</Button> */}
                    {/*    <Button sx={{*/}
                    {/*        backgroundColor: '#c52a25',*/}
                    {/*        '&:hover': {*/}
                    {/*          backgroundColor: '#7a100c',*/}
                    {/*      },*/}
                    {/*    }} variant='contained'*/}
                    {/*    onClick={()=>navigate('User Manual')}*/}
                    {/*    >User Manual</Button>*/}
                    {/*    </div>)}*/}
                </div>
            </div>

        </div>
    )


}

export default Header