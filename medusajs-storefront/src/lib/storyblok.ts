import { storyblokInit, apiPlugin } from "@storyblok/react";

const storyblokApi = storyblokInit({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
});

export default storyblokApi;