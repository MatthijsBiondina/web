import Grid from "@mui/material/Grid";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import ClearIcon from "@mui/icons-material/Clear";
import { useOverview } from "pages/Portal/Overview/contexts/OverviewContext";
import SearchIcon from "@mui/icons-material/Search";
function SearchBar() {
  const { searchQuery, setSearchQuery } = useOverview();
  return (
    <Grid item xs={12} lg={3} sx={{ mt: 2 }}>
      <MKTypography display="block" variant="button" fontWeight="regular" color="text" mb={1}>
        Zoeken
      </MKTypography>
      <MKInput
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        variant="standard"
        fullWidth
        InputProps={{
          endAdornment: searchQuery ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="clear search"
                onClick={() => setSearchQuery("")}
                edge="end"
                size="small"
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : (
            <InputAdornment position="end">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  );
}

export default SearchBar;
