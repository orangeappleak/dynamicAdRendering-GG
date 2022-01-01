import { useEffect, useState } from "react";

function DynamicAddSpace({stateLayers}){

    useEffect(() => {
        alert("layer added");
        console.log(stateLayers.new_layers);
    },[stateLayers]);

    return(
        <div id="dynamic-ad-space">
            <h2>This is your advert.</h2>
        </div>
    )
}

export default DynamicAddSpace;