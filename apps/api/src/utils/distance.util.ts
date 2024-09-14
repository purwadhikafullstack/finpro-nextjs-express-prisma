const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};

const rad2deg = (rad: number) => {
  return rad * (180 / Math.PI);
};

/**
 * Function to calculate the distance between two points using the haversine formula
 * @note R is a constant, the radius of the earth in kilometers
 * @param lat1 latitude of point 1
 * @param lon1 longitude of point 1
 * @param lat2 latitude of point 2
 * @param lon2 longitude of point 2
 * @returns distance between two points in kilometers
 */
export const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radius of Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
};

/**
 * Function to get threshold maximum latitude and longitude using the haversine formula
 * @note R is a constant, the radius of the earth in kilometers
 * @param lat center latitude
 * @param lon center longitude
 * @param radius radius in kilometers
 * @returns threshold start and end for latitude and longitude { latStart, latEnd, lonStart, lonEnd }
 */
export const getTreshold = (lat: number, lon: number, radius: number) => {
  const R = 6371;

  const latStart = lat - rad2deg(radius / R);
  const latEnd = lat + rad2deg(radius / R);

  const radiusInRadians = radius / R;
  const lonStart = lon - rad2deg(radiusInRadians / Math.cos(deg2rad(lat)));
  const lonEnd = lon + rad2deg(radiusInRadians / Math.cos(deg2rad(lat)));

  return {
    latStart,
    latEnd,
    lonStart,
    lonEnd,
  };
};
