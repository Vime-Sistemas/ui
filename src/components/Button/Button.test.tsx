import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button", () => {
  it("renderiza o texto corretamente", () => {
    render(<Button>Salvar</Button>);
    expect(screen.getByRole("button", { name: /salvar/i })).toBeInTheDocument();
  });

  it("variant primary é o padrão", () => {
    render(<Button>Salvar</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-black", "text-white");
  });

  it("variant secondary aplica classes corretas", () => {
    render(<Button variant="secondary">Cancelar</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-white", "text-black");
  });

  it("variant ghost aplica classes corretas", () => {
    render(<Button variant="ghost">Ver mais</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-transparent", "border-b");
  });

  it("tamanho md é o padrão", () => {
    render(<Button>Salvar</Button>);
    expect(screen.getByRole("button")).toHaveClass("px-5", "py-2", "text-sm");
  });

  it("dispara onClick ao clicar", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Clique</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("não dispara onClick quando disabled", async () => {
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>Clique</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("aceita className adicional", () => {
    render(<Button className="mt-4">Salvar</Button>);
    expect(screen.getByRole("button")).toHaveClass("mt-4");
  });
});
