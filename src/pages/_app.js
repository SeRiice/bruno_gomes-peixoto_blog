import { SessionContextProvider } from "@/components/SessionContext"
import Layout from "@/components/ui/Layout"
import "@/styles/globals.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  return (
    <SessionContextProvider>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </SessionContextProvider>
  )
}
