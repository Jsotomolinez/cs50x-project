'use client'

import { useState, useEffect } from "react";

import config from '@/app/config.json';
import { Brand, Department, Line, ProviderInfo } from "@/app/definitons/general"; 

import AddBrand from "@/app/ui/dashboard/addBrand";
import ActivateProduct from "../../ui/dashboard/activateProduct";
import AddProduct from "../../ui/dashboard/addProduct";
import DeleteProduct from "../../ui/dashboard/deleteProduct";
import UpdateProduct from "../../ui/dashboard/updateProduct";
import AddDepartment from "@/app/ui/dashboard/addDepartment";
import AddProvider from "@/app/ui/dashboard/addProvider";
import AddLine from "@/app/ui/dashboard/addLine";


export default function Dashboard() {

  const [brands, setBrans] = useState<Brand[]| null>(null)
  const [departments, setDepartments] = useState<Department[]| null>(null)
  const [lines, setLines] = useState<Line[]| null>(null)
  const [providers, setProviders] = useState<ProviderInfo[] | null>(null)


  useEffect(() => {
    const fetchNavInfo = async () => {
      const brandsResponse = await fetch(`${config.rootURL}/brands/get_brands`);
      const departmentsResponse = await fetch(`${config.rootURL}/departments/get_departments`);
      const linesResponse = await fetch(`${config.rootURL}/lines/get_lines`);
      const providersResponse = await fetch(`${config.rootURL}/providers/get_providers`)

      const brandsInfo: Brand[] = await brandsResponse.json();
      const departmentsInfo: Department[] = await departmentsResponse.json();
      const linesInfo: Line[] = await linesResponse.json();
      const providersInfo: ProviderInfo[] = await providersResponse.json();
      setBrans(brandsInfo);
      setDepartments(departmentsInfo);
      setLines(linesInfo);
      setProviders(providersInfo);
    };

    fetchNavInfo();
  }, []);

  return (
    <>
      <AddProduct
        brands = {brands}
        departments = {departments}
        lines = {lines}
        providers = {providers}
      />
      <DeleteProduct />
      <ActivateProduct />
      <UpdateProduct
        brands = {brands}
        departments = {departments}
        lines = {lines}
        providers = {providers}
      />
      <AddBrand />
      <AddDepartment />
      <AddProvider />
      <AddLine />
    </>
  )
}