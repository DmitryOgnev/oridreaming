import React, { Component } from 'react';
import { MDBCard, MDBCardTitle, MDBCardText, MDBContainer } from "mdbreact";
import { Col, Container, Row, Button} from 'react-bootstrap';
import axios from 'axios';
import download from 'downloadjs';
import GroupUIComp from '../Components/GroupUIComp'
//const FileDownload = require('js-file-download');


//https://www.youtube.com/watch?v=jT6fxsDmEyo   - google custom search

class StudioPanel extends Component {

  constructor(props) {
    super();
     this.state = {groups : props.groups, groupsUI : props.groupsUI, UIdefaultObj: props.UIdefaultObj, json : props.json} 

     this.getPanel = this.getPanel.bind(this);
     this.getDefaultPanel = this.getDefaultPanel.bind(this);
     this.populateDefaultUrl = this.populateDefaultUrl.bind(this);
   //  this.updateStateForUI = this.updateStateForUI.bind(this);
     this.getSubmitPanel = this.getSubmitPanel.bind(this);
     this.handleSubmitButton = this.handleSubmitButton.bind(this);
   //  this.checkEnteredData =  this.checkEnteredData.bind(this);
     this.finalizeJsonforRequest = this.finalizeJsonforRequest.bind(this);
     this.setValuesIntoGroups = this.setValuesIntoGroups.bind(this);
     this.setValuesIntoJson = this.setValuesIntoJson.bind(this);
     this.setCurrentValueIntoJson = this.setCurrentValueIntoJson.bind(this);
     this.updateJson = this.updateJson.bind(this);
     this.sendRequest = this.sendRequest.bind(this);
     this.getModel = this.getModel.bind(this);
  }

  render() {
  //  this.populateDefaultUrl("500");
   // this.state.groups.headBottom[0].headBottomOneA.imageUrl = "500";
  //  console.log(this.state.groups.headBottom[0].headBottomOneA.imageUrl);
 //   console.log(this.state.groupsUI);
    let fragmentGroups = Object.keys(this.state.groups).map((fragmentGroup, key) => { return (this.getPanel(this.state.groups[fragmentGroup], this.state.groupsUI[fragmentGroup])) });
    return ( 
        <>
           {this.getDefaultPanel() }
           { fragmentGroups }
           { this.getSubmitPanel() }
        </>   
    )
  }


    getPanel(fragmentGroup, fragmentGroupUI) {
   //console.log(this.state.groupsUI)
      return ( <GroupUIComp groupUIComp={'regular'} fragmentGroup={fragmentGroup}  fragmentGroupUI={fragmentGroupUI}  groupsUI={this.state.groupsUI} json={this.state.json} UIdefaultObj={this.state.UIdefaultObj}/>
      )
    } 
 
//https://www.pluralsight.com/guides/how-to-use-react-to-set-the-value-of-an-input
    getDefaultPanel() {
      return ( 
        <GroupUIComp groupUIComp={'default'} fragmentGroup={''}  fragmentGroupUI={''}  groupsUI={this.state.groupsUI} json={this.state.json} UIdefaultObj={this.state.UIdefaultObj}/>
      )
    } 

    getSubmitPanel() {
      return (
        <MDBContainer>
                  { /* console.log(fragmentGroup) */}
           <MDBCard className="card-body" style={{marginLeft: "auto", width: "20%", marginTop: "1rem" }}>
           <Container> 
             <Row>
              <div style={{margin: "auto", padding: "auto"}}>
                  <Button variant="success" onClick={this.handleSubmitButton} >Submit and get PDF</Button>
              </div>
              </Row>
              </Container>
           </MDBCard> 
        </MDBContainer>
      )
    }

// ---- Handle URL
populateDefaultUrl(url) {
 // for(const group in this.state.groups) {
 //   this.state.groups[group].forEach((frag, index) => (Object.values(this.state.groups[group][index])[0]["imageUrl"] = url) );
 // }                    
}
/* 
  updateStateForUI(groupName, property, value) {
    let tempObj = this.state.groupsUI
    tempObj[groupName][property] = value;
    this.setState({ groupsUI : tempObj}); 
  }
*/
  handleSubmitButton() {
 //   this.checkEnteredData();
    this.finalizeJsonforRequest();
    this.setValuesIntoJson();
    this.getModel();
    
 /*   console.log("----" + "groups");
    console.log(this.state.groups);  *
    console.log("----" + "groupsUI");
    console.log(this.state.groupsUI);
   console.log("----" + "UIdefaultObj");
    console.log(this.state.UIdefaultObj);
      
    console.log("----" + "json");
    console.log(this.state.json); 
*/
  }

