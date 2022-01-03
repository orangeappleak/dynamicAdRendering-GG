import { useEffect } from "react";



//This is the dynamic ad space component and it is responsible for rendering the main ad.
//This component updates based on the changes that are being done to the layers.json file or the layers json data.

function DynamicAddSpace({stateLayers}){

    var display_layers = [];

    useEffect(() => {
        display_layers = stateLayers.new_layers;
        console.log(stateLayers.new_layers);
        // console.log(stateLayers.new_layers);
    },[stateLayers]);


    //In this return we are checking the type of the layer that is being added and we are making use of 2 other components
    //to make it readable and simple to understand.

    return <div id="main-ad-division">
        {stateLayers.new_layers.map((layer) => {
            return layer.type == "frame" ? <FrameLayer layer={layer}/> : <TextLayer layer={layer}/>
        })}
    </div>
}

//The FrameLayer is responsible for rendering the main frame layer, which is the background, on to the dynamic ad space.

function FrameLayer({layer}){
    console.log("The position is:",layer.placement);

    var placement_values;
    var operation_values;

    // The 2 try blocks check whether the placement and opertion text fields are empty or not.
    // they are redundant, but due to time constraints could not find a better way.

    try{
        
        // Here we are splitting the input in order to convert it to an object so that the values 
        // can be maintained and read properly.
        placement_values =  JSON.stringify(layer.placement).replaceAll(" ","").split("{")[1].split("}")[0].split(',');
    }

    catch(e){}

    try{
        operation_values = JSON.stringify(layer.operations).replaceAll(" ","").split("{")[1].split("}")[0].split(',');
    }

    catch(e){}

    // The obj_plac_values and the obj_operation_vals store the default values if nothing is inputted.
    // if input is passed they just updated the value that is passed in the input field leaving the remaining values to default.

    var obj_plac_values={
        x: 0,
        y: 0,
        width: "100%",
        height: "100%",
    }

    var obj_operation_vals={
        bgColor: 'none'
    }

    // Again these 2 if blocks are redundant but they function, they check if no abnormal values are being passed in the input fields.

    if(placement_values!= undefined){

        // Here we are getting each individual value and updating the obj_plac_values.
        placement_values.map((val) => {
            val = val.split(':');
            obj_plac_values[val[0]] = val[1]; 
        })
    }

    if(operation_values != undefined){
        operation_values.map((val)=>{
            val = val.split(':');
            obj_operation_vals[val[0]] = val[1];
        })
    }

        // Finally the return statement returns the frame layer with the proposed operations and placements.
        return <div className="frame">
            <div style={{
                backgroundColor: obj_operation_vals.bgColor,
                transform: `translate(${obj_plac_values.x}%,${obj_plac_values.y}%)`,
                width: obj_plac_values.width,
                 height: obj_plac_values.height
            }} id="image-color"></div>
            <img src={layer.path} style={{
                transform: `translate(${obj_plac_values.x}%,${obj_plac_values.y}%)`,
        }} width={obj_plac_values.width} height={obj_plac_values.height}>{layer.text}</img>
        </div>
}

function TextLayer({layer}){


    // line 96-135 perform the exact same operation as line 34-81, these line can be put into a single function
    // but due to the time limitations I just copied the lines.

    var placement_values;
    var operation_values;

    try{
       placement_values =  JSON.stringify(layer.placement).replaceAll(" ","").split("{")[1].split("}")[0].split(',');
    }

    catch(e){}

    try{
        operation_values = JSON.stringify(layer.operations).replaceAll(" ","").split("{")[1].split("}")[0].split(',');
    }

    catch(e){}

    console.log("OPERATION VALUes",operation_values);

    var obj_plac_values={
        x: 0,
        y: 0
    }

    var obj_operation_vals={
        "color": 'black',
        "fontSize": '22px'
    }

    if(placement_values!= undefined){
        placement_values.map((val) => {
            val = val.split(':');
            obj_plac_values[val[0]] = val[1]; 
        })
    }

    if(operation_values != undefined){
        operation_values.map((val)=>{
            val = val.split(':');
            obj_operation_vals[val[0]] = val[1];
        })
    }

    // The return statement returns the text layer with the proposed operations and placements.
    // The text layer is always on top as mentioned in the instructions.

        return <div style={{
            transform: `translate(${obj_plac_values.x}%,${obj_plac_values.y}%)`,
        }} className="text">
            <h1 style={{
                fontSize: obj_operation_vals['fontSize'],
                color: obj_operation_vals['color']
            }}>{layer.text}</h1>
        </div>
        

    }

export default DynamicAddSpace;