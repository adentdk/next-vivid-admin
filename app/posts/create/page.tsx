import { StarterKitExample } from "@/components/editor/base-editor";
import FormLayout from "@/components/form-layout";

export default async function Page() {
  return (
    <div className="absolute inset-0 top-0 left-0 w-full h-full">
      <div className="flex h-full overflow-hidden">
        <StarterKitExample />

        <div className="w-96">
          <h1>halo</h1>
        </div>
      </div>
    </div>
  );
}
