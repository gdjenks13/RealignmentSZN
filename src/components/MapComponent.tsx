import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2RqZW5rczEzIiwiYSI6ImNtMW1hdGsxYzBkYjUyaXEzdHZ3OWJraGgifQ.ivfwCpKlPGICra1S6uPJBA';

const MapComponent: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-98.5795, 39.8283], // Center on USA
        zoom: 4,
      });

      map.on('load', function() {
        // Ensure the path to the GeoJSON file is correct
        fetch('/us-states.json')
          .then(response => response.json())
          .then(data => {
            map.addSource('states', {
              type: 'geojson',
              data: data
            });

            map.addLayer({
              id: 'state-fills',
              type: 'fill',
              source: 'states',
              layout: {},
              paint: {
                'fill-color': '#888888',
                'fill-opacity': 0.4
              }
            });

            map.addLayer({
              id: 'state-borders',
              type: 'line',
              source: 'states',
              layout: {},
              paint: {
                'line-color': '#111111',
                'line-width': 1
              }
            });
          })
          .catch(error => {
            console.error('Error loading GeoJSON data:', error);
          });
      });

      return () => map.remove();
    }
  }, []);

  return <div 
  ref={mapContainerRef} 
  className="map-container" 
  style={{ width: '100%', height: '100%' }} />;
};

export default MapComponent;