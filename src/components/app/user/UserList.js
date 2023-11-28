import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdvanceTable from "components/common/advance-table/AdvanceTable";
import AdvanceTableHeader from "components/common/advance-table/AdvanceTableHeader";
import AdvanceTablePagination from "components/common/advance-table/AdvanceTablePagination";
import AdvanceTableWrapper from "components/common/advance-table/AdvanceTableWrapper";
import CardDropdown from "components/common/CardDropdown";
import React, { useEffect, useState } from "react";
import { Card, Dropdown, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import routes from "routes/paths";
import { toast } from "react-toastify";
import { getUserList } from "@EndPoint/getCalls";

//import Import from "./import";

const UserList = () => {
  const columns = [
    {
      accessor: "username",
      Header: "Name",
      headerProps: { className: "pe-1 invoice-header" },
      cellProps: {
        className: "py-2"
      }
    },
    {
      accessor: "phoneNumber",
      Header: "Number",
      headerProps: { className: "pe-1 invoice-header" },
      cellProps: {
        className: "py-2"
      }
    },
    {
      accessor: "role",
      Header: "Role",
      headerProps: { className: "pe-1 invoice-header" },
      cellProps: {
        className: "py-2"
      },
      Cell: rowData => {
        const { role } = rowData.row.values;
        const rolee =
          role === 2 ? "salesman" : role === 1 ? "admin" : "other"; // Provide a default or handle other cases

        return <div>{rolee}</div>;
      }
    },
    {
      accessor: "feature",
      Header: "Address",
      headerProps: { className: "pe-1 invoice-header" },
      cellProps: {
        className: "py-2"
      }
    },
    {
      accessor: "_id",
      disableSortBy: true,
      Header: () => {
        return (
          <div className="text-center">
            <FontAwesomeIcon icon={"ellipsis-h"} className="fs--2" />
          </div>
        );
      },
      cellProps: {
        className: "text-center"
      },
      Cell: rowData => {
        const { _id } = rowData.row.values;
        return (
          <CardDropdown
            iconClassName="fs--1"
            style={{ background: "orange" }}
          >
            <div className="py-2">
              <Dropdown.Item
                onClick={() => {
                  navigate("/edit-employee/" + _id);
                }}
              >
                Edit
              </Dropdown.Item>
            </div>
          </CardDropdown>
        );
      }
    }
  ];
  const [globalFilter, setGlobalFilter] = useState("");
  const [customer, setCustomer] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(store => store.user);

  const navigate = useNavigate();

  const getCustomer = () => {
    setLoading(true);
    getUserList("Bearer " + user.token, "1")
      .then(res => {
        setCustomer(res.data.userList);
        setLoading(false);
      })
      .catch(err => {
        toast.error(err);
      });
  };

  useEffect(() => {
    getCustomer();
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
    <div className="justify-content-center">
      {!loading ? (
        <AdvanceTableWrapper
          columns={columns}
          data={
            globalFilter === ""
              ? customer
              : findInValues(customer, globalFilter)
          }
          sortable
          pagination
          perPage={10}
        >
          <Card className="mb-3 w-100">
            <Card.Header>
              <AdvanceTableHeader
                title={"Products"}
                table
                isNew
                isSearch
                handleAdd={() => {
                  navigate(routes.user_add);
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

export default UserList;
