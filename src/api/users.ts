import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CarouselItem } from '../components/Carousel/Carousel';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://steller.co' }),
  endpoints: (builder) => ({
    getUsersCollections: builder.query<CarouselItem[], null>({
      query: () => `/users/2166257779239552048/collections`,
      transformResponse: (response: any) => {
        return response.data.map((collection: any) => ({
          id: collection.id,
          title: collection.name,
          image: collection.cover_image_url
        }));
      }
    })
  })
});

export const { useGetUsersCollectionsQuery } = usersApi;
