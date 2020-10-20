import React from 'react';
import queryString from 'query-string';
import Step from '../Components/Step'

export function Modelpage (props) {
    let params = queryString.parse(props.location.search)
  return (
     <> 
    <Step shortName={params.shortName} step={params.step} numberOfSteps={params.numberOfSteps}/>
    </>
  )  
}