  checkEnteredData() {
   // Add code to check if at least one page is added and check if it is image file
  }

  finalizeJsonforRequest() {
      Object.keys(this.state.groupsUI).forEach((groupName) => (this.setValuesIntoGroups(groupName)))
  }

  setValuesIntoGroups(groupName) {                                                                   
     this.state.groups[groupName].forEach(fragment => (fragment[Object.keys(fragment)[0]].imageUrl = ((this.state.groupsUI[groupName].defaultUrlImageCheckbox == true) ? (this.state.UIdefaultObj.imageURL) : (this.state.groupsUI[groupName].imageURL)))) ;
     this.state.groups[groupName].forEach(fragment => (fragment[Object.keys(fragment)[0]].elementOfFragAngle = ((this.state.groupsUI[groupName].defaultElementOfFragAngle == true) ? (this.state.UIdefaultObj.elementOfFragAngle) : (this.state.groupsUI[groupName].elementOfFragAngle)))) ;
  }

  setValuesIntoJson() {   
    Object.keys(this.state.groupsUI).forEach((groupName) => (this.setCurrentValueIntoJson(groupName, this.state.groupsUI[groupName])))
  }

  setCurrentValueIntoJson(groupName, groupsUIObj) {
    // this.state.json.pages.forEach(page => (  Object.keys(page.fragments).forEach(fragmentname => ( console.log(groupsUIObj))) ));

    this.state.json.pages.forEach((page, index) => (  Object.keys(page.fragments).filter(fragmentname => ( fragmentname.includes(groupName)))
                                                                  //     .forEach(fragName => console.log(fragName + " " + groupName))  )
                                                                  // .forEach(fragName => console.log(this.state.json.pages[index].fragments[fragName].imageUrl + " " + this.state.groups))  )
                                                                      .forEach(fragName => ( this.updateJson(index, groupName, fragName)   )   ))  
                                 );
  }
  
  updateJson(index, groupName, fragName) {

    let currentFragment = this.state.groups[groupName].filter(frag => ( Object.keys(frag)[0] == fragName))
 /*   console.log("----");
    console.log(currentFragment[0][Object.keys(currentFragment[0])[0]].imageUrl);
    console.log(this.state.json.pages[index].fragments[fragName]);
    console.log("----"); */
    if(currentFragment[0][Object.keys(currentFragment[0])[0]].imageUrl == undefined) {
      this.state.json.pages[index].fragments[fragName].imageUrl = null
    } else {
      this.state.json.pages[index].fragments[fragName].imageUrl = currentFragment[0][Object.keys(currentFragment[0])[0]].imageUrl
    }
    this.state.json.pages[index].fragments[fragName].elementOfFragAngle = currentFragment[0][Object.keys(currentFragment[0])[0]].elementOfFragAngle
  }


/*
  sendRequest() {
    return axios.post('http://localhost:8080/receivepdf', this.state.json);
  }
*/

  sendRequest() {
    return axios({
      method: 'post',
      url: 'http://localhost:8080/receivepdf',
      data: this.state.json
      })
  }


  getModel() {
  axios
  .post('http://localhost:8080/receivepdf', this.state.json, {
      headers: this.headers,
      responseType: 'blob', 
  })
  .then(response => {
     download(response.data, "file.pdf")
  })
  .catch(error => console.log(error));

  }    
  

}
  export default StudioPanel  


