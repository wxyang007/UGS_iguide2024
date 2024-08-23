# Urban Green Space Extraction
A repository for team 2 I-GUIDE summer school 2024
This project aims to leverage machine learning algorithms

<br>
# Dataset
Inputs:
- [NAIP images](https://naip-usdaonline.hub.arcgis.com/) downloaded from Google Earth Engine using the script [getNAIP.js](https://github.com/wxyang007/UGS_iguide2024/tree/main/script/getNAIP.js).
- [US cities boundaries](https://www.census.gov/geographies/mapping-files/time-series/geo/cartographic-boundary.2020.html#list-tab-1883739534).
- Park features downloaded from [Open Street Map](https://www.openstreetmap.org/#map=17/43.590710/3.922770). Script at [downloadOSM.R](https://github.com/wxyang007/UGS_iguide2024/tree/main/script/downloadOSM.R). Note that at this preliminary stage we're using parks as proxies of urban green spaces, and will add other features in later steps.

Intermediate dataset:
- Image chips for model training.

Outputs:
- An image segmentation model for extracting urban green spaces.
-


<br>

# Usage notes
<br>

# Code dependencies
<br>

# Map creation
<br>

# Map validation and error analysis

<br>

# Appendix
### Packages we considered for image segmentation for remote sensing
1. scikit-eo
2. torchgeo
3. terratorch
4. keras
