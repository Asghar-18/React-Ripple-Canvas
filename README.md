# Ripple Canvas

A customizable React component that creates a ripple effect on a canvas. The component is built using TypeScript and leverages the `dat.gui` library for real-time control of the ripple and canvas settings.

## Features

- Ripple effect that follows the mouse movement on the canvas.
- Customizable settings including ripple size, animation speed, stroke color, and canvas blur.
- Real-time control through `dat.gui`.

## Installation

You can install the component via NPM:

```bash
npm install ripple-canvas
``` 

## Usage

Import and use the RippleCanvas component in your React application:

```bash
import React from 'react';
import { RippleCanvas } from 'ripple-canvas';

const App: React.FC = () => {
  return (
    <div>
      <h1>Ripple Effect</h1>
      <RippleCanvas />
    </div>
  );
};

export default App;
``` 

## Customization

### Ripple Settings

You can customize the ripple effect by modifying the `rippleSettings` object inside the `RippleCanvas` component:

- `maxSize`: Maximum size of the ripple.
- `animationSpeed`: Speed at which the ripple expands.
- `strokeColor`: Color of the ripple stroke in RGB format.

### Canvas Settings

You can also customize the canvas itself by modifying the `canvasSettings` object:

`blur`: Amount of blur applied to the canvas.
`ratio`: Ratio of the canvas size relative to the viewport.

### Example
To customize the settings directly within the component:

```bash
const rippleSettings = {
  maxSize: 200,
  animationSpeed: 10,
  strokeColor: [255, 100, 100], // Red color
};

const canvasSettings = {
  blur: 5,
  ratio: 1.5,
};
```

## dat.gui Integration
This component uses `dat.gui` for real-time adjustments of the ripple and canvas settings. When you hover over the canvas, a GUI will appear, allowing you to tweak the settings live.

## Adding GUI Controls
If you wish to add more controls or modify existing ones, you can do so by editing the `addGuiSettings` function in the component:

```bash
const addGuiSettings = () => {
  const gui = new dat.GUI();
  gui.add(rippleSettings, 'maxSize', 0, 1000).step(1);
  gui.add(rippleSettings, 'animationSpeed', 1, 30).step(1);
  gui.addColor(rippleSettings, 'strokeColor');

  const blur = gui.add(canvasSettings, 'blur', 0, 20).step(1);
  blur.onChange((value: number) => {
    canvas.style.filter = `blur(${value}px)`;
  });
};
```

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
The `dat.gui` library for providing a simple way to create GUI controls.
The React and TypeScript communities for their ongoing support and resources.