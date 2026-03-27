import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppSwitcher } from "./AppSwitcher";

const apps = [
  { label: "CRM", url: "https://crm.vimesistemas.com" },
  { label: "ERP", url: "https://erp.vimesistemas.com" },
  { label: "Suporte", url: "https://suporte.vimesistemas.com" },
];

describe("AppSwitcher", () => {
  it("não renderiza para não-admin", () => {
    const { container } = render(
      <AppSwitcher currentApp="CRM" userRole="user" apps={apps} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("não renderiza se não há outros apps", () => {
    const { container } = render(
      <AppSwitcher currentApp="CRM" userRole="admin" apps={[{ label: "CRM", url: "https://crm.vimesistemas.com" }]} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renderiza o botão para admin com outros apps", () => {
    render(<AppSwitcher currentApp="CRM" userRole="admin" apps={apps} />);
    expect(screen.getByRole("button", { name: /módulos/i })).toBeInTheDocument();
  });

  it("abre o menu ao clicar", async () => {
    render(<AppSwitcher currentApp="CRM" userRole="admin" apps={apps} />);
    await userEvent.click(screen.getByRole("button", { name: /módulos/i }));
    expect(screen.getByText("ERP")).toBeInTheDocument();
    expect(screen.getByText("Suporte")).toBeInTheDocument();
  });

  it("não exibe o app atual na lista", async () => {
    render(<AppSwitcher currentApp="CRM" userRole="admin" apps={apps} />);
    await userEvent.click(screen.getByRole("button", { name: /módulos/i }));
    expect(screen.queryByRole("button", { name: /^CRM$/i })).not.toBeInTheDocument();
  });

  it("fecha ao clicar fora", async () => {
    render(
      <div>
        <AppSwitcher currentApp="CRM" userRole="admin" apps={apps} />
        <div data-testid="outside">fora</div>
      </div>
    );
    await userEvent.click(screen.getByRole("button", { name: /módulos/i }));
    expect(screen.getByText("ERP")).toBeInTheDocument();
    await userEvent.click(screen.getByTestId("outside"));
    expect(screen.queryByText("ERP")).not.toBeInTheDocument();
  });

  it("navega para a url correta ao selecionar app", async () => {
    const onNavigate = vi.fn();
    render(<AppSwitcher currentApp="CRM" userRole="admin" apps={apps} onNavigate={onNavigate} />);
    await userEvent.click(screen.getByRole("button", { name: /módulos/i }));
    await userEvent.click(screen.getByRole("button", { name: /ERP/i }));
    expect(onNavigate).toHaveBeenCalledWith("https://erp.vimesistemas.com");
  });
});
