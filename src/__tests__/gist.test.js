import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import Gist from "../../src/routes/Gist";
import useGetGistDataQuery from "../hooks/useGetGistDataQuery";

window.matchMedia = window.matchMedia || function() {
  return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
  };
};

const mockedGetGistDataQuery = useGetGistDataQuery;
jest.mock("../hooks/useGetGistDataQuery");

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

describe("Gist Component", () => {

  it("Displays the loading card", () => {
    mockedGetGistDataQuery.mockImplementation(() => ({
      status: "pending",
    }));
    render(<Gist />, { wrapper });
    expect(screen.getByTestId("content-loading")).toBeInTheDocument();
  });

  it("Displays the error alert", () => {
    mockedGetGistDataQuery.mockImplementation(() => ({
      status: "error",
    }));
    render(<Gist />, { wrapper });
    expect(screen.getByTestId("content-errored")).toBeInTheDocument();
  });
});
