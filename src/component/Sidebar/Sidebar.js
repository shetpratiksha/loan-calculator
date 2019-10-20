import React, { Component} from 'react';

class Sidebar extends Component{

    clickHandler= (LA,LD) =>{
        debugger;
        this.props.clickItems(LA,LD);
    }

render(){
    return(
        <div style={{height: '100%',width: '200px',
        position: 'fixed',
        zIndex: '1',
        top: '0',
        left: '0',
        backgroundColor: '#111',
        overflowX: 'hidden',
        paddingTop: '20px'}}>
            {this.props.historyDataArray.map((igkey,index) =>(
                <a onClick={()=>this.clickHandler(igkey.LA,igkey.LD)} key={index}style={{padding: '6px 8px 6px 16px',textDecoration: 'none',
                    fontSize: '16px',color: '#818181',display: 'block'}}>
                    <span>AMOUNT: {igkey.LA}</span>
                    <br />
                    <span>DURATION: {igkey.LD}</span>
                </a>
            ))}
            
        </div>
    )
}
}

export default Sidebar;