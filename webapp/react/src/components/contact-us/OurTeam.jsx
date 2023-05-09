import React from 'react'
import Grid from '@mui/material/Grid';
import TeamMember from "./TeamMember";



export default function Overview() {
    const supervisors = [
        {name:'Prof. Dulani Meedeniya' ,email:'dulani@chestxpert.live', img:'/ourteam/dulani.JPG'},
        {name:'Dr. Thanuja Ambegoda',email:'thanuja@chestxpert.live' ,img:'/ourteam/thanuja.JPG'},
    ]
    const teamMembers = [
        {name:'Wimukthi Indeewara' ,email:'wimukthi@chestxpert.live', img:'/ourteam/wimukthi.JPG'},
        {name:'Mahela Hennayake',email:'mahela@chestxpert.live' ,img:'/ourteam/mahela.JPG'},
        {name:'Kasun Rathnayake' ,email:'kasun@chestxpert.live' ,img:'/ourteam/kasun.JPG'}
    ]
    return (
        <div className='section-brown'>
            <div className='section' style={{padding:'50px 0px'}}>
                <div className='section-h2' style={{textAlign:'center', marginBottom:50, marginTop:0, fontSize: 35, fontWeight:'bold'}}>Our Team</div>
                <div style={{marginBottom: '50px'}}>
                    <Grid container spacing={5} justifyContent={'center'}>
                        {
                            supervisors.map(el=>
                            <Grid item xs={12} md={4} textAlign={'center'}>
                                <TeamMember name={el.name} email={el.email} img={el.img}/>
                            </Grid>
                            )
                        }
                    </Grid>
                </div>
                <div>
                    <Grid container spacing={5} justifyContent={'center'}>
                        {
                            teamMembers.map(el=>
                            <Grid item xs={12} md={4} textAlign={'center'}>
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
