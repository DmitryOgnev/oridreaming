import React from 'react';
import Slider from '../Components/Slider'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Clean from '../Picture/Clean.jpg'
import Modelitem from '../Components/Modelitem'


export default function Home() {

    return (
    <>
    { /*   <Slider/>  */}
        <Container style={{paddingTop: '2rem', paddingBottom: '2rem'}}>
            <Row>
                {listModelitems()}
                <Col>
                    <Card style={{width: '18rem'}}>
                        <Card.Img variant="top" src={Clean}/>
                        <Card.Body>
                            <Card.Title>Title of the card</Card.Title>
                            <Card.Text>
                                Card Text
                            </Card.Text>
                            <Button variant="primary">Learn more</Button>
                        </Card.Body>
                    </Card>                
                </Col>
            </Row>
        </Container>

    </>
    )
    function listModelitems() {
        let modelitems ={
            starflower: {name: "Starflower", shortName: "starflower", numberOfSteps: 21, difficulty: "Medium", groups:[["Plants", "Stars"], "Flowers"]},
            butterfly_papilio: {name: "Butterfly: Papilio", shortName: "butterfly_papilio", numberOfSteps: 18, difficulty: "Medium", groups:["Animals", "Insectes", "Butterflies"]}    
        } 

       return (Object.values(modelitems).map((modelitem) => {
           return <Modelitem modelitem={modelitem} />
                })
            ) 
        }
    }