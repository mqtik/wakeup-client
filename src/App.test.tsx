import "@testing-library/jest-dom/extend-expect";
import "intersection-observer";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";
import { render, act, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { getRestaurants } from "./services/base";
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient();
jest.mock("./services/base", () => ({
  getRestaurants: jest.fn(),
}));
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ test: 100 }),
  })
) as jest.Mock;

describe("App Component", () => {
  beforeEach(() => {
    (getRestaurants as jest.Mock).mockResolvedValue([
      { id: 1, name: "Restaurant A" },
      { id: 2, name: "Restaurant B" },
    ]);
  });

  it("renders restaurant items", async () => {
    mockAllIsIntersecting(true);
    act(() =>
      render(
        <QueryClientProvider client={client}>
          <App />
        </QueryClientProvider>
      )
    );

    await waitFor(() => {
      expect(screen.getByText("Restaurant A")).toBeInTheDocument();
      expect(screen.getByText("Restaurant B")).toBeInTheDocument();
    });
  });
});
