import React from 'react'
import { Col, Card, Button } from 'react-bootstrap';
//import Clean from '../Picture/Clean.jpg'
//import Genpicture from '../resources/Models/starflower/genpicture/genpicture.jpg'
import {Link} from 'react-router-dom'
const images = require.context('../resources/Models/', true);


export default function Modelitem(props) {
      console.log(props.modelitem);
        return (        
                <Col>
                    <Card style={{width: '16rem'}}>
                        <Card.Img variant="top" src={images('./' + props.modelitem.shortName +'/genpicture/genpicture.jpg')}/>
                        <Card.Body>
                            <Card.Title>{props.modelitem.name}</Card.Title>
                            <Card.Text>
                            Number of steps: {props.modelitem.numberOfSteps}. Difficulty: {props.modelitem.difficulty}
                            </Card.Text>
                            <Link to="/modelpage">
                            <Button variant="primary">Steps</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                    
                </Col>
        )

}

