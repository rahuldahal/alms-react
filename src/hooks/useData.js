import { useContext } from "react";
import DataContext from "../context/DataProvider";

export default function useData() {
  return useContext(DataContext);
}
