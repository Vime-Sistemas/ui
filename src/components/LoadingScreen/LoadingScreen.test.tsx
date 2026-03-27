import { render, screen, act } from "@testing-library/react";
import { LoadingScreen } from "./LoadingScreen";

describe("LoadingScreen", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renderiza a primeira palavra", () => {
    render(<LoadingScreen words={["Alpha", "Beta"]} />);
    expect(screen.getAllByText("Alpha").length).toBeGreaterThan(0);
  });

  it("usa palavras padrão quando nenhuma é passada", () => {
    render(<LoadingScreen />);
    expect(screen.getAllByText("Carregando").length).toBeGreaterThan(0);
  });

  it("avança para a próxima palavra após o ciclo completo", () => {
    render(<LoadingScreen words={["Alpha", "Beta"]} />);

    act(() => { vi.advanceTimersByTime(400); }); // enter → hold
    act(() => { vi.advanceTimersByTime(900); }); // hold → exit
    act(() => { vi.advanceTimersByTime(350); }); // exit → enter (próxima palavra)

    expect(screen.getAllByText("Beta").length).toBeGreaterThan(0);
  });

  it("tem role status para acessibilidade", () => {
    render(<LoadingScreen />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("tem texto acessível para leitores de tela", () => {
    render(<LoadingScreen words={["Alpha"]} />);
    expect(screen.getByText("Alpha", { selector: ".sr-only" })).toBeInTheDocument();
  });
});
