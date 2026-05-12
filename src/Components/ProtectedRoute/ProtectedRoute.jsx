import  { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/Auth.context";

export default function ProtectedRoute({ children }) {
  const { token } = useContext(AuthContext);
  const Location = useLocation();

  if (token === null) {
    return <Navigate to="/login" state={{ from: Location.pathname }} />;
  } else {
    return children;
  } 
}

//👤 => token (null) =>gest  lw value bt3t0 fady yb2a m4 3amel login
//👤 => token ("dddfvsvwfcqacawvfwsgvsvsfbvbs(id of the product)") => login  lw value feha string kber yb2a 3ml login blfe3l
// Protected Route => lw m4 3amel login yro7 ll login page  , lw 3amel login yshof el content el protected
// Navigate => by5odna ll page elly 3ayzen nro7lha
// children => el content elly 3ayzen n7miha b2a
// UserContext => 3ashan akhdo el token bta3 el user
