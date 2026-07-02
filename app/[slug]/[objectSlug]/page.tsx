import { ObjectContent } from "@/components/object-content";
import { spaceObjects } from "@/lib/data";

export function generateStaticParams() {
  return spaceObjects.map((obj) => ({
    slug: obj.citySlug,
    objectSlug: obj.slug,
  }));
}

export default async function ObjectPage(props: {
  params: Promise<{ slug: string; objectSlug: string }>;
}) {
  const { slug, objectSlug } = await props.params;
  return <ObjectContent slug={slug} objectSlug={objectSlug} />;
}
