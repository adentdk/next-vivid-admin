import LoginForm from "./_components/login-form";

export default function Page(props: {
  searchParams: {
    from?: string;
  };
}) {
  return (
    <main className="container max-w-lg pt-8 space-y-4 mx-auto">
      {/* <LogoRectangle className="mx-auto" /> */}

      <h1 className="scroll-m-20 text-2xl font-medium lg:text-3xl text-center text-foreground mb-2">
        Log In to your account
      </h1>

      <LoginForm />

      <p className="text-foreground text-center text-sm">
        Don&apos;t have an account? Contact the admin to create an account
      </p>
    </main>
  );
}
