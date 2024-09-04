import { useState, useEffect } from 'react';

export const useLocationStorage = () => {
  const [location, setLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({
    latitude: null,
    longitude: null,
  });
  const [locationGranted, setLocationGranted] = useState<boolean | null>(null); // Track permission
  const [locationLoaded, setLocationLoaded] = useState(false); // Untuk menandai apakah lokasi sudah didapat

  // Load lokasi dari localStorage saat komponen dimount
  useEffect(() => {
    const storedLocation = localStorage.getItem('userLocation');
    if (storedLocation) {
      const { latitude, longitude } = JSON.parse(storedLocation);
      if (latitude && longitude) {
        setLocation({ latitude, longitude });
        setLocationGranted(true);
        setLocationLoaded(true); // Lokasi sudah terisi
        return;
      }
    }

    // Jika lokasi belum ada di localStorage, minta akses geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('Location access granted', { latitude, longitude });

          // Simpan lokasi ke localStorage
          localStorage.setItem(
            'userLocation',
            JSON.stringify({ latitude, longitude }),
          );
          setLocation({ latitude, longitude }); // Set state dengan lokasi baru
          setLocationGranted(true);
          setLocationLoaded(true); // Lokasi sudah terisi
        },
        (error) => {
          console.error('Location access denied', error);
          setLocationGranted(false);
          setLocationLoaded(true); // Lokasi gagal diambil, tapi kita tandai proses selesai
        },
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setLocationLoaded(true); // Geolocation tidak didukung
    }
  }, []);

  // uuntuk nyimpan lokasi ke localStorage
  const saveLocation = (latitude: number, longitude: number) => {
    const locationData = { latitude, longitude };
    localStorage.setItem('userLocation', JSON.stringify(locationData));
    setLocation(locationData); // Update state dengan lokasi baru
  };

  return { location, locationGranted, locationLoaded, saveLocation };
};
