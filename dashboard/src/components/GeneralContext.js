import React, { useState } from "react";

import BuyActionWindow, { SellActionWindow } from "./BuyActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (uid) => {},
  closeBuyWindow: () => {},
  openSellWindow: (uid) => {},
  closeSellWindow: () => {},
  refreshTrigger: 0,
  refreshDashboard: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");

  // Refresh trigger
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshDashboard = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  // OPEN BUY WINDOW
  const handleOpenBuyWindow = (uid) => {
    setIsSellWindowOpen(false);
    setSelectedStockUID(uid);
    setIsBuyWindowOpen(true);
  };

  // CLOSE BUY WINDOW
  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  };

  // OPEN SELL WINDOW
  const handleOpenSellWindow = (uid) => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID(uid);
    setIsSellWindowOpen(true);
  };

  // CLOSE SELL WINDOW
  const handleCloseSellWindow = () => {
    setIsSellWindowOpen(false);
    setSelectedStockUID("");
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        openSellWindow: handleOpenSellWindow,
        closeSellWindow: handleCloseSellWindow,
        refreshTrigger,
        refreshDashboard,
      }}
    >
      {props.children}

      {isBuyWindowOpen && (
        <BuyActionWindow uid={selectedStockUID} />
      )}

      {isSellWindowOpen && (
        <SellActionWindow uid={selectedStockUID} />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;