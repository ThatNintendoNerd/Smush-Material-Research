---
---
# Alpha Blending - WIP
Smash Ultimate uses alpha blending to simulate the appearance of transparent or translucent materials such as water, glass, smoke, etc. 
A background color called the "destination color" or "dst color" is blended with a foreground color called the "source color" or "src color". The effect is very similar to layer blend modes in Gimp or Photoshop. 

## Blend Modes 

## Render Order
1. _opaque
2. _far
3. _sort
4. *bloom and post processing*
5. _near