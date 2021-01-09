---
---
# Emissive Maps (Texture5,Texture14) - WIP
Emissive maps (often abbreviated _emi in texture names) are used for materials that emit their own light. 
In Smash Ultimate, these materials don't actually emit light onto other objects, but emission textures can still be 
used for lights, glowing patterns, or shadeless materials whose color isn't affected by lighting. 

## Emission Color (CustomVector3)
Emission materials use CustomVector3 as a color multiplier for the emissive map. The emissive textures only store values between 0.0 and 1.0, so adding a separate intensity parameter allows for values much higher than 1.0. Very large values for CustomVector3 like (50.0, 50.0, 50.0, 1.0) will increase the size of the "glow" caused by bloom. A value of (0.0, 0.0, 0.0, 0.0) for CustomVector3 effectively disables the emission.

## Emissive Details - WIP

## Shadeless Materials - WIP
