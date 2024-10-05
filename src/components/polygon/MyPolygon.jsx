import Head from 'next/head';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import pointImage from '../../styles/images/point.png'

const GOOGLE_KEY ="Your google key";

const MyPolygon = () => {
  const [polygonCoords, setPolygonCoords] = useState([
    { lat: 28.5774 + 0.05, lng: 77.3145 },
    { lat: 28.5774 + 0.025, lng: 77.3145 + 0.043 },
    { lat: 28.5774 - 0.025, lng: 77.3145 + 0.043 },
    { lat: 28.5774 - 0.05, lng: 77.3145 },
    { lat: 28.5774 - 0.025, lng: 77.3145 - 0.043 },
    { lat: 28.5774 + 0.025, lng: 77.3145 - 0.043 },
  ]);

  const submitFun = () => {
    console.log("polygonCoords:", polygonCoords);
  };

  useEffect(() => {
    window.initMap = initMap;
  }, []);

  const initMap = () => {
    const initialMap = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 28.5774, lng: 77.3145 },
      zoom: 13,
    });

    const polygonShape = new google.maps.Polygon({
      paths: polygonCoords,
      strokeColor: 'blue',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: 'skyblue',
      fillOpacity: 0.35,
    });

    polygonShape.setMap(initialMap);

    polygonCoords.forEach((coord, index) => {
      const marker = new google.maps.Marker({
        position: coord,
        map: initialMap,
        title: `Lat: ${coord.lat}, Lng: ${coord.lng}`,
        draggable: true,
        icon: {
          url:pointImage.src, 
          scaledSize: new google.maps.Size(40, 40),
        },
      });

      marker.addListener('drag', (event) => {
        const newPos = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };

        setPolygonCoords((prevCoords) => {
          const updatedCoords = [...prevCoords];
          updatedCoords[index] = newPos;
          polygonShape.setPath(updatedCoords);
          return updatedCoords;
        });
      });
    });
  };

  return (
    <div>
      <Head>
        <title>My Polygon Map</title>
      </Head>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key= ${GOOGLE_KEY}&callback=initMap&v=weekly&libraries=marker`}
        strategy="lazyOnload"
        async // Added async for better performance
        onLoad={() => {
          console.log('Google Maps script loaded.');
        }}
      />
      <div>
        <div id="map" style={{ height: '860px', width: '100%' }} />
        <div>
          <button type='button' onClick={submitFun}>Click me!</button>
        </div>
      </div>
    </div>
  );
};

export default MyPolygon;
