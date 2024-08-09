# Download OSM data
# Author: Wenxin Yang, 08/07/2024
# This script is intended to use the OSM api to download
# OSM features of interest in our study area

library(sf)
library(osmdata)
library(tmap)

# ===== Define our study area: urban areas of Houston ====
urban_cities <- st_read('/Users/wenxinyang/Desktop/SideProj/iguide2024/data/cb_2020_us_ua20_corrected_500k/cb_2020_us_ua20_corrected_500k.shp')

hst <- urban_cities[urban_cities$NAME20=="Houston, TX",]
my_bbox <- st_bbox(hst)

# ====== park data download =======
my_parks <- opq(my_bbox) %>%
  add_osm_feature(key = "leisure", value = "park") %>%
  osmdata_sf()

park_polygon <- my_parks$osm_polygons
park_polygon
length(park_polygon)

park_multipolygon <- my_parks$osm_multipolygons
park_multipolygon

# ===== save to local machine ======
simple_version <- park_polygon[c('name', 'geometry')]
st_write(simple_version, '/Users/wenxinyang/Desktop/sideproj/iguide2024/data/park_hst.geojson')
st_write(simple_version, '/Users/wenxinyang/Desktop/sideproj/iguide2024/data/park_hst.shp')
st_write(lakes_multipolygon, '/Users/wenxinyang/Desktop/Flood/train/chn_water/osm_water_multipol_xx.geojson')