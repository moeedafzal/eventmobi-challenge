import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import UserGists from "../components/UserGists";
import useGetAllGistsQuery from "../hooks/useGetAllGistsQuery";

window.matchMedia = window.matchMedia || function() {
  return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
  };
};

const mockedUseGetAllGistsQuery = useGetAllGistsQuery;
jest.mock("../hooks/useGetAllGistsQuery");

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default wrapper;

beforeEach(() => {
  jest.restoreAllMocks();
  jest.clearAllMocks();
});

describe("User Gist Component", () => {

  it("Displays user not found text", () => {
    mockedUseGetAllGistsQuery.mockImplementation(() => ({
      status: "success",
      data: [],
    }));
    render(<UserGists />, { wrapper });
    expect(screen.getByText(/No gists found for the user with username/i)).toBeVisible();
  });

  it ("Displays the GistsList component", () => {
    mockedUseGetAllGistsQuery.mockImplementation(() => ({
      status: "success",
      data: getTestData(),
    }));
    render(<UserGists />, { wrapper });
    expect(screen.getByTestId("gists-list")).toBeInTheDocument();
    expect(screen.getByText(/2 gists found for "octo"!/i)).toBeVisible();
});

});

const getTestData = () => [
  {
    url: "https://api.github.com/gists/869a592952325913d92d",
    forks_url: "https://api.github.com/gists/869a592952325913d92d/forks",
    id: "869a592952325913d92d",
    files: {
      "keybase.md": {
        filename: "keybase.md",
        type: "text/markdown",
        language: "Markdown",
        size: 2921,
      },
    },
    created_at: "2015-06-03T18:14:38Z",
    description: "keybase.md",
    owner: {
      login: "octo",
      avatar_url: "https://avatars.githubusercontent.com/u/116087?v=4",
      html_url: "https://github.com/octo",
    },
  },
  {
    url: "https://api.github.com/gists/1930783",
    forks_url: "https://api.github.com/gists/1930783/forks",
    id: "1930783",
    html_url: "https://gist.github.com/octo/1930783",
    files: {
      "install.sh": {
        filename: "install.sh",
        type: "application/x-sh",
        language: "Shell",
        size: 209,
      },
    },
    created_at: "2012-02-28T08:19:31Z",
    description: "Simple bash script for installing the MongoDB C library.",
    owner: {
      login: "octo",
      avatar_url: "https://avatars.githubusercontent.com/u/116087?v=4",
      html_url: "https://github.com/octo",
    },
    truncated: false,
  },
];
