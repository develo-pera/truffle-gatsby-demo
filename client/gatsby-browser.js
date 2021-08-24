import React from "react";
import LoadWeb3 from "./src/components/LoadWeb3";

export const wrapRootElement = ({ element }) => {
  return (
    <LoadWeb3>
      {element}
    </LoadWeb3>
  )
}
