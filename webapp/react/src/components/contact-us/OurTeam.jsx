import React from 'react'
import Grid from '@mui/material/Grid';
import TeamMember from "./TeamMember";

export default function Overview() {
    return (
        <div className='section-brown' style={{ background: 'url(/bg-pattern.png), linear-gradient(to left, #c52a25, #8a191d)',color:'white'}}>
            <div className='section' style={{padding:'50px 0px'}}>
                <div className='section-h2' style={{textAlign:'center', marginBottom:50, marginTop:0, fontSize: 35, fontWeight:'bold'}}>Our Team</div>
                <div>
                    <Grid container spacing={5} justifyContent={'center'}>
                        <Grid item xs={12} md={5} textAlign={'center'}>
                            <TeamMember name='Wimukthi Indeewara' email='wimukthi@chestxpert.live' img='/ourteam/wimukthi.JPG'/>
                        </Grid>
                        <Grid item xs={12} md={5} textAlign={'center'}>
                            <TeamMember  name='Mahela Hennayake' email='mahela@chestxpert.live' img='/ourteam/mahela.JPG'/>
                        </Grid>
                        <Grid item xs={12} md={5} textAlign={'center'}>
                            <TeamMember name='Kasun Rathnayake' email='kasun@chestxpert.live' img='/ourteam/kasun.JPG'/>
                        </Grid>
                        <Grid item xs={12} md={5} textAlign={'center'}>
                            <TeamMember name='Sahan Samarakoon' email='sahan@chestxpert.live' img='/ourteam/sahan.JPG'/>
                        </Grid>
                    </Grid>
                </div>

            </div>
        </div>
    )
}
