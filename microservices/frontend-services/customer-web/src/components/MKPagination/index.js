/**
=========================================================
* Material Kit 2 PRO React - v2.1.1
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-pro-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { forwardRef, createContext, useContext } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";

// Custom styles for MKPagination
import MKPaginationItemRoot from "components/MKPagination/MKPaginationItemRoot";

// The Pagination main context
const Context = createContext();

const MKPagination = forwardRef(
  (
    {
      item = false,
      variant = "gradient",
      color = "info",
      size = "medium",
      active = false,
      children,
      placement = "right",
      ...rest
    },
    ref
  ) => {
    const context = item ? useContext(Context) : null;
    const paginationSize = context ? context.size : null;
    let placementValue = "flex-end";

    if (placement === "left") {
      placementValue = "flex-start";
    } else if (placement === "center") {
      placementValue = "center";
    }

    return (
      <Context.Provider value={{ variant, color, size }}>
        {item ? (
          <MKPaginationItemRoot
            {...rest}
            ref={ref}
            variant={active ? context.variant : "outlined"}
            color={active ? context.color : "secondary"}
            iconOnly
            circular
            ownerState={{ variant, active, paginationSize }}
          >
            {children}
          </MKPaginationItemRoot>
        ) : (
          <MKBox
            display="flex"
            justifyContent={placementValue}
            alignItems="center"
            sx={{ listStyle: "none" }}
          >
            {children}
          </MKBox>
        )}
      </Context.Provider>
    );
  }
);

// Typechecking props for the MKPagination
MKPagination.propTypes = {
  item: PropTypes.bool,
  variant: PropTypes.oneOf(["gradient", "contained"]),
  color: PropTypes.oneOf([
    "white",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  active: PropTypes.bool,
  children: PropTypes.node.isRequired,
  placement: PropTypes.oneOf(["left", "right", "center"]),
};

export default MKPagination;
