/*
Run on Google Earth Engine
This script is intended to download NDVI and extract Urban Green Spaces (UGS)
Author: Yuanquan Li, 08/07/2024
Credits to: Estacio et al. (2024) and https://code.earthengine.google.com/88c5bc43183fe42877194b640fc675f5
*/


// Load the US counties dataset from the TIGER/Line collection
var counties = ee.FeatureCollection('TIGER/2018/Counties');

// Filter for Harris County (Houston)
var houston = counties.filter(ee.Filter.eq('NAME', 'Harris'));

// Center the map on Houston
Map.centerObject(houston, 10);

// Load the Landsat 8 ImageCollection (Collection 2, Level 2)
// Using a longer time span to capture seasonal variations
var collection = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
  .filterBounds(houston)
  .filterDate('2023-01-01', '2023-12-31') // Full year to cover seasonal variations
  .filter(ee.Filter.lt('CLOUD_COVER', 20)) // Filter for low cloud cover
  .map(function(image) {
    // Function to mask clouds using the pixel quality band
    var qa = image.select('QA_PIXEL');
    var cloudBitMask = 1 << 3; // Bit 3 is for clouds
    var cloudShadowBitMask = 1 << 4; // Bit 4 is for cloud shadows
    var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cloudShadowBitMask).eq(0));
    return image.updateMask(mask);
  })
  .map(function(image) {
    // Convert DN to surface reflectance
    return image.select(['SR_B4', 'SR_B5'])
      .multiply(0.0000275)
      .add(-0.2)
      .set('system:time_start', image.get('system:time_start')); // Keep time property for temporal analysis
  });

// Calculate NDVI for each image
var ndviCollection = collection.map(function(image) {
  return image.normalizedDifference(['SR_B5', 'SR_B4']).rename('NDVI')
    .set('system:time_start', image.get('system:time_start'));
});

// Compute the median NDVI image to represent the whole year
var medianNdvi = ndviCollection.median().clip(houston);

// Define NDVI threshold for green spaces
var ndviThreshold = 0.3; // Balanced threshold to capture meaningful greenspaces

// Create a binary mask for green spaces
var greenSpaces = medianNdvi.gt(ndviThreshold).rename('Green_Spaces');

// Convert the binary mask to vectors (object-based method)
var greenSpacesVector = greenSpaces.selfMask().reduceToVectors({
  geometry: houston.geometry(),
  scale: 30,
  geometryType: 'polygon',
  maxPixels: 1e9,
  bestEffort: true,
  eightConnected: true,
  reducer: ee.Reducer.countEvery()
});

// Filter out polygons with less than 25 pixels
greenSpacesVector = greenSpacesVector.filter(ee.Filter.gt('count', 25));

// Calculate geometric properties (area and perimeter) for each green space object
var greenSpacesWithProperties = greenSpacesVector.map(function(feature) {
  var area = feature.geometry().area();
  var perimeter = feature.geometry().perimeter();
  return feature.set({'area': area, 'perimeter': perimeter});
});

// Print the geometric properties of each green space object
print('Green Spaces with Properties:', greenSpacesWithProperties);

// Clip NDVI and filtered green spaces to the Houston boundary
var clippedGreenSpaces = greenSpacesWithProperties;

// Define visualization parameters for NDVI and green spaces
var ndviParams = {
  min: 0,
  max: 1,
  palette: ['blue', 'white', 'green']
};

var greenSpacesParams = {
  color: 'green',
  opacity: 0.7 // Increased opacity for better visualization
};

var boundaryParams = {
  color: 'red',
  opacity: 0.5,
  width: 2
};

// Add NDVI layer to the map
Map.addLayer(medianNdvi, ndviParams, 'Median NDVI');

// Add green spaces layer to the map
Map.addLayer(clippedGreenSpaces, greenSpacesParams, 'Filtered Green Spaces');

// Add Houston boundary layer to the map
Map.addLayer(houston, boundaryParams, 'Houston Boundary');

// Print NDVI and green spaces images to the console for analysis
print('Median NDVI Image:', medianNdvi);
print('Filtered Green Spaces Image:', clippedGreenSpaces);
print('Houston Boundary:', houston);
