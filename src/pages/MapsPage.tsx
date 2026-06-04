import { useState, useRef } from 'react';
import { DashboardTemplate } from '../components/templates/DashboardTemplate/DashboardTemplate';
import { Card } from '../components/atoms/Card/Card';
import { Typography } from '../components/atoms/Typography/Typography';
import { bankLocations } from '../data/bankLocations';
import { 
  Map as MapComponent, 
  MapMarker, 
  MarkerContent, 
  MarkerPopup, 
  MapControls,
  type MapRef 
} from '@/components/ui/map';
import { MapPin, Phone, Navigation, Building2, Search, Map as MapIcon, Loader2, UserRound } from 'lucide-react';
import { cn } from '@/lib/utils';

export const MapsPage = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const mapRef = useRef<MapRef>(null);
  const [userLocation, setUserLocation] = useState<{lng: number, lat: number} | null>(null);
  const [isRouting, setIsRouting] = useState(false);

  const filteredLocations = bankLocations.filter(loc => 
    loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const drawRoute = async (userLng: number, userLat: number, destLng: number, destLat: number) => {
    setIsRouting(true);
    try {
      const response = await fetch(`https://router.project-osrm.org/route/v1/driving/${userLng},${userLat};${destLng},${destLat}?overview=full&geometries=geojson`);
      const data = await response.json();
      
      if (data.routes && data.routes.length > 0) {
        const routeGeoJSON = data.routes[0].geometry;
        const map = mapRef.current;
        
        if (map) {
          if (map.getSource('route')) {
            (map.getSource('route') as any).setData(routeGeoJSON);
          } else {
            map.addSource('route', {
              type: 'geojson',
              data: routeGeoJSON
            });
            map.addLayer({
              id: 'route',
              type: 'line',
              source: 'route',
              layout: {
                'line-join': 'round',
                'line-cap': 'round'
              },
              paint: {
                'line-color': '#10b981', // emerald-500
                'line-width': 6,
                'line-opacity': 0.8
              }
            });
          }
          
          const coordinates = routeGeoJSON.coordinates;
          let minLng = coordinates[0][0];
          let maxLng = coordinates[0][0];
          let minLat = coordinates[0][1];
          let maxLat = coordinates[0][1];
          
          for (const coord of coordinates) {
            if (coord[0] < minLng) minLng = coord[0];
            if (coord[0] > maxLng) maxLng = coord[0];
            if (coord[1] < minLat) minLat = coord[1];
            if (coord[1] > maxLat) maxLat = coord[1];
          }

          map.fitBounds(
            [[minLng, minLat], [maxLng, maxLat]],
            { padding: 80, duration: 1500 }
          );
        }
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    } finally {
      setIsRouting(false);
    }
  };

  const handleLocationClick = (loc: typeof bankLocations[number]) => {
    setSelectedId(loc.id);
    
    mapRef.current?.flyTo({
      center: [loc.lng, loc.lat],
      zoom: 15,
      duration: 1000
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          setUserLocation({ lng: longitude, lat: latitude });
          drawRoute(longitude, latitude, loc.lng, loc.lat);
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        { enableHighAccuracy: true }
      );
    }
  };

  return (
    <DashboardTemplate title="Titik Penjemputan & Bank Sampah">
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-180px)]">
        {/* Sidebar Daftar Lokasi */}
        <div className="w-full lg:w-[400px] flex flex-col gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
            <input 
              type="text" 
              placeholder="Cari lokasi bank sampah..."
              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-100 rounded-2xl focus:border-emerald-500 outline-none transition-all font-medium text-slate-700 shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex-grow overflow-y-auto space-y-3 pr-2 scrollbar-hide">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((location) => (
                <Card 
                  key={location.id} 
                  onClick={() => handleLocationClick(location)}
                  className={cn(
                    "cursor-pointer transition-all duration-300 border-2 p-5 group relative overflow-hidden",
                    selectedId === location.id 
                      ? "border-emerald-500 bg-emerald-50/30 ring-4 ring-emerald-500/5 shadow-md" 
                      : "border-slate-100 bg-white hover:border-emerald-200"
                  )}
                >
                  <div className="flex items-start gap-4 relative z-10">
                    <div className={cn(
                      "p-3 rounded-xl transition-all duration-300",
                      selectedId === location.id 
                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" 
                        : "bg-slate-100 text-slate-400 group-hover:bg-emerald-100 group-hover:text-emerald-500"
                    )}>
                      <Building2 size={20} />
                    </div>
                    <div className="flex-grow">
                      <Typography variant="body" className="font-black text-slate-900 leading-tight mb-1">
                        {location.name}
                      </Typography>
                      <Typography variant="caption" className="text-slate-500 block mb-3 font-bold line-clamp-1">
                        {location.address}
                      </Typography>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                          <Phone size={14} />
                          <span>{location.phone}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                          <Navigation size={14} />
                          <span>Lihat Rute</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                <Search size={40} className="mx-auto text-slate-300 mb-4" />
                <Typography variant="body" className="font-bold text-slate-500">Lokasi tidak ditemukan</Typography>
              </div>
            )}
          </div>
        </div>

        {/* Map Area */}
        <div className="flex-grow relative rounded-[2.5rem] overflow-hidden border-[3px] border-slate-100 shadow-xl bg-slate-50">
          <MapComponent 
            ref={mapRef}
            center={[106.8456, -6.2088]}
            zoom={11}
            className="w-full h-full"
          >
            <MapControls position="bottom-right" showZoom showCompass showLocate />
            
            {userLocation && (
              <MapMarker longitude={userLocation.lng} latitude={userLocation.lat}>
                <MarkerContent>
                  <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-50 scale-150" />
                    <div className="bg-blue-600 text-white p-2 rounded-full shadow-lg relative z-10 border-2 border-white">
                      <UserRound size={16} />
                    </div>
                  </div>
                </MarkerContent>
              </MapMarker>
            )}

            {isRouting && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-[100] border border-slate-100 text-sm font-bold text-slate-600">
                <Loader2 size={16} className="animate-spin text-emerald-500" />
                Mencari rute terbaik...
              </div>
            )}

            {bankLocations.map((location) => (
              <MapMarker 
                key={location.id}
                longitude={location.lng} 
                latitude={location.lat}
                onClick={() => setSelectedId(location.id)}
              >
                <MarkerContent>
                  <div className={cn(
                    "flex flex-col items-center group transition-transform duration-300 hover:scale-110",
                    selectedId === location.id && "scale-110"
                  )}>
                    <div className={cn(
                      "p-2.5 rounded-2xl shadow-xl border-2 transition-all duration-300",
                      selectedId === location.id 
                        ? "bg-emerald-500 text-white border-white scale-125 z-50 ring-[10px] ring-emerald-500/10" 
                        : "bg-white text-emerald-600 border-emerald-100 group-hover:bg-emerald-50"
                    )}>
                      <MapPin size={24} fill={selectedId === location.id ? "white" : "currentColor"} />
                    </div>
                    {/* Pulsing effect for selected marker */}
                    {selectedId === location.id && (
                      <div className="absolute inset-0 bg-emerald-500 rounded-2xl animate-ping opacity-20 -z-10" />
                    )}
                  </div>
                </MarkerContent>
                
                <MarkerPopup 
                  closeButton 
                  className="!p-0 !rounded-3xl overflow-hidden border-none shadow-2xl min-w-[280px]"
                >
                  <div className="bg-emerald-600 p-6 text-white relative">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8" />
                    <Typography variant="body" className="font-black text-lg leading-tight relative z-10">
                      {location.name}
                    </Typography>
                    <div className="flex items-center gap-2 mt-2 opacity-80 relative z-10">
                      <Building2 size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Fasilitas Resmi</span>
                    </div>
                  </div>
                  <div className="p-6 bg-white space-y-5">
                    <div>
                      <Typography variant="caption" className="text-slate-400 font-black uppercase tracking-widest mb-2 block text-[10px]">Alamat Lengkap</Typography>
                      <Typography variant="body" className="text-slate-600 text-sm font-bold leading-relaxed">
                        {location.address}
                      </Typography>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex flex-col">
                        <Typography variant="caption" className="text-slate-400 font-black uppercase tracking-widest mb-1 block text-[10px]">Kontak</Typography>
                        <Typography variant="body" className="text-slate-900 text-sm font-black">{location.phone}</Typography>
                      </div>
                      <a 
                        href={`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0"
                      >
                        <button className="bg-emerald-600 text-white px-5 py-3 rounded-2xl font-black text-xs shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 transition-all flex items-center gap-2">
                          <Navigation size={14} />
                          RUTE
                        </button>
                      </a>
                    </div>
                    
                    {/* Denah/Floor plan placeholder since it was requested */}
                    <div className="pt-4 border-t-2 border-slate-50">
                      <div className="bg-slate-50 rounded-2xl p-4 flex flex-col items-center justify-center border-2 border-dashed border-slate-200">
                        <MapIcon size={32} className="text-slate-300 mb-2" />
                        <Typography variant="caption" className="text-slate-400 font-bold">Denah Fasilitas Tersedia di Lokasi</Typography>
                      </div>
                    </div>
                  </div>
                </MarkerPopup>
              </MapMarker>
            ))}
          </MapComponent>
        </div>
      </div>
    </DashboardTemplate>
  );
};
