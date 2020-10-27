import React from 'react';
import Slider from '../Components/Slider'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Clean from '../Picture/Clean.jpg'
import Modelitem from '../Components/Modelitem'


export default function Home() {

    return (
    <>
    { /*   <Slider/>  */}
        <Container>
            <Row>
                {listModelitems()}
            </Row>
        </Container>

    </>
    )
    function listModelitems() {
        let modelitems ={
            starflower: {name: "Starflower", shortName: "starflower", numberOfSteps: 21, difficulty: "Medium", groups:[["Plants", "Stars"], "Flowers"]},
            butterfly_papilio: {name: "Butterfly: Papilio", shortName: "butterfly_papilio", numberOfSteps: 18, difficulty: "Medium", groups:["Animals", "Insectes", "Butterflies"]},
            crane_bird: {name: "Crane", shortName: "crane_bird", numberOfSteps: 17, difficulty: "Simple", groups:["Animals"]}     
        } 

       return (Object.values(modelitems).map((modelitem) => {
           return <Modelitem modelitem={modelitem} />
                })
            ) 
        }
    }