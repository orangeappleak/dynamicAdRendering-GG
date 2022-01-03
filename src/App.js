import './App.css';
import layers from './layers.json';
import DynamicAddSpace from './DynamicAddSpace';

import {useState} from 'react';

function App() {

  // The stateLayers component stores the json data from the layers.json files and supplies it to all the child components.
  // The setLayers method is used to update the value of stateLayers and accordingly re-renders the components.

  const [stateLayers, setLayers] = useState({
    new_layers: layers.layers
  });

  return (
    <div id="main-page">
      <section id="home-page">
        <div id="home-page-content">
          <h1> Dynamic Ad rendering is Awesome. </h1>
          <p> This is a demo for the assignment and can be worked and expanded upon. As of right now the site only supports 2 layers either same or different layers, but
            it has the capability to support more layers. There are some issues that I already know of but due to time restrictions could not work on them. Please follow 
            the "guidelines for input" mentioned in the black box.
          </p>
        </div>
        <div id="image-block">
          <img src="https://images.unsplash.com/photo-1553096442-8fe2118fb927?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YWR2ZXJ0aXNlbWVudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" />
        </div>
      </section>
      <section id="dynamic-ad">

        {/* Here we are making use of another child component called AddLayer to which which we are also passing the setLayers method and the stateLayers data */}
        <AddLayer setLayers = {setLayers} stateLayers={stateLayers}/>

      </section>
    </div>
  );
}

// The AddLayer component consists a functionality to add a layer,
// You can add upto 2 layers as of now, but the methodology can be expanded and more layers can be added.
// The 2 types or layers that you can add are presented as buttons frame layer and text layer, namely.
// When the button is clicked the corresponding layer is added to the layers.json and the component is re-rendered accordingly.

function AddLayer({setLayers,stateLayers}){
  return(
    <div id="layer_input">
      <div id="layer-types">
        <h2> Check it out. </h2>
        <div id="example inputs">
          <div style={{
            margin: "20px 0"
          }} className='prettyprint'>
            for Text Layer:<br></br>
              text: Hello World<br></br>
              placement: {JSON.stringify({x: 100, y: 200})}<br></br>
              operations: {JSON.stringify({color: "red",fontSize: "60px"})}
              <br></br>
              <br></br>
              for frame layer:<br></br>
              path: "paste some image url"<br></br>
              placement: {JSON.stringify({x: 50, y: 60, width: "100%", height: "50%"})}<br></br>
              operations: {JSON.stringify({bgColor: "red"})}
          </div>
        </div>
        <h1>Select a layer to add</h1>
        <div id="layer-buttons">
          <div onClick={() => addLayer('text',{setLayers})} className="layer-button" id="text-layer">
            <h1>Text</h1>
          </div>
          <div onClick={() => addLayer('frame',{setLayers})} className="layer-button" id="fram-layer">
            <h1>Frame</h1>
          </div>
        </div>
        <div id="layer-options">
          <div onClick={() => {
            document.getElementById('layer-options-box').classList.toggle('show');
          }} id="layer-options-button">
            <div id="circle-hover"></div>
            <h1>Layer options</h1>
          </div>
          <div onClick={() => {
            window.location.reload(false);
          }} id="layer-options-button">
            <div id="circle-hover"></div>
            <h1>reset</h1>
            {/* The reset button allows to reset all the layers and add new layers again. */}
          </div>
          <div id="layer-options-box">
            <LayerOptions setLayers={setLayers} stateLayers={stateLayers}/>

          </div>
        </div>
      </div>
      <div id="layers-json">
        <div id="flex-layers-ad">
          <h2>Here is how your layers look</h2>
          <pre className="prettyprint" id="json-code-block">
            <p className='prettyprint'>{JSON.stringify(layers, null, 4)}</p>
          </pre>
        </div>
        <div id="flex-ad">
          <h2>This is how your advert looks like:</h2>
          <DynamicAddSpace stateLayers={stateLayers}/>
        </div>
      </div>
    </div>
  )
}

// The LayerOptions contain the input fields to enter the various operations and placements on the different layers.
// Each layer has its own set of layerOptions and the changes inputted are rendered on the specific layer.

function LayerOptions({setLayers,stateLayers}){

  var diff_layers = layers.layers;

  return diff_layers.length == 0 ? <div style={{ width: '100%',textAlign: 'center',display: 'flex',flexDirection:'column',alignItems: 'center'}} id="example-layer">
    <h1><b>Type</b>: "type of the layer either frame or text</h1>
    <h1><b>Path</b>: "image url for the frame layer"</h1>
    <h1><b>Placement</b>: "x: position on x-axis, y: position on y-axis"</h1>  
  </div> : 
   diff_layers.map((layer,index,key) => {
    return <div key={key} className='layer' id={"layer-"+index}>
      <div id="layer-option-content">
        <h1 style={{fontSize: '30px',fontWeight: 'bold'}}>Layer - {index}: </h1>
        <div id="layer-options-edit" style={{display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
          {Object.entries(layer).map((entry,key) => {
            return <div key={key} style={{
              display: 'flex',
              alignItems: 'center',
              margin: '10px'
            }}>
              <h1>{entry[0]}: </h1>
              {entry[0]!='type' ? 
                <textarea className='text-input' name={entry[0]}>{entry[1]}</textarea> : <p>{entry[1]}</p>
              }
            </div>
          })}
        </div>
      </div>
      <div style={{
        position: 'relative',
        left: '50%',
        transform: 'translate(-50%,0%)',
        border: '2px solid red',
        width: '40%',
        cursor: 'pointer'
      }} onClick={(el) => {updateNewLayer({setLayers,stateLayers},el)}} id="update-layers">
          <h1 style={{fontSize: '22px'}}>UPDATE LAYER</h1>
      </div>
    </div>
  })
}


// The addLayer function is responsible for adding a new layer and changing the layer data.
// This uses the setLayers method which is responsible for the re-rendering of the dependent components.
// This function is used in the AddLayer child component.

function addLayer(layer_type,{setLayers}){

  if(layers.layers.length < 2){
    if(layer_type == 'frame'){
      layers.layers.push({
        type: layer_type,
        path: "paste an image URL here",
        placement: {
          "x": 0,
          "y": 0,
          "width": 100,
          "height": 100
        },
        operations: [{
          "color": '',
          "fontSize": ''
        }]
      });
    }
    else{
      layers.layers.push({
        type: layer_type,
        text: 'enter the text here',
        placement: [{
          "x": 0,
          "y": 0
        }],
        operations: []
      });
    }
    setLayers({
      new_layers: layers.layers,
    });

  }
  else{
    alert("This is a demo only so you can add only 2 layers as of now, but it can support multiple layers if required")
  }
}


// The function updateNewLayer is used by the LayerOptions component,
// The function takes input from all the input areas in the layer options box and updates the layers accordingly.

function updateNewLayer({setLayers,stateLayers},el){

  var updated_layers = stateLayers.new_layers;

  var target_id = el.target.parentElement.parentElement.id;

  var edit_values = document.querySelectorAll("#" +target_id+ " #layer-option-content #layer-options-edit div .text-input");

  edit_values.forEach((value)=>{

    updated_layers[target_id.split("-")[1]][value.name] = value.value;
  });
  setLayers({
    new_layers: updated_layers,
  });

}

// function findDuplicates(){
//   console.log(layers.layers);
//   const duplicates = layers.layers.filter((item, index) => layers.layers.indexOf(item) !== index);
//   console.log(duplicates);
// }


export default App;
