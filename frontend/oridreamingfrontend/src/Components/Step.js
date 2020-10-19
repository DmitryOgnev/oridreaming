import React from 'react'
import { Navbar, Container, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap';
const images = require.context('../resources/Models/', true);


export default function Step(props) {

    return (
        <>
        <Container  style={{width: "75%", padding: "auto"}}> 
            <Navbar collapseOnSelect expand="sm" bg="white" variant="dark">
                <Nav style={{margin: "auto"}} className="mr-auto">
                    <Nav.Link><Link to={composeDirectoryToThebackAnimation(props.shortName, props.step, props.numberOfSteps)}><h1>&larr;</h1></Link></Nav.Link>
                </Nav>
                    <span style={{ margin: "auto"}}><h5>Step {props.step}</h5></span> 
                <Nav style={{margin: "auto"}} className="mr-auto">
                    <Nav.Link><Link to={composeDirectoryToTheNextAnimation(props.shortName, props.step, props.numberOfSteps)}><h1>&rarr;</h1></Link></Nav.Link>
                </Nav>
            </Navbar>
            <Card>
                <Card.Img variant="top" src={composeDirectoryToAnAnimation(props.shortName, props.step)}/>
            </Card> 
         <Container>{makeStepList(props.shortName, props.numberOfSteps)}</Container>    
        </Container> 

        </>
    )
}

function composeDirectoryToAnAnimation(shortName, step){
    let stepNumber = parseInt(step) < 10 ? '0' + step : step;
    let image = images('./' + shortName + '/'  + shortName + '_' + stepNumber + '_anim.gif')
    return image;
}

function composeDirectoryToTheNextAnimation(shortName, step, numberOfSteps){
    step = parseInt(step) + 1
    if(parseInt(step)<=parseInt(numberOfSteps)) {
       return getUriWithParams(shortName, step, numberOfSteps);
    } else {
       return getUriWithParams(shortName, 0, numberOfSteps); 
    }
}

function composeDirectoryToThebackAnimation(shortName, step, numberOfSteps){
    step = parseInt(step) - 1
    if(parseInt(step)>=0) {
      return getUriWithParams(shortName, step, numberOfSteps);
    } else {
      return getUriWithParams(shortName, numberOfSteps, numberOfSteps);
    }
}

function getUriWithParams(shortName, step, numberOfSteps){
    return "/modelpage/" + shortName + "?shortName=" + shortName +"&numberOfSteps=" + numberOfSteps + "&step=" + step;
}

function makeStepList(shortName, numberOfSteps){

 /*  return (
    <Container style={{width: "85%"}}>    
    <nav className="navbar navbar-default">
        <Container>
            <Navbar className="navbar-header"> 
                 <ul className="nav navbar-nav"> 
                     {iterateIt(shortName, numberOfSteps)}
                </ul>
            </Navbar>
        </Container> 
    </nav>
    </Container> 
  ) */
  return (

      <nav style={{margin: "auto"}}>
          <ul style={{margin: "auto"}} className="pagination pagination-sm">
                {iterateIt(shortName, numberOfSteps)}
          </ul>
      </nav>

  )   

}

function iterateIt(shortName, numberOfSteps){
    let navStepNumbers = [];
        for(let i=0; i<=numberOfSteps; i++) {
        navStepNumbers[i] = i;
    }

    let listItems = navStepNumbers.map((el) => {return (<li  style={{padding: '0.8rem'}}><Link to={getUriWithParams(shortName, el, numberOfSteps)}>{el}</Link></li>)});
        console.log(listItems)
    return listItems;
}

