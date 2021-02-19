import React, { Component } from 'react';
import { MDBCard, MDBCardTitle, MDBCardText, MDBContainer } from "mdbreact";
import { Col, Container, Row, Button} from 'react-bootstrap';

// https://www.youtube.com/watch?v=o2nmgbZaGMw   preview image before upload
// https://www.youtube.com/watch?v=dkaKSTyloMw   some infor about checking 

class GroupUIComp extends Component {

    constructor(props) {
        super();
        this.state = {groupUIComp: props.groupUIComp,  fragmentGroup : props.fragmentGroup, fragmentGroupUI : props.fragmentGroupUI, groupsUI : props.groupsUI, json : props.json, UIdefaultObj: props.UIdefaultObj }

        this.getPanel = this.getPanel.bind(this);
        this.updateStateForUI = this.updateStateForUI.bind(this);
        this.getDefaultPanel = this.getDefaultPanel.bind(this);
        this.handleURLCHange = this.handleURLCHange.bind(this);
        this.handleElemAngleCHange = this.handleElemAngleCHange.bind(this);
    }

    render() {
      if(this.state.groupUIComp=="regular") {
        return (
            this.getPanel(this.state.fragmentGroup  ,  this.state.fragmentGroupUI)    
        )
      } else if(this.state.groupUIComp=="default")  {
        return (
          this.getDefaultPanel()        
        )
      } else {
          console.log("!!!! wrong groupUIComp !!!")
      }
    }

    getPanel(fragmentGroup, fragmentGroupUI) {
        console.log(this.state.groupsUI[fragmentGroupUI.groupName])
           return (
             <MDBContainer>
                <MDBCard className="card-body" style={{ marginLeft: "auto", width: "90%", marginTop: "1rem" }}>
                  <Container> 
                   <Row>
                    <div style={{width: "10%", margin: "auto", padding: "auto"}}>
                        <img src={require('../resources/Models/' + this.state.json["origamiName"] +'/groups/' + fragmentGroupUI.groupName +'.JPG')?.default} style={{maxWidth: "100%", maxHeight: "100%"}} /> 
                   </div> 
                      <div style={{width: "auto", margin: "auto", padding: "auto"}}>
                        <label> 
                          <input type="checkbox" name="defaultChB" defaultChecked={this.state.groupsUI[fragmentGroupUI.groupName].defaultUrlImageCheckbox} onChange={ evn => (this.updateStateForUI(fragmentGroupUI.groupName, "defaultUrlImageCheckbox", !(this.state.groupsUI[fragmentGroupUI.groupName].defaultUrlImageCheckbox)))} /> Use default image <br/>
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
             </MDBContainer>
         
           )
         } 
     
         getDefaultPanel() {
          return (
            <MDBContainer>
                      { /* console.log(fragmentGroup) */}
               <MDBCard className="card-body" style={{background: "Azure", margin: "auto", width: "100%", marginTop: "1rem" }}>
               <Container> 
                 <Row>
                  <div style={{width: "10%", margin: "auto", padding: "auto"}}>
                       <img src={require('../resources/Models/' + this.state.json["origamiName"] +'/groups/default.JPG')?.default} style={{maxWidth: "100%", maxHeight: "100%"}} /> 
                  </div> 
    
                  <Col>
                    <div style={{width: "auto", margin: "auto", padding: "auto",  margin: "5%"}}>
                      <img  id="defaultUrlImg" src={this.state.UIdefaultObj.imageURL} style={{maxWidth: "40%", maxHeight: "100%",  margin: "auto", transform: "rotate(0deg)"}}/>
                    </div> 
                    <div>
                        <strong>Default Image URL: </strong>
                    </div> 
                    <div style={{width: "auto",  margin: "auto", padding: "auto"}}>
                      <label><input type="text" name="defaultName" onChange={(event) => ( this.handleURLCHange(event) ) } /> </label> 
                    </div> 
                  </Col> 
                  <Col style={{margin: "auto", padding: "auto"}}>
                     <div>
                        <strong>Default Angle: </strong>
                    </div>  
                    <div style={{width: "auto",  margin: "auto", padding: "auto"}}>
                      <label> 
                         {/* <input type="range" min="0" max="360" defaultValue="0" onChange={(event) => function(event){(this.state.UIdefaultObj.elementOfFragAngle = event.target.value)} } ></input> */}
                        <input type="range" min="0" max="360" defaultValue="0" onChange={(event) => (this.handleElemAngleCHange(event))} ></input>
                      </label> 
                    </div>
                  </Col> 
                  <Col style={{margin: "auto", padding: "auto"}}> 
                     <div>
                        <strong>Default Zoom: </strong>
                    </div>  
                    <div style={{width: "auto",  margin: "auto", padding: "auto"}}>
                      <label> 
                        <input type="range" min="1" max="300" defaultValue="100"></input>
                      </label>
                    </div>
                  </Col> 
                  </Row>
                  </Container>
               </MDBCard> 
            </MDBContainer>
        
          )
        }



    updateStateForUI(groupName, property, value) {
      let tempObj = this.state.groupsUI
      tempObj[groupName][property] = value;
      this.setState({ groupsUI : tempObj}); 
    }

    handleURLCHange(event) {
      this.state.UIdefaultObj.imageURL = event.target.value;  
      document.getElementById("defaultUrlImg").src = this.state.UIdefaultObj.imageURL;  
    }

    // transform: "rotate(0deg)"

    handleElemAngleCHange(event) {
      this.state.UIdefaultObj.elementOfFragAngle = event.target.value;  
      let transformAngleValue = "rotate(" + this.state.UIdefaultObj.elementOfFragAngle + "deg)";
      document.getElementById("defaultUrlImg").style.transform = transformAngleValue;  
    }

}

export default GroupUIComp  