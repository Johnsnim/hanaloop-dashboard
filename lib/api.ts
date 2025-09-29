import { Company, Post, Country } from "./types";
export const countries: Country[] = [
  { code: "US", name: "United States" },
  { code: "DE", name: "Germany" },
];
export const companiesSeed: Company[] = [
  {
    id: "c1",
    name: "Acme Corp",
    country: "US",
    emissions: [
      { yearMonth: "2024-01", emissions: 120 },
      { yearMonth: "2024-02", emissions: 110 },
      { yearMonth: "2024-03", emissions: 95 },
      { yearMonth: "2024-04", emissions: 105 },
      { yearMonth: "2024-05", emissions: 130 },
    ],
  },
  {
    id: "c2",
    name: "Globex",
    country: "DE",
    emissions: [
      { yearMonth: "2024-01", emissions: 80 },
      { yearMonth: "2024-02", emissions: 105 },
      { yearMonth: "2024-03", emissions: 120 },
      { yearMonth: "2024-04", emissions: 115 },
      { yearMonth: "2024-05", emissions: 100 },
    ],
  },
];
export const postsSeed: Post[] = [
  {
    id: "p1",
    title: "Sustainability Report Q1",
    resourceUid: "c1",
    dateTime: "2024-03",
    content: "Q1 emissions trending down due to fleet optimization.",
  },
];
let _countries: Country[] = [...countries];
let _companies: Company[] = [...companiesSeed];
let _posts: Post[] = [...postsSeed];
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
const jitter = () => 200 + Math.random() * 600;
const maybeFail = () => Math.random() < 0.15;
export async function fetchCountries() {
  await delay(jitter());
  return JSON.parse(JSON.stringify(_countries));
}
export async function fetchCompanies() {
  await delay(jitter());
  return JSON.parse(JSON.stringify(_companies));
}
export async function fetchPosts() {
  await delay(jitter());
  return JSON.parse(JSON.stringify(_posts));
}
export async function createOrUpdatePost(
  p: Omit<Post, "id"> & { id?: string }
) {
  await delay(jitter());
  if (maybeFail()) throw new Error("Save failed");
  if (p.id) {
    const updated: Post = { ...(p as Post) };
    _posts = _posts.map((x) => (x.id === updated.id ? updated : x));
    return JSON.parse(JSON.stringify(updated));
  }
  const created: Post = { ...p, id: crypto.randomUUID() };
  _posts = [..._posts, created];
  return JSON.parse(JSON.stringify(created));
}
