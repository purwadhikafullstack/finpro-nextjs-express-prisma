import axios, { isAxiosError } from 'axios';

import ApiError from '@/utils/error.util';
import { OPENCAGE_API } from '@/config';
import prisma from '@/libs/prisma';

export default class AddressAction {
  customer = async (user_id: string) => {
    try {
      const addresses = await prisma.customerAdress.findMany({
        where: {
          Customer: {
            user_id,
          },
        },
        orderBy: {
          created_at: 'asc',
        },
      });

      return addresses;
    } catch (error) {
      throw error;
    }
  };

  create = async (user_id: string, name: string, address: string, latitude: number, longitude: number) => {
    try {
      const customer = await prisma.customer.findUnique({
        where: {
          user_id,
        },
      });

      if (!customer) throw new ApiError(404, 'Customer not found');

      const addresses = await prisma.customerAdress.findFirst({
        where: {
          customer_id: customer.customer_id,
          is_primary: true,
        },
      });

      const url = new URL('https://api.opencagedata.com/geocode/v1/json');
      url.searchParams.set('q', latitude + '+' + longitude);
      url.searchParams.set('key', OPENCAGE_API);
      url.searchParams.set('language', 'id');
      url.searchParams.set('countrycode', 'id');
      const output = url.toString();

      const { data } = await axios.get(output);
      const { formatted, components } = data.results.at(0);
      const created = await prisma.customerAdress.create({
        data: {
          name,
          address,
          latitude,
          longitude,
          is_primary: addresses ? false : true,
          formatted: formatted,
          city: components.city,
          road: components.road,
          region: components.state,
          suburb: components.suburb,
          zipcode: components.postcode,
          city_district: components.city_district,
          customer_id: customer.customer_id,
        },
      });

      return created;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new ApiError(
          (error.response && error.response.status) || 500,
          (error.response && error.response.data) || 'Something went wrong'
        );
      }

      throw error;
    }
  };

  primary = async (user_id: string, customer_address_id: string) => {
    try {
      const address = await prisma.customerAdress.findUnique({
        where: {
          customer_address_id,
          Customer: {
            user_id,
          },
        },
      });

      if (!address) throw new ApiError(404, 'Address not found, or not belong to the customer');
      if (address.is_primary) throw new ApiError(400, 'Address is already set as primary');

      await prisma.customerAdress.updateMany({
        where: { customer_id: address.customer_id },
        data: { is_primary: false },
      });

      const updated = await prisma.customerAdress.update({
        where: { customer_address_id },
        data: { is_primary: true },
      });

      return updated;
    } catch (error) {
      throw error;
    }
  };
}
