import React from 'react';
import { Carousel } from 'react-bootstrap';
import Clean from '../Picture/Clean.jpg'
import magnet from '../Picture/magnet.jpg'

export default function Slider() {
    return (
        <Carousel>
            <Carousel.Item style={{'height': '40rem'}}>
                <img 
                    className="d-block w-100"
                    src={magnet}
                    alt="First Slide"
                />
                <Carousel.Caption>
                    <h3>Origami views</h3>
                    <p>Nice view</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item style={{'height': '40rem'}}>
                <img 
                    className="d-block w-100"
                    src={Clean}
                    alt="Second Slide"
                />
                <Carousel.Caption>
                    <h3>Origami views</h3>
                    <p>Nice view</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}