import { useEffect, useState } from "react";
import STORAGE, { getStorage } from "../library/storage";

export default function UserRole(){
      const [role, setRole] = useState("")
      useEffect(() => {
            const userRole = getStorage(STORAGE.USER_INFO);
            if(userRole){
                  setRole(userRole.role)
            }
      }, [])
      return role;
}