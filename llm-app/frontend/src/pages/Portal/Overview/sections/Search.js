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

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useOverview } from "../contexts/OverviewContext";
function Search() {
  const { sortBy, setSortBy, searchQuery, setSearchQuery } = useOverview();

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <MKBox component="section">
      <Container>
        <Grid container spacing={{ xs: 0, lg: 3 }} sx={{ pt: 2, pb: 3, px: 2, mx: "auto" }}>
          <Grid item xs={12} lg={3} sx={{ mt: 2 }}>
            <MKTypography display="block" variant="button" fontWeight="regular" color="text" mb={1}>
              Sorteren
            </MKTypography>
            <FormControl variant="standard" fullWidth>
              <Select
                value={sortBy}
                onChange={handleSortChange}
                sx={{
                  height: "2.5rem",
                  fontSize: "0.875rem",
                  padding: "0.5rem 0",
                  "& .MuiSelect-select:focus": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                <MenuItem value="created_at_newest">Datum (nieuwste eerst)</MenuItem>
                <MenuItem value="created_at_oldest">Datum (oudste eerst)</MenuItem>
                <MenuItem value="nr_of_reads_highest">Vaakst bekeken</MenuItem>
              </Select>
            </FormControl>

            {/* <Autocomplete
              defaultValue="Datum (Nieuwste eerst)"
              options={["Datum (Nieuwste eerst)", "Datum (Oudste eerst)", "Meest Gelezen"]}
              renderInput={(params) => <MKInput {...params} variant="standard" />}
            /> */}
          </Grid>
          <Grid item xs={12} lg={3} sx={{ mt: 2 }}>
            <MKTypography display="block" variant="button" fontWeight="regular" color="text" mb={1}>
              Zoeken
            </MKTypography>
            <MKInput
              value={searchQuery}
              onChange={handleSearchChange}
              type="text"
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={3} sx={{ mt: 2 }}></Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Search;
