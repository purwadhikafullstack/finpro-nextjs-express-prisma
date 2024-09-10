import axios, { isAxiosError } from 'axios';

import ApiError from '@/utils/api.error';
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
}
