"use client";

import { RedirectRouter } from "@/components/utils/redirect-router";

export default function Page() {
  return <RedirectRouter to="/posts" replace />;
}
