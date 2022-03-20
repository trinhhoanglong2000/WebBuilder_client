import React, {useState, useEffect} from "react";
import Stack from '@mui/material/Stack';
import './index.css';
import TableManage from "../TableManage";

const ManageStoreProduct = () => {
  
  const [rows, setRows] = useState([]);
  
  const columns = [
    { id: 'title', label: 'Title', minWidth: 170 },
    { id: 'status', label: 'Status', minWidth: 100 },
    {
      id: 'inventoryProduct',
      label: 'Inventory',
      minWidth: 170,
      align: 'right',
    },
    {
      id: 'type',
      label: 'Type',
      minWidth: 170,
      align: 'right',
    },
    {
      id: 'vendorProduct',
      label: 'Vendor',
      minWidth: 170,
      align: 'right'
    },
  ];
  const getListProducts = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

    var requestOptions = {
        method: 'GET',
        headers: myHeaders
    };

    await fetch(process.env.REACT_APP_API_URL + "products", requestOptions)
    .then(response => response.json())
    .then(result => {
      setRows(result.data);
      console.log(result.data);
    })
    .catch(error => {
        console.log('error', error);
    });
  }
  useEffect(() => {
    getListProducts();
  }, [])
  return (
        <>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={1}
                >
                    
                    <p className="text-btn-login ml-1rem p-0-75rem"> Products </p>
                    <Stack
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    spacing={1}
                    >
                        <button className="btn  btn-login" > <p className="text-btn-login"> Export </p></button>
                        <button className="btn  btn-login" > <p className="text-btn-login"> Import </p></button>
                        <button className="btn btn-success btn-login" > <p className="text-btn-login font-size-0-85-rem-max500"> Add Product </p></button>
                    </Stack>
                </Stack>
                <div className="table">
                    <TableManage data={rows} columnsOfData={columns}></TableManage>
                </div>
        </>
    );
}

export default ManageStoreProduct;