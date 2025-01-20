import AddBrand from "@/app/ui/dashboard/addBrand";
import ActivateProduct from "../../ui/dashboard/activateProduct";
import AddProduct from "../../ui/dashboard/addProduct";
import DeleteProduct from "../../ui/dashboard/deleteProduct";
import UpdateProduct from "../../ui/dashboard/updateProduct";
import AddDepartment from "@/app/ui/dashboard/addDepartment";
import AddProvider from "@/app/ui/dashboard/addProvider";
import AddLine from "@/app/ui/dashboard/addLine";

export default function Dashboard() {
  return (
    <>
      <AddProduct />
      <DeleteProduct />
      <ActivateProduct />
      <UpdateProduct />
      <AddBrand />
      <AddDepartment />
      <AddProvider />
      <AddLine />
    </>
  )
}