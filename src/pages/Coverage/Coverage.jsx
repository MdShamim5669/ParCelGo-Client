import React, { useState, useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import warehouses from '../../data/warehouses.json';

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

// Center roughly on Bangladesh
const center = {
  lat: 23.6850,
  lng: 90.3563
};

const Coverage = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);

    // Filter active warehouses based on search query
    const filteredWarehouses = useMemo(() => {
        return warehouses.filter(w => {
            if (w.status !== 'active') return false;
            
            const query = searchQuery.toLowerCase();
            const matchCity = w.city?.toLowerCase().includes(query);
            const matchDistrict = w.district?.toLowerCase().includes(query);
            const matchArea = w.covered_area?.some(area => area.toLowerCase().includes(query));
            
            return matchCity || matchDistrict || matchArea;
        });
    }, [searchQuery]);

    if (loadError) return <div className="text-center py-24 text-red-500 font-bold">Error loading maps. Check your API Key.</div>;
    if (!isLoaded) return <div className="text-center py-24 text-gray-500 font-bold">Loading maps...</div>;

    return (
        <div className="min-h-screen bg-zap-gray pb-20">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#113236] mb-4 tracking-tight">Our Coverage Area</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto text-[15px] leading-relaxed">
                        Find out if we deliver to your area. Browse our active warehouses and delivery zones across the country.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 bg-white p-6 md:p-8 rounded-[2rem] shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
                    
                    {/* Sidebar / Directory */}
                    <div className="w-full lg:w-1/3 flex flex-col h-[600px]">
                        <h2 className="text-2xl font-bold text-[#113236] mb-6">Directory</h2>
                        
                        {/* Search Input */}
                        <div className="relative mb-6">
                            <input 
                                type="text" 
                                placeholder="Search city, district, or area..." 
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-11 text-[15px] focus:outline-none focus:border-[#c4f05b] focus:ring-1 focus:ring-[#c4f05b] transition-colors"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <svg className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>

                        {/* List */}
                        <div className="flex-grow overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                            {filteredWarehouses.length > 0 ? (
                                filteredWarehouses.map((warehouse, idx) => (
                                    <div 
                                        key={idx} 
                                        className={`border rounded-xl p-4 transition-all cursor-pointer bg-white ${selectedWarehouse?.city === warehouse.city ? 'border-[#c4f05b] shadow-md ring-1 ring-[#c4f05b]/20' : 'border-gray-100 hover:border-[#c4f05b] hover:shadow-sm'}`}
                                        onClick={() => setSelectedWarehouse(warehouse)}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-[#113236] text-[16px]">{warehouse.city}</h3>
                                            <span className="bg-[#eef8f8] text-[#3a837c] text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                                                Active
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-3"><span className="font-semibold text-gray-700">District:</span> {warehouse.district}</p>
                                        
                                        <div className="flex flex-wrap gap-2">
                                            {warehouse.covered_area?.slice(0, 4).map((area, aIdx) => (
                                                <span key={aIdx} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md">
                                                    {area}
                                                </span>
                                            ))}
                                            {warehouse.covered_area?.length > 4 && (
                                                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md font-medium">
                                                    +{warehouse.covered_area.length - 4} more
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10 text-gray-400">
                                    No coverage areas found matching your search.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Map Area */}
                    <div className="w-full lg:w-2/3 h-[400px] lg:h-[600px] rounded-[1.5rem] overflow-hidden border border-gray-100 bg-gray-50 relative">
                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            zoom={selectedWarehouse ? 11 : 7}
                            center={selectedWarehouse ? { lat: selectedWarehouse.latitude, lng: selectedWarehouse.longitude } : center}
                            options={{
                                disableDefaultUI: true,
                                zoomControl: true,
                                styles: [
                                    { "featureType": "all", "elementType": "geometry.fill", "stylers": [{ "weight": "2.00" }] },
                                    { "featureType": "all", "elementType": "geometry.stroke", "stylers": [{ "color": "#9c9c9c" }] },
                                    { "featureType": "all", "elementType": "labels.text", "stylers": [{ "visibility": "on" }] },
                                    { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f2f2f2" }] },
                                    { "featureType": "landscape", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }] },
                                    { "featureType": "landscape.man_made", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }] },
                                    { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] },
                                    { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 45 }] },
                                    { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "color": "#eeeeee" }] },
                                    { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#7b7b7b" }] },
                                    { "featureType": "road", "elementType": "labels.text.stroke", "stylers": [{ "color": "#ffffff" }] },
                                    { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }] },
                                    { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
                                    { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] },
                                    { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#46bcec" }, { "visibility": "on" }] },
                                    { "featureType": "water", "elementType": "geometry.fill", "stylers": [{ "color": "#c8d7d4" }] },
                                    { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#070707" }] },
                                    { "featureType": "water", "elementType": "labels.text.stroke", "stylers": [{ "color": "#ffffff" }] }
                                ]
                            }}
                        >
                            {filteredWarehouses.map((warehouse, idx) => (
                                <Marker
                                    key={idx}
                                    position={{ lat: warehouse.latitude, lng: warehouse.longitude }}
                                    onClick={() => setSelectedWarehouse(warehouse)}
                                />
                            ))}

                            {selectedWarehouse && (
                                <InfoWindow
                                    position={{ lat: selectedWarehouse.latitude, lng: selectedWarehouse.longitude }}
                                    onCloseClick={() => setSelectedWarehouse(null)}
                                >
                                    <div className="p-2 max-w-[200px]">
                                        <h3 className="font-bold text-[#113236] text-[15px] mb-1">{selectedWarehouse.city}</h3>
                                        <p className="text-xs text-gray-500 mb-2">{selectedWarehouse.district}</p>
                                        <div className="text-xs text-gray-600 font-medium border-t pt-2">
                                            <span className="block mb-1 font-bold text-gray-800">Covered Areas:</span>
                                            {selectedWarehouse.covered_area?.join(', ')}
                                        </div>
                                    </div>
                                </InfoWindow>
                            )}
                        </GoogleMap>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Coverage;
