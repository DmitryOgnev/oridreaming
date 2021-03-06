import React from 'react'
import { Col, Card, Button } from 'react-bootstrap';
//import Clean from '../Picture/Clean.jpg'
//import Genpicture from '../resources/Models/starflower/genpicture/genpicture.jpg'
import {Link} from 'react-router-dom'
const images = require.context('../resources/Models/', true);


export default function Modelitem(props) {
        return (        
                <Col>
                    <Card style={{width: '16rem'}}>
                     <Card.Img variant="top" src={require('../resources/Models/' + props.modelitem.shortName +'/genpicture/genpicture.jpg')?.default}/>
                        <Card.Body>
                            <Card.Title>{props.modelitem.name}</Card.Title>
                            <Card.Text>
                            Number of steps: {props.modelitem.numberOfSteps}. Difficulty: {props.modelitem.difficulty}
                            </Card.Text>
                            <Link to={"/modelpage/" + props.modelitem.shortName + "?shortName=" + props.modelitem.shortName +"&numberOfSteps=" + props.modelitem.numberOfSteps + "&step=" + "0"}>
                                <Button variant="primary">Steps</Button>
                            </Link>
                            {" "}
                            <Link to={"/studio" + "?shortName=" + props.modelitem.shortName}>
                                <Button variant="success">Studio</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                    
                </Col>
        )
}//npm audit fix --force