/*
        <MDBContainer>
           <MDBCard className="card-body" style={{ marginLeft: "auto", width: "90%", marginTop: "1rem" }}>
             <Container> 
              <Row>
               <div style={{width: "10%", margin: "auto", padding: "auto"}}>
                   <img src={require('../resources/Models/' + this.state.json["origamiName"] +'/groups/' + fragmentGroupUI.groupName +'.JPG')?.default} style={{maxWidth: "100%", maxHeight: "100%"}} /> 
              </div> 
                 <div style={{width: "auto", margin: "auto", padding: "auto"}}>
                   <label> 
                     <input type="checkbox" id="defaultURL" name="defaultChB" defaultChecked={this.state.groupsUI[fragmentGroupUI.groupName].defaultUrlImageCheckbox} onChange={ evn => (this.updateStateForUI(fragmentGroupUI.groupName, "defaultUrlImageCheckbox", !(this.state.groupsUI[fragmentGroupUI.groupName].defaultUrlImageCheckbox)))} /> Use default image <br/>
                      Image URL: <input type="text" name="name"  disabled={this.state.groupsUI[fragmentGroupUI.groupName].defaultUrlImageCheckbox} onChange={(event) => (fragmentGroupUI.imageURL = event.target.value) }/>
                    </label>
                  </div>
                  <div style={{width: "auto", margin: "auto", padding: "auto"}}>  
                    <label> 
                      <input type="checkbox" id="defaultElementOfFragAngle" name="defaultElementOfFragAngle" defaultChecked={this.state.groupsUI[fragmentGroupUI.groupName].defaultElementOfFragAngle} onChange={ evn => (this.updateStateForUI(fragmentGroupUI.groupName, "defaultElementOfFragAngle", !(this.state.groupsUI[fragmentGroupUI.groupName].defaultElementOfFragAngle)))} /> Use default angle <br/>
                      Angle: <input type="range" min="0" max="360"  defaultValue="0" disabled={this.state.groupsUI[fragmentGroupUI.groupName].defaultElementOfFragAngle}  defaultValue={this.state.groupsUI[fragmentGroupUI.groupName].elementOfFragAngle} onChange={(event) => (fragmentGroupUI.elementOfFragAngle = event.target.value) }></input>
                    </label> 
                  </div>
                  <div style={{width: "auto",  margin: "auto", padding: "auto"}}> 
                    <label> 
                      <input type="checkbox" id="defaultZoom" name="defaultZoom" defaultChecked={this.state.groupsUI[fragmentGroupUI.groupName].defaultZoom} onChange={ evn => (this.updateStateForUI(fragmentGroupUI.groupName, "defaultZoom", !(this.state.groupsUI[fragmentGroupUI.groupName].defaultZoom)))} /> Use default zoom <br/>
                      Zoom: <input type="range" min="1" max="300" disabled={this.state.groupsUI[fragmentGroupUI.groupName].defaultZoom}  defaultValue={this.state.groupsUI[fragmentGroupUI.groupName].zoom}></input>
                    </label>
                  </div>
                </Row>
              </Container>
           </MDBCard> 
        </MDBContainer>  */


        /*  <MDBContainer>
                  
         <MDBCard className="card-body" style={{background: "Azure", margin: "auto", width: "100%", marginTop: "1rem" }}>
           <Container> 
             <Row>
              <div style={{width: "10%", margin: "auto", padding: "auto"}}>
                   <img src={require('../resources/Models/' + this.state.json["origamiName"] +'/groups/default.JPG')?.default} style={{maxWidth: "100%", maxHeight: "100%"}} /> 
              </div> 

              <Col>
                <div style={{width: "auto", margin: "auto", padding: "auto",  margin: "5%"}}>
                  <img src={this.state.UIdefaultObj.imageURL} style={{maxWidth: "40%", maxHeight: "100%",  margin: "auto"}}/>
                </div> 
                <div style={{width: "auto",  margin: "auto", padding: "auto"}}>
                  <label><strong>Default Image URL: </strong><input type="text" name="defaultName" onChange={(event) => (this.state.UIdefaultObj.imageURL = event.target.value) } /> </label> 
                </div>
              </Col>   
              <div style={{width: "auto",  margin: "auto", padding: "auto"}}>
                  <label> 
                    <strong>Default Angle: </strong><input type="range" min="0" max="360" defaultValue="0" onChange={(event) => function(event){(this.state.UIdefaultObj.elementOfFragAngle = event.target.value)} } ></input>
                  </label> 
              </div>
              <div style={{width: "auto",  margin: "auto", padding: "auto"}}>
                <label> 
                   <strong>Default Zoom: </strong><input type="range" min="1" max="300" defaultValue="100"></input>
                </label>
              </div>
              </Row>
              </Container>
           </MDBCard> 
        </MDBContainer> */

  