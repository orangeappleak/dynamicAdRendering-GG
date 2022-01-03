# dynamicAdRendering-GG
An assignment for GreedyGame

# Dynamic Ad Rendering

Advertisers are constantly looking at ways of capturing the attention of the user. In order
to do this, ads can be made dynamically from some basic elements. With the set of
instructions defined below, you are tasked with creating dynamic ads based on a JSON file
input.

# Instructions
All elements of an ad are bound together with layers. There are two types of layers for this
assignment:
1. Text Layer
2. Frame Layer
Every layer is applied on top of another with a fixed priority. In this case, the Text Layer is
always applied on top of the frame layer. A layer typically has the following fields:
1. Type: can be “text” or “frame”
2. Placement: Where is this layer exactly placed to create an ad on the plane
3. Properties: Valid operations on top of this particular layer
For example, consider the following basic layer:

```js
{
  "layers": [
    {
      "type":"text",
      "placement":[
        {
          "position":{
            "x":0,
            "y":0,
            "width":200,
            "height":200
            }
         }]
     }
   ]
}       
```

In the placement property, the x,y fields denote where the rendering has to start. The
height and width define the size of this layer.
Now if we introduce some property on this layer like color, the output should change
accordingly. Consider the following input:

```js
{
"layers":[
  {
    "type":"text",
    "placement": [
          {
              "position":{
                  "x":0,
                  "y":0,
                  "width":200,
                  "height":200
              }
          }],

          "operations": [{
              "name":"color",
              "argument":"#D97F78"
            }]
          }
      ]
}
```

A frame layer defines the background on which a Text Layer is rendered. If there is no
specification of the frame layer, the output is considered to be on a white background.

Consider the following JSON to understand this layer:
```js
{
  "layers":[
    {
      "type":"frame",
      "path":"http://lab.greedygame.com/arpit-dev/unity-assignment/assets/wcc2_f2.png",
      "placement": [
       {
        "position":{
          "x":0,
          "y":0,
          "width":650,
          "height":230
        }
        }]
     }
   ]
}
```

On the Frame layer, the operations like color can be applied as shown below:

```js
{
  "layers":[
   {
      "type":"frame",
      "path":"http://lab.greedygame.com/arpit-dev/unity-assignment/assets/wcc2_f2.png",
      "placement": [
        {
          "position":{
            "x":0,
            "y":0,
            "width":650,
            "height":230
          } 
        }],
        "operations": [
          {
            "name":"color",
            "argument":"#77FF0000"
          }
        ]
        }
    ]
}
```


Your task is to render a Text ad (the text for the ad will be an input from the user) with a
JSON template consisting of the layers and properties mentioned above.

Your solution should be able to handle multiple layer renderings (not more than one layer
of each type i.e only one text layer, one frame layer). Take care of conditions which would
make the template unrenderable (what happens when the image path in the frame layer is
not a valid image?). In such conditions, you have to declare the template as “invalid”.
