import React from "React";
import { shallow } from "enzyme";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {
  GBP_NAME,
  EUR_NAME,
  USD_NAME,
  GBP_SYMBOL,
  EUR_SYMBOL,
  USD_SYMBOL
} from "../../constants/currencies";
import CurrencySelector from ".";

describe("CurrencySelector component", () => {
  const fakeClickEvent = {
    preventDefault() {}
  };
  const wallets = [
    {
      id: "wallet-id-0",
      name: GBP_NAME,
      amount: 200,
      symbol: GBP_SYMBOL
    },
    {
      id: "wallet-id-1",
      name: EUR_NAME,
      amount: 85,
      symbol: EUR_SYMBOL
    },
    {
      id: "wallet-id-2",
      name: USD_NAME,
      amount: 1000,
      symbol: USD_SYMBOL
    }
  ];
  const basicProps = {
    currentCurrency: "GBP",
    wallets,
    onChange: () => {}
  };

  const component = shallow(<CurrencySelector {...basicProps} />);

  it("has working component", () => {
    expect(component).toBeDefined();
  });

  it("expects component to never be changed", () => {
    expect(component).toMatchSnapshot();
  });

  it("fire the event onClick on Button component", () => {
    expect(component.state("anchorEl")).toBe(null);
    component
      .find(Button)
      .first()
      .simulate("click", fakeClickEvent);
    expect(component.state("anchorEl")).not.toBe(null);
  });

  it("fire the event onClose on the Menu component", () => {
    component
      .find(Button)
      .first()
      .simulate("click", fakeClickEvent);
    expect(component.state("anchorEl")).not.toBe(null);
    component
      .find(Menu)
      .first()
      .simulate("close");
    expect(component.state("anchorEl")).toBe(null);
  });

  it("has working component with no wallets", () => {
    const customProps = { ...basicProps, wallets: [] };
    const component = shallow(<CurrencySelector {...customProps} />);
    expect(component).toBeDefined();
  });

  it("expects component to never be changed with no wallets", () => {
    const customProps = { ...basicProps, wallets: [] };
    const component = shallow(<CurrencySelector {...customProps} />);
    expect(component).toMatchSnapshot();
  });
});
