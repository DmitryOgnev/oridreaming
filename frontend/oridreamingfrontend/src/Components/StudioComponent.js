import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import queryString from 'query-string';
import axios from 'axios';


class StudioComponent extends Component {
    constructor(props) {
        super();
         this.state = {
            shortName: props.shortName,
            welcomeMessage: '',
            allocaatedFragments: {},
            readyGroupEls: []

         }
         this.getModel = this.getModel.bind(this);
         this.sendRequest = this.sendRequest.bind(this);
         this.handleSuccessfulresponse = this.handleSuccessfulresponse.bind(this);
         this.handleErrorResponse = this.handleErrorResponse.bind(this);
         this.allocateFragmentsByGroups = this.allocateFragmentsByGroups.bind(this);
         this.resetAndGetAllocatedFragmets = this.resetAndGetAllocatedFragmets.bind(this);
         this.lookUpGroup = this.lookUpGroup.bind(this);
         this.lookUpFragment = this.lookUpFragment.bind(this);
         this.deleteEmptyPoprsInAllocaatedFragments = this.deleteEmptyPoprsInAllocaatedFragments.bind(this);
    }


  
    render() {
        const fragmentGroups = this.state.readyGroupEls;
        return (
            <>
                <div>
                    <Button variant="success" onClick={this.getModel}>Studio</Button>
                </div>
                <div>  
                    {this.state.readyGroupEls}
                </div>
            </> 
        )
    }

getModel() {
    this.sendRequest()
    .then(response => this.handleSuccessfulresponse(response))
    .catch(error => this.handleErrorResponse(error));
   
}    

handleSuccessfulresponse(response) { 
    this.setState({config: response.data})
    this.resetAndGetAllocatedFragmets();
    this.allocateFragmentsByGroups();
    this.deleteEmptyPoprsInAllocaatedFragments();

    let studioEls = Object.keys(this.state.allocaatedFragments).map((el, i) => { return (<div>{el}</div>) })

  /*  for(let prop in this.state.allocaatedFragments) {
        console.log(this.state.allocaatedFragments[prop])
    }  

    for(let prop in studioEls) {
        console.log(prop);
    }

    */
   this.setState({readyGroupEls : studioEls})
   console.log(studioEls);
}

sendRequest() {
    return axios.get('http://localhost:8080/getConfig/' + this.state.shortName);
}


handleErrorResponse(error) {
    console.log(error);
}
allocateFragmentsByGroups() {   
   Object.keys(this.state.allocaatedFragments).forEach(key => this.lookUpGroup(key))
}
lookUpGroup(groupName) {
    this.state.config.pages.forEach(page => (this.lookUpFragment(page, groupName)))
}

lookUpFragment(page, groupName) {
    for(let configProperty in page.fragments) {
        if(configProperty.includes(groupName)) {
            this.state.allocaatedFragments[groupName].push(page.fragments[configProperty]);
        }
    }
}

deleteEmptyPoprsInAllocaatedFragments() {
    for(let configProperty in this.state.allocaatedFragments) {
        if(this.state.allocaatedFragments[configProperty].length==0 ) {
            delete this.state.allocaatedFragments[configProperty];
        }    
    }    
}

resetAndGetAllocatedFragmets() {
   let allocaatedFragments = {
      headBottom : [],
      headTop : [],
      headUp : [],
      headDown : [],
      headLeft : [],
      headRight : [],
      headMiddle : [],
    
      neckBottom : [],
      neckTop : [],
      neckUp : [],
      neckDown : [],
      neckdLeft : [],
      neckRight : [],
      neckMiddle : [], 
    
      leftHandBottom : [],
      leftHandTop : [],
      leftHandUp : [],
      leftHandDown : [],
      leftHandMiddle : [],
    
      rightHandBottom : [],
      rightHandTop : [],
      rightHandUp : [],
      rightHandDown : [],
      rightHand : [],
    
      bodyBottom : [],
      bodyTop : [],
      bodyUp : [],
      bodyDown : [],
      bodydLeft : [],
      bodyRight : [],
      bodyMiddle : [],
    
      footBottom : [],
      footTop : [],
      footUp : [],
      footDown : [],
      footdLeft : [],
      footRight : [],
      footMiddle : [],
    
      innerBottom : [],
      innerTop : [],
      innerUp : [],
      innerDown : [],
      innerdLeft : [],
      innerRight : [],
      innerTop : [],
      innerMiddle : []
    }
  
    this.state.allocaatedFragments = allocaatedFragments;
  }

}




export default StudioComponent