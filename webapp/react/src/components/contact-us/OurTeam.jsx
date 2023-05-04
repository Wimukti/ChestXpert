import React from 'react'
import Grid from '@mui/material/Grid';
import TeamMember from "./TeamMember";



export default function Overview() {
    const teamMembers = [
        {name:'Wimukthi Indeewara' ,email:'wimukthi@chestxpert.live', img:'/ourteam/wimukthi.JPG'},
        {name:'Mahela Hennayake',email:'mahela@chestxpert.live' ,img:'/ourteam/mahela.JPG'},
        {name:'Kasun Rathnayake' ,email:'kasun@chestxpert.live' ,img:'/ourteam/kasun.JPG'},
        {name:'Sahan Samarakoon', email:'sahan@chestxpert.live' ,img:'/ourteam/sahan.JPG'}
    ]
    return (
        <div className='section-brown' style={{ background: 'url(/bg-pattern.png), linear-gradient(to left, #c52a25, #8a191d)',color:'white'}}>
            <div className='section' style={{padding:'50px 0px'}}>
                <div className='section-h2' style={{textAlign:'center', marginBottom:50, marginTop:0, fontSize: 35, fontWeight:'bold'}}>Our Team</div>
                <div>
                    <Grid container spacing={5} justifyContent={'center'}>
                        {
                            teamMembers.map(el=>
                            <Grid item xs={12} md={5} textAlign={'center'}> 
                                <TeamMember name={el.name} email={el.email} img={el.img}/>
                            </Grid>
                            )
                        }
                    </Grid>
                </div>

            </div>
        </div>
    )
}
