//import { getBill } from "@EndPoint/getCalls";
import AdvanceTable from "components/common/advance-table/AdvanceTable";
import AdvanceTableHeader from "components/common/advance-table/AdvanceTableHeader";
import AdvanceTablePagination from "components/common/advance-table/AdvanceTablePagination";
import AdvanceTableWrapper from "components/common/advance-table/AdvanceTableWrapper";
import { toastError } from "helpers/toastError";
import React, { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import routes from "routes/paths";

const columns = [
  {
    accessor: "billNumber",
    Header: "Id",
    headerProps: { className: "pe-1 invoice-header" },
    cellProps: {
      className: "py-2"
    }
  },
  {
    accessor: "customer",
    Header: "Customer",
    headerProps: { className: "pe-1 invoice-header" },
    cellProps: {
      className: "py-2"
    }
  },
  {
    accessor: "discount",
    Header: "Discount",
    headerProps: { className: "pe-1 invoice-header" },
    Cell: rowData => {
      const { discount, discountType } = rowData.row.original;
      return (
        <div>
          {discount + " " + (discountType === "1" ? "RS" : "%")}
        </div>
      );
    }
  },
  {
    accessor: "total",
    Header: "Total",
    headerProps: { className: "pe-1 invoice-header" },
    Cell: rowData => {
      const { total } = rowData.row.original;
      return <div>{total + " RS"}</div>;
    }
  },
  {
    accessor: "terms",
    Header: "Terms",
    headerProps: { className: "pe-1 invoice-header" }
  },
  {
    accessor: "notes",
    Header: "Note",
    headerProps: { className: "pe-1 invoice-header" }
  }
  // {
  //   accessor: "none",
  //   disableSortBy: true,
  //   Header: () => {
  //     return (
  //       <div className="text-center">
  //         <FontAwesomeIcon icon={"ellipsis-h"} className="fs--2" />
  //       </div>
  //     );
  //   },
  //   cellProps: {
  //     className: "text-center"
  //   }
  // }
];
const BillList = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const navigate = useNavigate();
  const [bills, setBills] = useState([]);
  const { user } = useSelector(store => store.user);
  const getBills = () => {
    //getBill("Bearer " + user.token)
    //  .then(res => {
    //    console.log(res.data.billList);
    //    setBills(res.data.billList);
    //  })
    //  .catch(err => {
    //    console.log(err);
    //    toastError(err);
    //  });
    //getUsersByType({ userType: 2 }, "Bearer " + user.token)
    //  .then(res => {
    //    setUsers(res.data.userList);
    //  })
    //  .catch(err => {
    //    console.log(err);
    //  });
  };
  useEffect(() => {
    getBills();
  }, [user]);
  function findInValues(arr, value) {
    value = String(value).toLowerCase();
    return arr.filter(o =>
      Object.entries(o).some(entry =>
        String(entry[1]).toLowerCase().includes(value)
      )
    );
  }
  return (
    <div className="staff d-flex justify-content-center">
      {bills ? (
        <AdvanceTableWrapper
          columns={columns}
          data={
            globalFilter === ""
              ? bills
              : findInValues(bills, globalFilter)
          }
          selection
          sortable
          pagination
          perPage={15}
        >
          <Card className="mb-3 w-100">
            <Card.Header>
              <AdvanceTableHeader
                title={"Bill List"}
                table
                isSearch
                isOptions
                isNew
                handleAdd={() => {
                  navigate(routes.add_purchase);
                }}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </Card.Header>
            <Card.Body className="p-0">
              <AdvanceTable
                table
                headerClassName="bg-200 text-900 text-nowrap align-middle"
                rowClassName="align-middle white-space-nowrap"
                tableProps={{
                  size: "sm",
                  className: "fs--1 mb-0 overflow-hidden"
                }}
              />
            </Card.Body>
            <Card.Footer>
              <AdvanceTablePagination table />
            </Card.Footer>
          </Card>
        </AdvanceTableWrapper>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default BillList;
