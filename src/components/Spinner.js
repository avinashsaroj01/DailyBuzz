import React, { Component } from 'react'
import loading from './loading.gif'
export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center' style={{display:'flex',justifyContent:'center',margin:'0 0 0 0', padding:'2rem',alignItems:'center', height:'20%',width:'20%' }}>

        <img src={loading}  alt="loading" className="src" style={{padding:'2rem',margin:'0 0 0 70rem'}} />
        
      </div>
    )
  }
}
