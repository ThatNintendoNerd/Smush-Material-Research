# Color Set Attributes - WIP
The attribute names with "colorSet" store vertex color data. Color set attribute data is stored as RGBA colors with unsigned integer values from 0 to 255. The integer values are then converted to floating point values in the range 0.0 to *scale* where *scale* depends on the type of color set. 

Whether or not the mesh's color set attribute data is used depends on the shader. For example, it's common for fighter meshes to have a colorSet1 attribute but use a shader that never references the colorSet1 data. The latest version of [Cross Mod](https://github.com/Ploaj/SSBHLib/releases) enables or disables color set rendering based on the shader listed in the material. 

## Vertex Color (colorSet1/colorSet3)




