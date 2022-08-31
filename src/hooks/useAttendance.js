import { useContext } from "react";
import AttendanceContext from "../context/AttendanceProvider";

export default function useAttendance() {
  return useContext(AttendanceContext);
}
