import prisma from '@/prisma';
import axios from 'axios';

interface AddressInput {
  name: string;
  street_address: string;
  city: string;
  province: string;
  postal_code: string;
  latitude?: number;
  longitude?: number;
  is_primary: boolean;
}

interface UpdateAddressInput {
  name?: string;
  street_address?: string;
  city?: string;
  province?: string;
  postal_code?: string;
  latitude?: number;
  longitude?: number;
  is_primary?: boolean;
}

class UserAddressAction {
  //  consume user_id from jwt, lalu cari user_address_id berdasarkan user_id tersebut
  findAddressById = async (user_id: number) => {
    try {
      const address = await prisma.userAddress.findMany({
        where: {
          user_id: user_id,
        },
      });

      if (!address) {
        throw new Error('Address not found for the user');
      }

      return address;
    } catch (error) {
      throw error;
    }
  };

  // Method untuk buat alamat baru,  consume user_id from jwt
  createAddress = async (user_id: number, addressData: AddressInput) => {
    try {
      // Generate lat and long from OpenCageData API
      const { latitude, longitude } = await this.getCoordinates(
        addressData.city,
        addressData.province,
        addressData.postal_code,
      );

      return await prisma.$transaction(async (transaction) => {
        // Jika alamat baru diset sebagai primary
        if (addressData.is_primary) {
          await transaction.userAddress.updateMany({
            where: {
              user_id: user_id,
              is_primary: true,
            },
            data: {
              is_primary: false,
            },
          });
        }

        // Insert alamat baru
        const newAddress = await transaction.userAddress.create({
          data: {
            user_id: user_id,
            name: addressData.name,
            street_address: addressData.street_address,
            city: addressData.city,
            province: addressData.province,
            postal_code: addressData.postal_code,
            latitude, // Automatically generated latitude
            longitude, // Automatically generated longitude
            is_primary: addressData.is_primary,
          },
        });

        return newAddress;
      });
    } catch (error) {
      throw error;
    }
  };

  updateAddressById = async (
    user_id: number,
    user_address_id: number,
    addressData: UpdateAddressInput,
  ) => {
    try {
      // Jika ada perubahan pada city, province, atau postal_code, update latitude dan longitude
      let latitude = addressData.latitude;
      let longitude = addressData.longitude;

      if (addressData.city && addressData.province && addressData.postal_code) {
        const coordinates = await this.getCoordinates(
          addressData.city,
          addressData.province,
          addressData.postal_code,
        );
        latitude = coordinates.latitude;
        longitude = coordinates.longitude;
      }

      return await prisma.$transaction(async (transaction) => {
        // Jika alamat diubah menjadi primary
        if (addressData.is_primary) {
          await transaction.userAddress.updateMany({
            where: {
              user_id: user_id,
              is_primary: true,
            },
            data: {
              is_primary: false,
            },
          });
        }

        // Update alamat dengan data baru
        const updatedAddress = await transaction.userAddress.update({
          where: {
            user_address_id: user_address_id,
            user_id: user_id,
          },
          data: {
            name: addressData.name,
            street_address: addressData.street_address,
            city: addressData.city,
            province: addressData.province,
            postal_code: addressData.postal_code,
            latitude, // Update latitude if changed
            longitude, // Update longitude if changed
            is_primary: addressData.is_primary,
          },
        });

        return updatedAddress;
      });
    } catch (error) {
      throw error;
    }
  };

  deleteAddressById = async (user_id: number, address_id: number) => {
    try {
      // Cek jumlah alamat user
      const addressCount = await prisma.userAddress.count({
        where: {
          user_id: user_id,
        },
      });

      console.log('Address count for user:', addressCount);

      // Jika hanya ada 1 alamat, tidak boleh dihapus
      if (addressCount <= 1) {
        console.error('User must have at least one address');
        throw new Error('User must have at least one address');
      }

      // Hapus alamat berdasarkan user_id dan address_id
      const deletedAddress = await prisma.userAddress.deleteMany({
        where: {
          user_address_id: address_id,
          user_id: user_id,
        },
      });

      if (deletedAddress.count === 0) {
        throw new Error('Address not found or not owned by user');
      }

      console.log('Deleted address:', deletedAddress);

      return deletedAddress;
    } catch (error) {
      console.error('Error deleting address:', error);
      throw new Error('Error deleting address: ' + (error as Error).message);
    }
  };

  // Untuk dapetin latitude dan longitude dari OpenCageData
  private getCoordinates = async (
    city: string,
    province: string,
    postal_code: string,
  ) => {
    try {
      if (!city || !province || !postal_code) {
        throw new Error(
          'City, province, and postal code are required for geocoding',
        );
      }

      const query = `${city}, ${province}, ${postal_code}`;
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        query,
      )}&countrycode=id&limit=1&key=${String(process.env.OPENCAGE_API_KEY)}`;

      const { data } = await axios.get(url);

      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        return { latitude: lat, longitude: lng };
      }

      throw new Error('Coordinates not found');
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      throw new Error('Failed to fetch coordinates');
    }
  };
}

export default new UserAddressAction();
