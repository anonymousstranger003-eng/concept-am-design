import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { PageLoader } from "@/components/site/PageLoader";
import { SeoOverrides } from "@/components/site/SeoOverrides";
import { SupabaseProvider } from "@/components/admin/SupabaseProvider";
import { getPublicConfig } from "@/lib/config.functions";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  loader: () => getPublicConfig(),
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AM Concepts & Architects — Archietcts & Interior, Kerala" },
      { name: "description", content: "AM Concepts & Architects — a Kerala-based studio led by Manoj AM, delivering premium architecture, interior design and engineering across India." },
      { name: "author", content: "AM Concepts & Architects" },
      { property: "og:title", content: "AM Concepts & Architects — Architects & Interiors, Kerala" },
      { property: "og:description", content: "AM Concepts & Architects — a Kerala-based studio led by Manoj AM, delivering premium architecture, interior design and engineering across India." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "AM Concepts & Architects — Architects & Interiors, Kerala" },
      { name: "twitter:description", content: "AM Concepts & Architects — a Kerala-based studio led by Manoj AM, delivering premium architecture, interior design and engineering across India." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e5a61a2a-be0f-4211-a6d3-9cdcd261b19f/id-preview-012ec7c6--222e5b3f-7183-442b-85b3-f34a9bf13d05.lovable.app-1779613283254.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e5a61a2a-be0f-4211-a6d3-9cdcd261b19f/id-preview-012ec7c6--222e5b3f-7183-442b-85b3-f34a9bf13d05.lovable.app-1779613283254.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=Inter+Tight:wght@300;400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const cfg = Route.useLoaderData();
  const pathname = useRouter().state.location.pathname;
  const isAdmin = pathname.startsWith("/admin");

  return (
    <QueryClientProvider client={queryClient}>
      <SupabaseProvider url={cfg.supabaseUrl} anonKey={cfg.supabaseAnonKey}>
        {isAdmin ? (
          <Outlet />
        ) : (
          <>
            <SeoOverrides />
            <PageLoader />
            <Navbar />
            <main>
              <Outlet />
            </main>
            <Footer />
            <WhatsAppButton />
          </>
        )}
      </SupabaseProvider>
    </QueryClientProvider>
  );
}
