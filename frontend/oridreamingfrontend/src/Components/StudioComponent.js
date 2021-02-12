import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import queryString from 'query-string';
import axios from 'axios';
import StudioPanel from './StudioPanel'


class StudioComponent extends Component {
    constructor(props) {
        super();
         this.state = {
            shortName: props.shortName,
            welcomeMessage: '',
            allocaatedFragments: {},
            allocaatedFragmentsUI: {},
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
         this.getUIparamsTemplate = this.getUIparamsTemplate.bind(this);
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
    .then(response => {this.handleSuccessfulresponse(response)})
    .catch(error => this.handleErrorResponse(error));
   
}    

handleSuccessfulresponse(response) { 
    this.setState({config: response.data})
    this.resetAndGetAllocatedFragmets();
    this.allocateFragmentsByGroups();
    this.deleteEmptyPoprsInAllocaatedFragments();

 //   let studioEls = Object.keys(this.state.allocaatedFragments).map((el, i) => { return (<div>{el}</div>) })

  /*  for(let configProperty in this.state.allocaatedFragments) {
       console.log(this.state.allocaatedFragments[configProperty]);
    } */

  //  let studioEls = Object.keys(this.state.allocaatedFragments).map((el, i) => { return (<StudioPanel group={el} />) })
  let studioEls = <StudioPanel groups={this.state.allocaatedFragments} groupsUI={this.state.allocaatedFragmentsUI} json={this.state.config} />


   this.setState({readyGroupEls : studioEls})
  // console.log(studioEls);
}

sendRequest() {
    return axios.get('http://localhost:8080/getTemplate/' + this.state.shortName);
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
            let currentObj = {};
            currentObj[configProperty] = page.fragments[configProperty];
            this.state.allocaatedFragments[groupName].push(currentObj);
            this.state.allocaatedFragmentsUI[groupName] = this.getUIparamsTemplate(groupName);
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


getUIparamsTemplate(groupName) {
 return {
     groupName: groupName,
     defaultUrlImageCheckbox: true,
     elementOfFragAngle: 0,
     defaultElementOfFragAngle: true,
     zoom: 0,
     defaultZoom: true,

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