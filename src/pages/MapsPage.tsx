import { DashboardTemplate } from '../components/templates/DashboardTemplate/DashboardTemplate';
import { Card } from '../components/atoms/Card/Card';
import { Typography } from '../components/atoms/Typography/Typography';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { bankLocations } from '../data/bankLocations';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

export const MapsPage = () => {
  return (
    <DashboardTemplate title="Bank Sampah Elektronik Terdekat">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="p-0 overflow-hidden min-h-[320px] md:min-h-[420px] lg:h-[600px] border border-hairline-soft">
            <MapContainer 
              center={[-6.2088, 106.8456]} 
              zoom={12} 
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {bankLocations.map((location) => (
                <Marker key={location.id} position={[location.lat, location.lng]}>
                  <Popup>
                    <div className="p-2">
                      <p className="font-bold text-ink-deep">{location.name}</p>
                      <p className="text-xs text-slate-500 mt-1">{location.address}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </Card>
        </div>

        <div className="space-y-4 min-h-[320px] md:min-h-[420px] lg:h-[600px] overflow-y-auto pr-2">
          <Typography variant="h3" className="mb-4">Daftar Lokasi</Typography>
          {bankLocations.map((location) => (
            <Card key={location.id} className="hover:border-primary transition-colors cursor-pointer group">
              <div className="flex justify-between items-start mb-2">
                <Typography variant="body" className="font-bold group-hover:text-primary transition-colors">
                  {location.name}
                </Typography>
              </div>
              <Typography variant="caption" className="text-slate-500 mb-4 block leading-relaxed">
                {location.address}
              </Typography>
              <div className="flex gap-2">
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-grow"
                >
                  <button className="w-full btn-secondary py-2 text-xs">Petunjuk Arah</button>
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardTemplate>
  );
};
