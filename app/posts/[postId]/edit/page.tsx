import { fetcher } from "@/app/api-fetcher";
import { PostManageType } from "@/lib/types";

import { EditPostForm } from "./_components/edit-post-form";
import { ThisStoreProvider } from "./store-provider";

type PageProps = {
  params: {
    postId: string;
  };
};

export default async function Page({ params }: PageProps) {
  const result = await fetcher<PostManageType>(
    `/v1/posts/manage/${params.postId}`,
    {
      next: {
        tags: ["/v1/posts/manage"],
      },
    },
  );

  if (!result.success) {
    return <p>{result.errorMessage ?? result.message}</p>;
  }

  return (
    <ThisStoreProvider
      initialState={{
        post: result.data,
      }}
    >
      <EditPostForm />
    </ThisStoreProvider>
  );
}
