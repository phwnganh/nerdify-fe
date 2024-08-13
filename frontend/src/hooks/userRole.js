import { useEffect, useState } from "react";
import STORAGE, { getStorage } from "../library/storage";

export default function UserRole(){
      const [role, setRole] = useState("")
      useEffect(() => {
            const userInfo = getStorage(STORAGE.USER_INFO);
            if(userInfo){
                  setRole(userInfo.role)
            }
      }, [])
      return role;
}