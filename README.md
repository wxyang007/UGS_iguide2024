# Urban Green Space Extraction
A repository for team 2 I-GUIDE summer school 2024

This project aims to leverage machine learning algorithms to advance our understanding on the relationship between urban green spaces and heat stress in Southeastern US cities. This repository hosts scripts to extract urban green space via image segmentation as a first step of the project.

<b>Team leader</b>: Dr. Elie Alhajjar

<b>Team members</b>: Joynal Abedin, Maria Gorret Nabuwembo, Rajsree Das Tuli, Ruowei Liu, Wenxin Yang, Yuanquan Li


<br>

# Dataset

Below is a list of data we used and created throughout the analysis.

### Inputs:

- [NAIP images](https://naip-usdaonline.hub.arcgis.com/) downloaded from Google Earth Engine using the script [getNAIP.js](https://github.com/wxyang007/UGS_iguide2024/tree/main/script/getNAIP.js).

- [US cities boundaries](https://www.census.gov/geographies/mapping-files/time-series/geo/cartographic-boundary.2020.html#list-tab-1883739534).

- Park features downloaded from [Open Street Map](https://www.openstreetmap.org/#map=17/43.590710/3.922770). Script at [downloadOSM.R](https://github.com/wxyang007/UGS_iguide2024/tree/main/script/downloadOSM.R). Note that at this preliminary stage we're using parks as proxies of urban green spaces, and will add other features in later steps.

### Intermediate dataset:
- [Image chips](https://drive.google.com/file/d/1o4wPPQPcqJkxTHTmy_ngyu-nRxjUHxeu/view?usp=sharing) for model training. To use this for following steps. First download and unzip. And then run [PreImgSegmtAnnot.ipynb](https://github.com/wxyang007/UGS_iguide2024/tree/main/script/1PrepImgSegmtAnnot.ipynb) before going to [model building notebook](https://github.com/wxyang007/UGS_iguide2024/tree/main/script/2TorchGeo.ipynb)

### Outputs:
- An image segmentation model for extracting urban green spaces.
- Extracted green spaces.


<br>


# Code dependencies

Required packages to run the notebook for [image segmentation](https://github.com/wxyang007/UGS_iguide2024/blob/main/script/2TorchGeo.ipynb):

- torch, [torchgeo](https://github.com/microsoft/torchgeo/tree/main), torchvision, sklearn

- rasterio

- xarray

- splitfolders


<br>


# Appendix
### Packages we considered for image segmentation for remote sensing
1. scikit-eo
2. <b>torchgeo</b>
3. terratorch
4. keras
