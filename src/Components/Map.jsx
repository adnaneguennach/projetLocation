import React, { useRef, useEffect } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import './map.css';

export default function Map({ announcements = [], onClick }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const morocco = { lat: 31.7917, lng: -7.0926 };
  const zoom = 14;
  maptilersdk.config.apiKey = 'iq83rN0S9qCXsJKg6zGT';

  useEffect(() => {
    if (map.current) return; 

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [morocco.lng, morocco.lat],
      zoom: zoom
    });

    map.current.markers = [];

    if (onClick) {
      map.current.on('click', (e) => {
        e.preventDefault(); 
        const { lng, lat } = e.lngLat;
        onClick({ lng, lat });
        
        const marker = new maptilersdk.Marker()
          .setLngLat([lng, lat])
          .addTo(map.current);

        const popup = new maptilersdk.Popup({ offset: 25 }).setHTML(`
          <div>
            <h3>Selected Location</h3>
            <p>Longitude: ${lng}</p>
            <p>Latitude: ${lat}</p>
          </div>
        `);

        marker.setPopup(popup).togglePopup();

        map.current.markers.forEach(marker => marker.remove());
        map.current.markers = [marker];
      });
    }
  }, [morocco.lng, morocco.lat, zoom, onClick]);

  useEffect(() => {
    if (!map.current) return;

    map.current.markers.forEach(marker => marker.remove());
    map.current.markers = [];

    announcements.forEach((announcement) => {
      const marker = new maptilersdk.Marker()
        .setLngLat([announcement.lng, announcement.lat])
        .addTo(map.current);

      const popup = new maptilersdk.Popup({ offset: 25 }).setHTML(`
        <div>
          <h3>${announcement.title}</h3>
          <p>${announcement.description}</p>
          <p>Price: $${announcement.price}</p>
          <p>Availability: ${announcement.availability}</p>
          <img src="${announcement.imgSrc}" alt="${announcement.title}" style="width: 100px; height: 100px;" />
        </div>
      `);

      marker.setPopup(popup);

      map.current.markers.push(marker);
    });
  }, [announcements]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}