import { Prisma, Role } from '@prisma/client';

import ApiError from '@/utils/error.util';
import { OPENCAGE_API } from '@/config';
import axios from 'axios';
import prisma from '@/libs/prisma';

export default class OutletsAction {
  index = async (
    page: number,
    limit: number,
    id: string | undefined,
    value: string | undefined,
    key: string | undefined,
    desc: string | undefined
  ) => {
    try {
      let filter;
      let order;

      if (id && value) {
        filter = {
          [id as keyof Prisma.OutletSelect]: { contains: value as string },
        };
      }

      if (key && desc) {
        order = [
          {
            [key as keyof Prisma.OutletSelect]: desc === 'true' ? 'desc' : 'asc',
          },
        ];
      }

      const query = {
        where: filter,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: order,
      };

      const [outlets, count] = await prisma.$transaction([prisma.outlet.findMany(query), prisma.outlet.count(query)]);

      return [outlets, count];
    } catch (error) {
      throw error;
    }
  };

  show = async (outlet_id: string) => {
    try {
      const outlet = await prisma.outlet.findUnique({
        where: { outlet_id },
      });

      if (!outlet) throw new ApiError(404, 'Outlet not found');

      return outlet;
    } catch (error) {
      throw error;
    }
  };

  create = async (
    name: string,
    description: string,
    address: string,
    latitude: number,
    longitude: number,
    employees: {
      user_id: string;
      email: string;
      fullname: string;
      role: Role;
    }[]
  ) => {
    try {
      const url = new URL('https://api.opencagedata.com/geocode/v1/json');
      url.searchParams.set('q', latitude + '+' + longitude);
      url.searchParams.set('key', OPENCAGE_API);
      url.searchParams.set('language', 'id');
      url.searchParams.set('countrycode', 'id');
      const output = url.toString();

      const { data } = await axios.get(output);
      const { formatted, components } = data.results.at(0);

      const [outlet, _] = await Promise.all([
        prisma.outlet.create({
          data: {
            name,
            description,
            address,
            latitude,
            longitude,
            formatted,
            city: components.city,
            road: components.road,
            region: components.state,
            suburb: components.suburb,
            zipcode: components.postcode,
            city_district: components.city_district,
            Employee: {
              createMany: {
                data: employees.map((employee) => ({
                  user_id: employee.user_id,
                })),
              },
            },
          },
        }),

        prisma.$transaction([
          ...employees.map((employee) => {
            return prisma.user.update({
              where: { user_id: employee.user_id },
              data: { role: employee.role },
            });
          }),
        ]),
      ]);

      return outlet;
    } catch (error) {
      throw error;
    }
  };

  nearest = async (customer_address_id: string) => {
    try {
      const outlets = await prisma.outlet.findMany({
        // where: {
        // customerAddress: {
        //   customer_address_id,
        // },
        // },
        orderBy: {
          created_at: 'asc',
        },
      });

      return outlets;
    } catch (error) {
      throw error;
    }
  };
}
