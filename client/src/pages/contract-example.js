import React, { useContext, useEffect, useState } from "react";
import { Link } from "gatsby";
import { Web3Context } from "../components/LoadWeb3";
import SimpleStorageContract from "../../contracts/SimpleStorage.json";

// styles
const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}

const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 410,
}

const paragraphStyles = {
  marginBottom: 48,
}

const codeStyles = {
  color: "#8A6534",
  padding: 4,
  backgroundColor: "#FFF4DB",
  fontSize: "1.25rem",
  borderRadius: 4,
}

const form = {
  marginBottom: "48px",
}

const input = {
  padding: "10px",
}

const button  = {
  padding: "10px",
}

const linkStyle = {
  color: "#8954A8",
  fontWeight: "bold",
  fontSize: 16,
  verticalAlign: "5%",
}

const docLinkStyle = {
  ...linkStyle,
  listStyleType: "none",
  marginBottom: 24,
}

// markup
const IndexPage = () => {
  const { web3 } = useContext(Web3Context);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);
  const [storageValue, setStorageValue] = useState(null);
  const [newValue, setNewValue] = useState("");

  const getContractInstance = async () => {
    try {
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      const value = await instance.methods.get().call();
      setContract(instance);
      setStorageValue(value);
    } catch (error) {
      // Catch any errors for any of the above operations.
      console.error(error);
    }
  }

  useEffect(() => {
    getContractInstance();
  }, [])

  const onInputChange = ({target}) => setNewValue(target.value);

  const onSubmit = async () => {
    if (!contract) {
      return;
    }

    await contract.methods.set(newValue).send({from: accounts[0]});
    const value = await contract.methods.get().call();
    setStorageValue(value);
  }

  return (
    <main style={pageStyles}>
      <title>Home Page</title>
      <h1 style={headingStyles}>
        Contract interaction example
      </h1>
      <p style={paragraphStyles}>
        Connected with <code style={codeStyles}>{accounts ? accounts[0] : "0x"}</code>
      </p>
      <p style={paragraphStyles}>
        Currently stored number <code style={codeStyles}>{storageValue ?? "undefined"}</code>
      </p>
      <div style={form}>
        <input style={input} type="text" value={newValue} onChange={onInputChange} />
        <button style={button} onClick={onSubmit}>Submit</button>
      </div>
      <div style={docLinkStyle}>
        <Link
          style={linkStyle}
          to="/"
        >
          Back to Home page
        </Link>
      </div>
      <img
        alt="Gatsby G Logo"
        src="data:image/svg+xml,%3Csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2a10 10 0 110 20 10 10 0 010-20zm0 2c-3.73 0-6.86 2.55-7.75 6L14 19.75c3.45-.89 6-4.02 6-7.75h-5.25v1.5h3.45a6.37 6.37 0 01-3.89 4.44L6.06 9.69C7 7.31 9.3 5.63 12 5.63c2.13 0 4 1.04 5.18 2.65l1.23-1.06A7.959 7.959 0 0012 4zm-8 8a8 8 0 008 8c.04 0 .09 0-8-8z' fill='%23639'/%3E%3C/svg%3E"
      />
    </main>
  )
}

export default IndexPage
