import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface CarouselItem {
  id: string;
  title: string;
  image: string;
}

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
    }),
    getUsersStories: builder.query<CarouselItem[], null>({
      query: () => ({
        url: `/feeds/users%2F2166257779239552048%2Ffeeds%2Fcollection-stories%3Fcontext%3D2279792120556423125`,
        method: 'GET',
        headers: {
          "Accept": "application/json"
        }
      }),
      transformResponse: (response: any) => {
        return response.data.map((item: any) => ({
          id: item.story.item.id,
          title: item.story.item.title,
          image: item.story.item.cover_src
        }));
      }
    })
  })
});

export const { useGetUsersCollectionsQuery, useGetUsersStoriesQuery } = usersApi;
