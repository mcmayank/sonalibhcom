import { getStoryblokApi, ISbStoriesParams } from "@storyblok/react";

export async function fetchData(slug: string) {
  const sbParams: ISbStoriesParams = {
    version: "draft", // or 'published'
  };

  const storyblokApi = getStoryblokApi();

  try {
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}