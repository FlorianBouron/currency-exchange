import React from "React";
import { shallow } from "enzyme";
import TextField from "@material-ui/core/TextField";
import CurrencyContainer from ".";

describe("CurrencyContainer component", () => {
  const defaultProps = {
    wallets: [
      {
        id: "wallet-id-0",
        name: "GBP",
        amount: 200,
        symbol: "£"
      },
      {
        id: "wallet-id-1",
        name: "EUR",
        amount: 85,
        symbol: "€"
      },
      {
        id: "wallet-id-2",
        name: "USD",
        amount: 1000,
        symbol: "$"
      }
    ],
    currentCurrency: "GBP"
  };

  it("has working component", () => {
    const component = shallow(<CurrencyContainer {...defaultProps} />);
    expect(component).toBeDefined();
  });

  it("expects component to never be changed", () => {
    const component = shallow(<CurrencyContainer {...defaultProps} />);
    expect(component).toMatchSnapshot();
  });

  it("has value exceeding the balance", () => {
    const keyPressed = 1;
    const component = shallow(<CurrencyContainer {...defaultProps} />);
    expect(component.state("error")).toBe("");
    component
      .find(TextField)
      .first()
      .simulate("keypress", { key: keyPressed });
    component
      .find(TextField)
      .first()
      .simulate("change", {
        target: {
          name: "pollName",
          value: `${component.state("inputValue")}${keyPressed}`
        }
      });
    expect(component.state("error")).toBe("Exceed your balance");
  });

  it("has invalid value in the input", () => {
    const keyCode = 65;
    const { wallets, currentCurrency } = defaultProps;
    let isPreventDefaultCalled = false;
    const component = shallow(<CurrencyContainer {...defaultProps} />);
    expect(component.state("inputValue")).toBe(
      wallets.filter(wallet => wallet.name === currentCurrency)[0].amount
    );
    component
      .find(TextField)
      .first()
      .simulate("keypress", {
        charCode: keyCode,
        preventDefault: () => {
          isPreventDefaultCalled = true;
        }
      });
    expect(isPreventDefaultCalled).toBe(true);
    component
      .find(TextField)
      .first()
      .simulate("change", {
        target: {
          name: "pollName",
          value: component.state("inputValue")
        }
      });
    expect(component.state("inputValue")).toBe(
      wallets.filter(wallet => wallet.name === currentCurrency)[0].amount
    );
  });

  it("has not '-' char when deleting the last number", () => {
    const inputValue = "-2";
    const component = shallow(<CurrencyContainer {...defaultProps} />);
    component.instance().setState({ inputValue });
    expect(component.state("inputValue")).toBe(inputValue);
    component
      .find(TextField)
      .first()
      .simulate("keypress", { keyCode: 13 });
    component
      .find(TextField)
      .first()
      .simulate("change", {
        target: {
          name: "pollName",
          value: "-"
        }
      });
    expect(component.state("inputValue")).toBe("");
  });

  it("has no wallets", () => {
    const customProps = {
      ...defaultProps,
      wallets: []
    };
    const component = shallow(<CurrencyContainer {...customProps} />);
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });

  it("has isReadOnly props", () => {
    const customProps = {
      ...defaultProps,
      isReadOnly: true
    };
    const component = shallow(<CurrencyContainer {...customProps} />);
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
    expect(component.instance().signInput).toBe("+");
  });
});
