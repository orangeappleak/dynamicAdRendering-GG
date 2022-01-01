import logo from './logo.svg';
import './App.css';
import layers from './layers.json';
import DynamicAddSpace from './DynamicAddSpace';

import {useEffect, useState} from 'react';

function App() {

  const [stateLayers, setLayers] = useState({
    new_layers: layers.layers
  });

  return (
    <div id="main-page">
      <section>
        <h1> Dynamic Ad rendering is Awesome. </h1>
      </section>
      <section id="dynamic-ad">
        <h2> Check it out. </h2>
        <AddLayer setLayers = {setLayers}/>
        <DynamicAddSpace stateLayers={stateLayers} setLayers = {setLayers}/>
      </section>
    </div>
  );
}

function AddLayer({setLayers}){
  return(
    <div id="layer_input">
      <div id="layer-types">
        <h1>Select a layer to add</h1>
        <div id="layer-buttons">
          <div onClick={() => addLayer('text',{setLayers})} className="layer-button" id="text-layer">
            <h1>Text</h1>
          </div>
          <div onClick={() => addLayer('frame',{setLayers})} className="layer-button" id="fram-layer">
            <h1>Frame</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

function addLayer(layer_type,{setLayers}){
  layers.layers.push({
    type: layer_type,
    placement: [],
    operations: []
  });
  setLayers({
    new_layers: layers.layers
  });
}


export default App;
