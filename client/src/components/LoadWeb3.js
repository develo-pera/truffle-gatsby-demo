import React, { useEffect, useState } from "react";
import getWeb3 from "../lib/helpers/getWeb3";

const INIT_STATE = {
  web3: null,
}

const Web3Context = React.createContext(INIT_STATE);

const LoadWeb3 = ({children}) => {
  const [state, setState] = useState(INIT_STATE);

  useEffect(() => {
    const initWeb = async () => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        setState({web3});
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    }

    initWeb();
  }, []);

  if (!state.web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }

  return (
    <Web3Context.Provider value={state}>
      {children}
    </Web3Context.Provider>
  )
};

export default LoadWeb3;

export {
  Web3Context,
};
