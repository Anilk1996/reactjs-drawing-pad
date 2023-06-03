# reactjs-drawing-pad

A Simple Drawing pad, can be used for line drawings, signature, etc...

## Demo
![drawing-pad-demo](https://github.com/Anilk1996/drawing-pad/assets/33311628/dd322741-3aa2-42f8-ba80-adedcd9976b5)



## How to install

```bash
npm install --save reactjs-drawing-pad
```
or
```bash
yarn add reactjs-drawing-pad
```


## Usage

```jsx
import React, { useRef } from "react";
import { Draw } from "reactjs-drawing-pad";

function App = () => {
  const canvasRef = useRef(null);
  return <Draw ref={canvasRef} />;
}
```

## Snippet for getting canvas drawing image

```jsx
import React, { useRef } from "react";
import { Draw } from "reactjs-drawing-pad";

function App() {
  const canvasRef = useRef(null);
  const getImage = () => {
    const image = canvasRef.current.toDataURL();
    // Do Something with image
  };
  return (
    <>
      <button onClick={getImage}>Save</button>
      <Draw ref={canvasRef} />
    </>
  );
}

```

# Props

## ref (Mandatory prop)

## containerProps( we can use all the properties available for a div)
  - Default Props 
``` 
containerProps: {
  style: {
    height: 100,
    width: 200,
    border: "1px solid lightgray",
  }
}
```
## canvasProps (Properties for canvas)
  - Default Props
```
canvasDefaultProps = {
  style: {
    height: "100%",
    width: "100%",
  },
}
```


## Caveats
- Currently, This library is developed on javascript(Js), we'll soon make this library available for typescript(ts).

## License

MIT © [Anilk1996](https://github.com/Anilk1996)