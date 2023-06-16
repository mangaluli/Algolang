import api from "./api"

export function testUrl(slug: string) {
  return api.head(`/test-url/${slug}`);
}
