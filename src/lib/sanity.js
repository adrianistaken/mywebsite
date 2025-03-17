import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanity = createClient({
  projectId: "n9mgttl9", // Replace with your actual Sanity project ID
  dataset: "production",
  apiVersion: "2024-03-17", // Use today's date
  useCdn: true,
});

// Set up the image builder
const builder = imageUrlBuilder(sanity);
export const urlFor = (source) => builder.image(source);
