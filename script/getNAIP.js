/*
Run on Google Earth Engine
This script is intended to download NAIP images for target date and area
Author: Wenxin Yang, 08/07/2024
*/

var yr0 = 2020;
var yrend = 2023;

var aoi = ee.FeatureCollection("users/wenxinyang/houston");
var naip = ee.ImageCollection("USDA/NAIP/DOQQ")
          .filterDate(ee.Date.fromYMD(yr0, 1, 1), ee.Date.fromYMD(yrend, 12, 31));
var naip_aoi = naip.filterBounds(aoi);
var med_naip_aoi = naip_aoi.median();

// var aoi_mask = ee.Image.constant(1).clip(aoi.geometry()).mask();
// var med_aoi_naip = med_naip.updateMask(aoi_mask);

Map.setCenter( -95.37,29.76, 10);
// Map.addLayer(aoi);
Map.addLayer(med_naip_aoi);

Export.image.toDrive({
  image: med_naip_aoi,
  description: yr0,
  folder: 'GEE_Folder',
  region: aoi,
  scale: 30
  // crs: 'EPSG:5070'
});
