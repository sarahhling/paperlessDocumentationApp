import MyTable from "../components/table";
import { useMemo, useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient.js";

export default function TableDemo() {
  const [forms, setForms] = useState([]);

  const setFetchedData = async () => {
    const { data } = await supabase
      .from("Items")
      .select()
      .filter("approved", "in", '("false")')
      .order("user", { ascending: true });
    setForms((data = JSON.parse(JSON.stringify(data))));
  };

  useEffect(() => {
    setFetchedData();
  }, []);

  const columns = useMemo(
    () => [
      { Header: "Submitted By", accessor: "user" },
      { Header: "Date", accessor: "date" },
      { Header: "Product", accessor: "name" },
      { Header: "Price", accessor: "price" },
      { Header: "Quantity", accessor: "quantity" },
    ],
    []
  );

  return (
    <div>
      <div className="col-md-12 pb-4 text-center">
        <h1>Form Approval</h1>
      </div>
      <MyTable columns={columns} data={forms}></MyTable>
    </div>
  );
}
