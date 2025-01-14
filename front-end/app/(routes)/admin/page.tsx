import ActivateProduct from "../../ui/dashboard/activateProduct";
import AddProduct from "../../ui/dashboard/addProduct";
import DeleteProduct from "../../ui/dashboard/deleteProduct";
import UpdateProduct from "../../ui/dashboard/updateProduct";

export default function Dashboard() {
  return (
    <>
      <AddProduct />
      <DeleteProduct />
      <ActivateProduct />
      <UpdateProduct />
    </>
  )
}