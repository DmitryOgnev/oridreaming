import React from 'react'
import { Navbar, Container, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap';
const images = require.context('../resources/Models/', true);

const styles = {
    li: {
        padding: '0.6rem'
    }
}

export default function Step(props) {

    return (
        <>
        <Container  style={{width: "75%", padding: "auto"}}> 
            <Navbar collapseOnSelect expand="sm" bg="white" variant="dark">
                <Nav style={{margin: "auto"}} className="mr-auto">
                    <Nav.Link><Link to={composeURL(props.shortName, parseInt(props.step)-1, props.numberOfSteps)}><h1>&larr;</h1></Link></Nav.Link>
                </Nav>
                    <span style={{ margin: "auto"}}><h5>Step {props.step}</h5></span> 
                <Nav style={{margin: "auto"}} className="mr-auto">
                    <Nav.Link><Link to={composeURL(props.shortName, parseInt(props.step)+1, props.numberOfSteps)}><h1>&rarr;</h1></Link></Nav.Link>
                </Nav>
            </Navbar>
            <Card>
                <Card.Img variant="top" src={composeDirectoryToAnAnimation(props.shortName, props.step)}/>
            </Card> 
         <Container>{makeStepList(props.shortName, props.step, props.numberOfSteps)}</Container>    
        </Container> 

        </>
    )
}

function composeDirectoryToAnAnimation(shortName, step){
    let stepNumber = parseInt(step) < 10 ? '0' + step : step;
    let image = images('./' + shortName + '/'  + shortName + '_' + stepNumber + '_anim.gif')
    return image;
}

function composeURL(shortName, step, numberOfSteps){
    if(parseInt(step)<=0 ) {
        return getUriWithParams(shortName, 0, numberOfSteps);
    } else if (parseInt(step)>=parseInt(numberOfSteps)) {
        return getUriWithParams(shortName, numberOfSteps, numberOfSteps);
    } else {
        return getUriWithParams(shortName, step, numberOfSteps);
    }
}

function getUriWithParams(shortName, step, numberOfSteps){
    return "/modelpage/" + shortName + "?shortName=" + shortName +"&numberOfSteps=" + numberOfSteps + "&step=" + step;
}

function composeClNameLinkIsDis(arrow, baseclassName, step, numberOfSteps) {
     if((arrow==="left" && parseInt(step)<=0) || (arrow==="right" && parseInt(step)>=parseInt(numberOfSteps))) {
        return baseclassName + " disabled";
     }
    return baseclassName;   
}

function makeStepList(shortName, step, numberOfSteps){
  let arrowsClassName = "page-item"
  let leftArrowClassName = arrowsClassName + (parseInt(step)<=0 ? " disabled" : "");
  let rightArrowClassName = arrowsClassName + (parseInt(step)>=parseInt(numberOfSteps) ? " disabled" : "");

  return (
      <nav style={{margin: "auto"}}>
          <ul style={{margin: "auto"}} className="pagination pagination-sm justify-content-center">
                <li className={composeClNameLinkIsDis("left", "page-item", step, numberOfSteps)} style={styles.li}><Link className="page-link" to={composeURL(shortName, parseInt(step)-10, numberOfSteps)}>&lt;&lt;</Link></li>
                <li className={composeClNameLinkIsDis("left", "page-item", step, numberOfSteps)} style={styles.li}><Link className="page-link" to={composeURL(shortName, parseInt(step)-1, numberOfSteps)}>&larr;</Link></li>
                {iterateIt(shortName, step, numberOfSteps)}
                <li className={composeClNameLinkIsDis("right", "page-item", step, numberOfSteps)} style={styles.li}><Link className="page-link" to={composeURL(shortName, parseInt(step)+1, numberOfSteps)}>&rarr;</Link></li>
                <li className={composeClNameLinkIsDis("right", "page-item", step, numberOfSteps)} style={styles.li}><Link className="page-link" to={composeURL(shortName, parseInt(step)+10, numberOfSteps)}>&gt;&gt;</Link></li>
          </ul>
      </nav>

  )   

}

function iterateIt(shortName, step, numberOfSteps){
    let arrowsClassName = "page-item"

    let navStepNumbers = /* []; */ getCurrentPaginationBlock(numberOfSteps, step);
   /*     for(let i=0; i<=numberOfSteps; i++) {
        navStepNumbers[i] = i;
    } */

    let listItems = navStepNumbers.map((el) => {return (<li className={isLinkActiveClassName(el, step)} style={styles.li}><Link className="page-link" to={getUriWithParams(shortName, el, numberOfSteps)}>{el}</Link></li>)});
        console.log(listItems)
    return listItems;
}

function isLinkActiveClassName(el, step){
    let arrowsClassName = "page-item"
    return el==step ? arrowsClassName + " active" : arrowsClassName
}

function getCurrentPaginationBlock(numberOfSteps, step){
    const amountOfLinksInBlock = 10;
    let initElement;

    if(parseInt(step) < 10) {
        initElement = 0;
    } else {
        initElement = parseInt(parseInt(step) / 10) * 10;
    }

    let navStepNumbers = [];
        for(let i = initElement; (i<=(initElement+9) && i<=numberOfSteps); i++) {
         navStepNumbers[i] = i;
    }

    return navStepNumbers;
}