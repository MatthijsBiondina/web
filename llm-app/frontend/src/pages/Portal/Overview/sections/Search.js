// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import SortDropdown from "../components/search/sortDropdown";
import SearchBar from "../components/search/searchBar";
import PageSelect from "../components/search/pageSelect";
function Search() {
  return (
    <MKBox component="section">
      <Container>
        <Grid container spacing={{ xs: 0, lg: 3 }} sx={{ pt: 2, pb: 3, px: 2, mx: "auto" }}>
          <SortDropdown />
          <SearchBar />
          <Grid item xs={12} lg={3} sx={{ mt: 2 }}></Grid>
          <PageSelect />
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Search;
