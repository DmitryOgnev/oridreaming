import React, { Component } from 'react';
import StudioComponent from '../Components/StudioComponent'
import queryString from 'query-string';

class Studio extends Component {
    constructor(props) {
        super();
        this.state = {
            shortName : queryString.parse(props.location.search).shortName
        }
    }
   render() {
       return (
           <>
            <div>
                This is Studio
            </div>
            <StudioComponent shortName={this.state.shortName} />
           </> 
       )
   }
}
export default Studio