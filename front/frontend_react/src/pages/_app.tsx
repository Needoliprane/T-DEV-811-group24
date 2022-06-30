import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { AuthContextProvider, useAuth } from "../hooks/useAuth";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const auth = useAuth();
  const history = useRouter();

  return (
    <AuthContextProvider>
      <SWRConfig
        value={{
          fetcher: async (endpoint: string) => {
            const options: AxiosRequestConfig = {
              baseURL: process.env.REACT_APP_API_URL,
            };
            if (auth?.user.jwt)
              options.headers = { Authorization: `Bearer ${auth?.user.jwt}` };
            try {
              const { data } = await axios.get(endpoint, options);
              return data;
            } catch (error) {
              const status = (error as AxiosError).response?.status;
              if (status === 401) {
                auth?.dispatch({ type: "logout" });
                history.replace("/login");
              }
              if (!status || status >= 500) history.replace("/500");
              throw new Error("Une erreur est survenue");
            }
          },
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </AuthContextProvider>
  );
}

export default MyApp;
