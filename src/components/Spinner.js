import React,{Component} from 'react';
import loading from './1490.gif';

export class Spinner extends Component{
    render() {
      return (
        <div className='d-flex justify-content-center align-items-center' style={{height : "80vh"}}>
            <img src={loading} alt="" />
        </div>

      );
    }
}
export default Spinner;