import { createContext, useState } from "react";

const AttendanceContext = createContext({});

export const AttendanceProvider = ({ children }) => {
  const [attendance, setAttendance] = useState([]);

  return (
    <AttendanceContext.Provider value={{ attendance, setAttendance }}>
      {children}
    </AttendanceContext.Provider>
  );
};

export default AttendanceContext;
