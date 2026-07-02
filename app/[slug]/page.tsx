import { CityContent } from "@/components/city-content";
import { cities } from "@/lib/data";

export function generateStaticParams() {
  return cities.map((city) => ({ slug: city.slug }));
}

export default async function CityPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  return <CityContent slug={slug} />;
}
