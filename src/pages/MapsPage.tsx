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

  // Calculate distance between two points in km
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  };

  const sortedLocations = [...bankLocations].map(loc => {
    if (userLocation) {
      return {
        ...loc,
        distance: calculateDistance(userLocation.lat, userLocation.lng, loc.lat, loc.lng)
      };
    }
    return { ...loc, distance: null };
  }).sort((a, b) => {
    if (a.distance !== null && b.distance !== null) {
      return a.distance - b.distance;
    }
    return 0;
  });

  const filteredLocations = sortedLocations.filter(loc => 
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

  // Get user location on mount for real-time distance
  useState(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          setUserLocation({ lng: longitude, lat: latitude });
        },
        null,
        { enableHighAccuracy: true }
      );
    }
  });

  return (
    <DashboardTemplate title="Lokasi Penukaran Bank Sampah">
      <div className="flex flex-col lg:flex-row gap-6 h-auto lg:h-[calc(100vh-180px)]">
        {/* Sidebar Daftar Lokasi */}
        <div className="w-full lg:w-[400px] flex flex-col gap-4 max-h-[400px] lg:max-h-none">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
            <input 
              type="text" 
              placeholder="Cari lokasi penukaran..."
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
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <Typography variant="body" className="font-black text-slate-900 leading-tight">
                          {location.name}
                        </Typography>
                        {location.distance !== null && (
                          <Typography variant="caption" className="text-emerald-600 font-black whitespace-nowrap">
                            {location.distance.toFixed(1)} km
                          </Typography>
                        )}
                      </div>
                      <Typography variant="caption" className="text-slate-500 block mb-3 font-bold line-clamp-1">
                        {location.address}
                      </Typography>
                      {selectedId === location.id && location.imageUrl && (
                        <div className="mb-4 rounded-xl overflow-hidden h-32 w-full animate-in fade-in zoom-in duration-300">
                          <img src={location.imageUrl} alt={location.name} className="w-full h-full object-cover" />
                        </div>
                      )}
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
        <div className="flex-grow relative rounded-[2.5rem] overflow-hidden border-[3px] border-slate-100 shadow-xl bg-slate-50 h-[600px] lg:h-auto">
          <MapComponent 
            ref={mapRef}
            center={[119.4327, -5.1476]} // Makassar Center
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
                  <div className="relative h-40 w-full overflow-hidden">
                    <img src={location.imageUrl} alt={location.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <Typography variant="body" className="font-black text-white leading-tight relative z-10">
                        {location.name}
                      </Typography>
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
