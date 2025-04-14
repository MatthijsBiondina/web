import Grid from "@mui/material/Grid";
import MKTypography from "components/MKTypography";
import MKPagination from "components/MKPagination";
import Icon from "@mui/material/Icon";
import { useOverview } from "pages/Portal/Overview/contexts/OverviewContext";

function PageSelect() {
  const { pageNumber, setPageNumber, numberOfPages } = useOverview();

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNextPage = () => {
    if (pageNumber < numberOfPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handlePageClick = (page) => {
    setPageNumber(page);
  };

  // Generate page buttons based on current page and total pages
  const renderPageButtons = () => {
    const pageButtons = [];

    // If 5 pages or less, show all pages
    if (numberOfPages <= 5) {
      for (let i = 1; i <= numberOfPages; i++) {
        pageButtons.push(
          <MKPagination key={i} item active={pageNumber === i} onClick={() => handlePageClick(i)}>
            {i}
          </MKPagination>
        );
      }
    }
    // More than 5 pages
    else {
      // First page scenario: show pages 1-3
      if (pageNumber === 1 || pageNumber === 2) {
        for (let i = 1; i <= 5; i++) {
          pageButtons.push(
            <MKPagination key={i} item active={pageNumber === i} onClick={() => handlePageClick(i)}>
              {i}
            </MKPagination>
          );
        }
      }

      // Last page scenario: show last 3 pages
      else if (pageNumber === numberOfPages || pageNumber === numberOfPages - 1) {
        for (let i = numberOfPages - 4; i <= numberOfPages; i++) {
          pageButtons.push(
            <MKPagination key={i} item active={pageNumber === i} onClick={() => handlePageClick(i)}>
              {i}
            </MKPagination>
          );
        }
      }
      // Middle page scenario: show current page with neighbors
      else {
        for (let i = pageNumber - 2; i <= pageNumber + 2; i++) {
          pageButtons.push(
            <MKPagination key={i} item active={pageNumber === i} onClick={() => handlePageClick(i)}>
              {i}
            </MKPagination>
          );
        }
      }
    }

    return pageButtons;
  };

  return (
    <Grid item xs={12} lg={3} sx={{ mt: 2 }}>
      <MKTypography display="block" variant="button" fontWeight="regular" color="text" mb={1}>
        Pagina
      </MKTypography>
      <MKPagination size="small" placement="center">
        {/* Previous page button */}
        <MKPagination item onClick={handlePreviousPage} disabled={pageNumber === 1}>
          <Icon>keyboard_arrow_left</Icon>
        </MKPagination>

        {/* Page number buttons */}
        {renderPageButtons()}

        {/* Next page button */}
        <MKPagination item onClick={handleNextPage} disabled={pageNumber === numberOfPages}>
          <Icon>keyboard_arrow_right</Icon>
        </MKPagination>

        {/* Last page button */}
      </MKPagination>
    </Grid>
  );
}

export default PageSelect;
