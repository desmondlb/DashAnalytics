import React from 'react';
import { Search } from "@mui/icons-material";
import { IconButton, TextField, InputAdornment } from '@mui/material';
import { GridToolbarDensitySelector, GridToolbarContainer, GridToolbarExport, GridToolbarColumnsButton } from '@mui/x-data-grid';
import FlexBetween from './FlexBetween';

const DataGridCustomToolbar = ({searchInput, setSearchInput, setSearch}) => {
  return (
    <GridToolbarContainer>
        <FlexBetween width="100%">
            <FlexBetween>
                <GridToolbarColumnsButton/>
                <GridToolbarDensitySelector/>
                <GridToolbarExport/>
            </FlexBetween>
            <TextField
                label="Search..."
                sx={{ mb: "0.5rem", width: "15rem"}}
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
                variant="standard"
                // if we type something search will be called everytime the user types something
                // we only want that to happen when search button is clicked
                // but when we pass the above parameters searchInput etc.. we can safely use this
                InputProps={{
                    // this is if we want to customize the text field that we are creating
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => {
                                    setSearch(searchInput);
                                    setSearchInput("");
                                }}
                                // only when the user clicks the search button then set the actual search variable
                                // and clear our the temporary search input
                                // therefore using two states to keep track of the search
                            >
                                <Search/>
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
        </FlexBetween>
    </GridToolbarContainer>
  )
}

export default DataGridCustomToolbar;