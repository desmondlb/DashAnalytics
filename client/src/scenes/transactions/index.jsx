import React, {useState} from 'react';
import { Box, useTheme} from "@mui/material"
import { DataGrid } from '@mui/x-data-grid';
import { useGetTransactionsQuery } from 'state/api';
import Header from 'component/Header';
import DataGridCustomToolbar from 'component/DataGridCustomToolbar';



const Transactions = () => {;
    const theme = useTheme();
    // values to be sent to the backend

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [sort, setSort] = useState({});
    const [search, setSearch] = useState("");

    const [searchInput, setSearchInput] = useState("");

    // when any of the values setpage setpagesize changes it automatically makes the below api request
    // this is how redux toolkit query works
    // we don't want that for the search. we only want it once the user clicks on search button
    const {data, isLoading} = useGetTransactionsQuery({
        page,
        pageSize,
        sort: JSON.stringify(sort),
        search,
    });
    const columns = [
      {
        field: "_id",
        headerName: "ID",
        flex: 1, // how you want each column to grow or shrink. If small then use 0.5
    },
    {
        field: "userId",
        headerName: "User ID",
        flex: 1, 
    },
    {
        field: "createdAt",
        headerName: "CreatedAt",
        flex: 1,
    },
    {
        field: "product",
        headerName: "# of Products",
        flex: 0.5,
        sortable: false, // Doesn't actually work properly with sorting
        renderCell: (params) => params.value.length // only grab the number of products and not the actual products
    },
    {
        field: "cost",
        headerName: "Cost",
        flex: 1,
        renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    }
    ]
    
  return <Box m="1.5rem 2.5rem">
    <Header title="TRANSACTIONs" subtitle="Entire list of transactions"/>
    <Box height="80vh"
    sx={{
      "& .MuiDataGrid-root":{
          border: "none"
      },
      "& .MuiDataGrid-cell":{
          borderBottom: "none"
      },
      "& .MuiDataGrid-columnHeaders": {
          backgroundColor: theme.palette.background.alt,
          color: theme.palette.secondary[100],
          borderBottom: "none"
      },
      "& .MuiDataGrid-virtualScroller": {
          backgroundColor: theme.palette.primary.light,
      },
      "& .MuiDataGrid-footerContainer": {
          backgroundColor: theme.palette.background.alt,
          color: theme.palette.secondary[100],
          borderTop: "none"
      },
      "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: `${theme.palette.secondary[200]} !important`
      }
  }}>
    {/* Server side pagination */}
      <DataGrid 
        loading={isLoading || !data}
        getRowId={(row)=> row._id}
        rows = {(data && data.transactions) || []} //sets data.transactions
        columns = {columns}
        rowCount={(data && data.total) || 0} // sets data.total
        rowsPerPageOptions={[20, 50, 100]}
        pagination
        page={page}
        pageSize={pageSize}
        paginationMode="server"
        sortingMode="server"
        onPageChange={(newPage) => setPage(newPage)}//configuring datagrid to follow this format
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        onSortModelChange={(newSortModel) => setSort(...newSortModel)} // sets the sorting
        components={{ Toolbar: DataGridCustomToolbar }}
        // you can create a custom toolbar like this
        // typically you can also use the grid toolbar from mui
        componentProps={{
          toolbar: {searchInput, setSearchInput, setSearch},
        }}

      />
    </Box>

  </Box>;

}

export default Transactions;