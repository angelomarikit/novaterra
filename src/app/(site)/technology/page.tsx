import TechnologyView from "@/components/technology/TechnologyView";
import { SECTION_IMAGES } from "@/lib/content/defaults";
import { getSectionImage } from "@/lib/content/fetch";

export default async function TechnologyPage() {
  const imageUrl = await getSectionImage(
    "technology",
    "pyrolysis",
    SECTION_IMAGES.technology_pyrolysis,
  );

  return <TechnologyView imageUrl={imageUrl} />;
}
