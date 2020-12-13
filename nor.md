---
---
# NOR Maps (Texture4) - WIP
Similar to PRM maps, NOR maps are actually composed of a few different textures.
The red and green channels correspond to the X+ and Y+ direction of the normal map. 
The blue channel is a transition blend map for material transitions. 
The alpha channel is a cavity map. 

## NOR Color Channels
NOR maps do not contain color data despite being stored in a texture.
Avoid saving NOR maps as DDS or Nutexb with
srgb formats. Srgb formats have names that end in _SRGB. When rendering in programs such as Maya or Blender, set the NOR
maps to raw, non color data, or linear to ensure
the values aren't gamma corrected.

### Normal Map X+ (<span style="color:red">Red</span>)

### Normal Map Y+ (<span style="color:green">Green</span>)

### Transition Blend Map (<span style="color:blue">Blue</span>)
The blue channel contains the transition blend map used for transitioning between materials. 
See [Material Transitions](material_transitions) for details and an interactive demo.

### Cavity Map (Alpha)
<img src="{{ "/assets/images/nor/mario_cavity.jpg" | relative_url }}" height="auto" width="auto">
