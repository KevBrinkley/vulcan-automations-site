import type { Metadata } from "next";
import ModulePage, {
  generateMetadata as generateModuleMetadata,
} from "../modules/[slug]/page";

const params = Promise.resolve({ slug: "process" });

export async function generateMetadata(): Promise<Metadata> {
  return generateModuleMetadata({ params });
}

export default async function ProcessPage() {
  return ModulePage({ params });
}
