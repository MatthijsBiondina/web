/*
=========================================================
* Material Kit 2 PRO React - v2.1.1
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-pro-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Sections components
import BaseLayout from "layouts/sections/components/BaseLayout";
import View from "layouts/sections/components/View";

// Tables page components
import TableOne from "layouts/sections/elements/tables/components/TableOne";

// Tables page components code
import tableOneCode from "layouts/sections/elements/tables/components/TableOne/code";

function Tables() {
  return (
    <BaseLayout
      title="Tables"
      breadcrumb={[
        { label: "Page Sections", route: "/sections/elements/tables" },
        { label: "Tables" },
      ]}
    >
      <View title="Table One" code={tableOneCode}>
        <TableOne />
      </View>
    </BaseLayout>
  );
}

export default Tables;
