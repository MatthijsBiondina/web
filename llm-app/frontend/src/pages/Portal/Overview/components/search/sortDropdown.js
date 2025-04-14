import Grid from "@mui/material/Grid";
import MKTypography from "components/MKTypography";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { useOverview } from "pages/Portal/Overview/contexts/OverviewContext";

function SortDropdown() {
  const { sortBy, setSortBy } = useOverview();

  return (
    <Grid item xs={12} lg={3} sx={{ mt: 2 }}>
      <MKTypography display="block" variant="button" fontWeight="regular" color="text" mb={1}>
        Sorteren
      </MKTypography>
      <FormControl variant="standard" fullWidth>
        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
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
    </Grid>
  );
}

export default SortDropdown;
